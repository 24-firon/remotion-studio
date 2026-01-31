# 📝 PROJECT LEARNING: Badge 2 (3D Physics, Lighting & Geometry)

**Date:** 2026-01-31 (V3.0 Auditor Edition)
**Badge:** 2
**Report Baseline:** `EXTRACTION_REPORT_BADGE_2_REVISION.md`

## 🎯 Strategische Erkenntnisse

- **Determinismus in 3D:** Die Nutzung von `Mulberry32` (Seeded Random) in Instanced Meshes ist ein kritisches Learning für den Remotion-Export (kein Flackern).
- **Viron-Laws (IP-B):** "Drift-Pflicht" und "80% Grey" wurden als projekt-definierende Gesetze identifiziert, die über Three.js Basics hinausgehen.

## 🛠️ Prozess-Upgrades (Auditor V3.0)

- **Problem-Lösungs-Gebot:** Wir haben gelernt, dass das Erkennen einer suboptimalen `useFrame` Nutzung nicht reicht – wir müssen das konkrete Konversions-Pattern (useCurrentFrame + State) mit-extrahieren.
- **File-Consistency:** 7 Redundanzen in Mapbox & ThreeCanvas wurden erst durch einen strikten Zeilen-Abgleich gegen `rules/3d.md` und `rules/maps.md` entdeckt.

## 📊 Extraktions-Effizienz

- **MITNEHMEN:** 21 Items (PBR-Configs, GLTF-Optimierung, Draco).
- **DROP:** 7 Items (Mapbox-Basics, Canvas-Boilerplate).
