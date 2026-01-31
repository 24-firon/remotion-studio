# 🔄 Badge 1: Revision Report – Skill-Check & Migration Decisions

**Version:** 1.0 (Revision)
**Badge ID:** VIRON-2026-B1-REV
**Revision Date:** 2026-01-31
**Analyst:** Sub-Agent (Antigravity)

---

## 📊 Revision Statistik

| Entscheidung          | Anzahl | Details                               |
| --------------------- | ------ | ------------------------------------- |
| **MITNEHMEN**         | 21     | Viron-IP, nicht im Skill dokumentiert |
| **NICHT DUPLIZIEREN** | 2      | Bereits explizit im Skill vorhanden   |

---

## ✅ MITNEHMEN (21 Punkte)

### 1. Virtual Production Studio Paradigma

**Quelle:** `vision.md`
**Skill-Check:** ❌ NICHT im Skill dokumentiert
**Entscheidung:** **MITNEHMEN**

- **Ziel-Location:** `viron-core/vision.md` (behalten)
- **Nutzungsart:** Direktes Übernehmen als Projekt-Philosophie
- **Warum wertvoll:** Viron-spezifische Architektur-Vision. Definiert das "Video as Code" Paradigma. Kein generisches Remotion-Wissen.

---

### 2. Die 5 Säulen der Architektur

**Quelle:** `vision.md`
**Skill-Check:** ❌ NICHT im Skill dokumentiert
**Entscheidung:** **MITNEHMEN**

- **Ziel-Location:** `viron-core/architecture.md` (neues Modul)
- **Nutzungsart:** Strukturelle Referenz für Projekt-Organisation
- **Warum wertvoll:** Viron-spezifisches Layer-Modell (Simulation/Rendering/Orchestration/Camera/Export). Der Skill kennt keine Projekt-Architektur.

---

### 3. Shared Theme.ts Architektur

**Quelle:** `vision.md`
**Skill-Check:** ❌ NICHT im Skill dokumentiert
**Entscheidung:** **MITNEHMEN**

- **Ziel-Location:** `viron-core/theme.md` oder `.knowledge/patterns/`
- **Nutzungsart:** Design-System Pattern für Next.js + Remotion Sync
- **Warum wertvoll:** Viron-spezifisches Pattern für Cross-Platform Design Tokens. Skill deckt nur Remotion ab, nicht Next.js Integration.

---

### 4. Unterschied Traditionell vs. Programmatic Video

**Quelle:** `vision.md`
**Skill-Check:** ❌ NICHT im Skill dokumentiert
**Entscheidung:** **MITNEHMEN**

- **Ziel-Location:** `.knowledge/research/` oder Onboarding-Docs
- **Nutzungsart:** Kontext für neue Team-Mitglieder/Agents
- **Warum wertvoll:** Business-Case Argumentation. Zeigt ROI von Viron-Ansatz. Nicht technisch, aber strategisch wichtig.

---

### 5. Performance-Baseline (Viron-Spezifisch)

**Quelle:** `vision.md`
**Skill-Check:** ❌ NICHT im Skill dokumentiert
**Entscheidung:** **MITNEHMEN**

- **Ziel-Location:** `viron-core/performance.md` oder `specs/`
- **Nutzungsart:** Benchmark für Optimierung und CI/CD Validation
- **Warum wertvoll:** Konkrete Viron-Zielwerte (150-300ms/frame, 1.5-3GB RAM). Skill hat keine Performance-Targets.

---

### 6. Knowledge Router System

**Quelle:** `documentation_manifest.md`
**Skill-Check:** ❌ NICHT im Skill dokumentiert
**Entscheidung:** **MITNEHMEN**

- **Ziel-Location:** `viron-core/documentation_manifest.md` (behalten)
- **Nutzungsart:** Agent-Navigation durch Wissens-Hierarchie
- **Warum wertvoll:** Meta-System für Dokumentation. Existiert nur in Viron.

---

### 7. Scenario-Based Routing

**Quelle:** `documentation_manifest.md`
**Skill-Check:** ❌ NICHT im Skill dokumentiert
**Entscheidung:** **MITNEHMEN**

- **Ziel-Location:** `viron-core/documentation_manifest.md` (behalten)
- **Nutzungsart:** Task-basierte Datei-Ladung für Agents
- **Warum wertvoll:** Viron-spezifische Pfade. Skill hat keine Routing-Logik.

---

### 8. Critical Rule: Viron > Global

**Quelle:** `documentation_manifest.md`
**Skill-Check:** ❌ NICHT im Skill dokumentiert
**Entscheidung:** **MITNEHMEN**

- **Ziel-Location:** `viron-core/` (Root-Level Regel)
- **Nutzungsart:** Governance-Regel für Agent-Verhalten
- **Warum wertvoll:** Die Hierarchie-Regel selbst ist Viron-IP. Definiert Override-Verhalten.

---

### 9. Pipeline-Architektur Diagramm

**Quelle:** `pipeline.md`
**Skill-Check:** ❌ NICHT im Skill dokumentiert
**Entscheidung:** **MITNEHMEN**

- **Ziel-Location:** `viron-core/pipeline.md` (behalten)
- **Nutzungsart:** Referenz für Rendering-Workflow
- **Warum wertvoll:** Visueller Flow von Git→Frame→Encode→Artifact. Skill hat kein Pipeline-Diagramm.

---

### 10. Lambda Rendering Konfiguration

**Quelle:** `pipeline.md`
**Skill-Check:** ❌ NICHT im Skill dokumentiert
**Entscheidung:** **MITNEHMEN**

- **Ziel-Location:** `viron-core/lambda-config.md` oder Skill-Update (rules/lambda.md)
- **Nutzungsart:** Production-Ready Cloud-Konfiguration
- **Warum wertvoll:** Konkrete AWS-optimierte Werte (3009MB für vCPU-Boost). Skill hat keine Lambda-Dokumentation.

---

### 11. Concurrency Berechnungs-Formel

**Quelle:** `pipeline.md`
**Skill-Check:** ❌ NICHT im Skill dokumentiert
**Entscheidung:** **MITNEHMEN**

- **Ziel-Location:** `viron-core/pipeline.md` oder Skill-Update
- **Nutzungsart:** Dynamische Worker-Berechnung
- **Warum wertvoll:** Formel `Math.min(CPUs * 1.5, RAM / 2, 16)` ist Viron-IP. Skill hat keine Concurrency-Logik.

---

### 12. Codec Matrix (Viron-Standard)

**Quelle:** `pipeline.md`
**Skill-Check:** ❌ NICHT im Skill dokumentiert
**Entscheidung:** **MITNEHMEN**

- **Ziel-Location:** `viron-core/specs/codecs.md` oder Skill-Update (rules/codecs.md)
- **Nutzungsart:** Encoding-Standards für verschiedene Use Cases
- **Warum wertvoll:** Konkrete Bitrate/Pixel-Format Werte. Skill hat keine Codec-Spezifikationen.

---

### 13. Render Monitoring & Logging Pattern

**Quelle:** `pipeline.md`
**Skill-Check:** ❌ NICHT im Skill dokumentiert
**Entscheidung:** **MITNEHMEN**

- **Ziel-Location:** `viron-core/pipeline.md` (behalten)
- **Nutzungsart:** Observability für Render-Prozesse
- **Warum wertvoll:** ETA, FPS-Tracking, Exponential Backoff. Skill hat keine Monitoring-Patterns.

---

### 14. GPU-Beschleunigung Config

**Quelle:** `pipeline.md`
**Skill-Check:** ❌ NICHT im Skill dokumentiert
**Entscheidung:** **MITNEHMEN**

- **Ziel-Location:** Skill-Update (rules/performance.md) oder `viron-core/`
- **Nutzungsart:** Headless Chrome GPU-Acceleration
- **Warum wertvoll:** `setChromeMode` + `setChromiumOpenGlRenderer` Flags. Skill hat keine GPU-Konfiguration.

---

### 15. Decision Tree Navigation

**Quelle:** `00-master-workflow-2026-integration.md`
**Skill-Check:** ❌ NICHT im Skill dokumentiert
**Entscheidung:** **MITNEHMEN**

- **Ziel-Location:** `.knowledge/research/` oder Agent-Onboarding
- **Nutzungsart:** Intent→Module Mapping für Agents
- **Warum wertvoll:** 2026 Vault-Recherche. Navigationslogik für komplexe Projekte.

---

### 16. ROI-Metriken

**Quelle:** `00-master-workflow-2026-integration.md`
**Skill-Check:** ❌ NICHT im Skill dokumentiert
**Entscheidung:** **MITNEHMEN**

- **Ziel-Location:** `.knowledge/research/roi.md`
- **Nutzungsart:** Business-Case Dokumentation
- **Warum wertvoll:** 2026 Vault-Recherche. Quantifizierter Wert (85% Zeit-Ersparnis).

---

### 17. Tech-Stack Entscheidungsmatrix

**Quelle:** `00-master-workflow-2026-integration.md`
**Skill-Check:** ❌ NICHT im Skill dokumentiert
**Entscheidung:** **MITNEHMEN**

- **Ziel-Location:** `.knowledge/research/` oder Agent-Routing
- **Nutzungsart:** Technologie-Auswahl basierend auf Requirements
- **Warum wertvoll:** 2026 Vault-Recherche. Cross-Technology Decision Matrix.

---

### 18. Vault 30-Dateien-Struktur

**Quelle:** `00-overview-index-v2-1-complete.md`
**Skill-Check:** ❌ NICHT im Skill dokumentiert
**Entscheidung:** **MITNEHMEN**

- **Ziel-Location:** `.knowledge/index/` oder Manifest
- **Nutzungsart:** Wissens-Landkarte für Navigation
- **Warum wertvoll:** 2026 Vault-Struktur (00er-90er Kategorien). Meta-Index für Agent-Onboarding.

---

### 19. Stufen-Logik für Agenten

**Quelle:** `00-overview-index-v2-1-complete.md`
**Skill-Check:** ❌ NICHT im Skill dokumentiert
**Entscheidung:** **MITNEHMEN**

- **Ziel-Location:** Agent-Onboarding / `viron-core/`
- **Nutzungsart:** Tier-basiertes Lazy Loading für Agents
- **Warum wertvoll:** Viron-spezifische Effizienz-Logik (5/9/On-Demand Dateien).

---

### 22. Zero-Touch Pipeline (Whisper + Auphonic + Remotion)

**Quelle:** `Remotion Setup.md`
**Skill-Check:** ❌ NICHT im Skill dokumentiert
**Entscheidung:** **MITNEHMEN**

- **Ziel-Location:** `viron-core/workflows/` oder Neues Modul
- **Nutzungsart:** End-to-End Automation Pipeline
- **Warum wertvoll:** Viron-spezifische Tool-Kombination (Whisper→Auphonic→Remotion). Skill hat keine Pipeline-Workflows.

---

### 23. Design System Extraction Workflow

**Quelle:** `Remotion Setup.md`
**Skill-Check:** ❌ NICHT im Skill dokumentiert
**Entscheidung:** **MITNEHMEN**

- **Ziel-Location:** `viron-core/workflows/` oder `.knowledge/patterns/`
- **Nutzungsart:** Reverse-Engineering von Websites zu theme.ts
- **Warum wertvoll:** Viron-spezifischer Workflow (URL→Tokens→Showcase). Skill hat keine Extraction-Patterns.

---

## ❌ NICHT DUPLIZIEREN (2 Punkte)

### 20. Der Determinismus-Imperativ

**Quelle:** `10-remotion-basics-01-timeline-und-frames.md`
**Skill-Check:** ✅ EXPLIZIT in `animations.md` dokumentiert

**Skill-Zitat (animations.md, Zeilen 8, 28-29):**

> "All animations MUST be driven by the `useCurrentFrame()` hook."
> "CSS transitions or animations are FORBIDDEN"
> "Tailwind animation class names are FORBIDDEN"

**Entscheidung:** **NICHT DUPLIZIEREN**
**Grund:** Der Skill deckt das Kernprinzip bereits vollständig ab.

---

### 21. Anti-Pattern Tabelle

**Quelle:** `10-remotion-basics-01-timeline-und-frames.md`
**Skill-Check:** ✅ TEILWEISE in `animations.md` dokumentiert

**Skill-Zitat (animations.md, Zeilen 28-29):**

> "CSS transitions or animations are FORBIDDEN - they will not render correctly."
> "Tailwind animation class names are FORBIDDEN - they will not render correctly."

**Entscheidung:** **NICHT DUPLIZIEREN**
**Grund:** Die Kern-Verbote (CSS, Tailwind) sind im Skill. Die erweiterten Anti-Patterns (requestAnimationFrame, setInterval, useEffect) könnten als **Skill-Update Kandidat** betrachtet werden, aber für die Migration selbst ist dies Redundanz.

---

## 📋 Migration Summary

### Empfohlene Ziel-Locations

| Kategorie                   | Anzahl | Ziel                                             |
| --------------------------- | ------ | ------------------------------------------------ |
| **viron-core/** (behalten)  | 12     | Architektur, Pipeline, Theme, Manifest           |
| **.knowledge/research/**    | 4      | ROI, Decision Trees, Tech Matrix, Vault-Struktur |
| **Skill-Update Kandidaten** | 5      | Lambda, GPU, Codecs, Concurrency, Anti-Patterns  |

### Nächste Schritte

1. **Sofort migrieren:** Punkte 1-19, 22-23 in neues Repo übernehmen
2. **Skill-Update prüfen:** Lambda-Config, Codec-Matrix, GPU-Flags könnten globale Rules werden
3. **Nicht migrieren:** Punkte 20-21 (bereits im Skill)

---

**End of Revision Report**
