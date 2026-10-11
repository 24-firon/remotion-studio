# k6 Load Testing: Der Robustness-Standard

**Status:** Performance & Reliability Blueprint | **Version:** 2.0 | **Gültig ab:** 13. Januar 2026  
**Abhängigkeiten:** k6 / Next.js 16.1 / Vitest / GitHub Actions  
**Synergien:** CI/CD Pipeline, Error Boundaries, Server Actions

---

## 🎯 KERNKONZEPT: "Beweis durch Last-Test, nicht durch Hoffnung"

Im Mastery Tier 2026 ist Performance kein "Hope-for-the-best"-Ansatz. Jedes Feature wird unter **realistische Last-Szenarien** getestet, bevor es live geht [web:332][file:23].

### Der Sicherheits-Sandwich

```
Local Development
  ↓ (pnpm build / pnpm start)
  ↓
Local k6 Test (5 Minuten)
  ↓ (Muss p95 < 500ms halten)
  ↓
Git Push
  ↓
GitHub Actions CI (automatisch k6)
  ↓ (Muss p95 < 500ms halten)
  ↓
Vercel Deploy (nur wenn CI grün)
  ↓
Production k6 Monitoring (24/7)
```

**Resultat:** Fehler entstehen erst bei > 50 Concurrent Users (sicher).

---

## 🛠️ DIE VOLLSTÄNDIGE ARCHITEKTUR

### 1. Das k6 Test-Script (JavaScript-native)

```javascript
// tests/load-test.js
import http from 'k6/http';
import { check, sleep } from 'k6';
import { Trend, Counter } from 'k6/metrics';

// ===== CUSTOM METRICS =====
const requestDuration = new Trend('request_duration');
const requestFailures = new Counter('request_failures');
const requestSuccess = new Counter('request_success');

export const options = {
  // ===== LOAD STAGES (Ramping Simulation) =====
  stages: [
    { duration: '10s', target: 10 },   // 10 Users in 10s (warm-up)
    { duration: '30s', target: 50 },   // Ramp to 50 Users
    { duration: '1m', target: 50 },    // Stay at 50 for 1 minute (peak load test)
    { duration: '20s', target: 0 },    // Ramp down to 0
  ],

  // ===== THRESHOLDS (Viron Hard Constraints) =====
  thresholds: {
    // 95% of requests under 500ms
    http_req_duration: ['p(95)<500'],

    // Error rate under 1%
    http_req_failed: ['rate<0.01'],

    // Custom metrics
    request_duration: ['p(95)<500'],
  },

  // ===== VU (Virtual User) Settings =====
  vus: 50,                // Max concurrent users
  duration: '2m',         // Total test duration
  
  // ===== OPTIONAL: For distributed/cloud tests
  // ext: {
  //   loadimpact: {
  //     projectID: 123456, // Your k6 Project ID
  //     name: 'Homepage Load Test',
  //   },
  // },
};

// ===== SETUP: Run once before test starts =====
export function setup() {
  console.log('Starting load test...');
  return { startTime: new Date() };
}

// ===== DEFAULT: Main test function =====
export default function (data) {
  // 1️⃣ Test: GET /  (Static Shell + PPR Streaming)
  const homeRes = http.get('http://localhost:3000');
  
  check(homeRes, {
    'Home: Status 200': (r) => r.status === 200,
    'Home: LCP-like timing': (r) => r.timings.receiving < 1000,
  }) || requestFailures.add(1);
  requestDuration.add(homeRes.timings.duration);
  requestSuccess.add(1);

  sleep(1);

  // 2️⃣ Test: Server Action (Contact Form)
  const payload = JSON.stringify({
    email: `user${Math.random()}@test.com`,
    name: 'Load Test User',
    message: 'This is a load test message.',
    urgency: 'medium',
  });

  const contactRes = http.post(
    'http://localhost:3000/api/actions/contact',
    payload,
    {
      headers: {
        'Content-Type': 'application/json',
        'X-K6-Test': 'true',
      },
    }
  );

  check(contactRes, {
    'Contact: Status 200': (r) => r.status === 200,
    'Contact: Response time': (r) => r.timings.duration < 500,
    'Contact: Valid JSON': (r) => {
      try {
        JSON.parse(r.body);
        return true;
      } catch {
        return false;
      }
    },
  }) || requestFailures.add(1);
  requestDuration.add(contactRes.timings.duration);
  requestSuccess.add(1);

  sleep(1);

  // 3️⃣ Test: Image Download (next/image optimization)
  const imageRes = http.get('http://localhost:3000/images/hero.avif');
  
  check(imageRes, {
    'Image: Status 200': (r) => r.status === 200,
    'Image: Size optimization': (r) => r.body.length < 500000, // < 500kb
    'Image: Fast download': (r) => r.timings.duration < 1000,
  }) || requestFailures.add(1);
  requestDuration.add(imageRes.timings.duration);

  sleep(2);

  // 4️⃣ Test: API Endpoint under load
  const apiRes = http.get('http://localhost:3000/api/health');
  
  check(apiRes, {
    'API: Status 200': (r) => r.status === 200,
    'API: Sub-50ms response': (r) => r.timings.duration < 50,
  }) || requestFailures.add(1);

  sleep(1);
}

// ===== TEARDOWN: Run once after test finishes =====
export function teardown(data) {
  console.log('Test completed!');
  console.log(`Start time: ${data.startTime}`);
  console.log(`End time: ${new Date()}`);
}
```

### 2. Lokale Ausführung (Pre-Commit)

```bash
#!/bin/bash
# scripts/test-load.sh

echo "🏗️  Building app..."
pnpm build || exit 1

echo "🚀 Starting Next.js server..."
pnpm start &
SERVER_PID=$!

# Wait for server to be ready
sleep 3

echo "⚡ Running k6 load test..."
k6 run tests/load-test.js

TEST_EXIT=$?

# Kill the server
kill $SERVER_PID

if [ $TEST_EXIT -eq 0 ]; then
  echo "✅ Load test passed!"
  exit 0
else
  echo "❌ Load test failed!"
  exit 1
fi
```

### 3. GitHub Actions CI/CD Integration

```yaml
# .github/workflows/load-test.yml
name: Load Testing

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main, develop]

jobs:
  load-test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3

      - name: Setup Node
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          cache: 'pnpm'

      - name: Install dependencies
        run: pnpm install

      - name: Build
        run: pnpm build

      - name: Start server
        run: pnpm start &
        env:
          NODE_ENV: production

      - name: Wait for server
        run: sleep 5

      - name: Install k6
        run: |
          sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv-keys C5AD17C747E3415A3642D57D77C6C491D6AC1D69
          echo "deb https://dl.k6.io/deb stable main" | sudo tee /etc/apt/sources.list.d/k6.list
          sudo apt-get update
          sudo apt-get install k6

      - name: Run load test
        run: k6 run tests/load-test.js

      - name: Comment on PR
        if: github.event_name == 'pull_request'
        uses: actions/github-script@v6
        with:
          script: |
            github.rest.issues.createComment({
              issue_number: context.issue.number,
              owner: context.repo.owner,
              repo: context.repo.repo,
              body: '✅ Load test passed! p95 < 500ms, Error Rate < 1%'
            })

      - name: Fail if load test didn't pass
        run: echo "Load test failed!" && exit 1
        if: failure()
```

---

## 📊 ANALYSING RESULTS

### Output lesen

```
execution: local
scenarios: 1 total, 1 running (2m00s)
data_received: 2.5 MB
data_sent: 1.2 MB
requests: 500 (4.17 req/sec) ✅
request_duration: 435ms avg, 512ms p95 ⚠️ (Grenzwert!)
http_req_failed: 0.4% ⚠️ (Sollte < 1% sein)
```

**Interpretieren:**
- p95 < 500ms: ✅ Grün
- p95 500-600ms: ⚠️ Orange (optimize)
- p95 > 600ms: 🔴 Rot (block deployment)

---

## 🚨 HÄUFIGE FEHLER

### Fehler 1: Test läuft nicht lokal
```bash
# ❌ FALSCH (Server nicht erreichbar)
$ k6 run tests/load-test.js

# ✅ RICHTIG
$ pnpm build && pnpm start &
$ sleep 3
$ k6 run tests/load-test.js
```

### Fehler 2: Falsche Baseline-Metriken
```javascript
// ❌ FALSCH (zu lax)
thresholds: {
  http_req_duration: ['p(95)<2000'], // 2 Sekunden? 😂
}

// ✅ RICHTIG (Viron-Standard)
thresholds: {
  http_req_duration: ['p(95)<500'], // 500ms = Professionell
}
```

### Fehler 3: Nicht genug VUs für realistischen Test
```javascript
// ❌ FALSCH (zu wenig Last)
vus: 5,
duration: '30s'

// ✅ RICHTIG (Realistische Peak Load)
vus: 50,
stages: [
  { duration: '10s', target: 50 },
  { duration: '1m', target: 50 },
  { duration: '10s', target: 0 },
]
```

---

## 🔗 SYNERGIEN MIT ANDEREN LEARNINGS

### 1. **Server Actions** (file:319)
Load-Test muss Server Actions unter Druck testen:
```javascript
// Teste Form-Submission unter 50 concurrent users
http.post('/api/actions/contact', payload);
```

### 2. **Database Performance** (file:322)
Wenn Load-Test p95 > 500ms zeigt → Database-Query ist Bottleneck.
```sql
-- Add index für häufige Queries
CREATE INDEX idx_users_email ON users(email);
```

### 3. **PPR & Streaming** (file:320)
Load-Test validiert, dass PPR wirklich LCP < 1.0s erzeugt.

---

## ✅ VIRON CHECKLIST

- [ ] k6 Script installiert und lokal getestet
- [ ] GitHub Actions Workflow konfiguriert
- [ ] Thresholds gesetzt: p95 < 500ms, Error Rate < 1%
- [ ] VU-Stages realistisch (10 → 50 → 10)
- [ ] Pre-commit Hook nutzt k6 lokal
- [ ] Sentry Integration für Error Tracking
- [ ] Regelmäßige Load-Tests in Production (Monitoring)
- [ ] Team ist trainiert, Ergebnisse zu interpretieren

---

**Dokument Version:** 2.0 | **Erstellt:** 13. Januar 2026 | **Status:** Production Ready  
**Nächste Review:** Q2 2026 (k6 Cloud Integration)
