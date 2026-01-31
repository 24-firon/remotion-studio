# 📉 RULE: TOKEN ECONOMY (THE ANTI-FOG DOCTRINE)

**Problem:** "Token Fog". When the context window exceeds 50k tokens, Agents start hallucinating paths and forgetting constraints.

---

## 🗑️ 1. LOAD JUST ENOUGH (JIT LOADING)

- **Don't:** `read_file(entire_repo_manifest)`.
- **Do:** `read_file(specific_source_file)`.

**Optimization:** Use `grep_search` to find line numbers, then `view_file` with `StartLine/EndLine` to read only the snippet.
_Why?_ Reading 50 lines costs 1% of the tokens of reading 5000 lines.

---

## 🔄 2. THE FLUSH MANDATE

If the user says: _"You are confused"_ or _"Restart"_:

1.  **Do not argue.**
2.  **Request a Session Flush:** "Please restart the session to clear context."
3.  **Checkpoint:** Ensure `task.md` is updated _before_ the flush.

---

## 📝 3. ARTIFACT DENSITY

- **Reports:** Keep them "Density-Optimized".
- **Format:** Tables > Bullet Points > Prose.
- **Table Rule:** A table row with 4 columns transports 4x more info per line than a sentence.

**Motto:** Compress the Signal. Drop the Noise.
