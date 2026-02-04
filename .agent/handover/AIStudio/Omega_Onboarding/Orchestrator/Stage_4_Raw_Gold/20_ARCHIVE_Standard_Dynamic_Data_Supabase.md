# ARCHIVE: Supabase Dynamic Video (MCP Integration) Standard
## [Jack Roberts / AntiGravity Setup Analysis]

**Status:** REFERENCE ARCHIVE | ARCHITECTURE STANDARD  
**Erstellt:** 2026-01-29  
**Quelle:** `Remotion-Setup.md.txt` (Jack Roberts) + MCP Docs  
**Kategorie:** Database Integration | Real-Time Video | Agentic Workflows  
**Relevanz für Viron:** ⭐⭐⭐⭐⭐ CRITICAL

---

## 🎯 Mission Statement

Videos sind normalerweise **statisch**. Du schreibst Code, renderst, fertig.

**Jack Roberts' Vision:** Videos sind **Funktionen der Datenbank**.

Wenn sich ein Wert in Supabase ändert → Video rendert sich neu → neuer Output.

Das ermöglicht **Infinite Content Generation**. Ein Video-Template, tausende Variationen. Jede mit Live-Daten.

---

## 1️⃣ Das Konzept: "Video als Database Query"

### Der Workflow

```
Supabase Table: analytics
├─ revenue: $12,450
├─ users: 1,234
├─ growth: +23%

    ↓ (MCP Protocol)
    
Claude has Supabase Access
    ↓
Read values from database
    ↓
Inject into Remotion Variables
    ↓
Render Video
    ↓
Output: revenue-report_2026-01-29.mp4
```

### Die "MCP" Magie

**MCP = Model Context Protocol**

Das ist die Brücke, die Claude **direkten Zugriff** auf die Supabase-Datenbank gibt.

Claude kann jetzt:
- Daten lesen (`SELECT * FROM analytics`)
- Daten transformieren (z.B. `revenue / 1000` für tausend-Beträge)
- Komplexe Queries schreiben (JOINs, Aggregationen)
- Automatisch entscheiden, welche Daten im Video erscheinen

---

## 2️⃣ Schritt 1: Supabase Setup

### Die Tabelle

```sql
CREATE TABLE analytics (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  created_at TIMESTAMP DEFAULT NOW(),
  revenue DECIMAL(10, 2),
  users_count INT,
  growth_percent DECIMAL(5, 2),
  active_sessions INT,
  conversion_rate DECIMAL(5, 2)
);

INSERT INTO analytics (revenue, users_count, growth_percent, active_sessions, conversion_rate)
VALUES (12450.50, 1234, 23.5, 456, 3.2);
```

### Supabase Connection

```typescript
// supabaseClient.ts
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
```

---

## 3️⃣ Schritt 2: MCP Server Setup (Claude Gets Access)

### Was ist MCP?

MCP (Model Context Protocol) erlaubt **LLM-Servern**, externe Tools/APIs zu nutzen.

Claude kann durch MCP:
- Datenbanken abfragen
- Dateien schreiben
- APIs aufrufen
- Alles, was du definierst

### MCP Server für Supabase (Python)

```python
import mcp.server.stdio
import mcp.types as types
from mcp.server import Server
import asyncio
from supabase import create_client, Client

# Initialize Supabase
supabase_url = os.environ["SUPABASE_URL"]
supabase_key = os.environ["SUPABASE_ANON_KEY"]
supabase: Client = create_client(supabase_url, supabase_key)

# Create MCP Server
server = Server("supabase-mcp")

@server.list_tools()
async def list_tools():
    """Define what Claude can do."""
    return [
        types.Tool(
            name="get_analytics",
            description="Fetch latest analytics from Supabase",
            inputSchema={
                "type": "object",
                "properties": {
                    "limit": {
                        "type": "integer",
                        "description": "Number of rows to fetch (default: 1)"
                    }
                }
            }
        ),
        types.Tool(
            name="get_user_stats",
            description="Get user statistics",
            inputSchema={"type": "object", "properties": {}}
        ),
        types.Tool(
            name="write_video_log",
            description="Log video render info",
            inputSchema={
                "type": "object",
                "properties": {
                    "video_name": {"type": "string"},
                    "data_used": {"type": "object"}
                }
            }
        )
    ]

@server.call_tool()
async def call_tool(name: str, arguments: dict):
    """Handle tool calls from Claude."""
    
    if name == "get_analytics":
        limit = arguments.get("limit", 1)
        response = supabase.table("analytics").select("*").limit(limit).execute()
        return [{"type": "text", "text": str(response.data)}]
    
    elif name == "get_user_stats":
        response = supabase.table("analytics").select("users_count, growth_percent").limit(1).execute()
        return [{"type": "text", "text": str(response.data)}]
    
    elif name == "write_video_log":
        # Insert into logs table
        log_data = {
            "video_name": arguments.get("video_name"),
            "data_snapshot": arguments.get("data_used"),
            "timestamp": "now()"
        }
        supabase.table("video_renders").insert(log_data).execute()
        return [{"type": "text", "text": f"Logged: {arguments.get('video_name')}"}]

async def main():
    async with mcp.server.stdio.stdio_server() as (read_stream, write_stream):
        await server.run(read_stream, write_stream, types.InitializationOptions())

if __name__ == "__main__":
    asyncio.run(main())
```

---

## 4️⃣ Schritt 3: Claude nutzt MCP

### Der Prompt an Claude

```python
def generate_video_with_live_data(video_template: str) -> str:
    """
    Claude liest Supabase via MCP, schreibt Remotion Code.
    """
    
    prompt = f"""
Du hast Zugriff auf eine Supabase-Datenbank via MCP Tools.

Deine Aufgabe:
1. Nutze "get_analytics" Tool, um die neuesten Zahlen zu holen
2. Schreibe Remotion React Code für ein Video-Template
3. Injiziere die Live-Daten in die Komponenten
4. Schreibe die Render-Befehle auf

Template:
{video_template}

Gib mir:
- Die React Komponente (mit echten Zahlen, nicht Mock)
- Den npx remotion render Befehl
- Ein Video-Filename mit Timestamp
"""
    
    response = client.messages.create(
        model="claude-3-5-sonnet-20241022",
        max_tokens=4000,
        tools=[
            # MCP Tools werden automatisch hier eingefügt
        ],
        messages=[
            {"role": "user", "content": prompt}
        ]
    )
    
    return response
```

### Claude's Output (Beispiel)

```tsx
// I fetched analytics data via MCP
// Current data:
// - revenue: $12,450
// - users: 1,234
// - growth: +23.5%

import React from 'react';
import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate } from 'remotion';

export const AnalyticsVideo: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  
  // Live data from Supabase (via MCP)
  const metrics = {
    revenue: 12450,
    users: 1234,
    growth: 23.5
  };
  
  return (
    <AbsoluteFill style={{ backgroundColor: '#000' }}>
      <div style={{ color: '#fff', fontSize: 64, textAlign: 'center', marginTop: 100 }}>
        💰 Revenue: ${metrics.revenue.toLocaleString()}
      </div>
      <div style={{ color: '#0f0', fontSize: 48, textAlign: 'center', marginTop: 50 }}>
        📈 Growth: +{metrics.growth}%
      </div>
      <div style={{ color: '#0ff', fontSize: 48, textAlign: 'center', marginTop: 50 }}>
        👥 Users: {metrics.users.toLocaleString()}
      </div>
    </AbsoluteFill>
  );
};
```

---

## 5️⃣ Schritt 4: Mock-First Architecture (Für Dev)

Nicht jedes Mal braucht der Developer die Datenbank. Deshalb: **Mock-Mode**.

### Die Hook

```typescript
// useAnalytics.ts
import { useState, useEffect } from 'react';
import { supabase } from './supabaseClient';

interface Analytics {
  revenue: number;
  users_count: number;
  growth_percent: number;
}

const MOCK_DATA: Analytics = {
  revenue: 12450,
  users_count: 1234,
  growth_percent: 23.5
};

export const useAnalytics = () => {
  const [data, setData] = useState<Analytics>(MOCK_DATA);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    const fetchData = async () => {
      // Toggle between Mock and Real
      if (process.env.NEXT_PUBLIC_USE_MOCK === 'true') {
        setData(MOCK_DATA);
        return;
      }
      
      setLoading(true);
      try {
        const response = await supabase
          .from('analytics')
          .select('*')
          .limit(1)
          .single();
        
        setData(response.data);
      } catch (err) {
        setError(err.message);
        setData(MOCK_DATA); // Fallback to Mock
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, []);
  
  return { data, loading, error };
};
```

### In Remotion verwenden

```tsx
export const DashboardVideo: React.FC = () => {
  const { data } = useAnalytics();
  
  return (
    <AbsoluteFill>
      <div style={{ fontSize: 64 }}>
        Revenue: ${data.revenue}
      </div>
    </AbsoluteFill>
  );
};
```

---

## 6️⃣ Schritt 5: Automation (Scheduled Rendering)

### Cron Job (Render alle 24h)

```python
# render_schedule.py
import schedule
import time
from datetime import datetime

def render_daily_report():
    """Render today's analytics video."""
    
    print(f"🎬 Rendering daily report at {datetime.now()}")
    
    # Fetch latest data
    data = get_latest_analytics()
    
    # Render video
    subprocess.run([
        "npx", "remotion", "render",
        "AnalyticsVideo",
        f"daily-report-{datetime.now().date()}.mp4"
    ], check=True)
    
    # Log it
    log_to_supabase(f"daily-report-{datetime.now().date()}.mp4", data)
    
    print("✅ Done!")

# Schedule
schedule.every().day.at("09:00").do(render_daily_report)

while True:
    schedule.run_pending()
    time.sleep(60)
```

---

## 7️⃣ Zero-Touch Execution

### Wann automatisch rendern?

```python
def should_auto_render(last_render_time: datetime, data_changed: bool) -> bool:
    """
    Entscheidet, ob wir neu rendern sollen.
    """
    
    hours_since_last = (datetime.now() - last_render_time).total_seconds() / 3600
    
    # ✅ AUTO-RENDER
    if hours_since_last > 24 or data_changed:
        return True
    
    # ❌ SKIP
    return False
```

---

## 8️⃣ Integration in Viron System

**Diese Datei sollte zu:**
```
skills/viron-system/rules/supabase-dynamic-video.md
```

**Der Agent triggert diese Regel wenn:**
1. User sagt "Render with live data"
2. Supabase credentials vorhanden
3. MCP Server läuft

**Abhängigkeiten:**
- ✅ Supabase Account + Datenbank
- ✅ MCP Server (Python)
- ✅ Claude API mit MCP support
- ✅ Remotion

---

**END OF DATEI 20**

Status: ✅ READY FOR DOWNLOAD | Nächste: Datei 21 (Agent Execution Philosophy)
