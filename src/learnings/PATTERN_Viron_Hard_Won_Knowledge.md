# 💎 PATTERN: Viron - Hard-Won Knowledge (V1-V45)

**Thema:** Wie man von "sieht nach Code aus" zu "sieht nach Million-Dollar-Produktion" kommt.

---

## 🏗️ 1. Die "Geometrie der Wahrheit" (The 360° Rule)

**Fehler (V1-V42):** Wir haben nur Wände hinter den Button gestellt.
**Learning:** Reflexionen schummeln nicht. Wenn die Kamera schwenkt und irgendwo im 3D-Raum eine Lücke ist, sieht man ein hässliches schwarzes Loch im Glas.
**Gesetz:** Szenen müssen **immer** 360° geschlossen sein (Boden, Decke, 4 Wände) oder durch eine **HDRI-Umgebung** komplett umschlossen sein.

## 💡 2. Das Ende der "Taschenlampen" (HDRI over Lights)

**Fehler (V1-V22):** Wir haben versucht, Licht mit `DirectionalLight` und `PointLight` zu setzen.
**Learning:** Manuelle Lichter wirken oft flach und "computiger". HDRIs (High Dynamic Range Images) liefern tausende Lichtquellen gleichzeitig und erzeugen komplexe, natürliche Spiegelungen.
**Gesetz:** Nutze HDRIs für die Grundstimmung und Reflexionen; manuelle Lichter nur noch für gezielte Akzente.

## 📐 3. Polygon-Ehrlichkeit (Smoothness Audit)

**Fehler (V43):** Standard-Werte für Rundungen (z.B. 16 Segmente).
**Learning:** Auf glänzenden Oberflächen sieht man jede Kante. Jede Facette wirkt billig.
**Gesetz:** Für "Cinematic" Oberflächen brauchen wir hohe Segment-Zahlen (z.B. `64` oder `128` bei Capsules). Rechenleistung ist 2026 da – nutze sie für Glätte.

## 🎨 4. Die "Achtzig-Prozent-Grau" Regel

**Fehler (V10-V20):** Zu viel Kontrast, hartes Schwarz, grelles Weiß.
**Learning:** Echte industrielle Eleganz lebt in den Mitteltönen.
**Gesetz:** Vermeide `0.0` (Schwarz) und `1.0` (Weiß). Die Magie passiert bei **80% Grau** (ca. `#cccccc` oder `#333333`). Das lässt den Materialien Raum zum "Atmen" durch Licht.

## 🌪️ 5. Abstraktion vor Realität (V45 Pivot)

**Fehler (V45):** Echte Städte oder Natur in der Spiegelung.
**Learning:** Sobald man ein Haus oder einen Baum im Button sieht, wirkt es wie ein Foto-Fehler. Es lenkt vom Produkt ab.
**Gesetz:** Für Mockups sind **Abstract Studio HDRIs** (Softboxes, Lichtstreifen, Verläufe) immer besser als reale Landschaften.

## 🎞️ 6. Die "Dauer-Drift" Pflicht

**Fehler:** Statische Kamera.
**Learning:** Ein Standbild im Video wirkt wie ein Fehler oder ein abgestürzter Browser.
**Gesetz:** Jede Viron-Szene muss eine subtile Eigenbewegung haben (**Camera Drift, Float, Slow Rotation**). Bewegung = Leben.

## 💻 7. Stack-Disziplin (CSM vs Lamina)

**Fehler:** Veraltete Libraries nutzen.
**Learning:** Das WebGL-Ökosystem ist gnadenlos. Libraries wie `lamina` sterben schnell.
**Gesetz:** Setze auf **Standard-Werkzeuge** (`three-custom-shader-material`) statt auf "Magic-Helper", um zukunftssicher zu bleiben.

---

**Fazit aus 45 Versuchen:**
Wir haben gelernt, dass wir nicht "zeichnen" müssen, sondern eine **physisch korrekte Welt** bauen müssen, in die wir den Button hineinwerfen. Wenn die Welt (Licht/Umgebung) stimmt, sieht der Button automatisch teuer aus.
