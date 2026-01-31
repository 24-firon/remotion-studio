# 🎯 Badge 4: Extraction Report – DESIGN SYSTEM & UI (REVISION)

**Version:** 2.0 (Verified via Skill-Check)  
**Analyst:** Sub-Agent (Badge 4)  
**Date:** 2026-01-31

---

## 📊 Statistik & Entscheidungs-Log

| Entscheidung         | Anzahl | Details                                                                            |
| -------------------- | ------ | ---------------------------------------------------------------------------------- |
| ✅ MITNEHMEN         | 17     | Viron-spezifische IP, Design Tokens, 2026 Layout Standards                         |
| ❌ NICHT DUPLIZIEREN | 5      | Bereits in Global Skills (Tailwind Rules, Chart Logic, Font Loading)               |
| ⚠️ REFERENZ          | 3      | Kritische "Verbote", die im Skill existieren, aber hier referenziert werden müssen |

---

## 🛑 SKILL CHECK: KRITISCHE VERBOTE

_Prüfung: Sind diese in den Global Skills enthalten?_

| Regel                       | Quelle (Viron) | Global Skill Check                       | Entscheidung                                          |
| --------------------------- | -------------- | ---------------------------------------- | ----------------------------------------------------- |
| **No Tailwind Transitions** | Briefing 3.3 D | ✅ `rules/tailwind.md` (Zeile 9)         | **REFERENZ** (Im Skill vorhanden, hier nur bestätigt) |
| **No 3rd Party Charts**     | Briefing 3.3 D | ✅ `rules/charts.md` (Zeile 14)          | **REFERENZ** (Im Skill vorhanden, hier nur bestätigt) |
| **No Opacity Typewriter**   | Briefing 3.3 D | ✅ `rules/text-animations.md` (Zeile 16) | **REFERENZ** (Im Skill vorhanden, hier nur bestätigt) |

> [!NOTE]
> Die "Verbote" sind bereits globales Gesetz. Dieser Report fügt keine neuen Regeln hinzu, zitiert sie aber als Kontext für die Design-Implementierung.

---

## 🎨 B: PROJECT_IP (Viron-Spezifische Designs)

_Prüfung: Diese Daten existieren NUR in diesem Projekt._

### IP-1: Metallic Palette (7-Stop Gradient)

- **Skill Check:** ❌ Nicht in Global Skills (Viron Brand)
- **Quelle:** `theme.md`
- **Entscheidung:** ✅ **MITNEHMEN**
- **Inhalt:** Exakte Hex-Werte für `THEME.colors.metallic` (stop1 bis stop7). Essenziell für den "Industrial Silver Look" von Viron.

### IP-2: Gradient Definitionen

- **Skill Check:** ❌ Nicht in Global Skills (Viron Brand)
- **Quelle:** `theme.md`
- **Entscheidung:** ✅ **MITNEHMEN**
- **Inhalt:** `metallic135` (Diagonal) und `metallicRadial`. Konstanten für konsistente Backgrounds.

### IP-3: Typography Stack (Mapped)

- **Skill Check:** `rules/fonts.md` erklärt generic loading, aber NICHT welche Fonts Viron nutzt.
- **Quelle:** `theme.md`
- **Entscheidung:** ✅ **MITNEHMEN** (Die Konkreten Fonts)
- **Inhalt:** Syne (Display), Inter (Sans), IBM Plex Mono (Mono).

### IP-4: 4-Layer Button Architecture

- **Skill Check:** ❌ Nicht in Global Skills (Viron Pattern)
- **Quelle:** `GUIDE_Viron_Button_Stack.md`
- **Entscheidung:** ✅ **MITNEHMEN**
- **Inhalt:** Definiert den "Hero Button" Aufbau: 1. Backdrop (Luma), 2. Glass (Transmission), 3. Effects (Caustics), 4. PostProm

### IP-5: MeshTransmissionMaterial & Caustics Config

- **Skill Check:** ❌ Nicht in Global Skills
- **Quelle:** `viron-button-guide.md`
- **Entscheidung:** ✅ **MITNEHMEN**
- **Inhalt:** Spezifische Tuning-Werte: `transmission={1}`, `roughness={0.05}`, `samples={16}`. Caustics Farbe `#00FFFF`.

### IP-6: Lightformers & Sparkles Setup

- **Skill Check:** ❌ Nicht in Global Skills
- **Quelle:** `viron-button-guide.md`
- **Entscheidung:** ✅ **MITNEHMEN**
- **Inhalt:** Konfiguration der "Studio Lights" (Cyan/Magenta Nieren) und Sparkles/Dust Farbe `#00f5ff`.

### IP-7: Post-Processing "Matrix Look" Recipe

- **Skill Check:** ❌ Nicht in Global Skills
- **Quelle:** `viron-button-guide.md`
- **Entscheidung:** ✅ **MITNEHMEN**
- **Inhalt:** Komposition aus Bloom, Glitch, Noise, ColorCorrection für den spezifischen Viron-Look.

### IP-8: Dependency Matrix (Lamina Forbidden)

- **Skill Check:** ❌ Viron-spezifische Versionierung
- **Quelle:** `viron-button-guide.md`
- **Entscheidung:** ✅ **MITNEHMEN**
- **Inhalt:** Lamina ist ARCHIVED. Ersatz: `three-custom-shader-material`. WebGPU ist INCOMPLETE.

### IP-9: Theme-to-Tailwind Mapping

- **Skill Check:** `rules/tailwind.md` sagt "nutze Tailwind", aber nicht WIE das Theme gemapped wird.
- **Quelle:** `theme.md`
- **Entscheidung:** ✅ **MITNEHMEN**
- **Inhalt:** Logic, wie `THEME.ts` in `tailwind.config.ts` injiziert wird (`metallic-1` etc.).

### IP-10: Shadow Tokens

- **Skill Check:** ❌ Nicht in Global Skills
- **Quelle:** `theme.md`
- **Entscheidung:** ✅ **MITNEHMEN**
- **Inhalt:** Speziell `shadow-metallic` für den gebürsteten Metall-Look.

### IP-11: Chart Colors (Gold Standard)

- **Skill Check:** `rules/charts.md` erklärt Logic, aber keine Farben.
- **Quelle:** `patterns/BarChart.md`
- **Entscheidung:** ✅ **MITNEHMEN** (Nur Farben)
- **Inhalt:** `COLOR_BAR = "#D4AF37"` (Viron Gold) und `COLOR_BG = "#0a0a0a"`. Die Animations-Logik (`spring`) ist redundant mit Skill.

### IP-12: AI Texture Prompts (Luma/Comfy)

- **Skill Check:** ❌ Nicht in Global Skills
- **Quelle:** `viron-button-guide.md`
- **Entscheidung:** ✅ **MITNEHMEN**
- **Inhalt:** Exakte Prompts für "seamless liquid chrome" (ComfyUI) und "cyberpunk alley" (Luma).

---

## 🔵 A: SKILL_UPDATE (Neue 2026 Standards)

_Prüfung: Das sind neue Standards im Viron-Vault, die über die Global Skills hinausgehen._

### Update-1: Container Queries (Layout Standard)

- **Skill Check:** ❌ Nicht in Global Skills (Tailwind-Rule deckt Layout nicht ab)
- **Quelle:** `20-layout-patterns-01...md`
- **Entscheidung:** ✅ **MITNEHMEN**
- **Inhalt:** Viron-Standard: Components müssen self-contained sein (`container-type: inline-size`). Ablösung von Media Queries.

### Update-2: CSS Subgrid (Grid Alignment)

- **Skill Check:** ❌ Nicht in Global Skills
- **Quelle:** `20-layout-patterns-01...md`
- **Entscheidung:** ✅ **MITNEHMEN**
- **Inhalt:** Nutzung von `grid-template-columns: subgrid` für nested Layouts.

### Update-3: Bento Grid Pattern

- **Skill Check:** ❌ Nicht in Global Skills
- **Quelle:** `20-layout-patterns-01...md`
- **Entscheidung:** ✅ **MITNEHMEN**
- **Inhalt:** CSS Pattern für asymmetrische 1x1/2x2 Grids (Dashboard/Portfolio Look).

### Update-4: View Transitions (API Level 2)

- **Skill Check:** ❌ Nicht in Global Skills
- **Quelle:** `20-layout-patterns-02...md`
- **Entscheidung:** ✅ **MITNEHMEN**
- **Inhalt:** Verwendung von `viewTransitionName` für automatische Morphings zwischen States (Web-Only, aber Viron-Standard).

### Update-5: Font Loading Strategy (Specifics)

- **Skill Check:** `rules/fonts.md` ist generisch.
- **Quelle:** `20-layout-patterns-02...md` (implied context) & `theme.md`
- **Entscheidung:** ⚠️ **TEILWEISE** (Nur wenn Viron-spezifisch)
- **Inhalt:** _Eigentlich redundant mit Skill fonts.md, aber die Verknüpfung mit ViewTransitions (kein Layout Shift beim Font Swap) ist relevant._ -> **DROPPED** (Redundant, Fonts.md deckt `waitUntilDone` ab).

---

## ❌ VERWORFEN / DUPLIKATE (Bereits im Skill)

| Fund                        | Original-Quelle             | Abgedeckt durch Skill                | Grund                               |
| --------------------------- | --------------------------- | ------------------------------------ | ----------------------------------- |
| `useCurrentFrame()` Prinzip | `patterns/BarChart.md`      | `rules/tailwind.md`, `remotion-core` | Basis-Gesetz                        |
| `spring()` Animation Logic  | `patterns/BarChart.md`      | `rules/charts.md`                    | Logic ist 1:1 identisch             |
| Font Loading Code           | `theme.md` (implied)        | `rules/fonts.md`                     | Skill zeigt exakten `loadFont` Code |
| GIF Implementation          | (Diverse Referenzen)        | `rules/gifs.md`                      | Standard `<AnimatedImage>` usage    |
| String Slicing Logic        | `patterns/WordHighlight.md` | `rules/text-animations.md`           | Identische Methode                  |

---

## 📝 ZUSAMMENFASSUNG & IMPlIKATIONEN

Der Viron-Stack baut **auf** den Global Skills auf, ersetzt sie aber nicht.

1.  **Fundament:** Global Skills (`tailwind.md`, `charts.md` etc.) liefern die technische Basis (Rendering-Sicherheit).
2.  **Design Layer:** `PROJECT_IP` liefert die visuelle Identität (Farben, Shader, Layouts).
3.  **Future Layer:** `SKILL_UPDATE` (Container Queries) modernisiert die Layout-Architektur für 2026.

**Handlungsanweisung für Badge 5+:**
Nutze Global Skills für "Wie mache ich es technisch sicher?" und diesen Report für "Wie sieht es nach Viron aus?".

---

_Extraction Report v2.0 | Badge 4 Revision | 2026-01-31_
