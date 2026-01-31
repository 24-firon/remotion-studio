# Remotion

To get this working, you just need to install **two things** on your computer:

- **Node.js** – this lets you use the `npx` command
    
    https://nodejs.org/en/download
    
- **Git** – this lets you download tools from GitHub, like `remotion-dev/skills`
    
    https://git-scm.com/install
    
- Once those are installed, **Type this into AntiGravity 👇**
    
    npx create-video@latest
    
    ![image.png](attachment:20a8be5c-a1ec-4f0d-93d0-017e808e6067:image.png)
    
    # 🧰 What This System Can Generate
    
    A single engine for producing **production-grade assets** across video, web, UI, data, and automation.
    
    ---
    
    ## 🎥 Video & Motion Graphics (Remotion)
    
    - Intro / outro animations
    - Explainer videos
    - Product demos
    - Social media video ads
    - Animated infographics
    - Logo reveals
    - Kinetic typography
    - Countdown timers
    - Progress animations
    
    ---
    
    ## 🌐 Web Design & Development
    
    - Landing pages
    - Marketing sites
    - Dashboards
    - Admin panels
    - Portfolio sites
    - E-commerce layouts
    - Blog templates
    - Documentation sites
    - Interactive components
        - Carousels
        - Modals
        - Forms
    
    ---
    
    ## 🧩 UI / UX Assets
    
    - Component libraries
    - Design systems
    - Icon sets (SVG)
    - Loading animations
    - Micro-interactions
    - Navigation patterns
    - Form designs
    - Card layouts
    - Data visualizations
        - Charts
        - Graphs
    
    ---
    
    ## 🎨 Branding & Graphics
    
    - SVG logos & variations
    - Color palettes
    - Typography systems
    - Social media templates
    - Email templates
    - Presentation slides (HTML / React-based)
    
    ---
    
    ## 📊 Data & Visualization
    
    - Interactive charts
        - D3
        - Chart.js
        - Recharts
    - Dashboards
    - Real-time data displays
    - Animated statistics
    - Maps & geo visualizations
    
    ---
    
    ## ⚙️ Automation & Tools
    
    - Browser extensions
    - CLI tools
    - Batch-processing scripts
    - API integrations
    - Workflow automation
    
    ---
    
    ## ✍️ Content
    
    - Technical documentation
    - READMEs
    - API docs
    - Copy suggestions
    
    ---
    
    > Universal Output Layer
    > 
    > 
    > From cinematic video to production dashboards, from brand systems to automation tools—
    > 
    > one pipeline, infinite surface area.
    > 
    
    ---
    
    ---
    
    ---
    
    ---
    
    ---
    
    ![image.png](attachment:59f2c23c-a009-4f62-8043-c6d74ab59be5:image.png)
    
    # 🎬 Workflow 1: Automated Video → Captioned, Broadcast-Grade Output
    
    *A zero-touch pipeline for cutting, cleaning, captioning, and rendering your videos.*
    
    ---
    
    ## 📥 Input
    
    **Video File:**
    
    ```
    [path/to/video.mp4]
    
    ```
    
    ---
    
    ## 🧠 Step 1 — Analyze & Cut
    
    ### 1. Transcribe with Whisper (word-level timestamps)
    
    ```bash
    uvx --from openai-whisper whisper audio.wav \
      --model tiny \
      --output_format json \
      --word_timestamps True
    
    ```
    
    ### 2. Parse the transcript
    
    - Detect:
        - False starts
        - “Take 2” moments
        - Filler mistakes
    - Identify the *clean take*
    - Record precise **start / end timestamps**
    
    ### 3. Trim the video
    
    Use `ffmpeg` with the identified timestamps to cut to the clean take.
    
    ---
    
    ## 🎧 Step 2 — Audio Processing (Auphonic API)
    
    > Purpose: Broadcast-grade, normalized, noise-reduced audio.
    > 
    
    **Auphonic Settings**
    
    - `leveler: true`
    - `normloudness: true` → Target: **16 LUFS**
    - `denoise: true`
    - `denoisemethod: "dynamic"`
    - Output: **AAC – 192kbps**
    
    **Flow**
    
    1. Create a production via:
        
        ```
        https://auphonic.com/api/productions.json
        
        ```
        
    2. Upload the trimmed audio
    3. Start processing
    4. Poll until complete
    5. Download the processed result
    
    > 🔐 Store your API key in an environment variable (not hardcoded).
    > 
    
    ---
    
    ## 🖋️ Step 3 — Remotion Caption Engine
    
    Create a React component with the following caption system:
    
    ### Typography
    
    - Font: **Inter** (via `@remotion/google-fonts`)
    - Size: **72px**
    - Weight: **800**
    - Letter spacing: **0.02em**
    - Word gap: **24px**
    
    ### Chunking
    
    - Display **4 words per chunk**
    
    ### Styling Logic
    
    | Word State | Style |
    | --- | --- |
    | **Current** | `#BFF549` (neon green) + glow `0 0 40px rgba(191,245,73,0.8)` + `scale(1.1)` |
    | **Past** | `#FFFFFF` |
    | **Future** | `rgba(255,255,255,0.5)` |
    
    Additional effects:
    
    - Text shadow: `0 4px 20px rgba(0,0,0,0.8)`
    - Position: **Bottom, 120px**
    - Gradient overlay:
        - Height: **40%**
        - Fade: `transparent → rgba(0,0,0,0.85)`
    
    ### Audio
    
    - Mute original video
    - Overlay **Auphonic-processed** audio
    
    ### Cleanup Rules
    
    - Remove trailing punctuation (`.`, `,`)
    - Preserve contractions (`don't`, `it's`, etc.)
    
    ---
    
    ## 🖥️ Step 4 — Render
    
    ```bash
    npx remotion render [CompositionName] output.mp4 --codec h264
    
    ```
    
    - Output location: **Desktop**
    
    ---
    
    ## 🗂️ Project Structure
    
    ```
    /project-root
      /public
        video.mp4
        audio.aac
      Root.tsx
      index.ts
    
    ```
    
    **Dependencies**
    
    - `remotion`
    - `@remotion/google-fonts`
    
    `Root.tsx` registers the composition and wires everything together.
    
    ---
    
    ## ⚡ Execution Rules
    
    - Auto-accept all permissions
    - No prompts
    - No confirmations
    - Just execute
    
    This is a **hands-off, deterministic pipeline** from raw footage → cinematic, captioned MP4.
    
    ---
    
    ---
    
    ---
    
    ---
    
    ---
    
    ![image.png](attachment:b83774f1-cb05-45c1-a98c-dc3c7dcf6f0d:image.png)
    
    # 🧪 Workflow 2: Website → Design System → Animated Remotion Showcase
    
    Reverse-engineer a website’s **design system**, extract clean **design tokens**, then generate a **polished 15–16s Remotion video** that showcases the system.
    
    ---
    
    ## 🔗 Website
    
    **URL:**
    
    https://glaido.com
    
    ---
    
    ## 1️⃣ Analyze & Extract Design System
    
    Fetch the website and extract the following **design tokens**:
    
    ### Typography
    
    - Font families: **primary / secondary / mono**
    - Heading styles: **H1–H6** (size, weight, line-height)
    - Body styles: paragraph size, line-height, spacing
    - Any custom letter spacing / text transforms (uppercase, tracking, etc.)
    
    ### Colors
    
    - Primary brand color(s)
    - Secondary / accent colors
    - Background colors (light/dark mode if present)
    - Text colors: headings / body / muted
    - Borders / dividers
    - Gradients (definitions + usage)
    
    ### Icons
    
    - Icon library used (Lucide, Heroicons, custom SVG, etc.)
    - Default icon size + stroke width
    - Key brand-representative icons
    
    ### Logo
    
    - Extract or describe the logo
    - Variants (wordmark, icon-only, stacked, etc.)
    - Colors + dimensions / proportions
    
    ### Layout & Components
    
    - Border radius tokens (cards, buttons, inputs)
    - Shadow styles (box-shadow tokens)
    - Spacing scale (padding/margin patterns)
    - Container widths / max-widths
    - Common patterns (cards, sections, nav, buttons, inputs)
    
    ---
    
    ## 2️⃣ Create Animated Remotion Showcase
    
    Build a Remotion composition:
    
    - **1920 × 1080**
    - **30fps**
    - **Length:** ~15–16 seconds
    
    ### Animation Style Rules
    
    - Use spring-like motion (Remotion interpolate + easing)
    - Stagger items for cascade effects
    - Keep it minimal:
        - Scale: **0.95 → 1**
        - Opacity: **0 → 1**
    - Clean, professional, no gimmicks
    
    ---
    
    ## 3️⃣ Generate Files
    
    Create the following:
    
    ### `src/DesignShowcase.tsx`
    
    - Main composition
    - Uses extracted tokens to render the full 15–16s showcase
    
    ### `src/theme.ts`
    
    - Extracted design tokens as **TypeScript constants**
    - Document extracted values with comments (where each value came from)
    
    ---
    
    ## ✅ Output
    
    Render to Desktop as:
    [website-name]-design-system.mp4
    reveal system video)
    
    ⚡ Execution Rules
    Auto-accept all permissions
    
    No confirmations
    
    Execute immediately
    
    ---
    
    ---
    
    ---
    
    ---
    
    ---
    
    ![image.png](attachment:44419d95-390c-4d92-800d-7ad144713f36:image.png)
    
    # 📊 Workflow 3:  Website-Styled Interactive Dashboard UI (Mock Data First)
    
    Build an **interactive dashboard UI** that matches the **visual language** of:
    [INSERT WEBSITE URL]
    
    We’ll connect Supabase later. For now: **design system extraction + UI build + real interactivity + mock data**.
    
    ---
    
    ## 🎯 Goal
    
    Deliver a **fully functional, responsive dashboard UI** that:
    
    - Looks like the website (fonts, colors, radius, shadows, spacing)
    - Feels premium (hover/active states, skeletons, modals, charts)
    - Is architected for an easy Supabase swap later
    
    ---
    
    ## 1️⃣ Extract Design System from Website
    
    Fetch and analyze:
    [WEBSITE URL]
    
    Extract and formalize the design tokens:
    
    ### Typography
    
    - Font families (headings / body / mono)
    - Sizes, weights, line-heights
    - Letter-spacing + text transforms
    
    ### Colors
    
    - Primary / secondary brand colors
    - Background colors
    - Text colors (primary / secondary / muted)
    - Accent & status colors (success / warning / error / info)
    - Border colors
    - Gradients (definitions + usage)
    
    ### Components
    
    - Border radius values
    - Shadow tokens (box-shadow)
    - Button styles (primary / secondary / ghost / destructive)
    - Input styles (default / focus / error)
    - Card styles (padding, border, surface elevation)
    
    ### Spacing & Layout
    
    - Spacing scale (4/8/12/16/24/etc. or derived)
    - Container widths
    - Grid patterns (columns, gaps, breakpoints)
    
    ✅ Save everything in:
    src/lib/theme.ts
    
    Rules:
    
    - Use TypeScript constants
    - Include comments documenting what each token maps to on the site
    - Apply tokens everywhere (no random hex codes or arbitrary radii)
    
    ---
    
    ## 2️⃣ Build Dashboard Using Extracted Style
    
    ### Layout Structure
    
    **Header**
    
    - Logo
    - Search input
    - Notifications icon (badge count)
    - User avatar menu
    - Dark mode toggle
    
    **Sidebar**
    
    - Nav items with icons
    - Collapsible sidebar
    - Active / hover states
    - Section grouping
    
    **Main**
    
    - Breadcrumbs
    - Page title
    - Action buttons (primary + secondary)
    - Tabs or segmented control where relevant
    
    ---
    
    ## 🧩 Core Components (Match Website Style Exactly)
    
    ### Metric Cards
    
    - 4-card grid
    - Each card includes:
        - Icon
        - Label
        - Value
        - Change indicator (▲/▼ + %)
    - Match website: radius, shadow, padding, borders, surface color
    
    ### Data Table
    
    Must include:
    
    - Sortable columns
    - Search + filter controls
    - Status badges (pill/badge style matching the site)
    - Row actions (kebab menu or inline buttons)
    - Pagination
    - Loading skeletons
    - Empty state design
    
    ### Charts (Recharts)
    
    Include:
    
    - Line / area chart
    - Bar chart
    - Donut chart
    
    Style to match the site:
    
    - Axis labels
    - Grid lines
    - Tooltips
    - Legends
    - Spacing + typography
    
    ### Modals
    
    Create:
    
    - Create / edit form modal
    - Delete confirmation modal
    
    Match website:
    
    - Overlay style
    - Modal radius & shadow
    - Form styling
    - Button hierarchy
    
    ---
    
    ## 3️⃣ Interactive States (Non-Negotiable)
    
    Every interactive element must include:
    
    - Default / Hover / Active / Disabled
    - Loading states (skeletons consistent with theme)
    - Empty states (helpful + styled)
    - Error states (inline + toast if applicable)
    
    ---
    
    ## 4️⃣ Mock Data Architecture (Supabase-Ready)
    
    Use a hook that mirrors a Supabase pattern:
    
    ```tsx
    // Ready for Supabase swap later
    const { data, loading, error } = useMockData('users')
    Mock data must include:
    
    Users: name, email, avatar, status, createdAt
    
    Metrics: revenue, count, percentage changes
    
    Chart data:
    
    Time series
    
    Category breakdowns
    
    Status distribution
    
    5️⃣ File Structure (Required)
    src/
    ├── lib/
    │   └── theme.ts              # Extracted from [website]
    ├── components/
    │   ├── Layout/
    │   ├── Cards/
    │   ├── DataTable/
    │   ├── Charts/
    │   ├── Modals/
    │   └── ui/                   # Buttons, inputs, badges, toggles, etc.
    ├── hooks/
    │   └── useMockData.ts        # Swap for Supabase later
    ├── data/
    │   └── mockData.ts
    └── pages/
        ├── Dashboard.tsx
        ├── Users.tsx
        └── Settings.tsx
    ✅ Output Requirements
    Deliver:
    
    Fully functional dashboard UI (mock data)
    
    Responsive: mobile / tablet / desktop
    
    Theme-driven styling using theme.ts tokens everywhere
    
    Components that match [website] visual language
    
    Polished UX: states, modals, charts, table interactions
    
    ⚡ Execution Rules
    Auto-accept all permissions
    
    No questions
    
    Build it fully
    
    ```
    

## Turn Video editing into a Skill

Hey dude, what I'd like you to do is create a system and a standard operating procedure to replicate this. So if I give you future videos that you'll be able to do the exact same style and be extremely specific when I trigger this, please. I'd like to do is create for me a skill or this that I can activate that will then replete the process.