# Dynamic Data: Supabase + MCP Real-Time Rendering

> **Source:** [20_ARCHIVE_Standard_Dynamic_Data_Supabase.md](file:///C:/Viron/90_VAULT/NEW%20SUFF/Remotion/20_ARCHIVE_Standard_Dynamic_Data_Supabase.md) (10.6 KB)

---

## Mission Statement

Enable "Zero-Touch Video": Database change → Video re-renders automatically.

---

## Architecture

```
Supabase DB → Realtime Subscription → MCP Server → Remotion Lambda → CDN
```

---

## Workflow

1. User updates data in Supabase (e.g., product price)
2. Supabase Realtime triggers webhook
3. MCP Server receives change event
4. MCP calls Remotion Lambda with new props
5. Lambda renders updated video
6. Video uploaded to CDN, old version invalidated

---

## Zero-Touch Execution

```typescript
// MCP Tool Definition
const renderVideoTool = {
  name: "render_dynamic_video",
  description: "Render video with live data from Supabase",
  parameters: {
    compositionId: { type: "string" },
    dataQuery: { type: "string" }, // SQL query for Supabase
  },
  execute: async ({ compositionId, dataQuery }) => {
    const data = await supabase.rpc("execute_query", { query: dataQuery });
    return remotion.renderMedia({ compositionId, inputProps: data });
  },
};
```

---

## Rules

- ✅ Use parameterized queries (no SQL injection)
- ✅ Validate data schema before render
- ✅ Implement render queue (avoid race conditions)
- ❌ NEVER expose Supabase service key in client
