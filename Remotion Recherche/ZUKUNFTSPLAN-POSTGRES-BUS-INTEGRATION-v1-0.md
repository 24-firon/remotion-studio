# ZUKUNFTSPLAN-POSTGRES-BUS-INTEGRATION v1.0 (29. Jan 2026)

## Wann und wie integriert ihr das Postgres Event Bus System?

Das ist der Plan für verteilte Video-Rendering mit Message Queue.

---

## ⚡ Das Problem (Skalierung)

```
TODAY (Single Machine):
npx remotion render MyComposition.tsx output.mp4
↓ Takes 5 minutes
↓ Blocks until done

TOMORROW (100 render jobs/day):
- User 1 wants video at 09:00
- User 2 wants video at 09:01
- User 100 wants video at 09:15
↓ Can't render all at once (too slow, too much CPU)
↓ Need QUEUE + WORKERS
```

---

## 🏗️ Die Architektur (Mit Postgres Bus)

```
Next.js App (Web)
    ↓ (POST /api/render)
    ↓
Postgres Queue Table
    ├─ render_jobs (id, composition, props, status, created_at)
    └─ (New row on each render request)
    ↓
Event Bus (Trigger)
    ├─ SELECT * FROM render_jobs WHERE status='pending'
    └─ Trigger webhook/event
    ↓
Worker Pool (Docker containers or AWS Lambda)
    ├─ Worker 1: Reading job #1
    ├─ Worker 2: Reading job #2
    ├─ Worker 3: Idle (waiting)
    └─ Each: runs `remotion render --output-dir=s3://...`
    ↓
S3 Storage
    └─ output-videos/job-123.mp4
    ↓
Next.js App updates database
    └─ UPDATE render_jobs SET status='completed', output_url='s3://...' WHERE id=123
```

---

## 📋 Implementation Details

### 1. Database Schema (Postgres)

```sql
-- Create render jobs table
CREATE TABLE render_jobs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  
  -- Job info
  composition_name VARCHAR(255),
  composition_props JSONB,
  
  -- Status tracking
  status VARCHAR(50) DEFAULT 'pending', -- pending, processing, completed, failed
  worker_id VARCHAR(255), -- Which worker claimed this job
  created_at TIMESTAMP DEFAULT NOW(),
  started_at TIMESTAMP,
  completed_at TIMESTAMP,
  
  -- Output
  output_url VARCHAR(500), -- s3://bucket/job-id.mp4
  error_message TEXT,
  
  -- Priority (higher = sooner)
  priority INT DEFAULT 0
);

-- Index for quick queries
CREATE INDEX idx_status_priority ON render_jobs(status, priority DESC);

-- Trigger notification on INSERT
CREATE FUNCTION notify_render_job_insert()
RETURNS TRIGGER AS $$
BEGIN
  PERFORM pg_notify('render_jobs_insert', json_build_object(
    'id', NEW.id,
    'composition', NEW.composition_name
  )::text);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER render_jobs_insert_trigger
AFTER INSERT ON render_jobs
FOR EACH ROW EXECUTE FUNCTION notify_render_job_insert();
```

### 2. Worker Code (Node.js + Bull Queue)

```typescript
// workers/render-worker.ts
import Queue from 'bull';
import { spawn } from 'child_process';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';

const renderQueue = new Queue('render', {
  redis: {
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
  },
});

const s3 = new S3Client({ region: 'eu-central-1' });

// Process jobs
renderQueue.process(async (job) => {
  const { id, composition_name, composition_props } = job.data;
  
  console.log(`[Worker] Processing job ${id}`);
  
  // Run remotion render
  const outputFile = `/tmp/render-${id}.mp4`;
  
  return new Promise((resolve, reject) => {
    const remotion = spawn('npx', [
      'remotion',
      'render',
      `./compositions/${composition_name}.tsx`,
      outputFile,
      '--props',
      JSON.stringify(composition_props),
    ]);
    
    remotion.on('close', async (code) => {
      if (code !== 0) {
        reject(new Error(`Remotion render failed with code ${code}`));
      }
      
      // Upload to S3
      const s3Key = `videos/${id}.mp4`;
      const command = new PutObjectCommand({
        Bucket: 'viron-videos',
        Key: s3Key,
        Body: fs.createReadStream(outputFile),
      });
      
      await s3.send(command);
      console.log(`[Worker] Uploaded ${id} to S3`);
      
      // Update DB
      await db.query(
        'UPDATE render_jobs SET status=$1, output_url=$2, completed_at=NOW() WHERE id=$3',
        ['completed', `s3://viron-videos/${s3Key}`, id]
      );
      
      resolve({ success: true, s3Key });
    });
  });
});

// Listen for failed jobs
renderQueue.on('failed', async (job, err) => {
  console.error(`[Worker] Job ${job.id} failed:`, err);
  await db.query(
    'UPDATE render_jobs SET status=$1, error_message=$2 WHERE id=$3',
    ['failed', err.message, job.id]
  );
});
```

### 3. API Endpoint (Next.js Route Handler)

```typescript
// app/api/render/route.ts
'use server'

import { db } from '@/lib/db';

export async function POST(req: Request) {
  const body = await req.json();
  const { compositionName, props } = body;
  
  // 1. Insert into Postgres
  const result = await db.query(
    `INSERT INTO render_jobs (composition_name, composition_props, priority)
     VALUES ($1, $2, $3)
     RETURNING id`,
    [compositionName, JSON.stringify(props), 0]
  );
  
  const jobId = result.rows[0].id;
  
  // 2. Return immediately (async processing)
  return Response.json({
    jobId,
    status: 'queued',
    message: 'Your render job has been queued. Check status later.',
  });
}

// Poll endpoint to check status
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const jobId = searchParams.get('jobId');
  
  const result = await db.query(
    'SELECT * FROM render_jobs WHERE id=$1',
    [jobId]
  );
  
  return Response.json(result.rows[0]);
}
```

### 4. Worker Deployment (Docker)

```dockerfile
# Dockerfile.worker
FROM node:18

WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

COPY . .

CMD ["node", "dist/workers/render-worker.js"]
```

```bash
# Deploy workers to ECS / Lambda
docker build -f Dockerfile.worker -t viron-render-worker .
aws ecr push ...
# Scale to 5 workers when queue > 10 jobs
```

---

## 🚀 Rollout Plan

### Phase 1: Local Testing (Now - Feb 2026)
- [ ] Setup Postgres locally
- [ ] Test Bull Queue with 1 worker
- [ ] Verify render job flow

### Phase 2: Single Worker (Feb-Mar 2026)
- [ ] Deploy 1 Docker worker to AWS ECS
- [ ] Route jobs through queue
- [ ] Monitor success rate

### Phase 3: Scale (Mar-Apr 2026)
- [ ] Auto-scaling: 1→5 workers when needed
- [ ] Add retry logic
- [ ] Performance monitoring

---

**Version:** v1.0 (29. Jan 2026)  
**Status:** Future (Target: Feb 2026)