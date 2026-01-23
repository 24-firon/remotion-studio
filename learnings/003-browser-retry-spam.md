# LEARNING: Browser Automation & Retry Logic

**Date:** 2026-01-23
**Context:** The Browser Sub-Agent attempted to verify a localhost URL. When the connection was refused, it entered a retry loop where it opened multiple tabs and took a screenshot for _every_ failed attempt.
**Outcome:** FAILURE (Workspace Clutter)
**Details:**

- The agent spammed the user with 10+ identical error screenshots.
- It opened multiple tabs (`chrome-error://`) without closing them.
- It tried to solve a _server_ problem (port closed) with _browser_ actions (retrying).
  **Takeaway:**

1.  **Stop on Refusal:** If `ERR_CONNECTION_REFUSED`, stop immediately. Do not retry more than once.
2.  **Check Terminal:** If the browser fails, check the Terminal output (`npm run dev`) before taking screenshots.
3.  **No Screenshot Spam:** Never take a screenshot of a connection error page. It provides no value.
