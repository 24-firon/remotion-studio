# ZUKUNFTSPLAN-APP-SHELL-NEXT-JS v1.0 (29. Jan 2026)

## Phase B: Die Website mit Remotion Player Integration

Du startest mit Remotion Studio/CLI. Irgendwann brauchst du aber eine richtige Website, auf der User deine Videos sehen können. Das ist dieser Plan.

---

## 🎯 Das Ziel (Phase B)

```
Your Application:
├── Backend/API
│   ├── Render Queue (Postgres + Bull Queue)
│   └── Video Metadata Store
├── Next.js App Shell (Frontend)
│   ├── Landing Page (Showcase videos)
│   ├── Editor UI (Let users customize videos)
│   ├── Player Page (Display video + controls)
│   └── Admin Dashboard (Render jobs, analytics)
└── Remotion Integration
    ├── <Player> Component (Display existing videos)
    ├── Render Triggers (Start video generation)
    └── Output Storage (S3 or similar)
```

---

## 🏗️ Architektur (High-Level)

### 1. Next.js App Router Setup

```bash
npx create-next-app@latest viron-app --typescript --tailwind

# Struktur:
viron-app/
├── app/
│   ├── page.tsx                    (Landing page)
│   ├── editor/page.tsx             (Editor for video params)
│   ├── player/[videoId]/page.tsx  (Video display + player)
│   ├── admin/page.tsx              (Dashboard)
│   └── api/
│       ├── render/route.ts         (Start render job)
│       └── videos/route.ts         (List videos)
├── components/
│   ├── VideoPlayer.tsx             (Remotion <Player>)
│   ├── GlowingButton.tsx           (Your button design)
│   └── ...
└── lib/
    ├── render-client.ts            (Talk to Remotion CLI)
    └── db.ts                       (Postgres client)
```

### 2. Server Actions Pattern

```typescript
// app/api/render/route.ts (Server Action)
'use server'

import { startRemotionRender } from '@/lib/render-client';

export async function POST(req: Request) {
  const body = await req.json();
  const { title, duration, effectType } = body;
  
  // Start render job (async)
  const jobId = await startRemotionRender({
    composition: 'IntroVideo',
    props: { title, duration, effectType },
  });
  
  // Return immediately (job runs in background)
  return Response.json({ jobId });
}
```

### 3. Remotion Player Integration

```typescript
// components/VideoPlayer.tsx
'use client'

import { Player } from 'remotion';
import { IntroComposition } from '@/remotion/compositions/intro';

export function VideoPlayer({ videoProps }) {
  return (
    <Player
      component={IntroComposition}
      durationInFrames={300}
      fps={30}
      inputProps={videoProps}
    />
  );
}
```

---

## 📊 Tech Stack für Phase B

| Layer | Technology | Why |
|---|---|---|
| **Frontend** | Next.js 15 (App Router) | Server Components + Server Actions (streamlined) |
| **Styling** | Tailwind CSS + CSS Modules | Design tokens shared with Remotion |
| **Components** | React + viron-system skill | Consistent design across video + web |
| **Video Display** | Remotion `<Player>` | Native integration |
| **Video Rendering** | Remotion CLI + Docker | Scalable, headless rendering |
| **Queue** | Bull + Redis/Postgres | Track render jobs |
| **Storage** | AWS S3 / Cloudinary | Store output videos |
| **Database** | Postgres | Video metadata, user sessions |
| **Deployment** | Vercel | Native Next.js support |

---

## 🚀 Implementation Timeline

### Week 1: Basics
- [ ] Create Next.js app
- [ ] Setup landing page
- [ ] Integrate Remotion Player component
- [ ] Deploy to Vercel (empty site works)

### Week 2: Editor UI
- [ ] Build parameter form (let user customize)
- [ ] Connect to Remotion props
- [ ] Real-time preview in Player

### Week 3: Render Pipeline
- [ ] Setup Bull Queue (Postgres backend)
- [ ] Implement `POST /api/render` endpoint
- [ ] Monitor render status
- [ ] Store outputs to S3

### Week 4: Polish
- [ ] Admin dashboard (render jobs, metrics)
- [ ] Design consistency check (viron-button-design)
- [ ] Performance tuning
- [ ] Error handling + retries

---

## 💡 Key Decisions

**Q: Should we pre-render videos or on-demand?**

A: **Hybrid.**
- Popular videos: Pre-render + cache
- Custom videos: On-demand (user pays time cost)
- Remotion `<Player>` for previews (instant)

**Q: Where does rendering happen?**

A: **Cloud (AWS Lambda or similar).**
- Remotion CLI runs in Docker container
- Triggers on `POST /api/render`
- Outputs to S3
- Database tracks job status

**Q: How do we keep Button Design consistent?**

A: **Design tokens.**
- Both Remotion (video) and React (web) import same `design-tokens.js`
- One source of truth
- See: `viron-system/rules/viron-button-design.md`

---

## 🔗 Links to Other Documents

- Orchestrator Setup: `ORCHESTRATOR-AGENT-SETUP-GEMINI-3-PRO-v1.md`
- Next.js Skill: `next-best-practices` from skills.sh
- Button Design: `viron-system/rules/viron-button-design.md`

---

**Version:** v1.0 (29. Jan 2026)  
**Status:** Future Plan (Start: Week of Feb 2026)