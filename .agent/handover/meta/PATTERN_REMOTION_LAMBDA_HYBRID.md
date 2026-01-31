# ☁️ PATTERN: REMOTION LAMBDA HYBRID (SAAS ARCHITECTURE)

**The Pattern:** Viron is not just a local renderer. It is a Cloud-SaaS-Hybrid.

---

## 🔌 1. DUAL ENTRY POINTS

We have two distinct compilations:

1.  **Local (Dev/Preview):**
    - Target: Browser (Chrome).
    - Tech: Webpack / Vite (HMR enabled).
    - Features: Fast refresh, lower quality proxies.

2.  **Cloud (Production):**
    - Target: AWS Lambda (Headless Linux).
    - Tech: Webpack Bundle (Single File).
    - Features: Max concurrency, `headless: true`.

**The Audit Trap:** An auditor might see an error in `local` and fix it, breaking `lambda`.
**Rule:** Always verify if a change affects the `bundle.tsx` (Lambda entry) or `index.tsx` (Local entry).

---

## 🏎️ 2. ASSET HYDRATION

- **Local:** Assets loaded from `public/`.
- **Lambda:** Assets MUST be uploaded to S3 first, or bundled inline (limit 50MB).
- **Viron Rule:** We use **S3 Presigned URLs** for dynamic assets (User Uploads). We do not bundle user assets.

---

## 🧩 3. THE "SITE" VS "USER-AGENT"

In Badge 5 (Web), we check user-agents.

- If `Remotion Player` -> Serve high-res.
- If `Googlebot` -> Serve static poster.
- If `Lambda` -> Serve raw stream.

**Status:** This logic is hidden in `samples/next-server.ts`.
