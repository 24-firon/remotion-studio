🌉 VIRON\_KNOWLEDGE\_BRIDGE (Active Learnings \& Sync)



Status: DYNAMISCH (Wird nach jedem Badge-Lauf aktualisiert)

Letztes Update: 2026-02-03 (Nach Badge 7)

Zweck: Diese Datei enthält alle übergreifenden Erkenntnisse, die technologische Grenzen für andere Badges setzen.

⚡ 1. HARDWARE-CONSTRAINTS (From Badge 7)



Kritisch für: Badge 2 (3D), Badge 3 (FX), Badge 6 (Performance)



&nbsp;   RAM-Limit: Wir operieren mit einem harten Limit von 2GB pro Thread.



&nbsp;   Concurrency-Cap: Absolutes Maximum von 16 parallelen Prozessen (AWS Lambda Limit).



&nbsp;   Implikation: Keine 8K-Texturen oder volumetrische Shader, die pro Instanz mehr als 2GB RAM fressen.



🏗️ 2. REPO-STRUKTUR \& ACLs (From Badge 7)



Kritisch für: Alle Badges



&nbsp;   Department-Pflicht: Das Repo ist in 7 isolierte Bereiche unterteilt.



&nbsp;   Import-Regel: Badge 1-6 dürfen nur aus ENGINE oder AUDIO importieren, niemals „quer“ durch die Departments.



&nbsp;   Speicherort: Alle Ergebnisse dieses Re-Audits landen in .knowledge/mission/.



🎞️ 3. SYNC \& DETERMINISMUS (From Badge 7)



Kritisch für: Badge 1 (Timeline), Badge 6 (Audio)



&nbsp;   Toleranz-Grenze: Maximal 2 Frames Abweichung zwischen Audio und Video sind erlaubt.



&nbsp;   Determinismus-Gebot: Jede Logik, die in Badge 1 (Timeline) entwickelt wird, muss zu 100% reproduzierbar sein (kein Math.random() ohne Seed).



🔄 4. PROZESS-GESETZE (From Badge 8 Prep)



Kritisch für: Alle Badges



&nbsp;   Double-Turn-Lock: Änderungen werden erst vorgeschlagen (Turn 1) und nach User-Go committet (Turn 2).



&nbsp;   No-Lazy-Coding: Platzhalter wie //... führen zum Abbruch der Integration.



🎯 5. CROSS-BADGE TARGETS (Offene Synergien)



&nbsp;   Badge 1 (Timeline): Muss eine Funktion liefern, die prüft, ob die Animation innerhalb des 2GB-RAM-Limits bleibt.



&nbsp;   Badge 4 (Design): Muss sicherstellen, dass die Farben im "Draft-Tier" (CRF 28) nicht wegbrechen.

