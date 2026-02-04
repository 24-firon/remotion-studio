

🏛️ TEIL 1: DAS GESETZBUCH (The Universal Context Kit)



Status: MANDATORY KNOWLEDGE

Zweck: Diese 15 Dateien definieren die physikalische, rechtliche und prozessuale Realität des Viron-Systems. Sie sind nicht verhandelbar. Jeder Agent muss sie kennen, um im System zu überleben.

1.1 .agent/AGENTS.md (Der Master Router)



Dies ist der Einstiegspunkt für jede Intelligenz im System.



&nbsp;   Funktion: Es ist eine Routing-Tabelle. Wenn ein Agent "aufwacht", schaut er hier rein, um zu wissen, wer er ist und was er tun soll.



&nbsp;   Die Logik: Es definiert Szenarien.



&nbsp;       Szenario "Code schreiben": Lade RULES\_TECHNICAL.md.



&nbsp;       Szenario "Release": Lade RULES\_WORKFLOW.md.



&nbsp;       Szenario "Design": Lade THE\_VIRON\_AESTHETIC\_MANIFESTO.md.



&nbsp;   Implikation: Ein Agent ohne diese Datei ist blind. Er weiß nicht, welche Regeln für seinen aktuellen Task gelten.



1.2 .agent/RULES\_CORE.md (Das Grundgesetz)



Hier stehen die Regeln, deren Verletzung zum sofortigen Systemabbruch führt.



&nbsp;   The No-CSS Law: CSS-Animationen (@keyframes, transition) sind verboten. Remotion rendert Frames. CSS rendert Zeit. Das ist inkompatibel. Wir nutzen nur spring() und interpolate().



&nbsp;   The Scope-Lock: Ein Agent darf niemals das Repository verlassen (cd ..). Er darf nicht im Internet suchen (außer explizit erlaubt).



&nbsp;   The STOP-Signal: Wenn der User "STOP" sagt, friert der Agent ein. Er versucht nicht, den Fehler zu beheben. Er wartet. Panik-Fixes zerstören mehr, als sie retten.



1.3 .agent/RULES\_WORKFLOW.md (Das Prozess-Gesetz)



Hier wird geregelt, wie Arbeitsschritte sicher durchgeführt werden.



&nbsp;   The Double-Turn-Lock: Dies ist die wichtigste Regel für Git. Ein Agent darf niemals in derselben Antwort eine Datei ändern (write\_to\_file) und sie committen (git commit). Warum? Weil der User keine Chance hat, den Code zu prüfen. Wenn der Code fehlerhaft ist, ist der Commit "verbrannt".



&nbsp;       Korrekt: Turn 1: Datei ändern -> User: "OK" -> Turn 2: Commit.



&nbsp;   Branching Strategy: Wir nutzen feat/ für Features, fix/ für Bugs. Wir pushen nie direkt auf main.



1.4 .agent/RULES\_TECHNICAL.md (Das Hardware-Gesetz)



Hier trifft Software auf Physik.



&nbsp;   The RAM/2 Formula: Node.js und Chrome Headless sind speicherhungrig. Wir dürfen niemals mehr als 50% des verfügbaren RAMs für Render-Prozesse nutzen. Die Formel Math.min(CPU \* 1.5, RAM / 2GB, 16) ist Gesetz. Sie verhindert Abstürze.



&nbsp;   The 80% Grey Rule: Im Design ist reines Schwarz (#000000) und reines Weiß (#FFFFFF) verboten. Es wirkt künstlich. Wir nutzen #202020 und #F0F0F0, um Raum für Licht und Schatten zu lassen.



1.5 .agent/RULES\_MIGRATION\_GUIDE.md (Die Historie)



Das Gedächtnis der Ordnung.



&nbsp;   Funktion: Es erklärt, warum Dateien dort liegen, wo sie liegen. Warum ist audio.md in specs/ und nicht in guides/? Weil es eine Spezifikation ist, keine Anleitung.



&nbsp;   Zweck: Verhindert, dass Agenten alte Ordnerstrukturen halluzinieren oder Dateien an den falschen Ort legen.



1.6 viron-core/vision.md (Die Philosophie)



Das "Warum".



&nbsp;   Kern-Aussage: "Video as Code". Wir sind keine Cutter, wir sind Entwickler. Ein Video ist ein kompiliertes Artefakt, genau wie eine .exe Datei.



&nbsp;   Implikation: Wir arbeiten mit Versionierung, Tests und CI/CD. Wir klicken nicht in einer GUI herum.



1.7 THE\_VIRON\_AESTHETIC\_MANIFESTO.md (Die DNA)



Der visuelle Fingerabdruck.



&nbsp;   Stil: "Industrial Monolith". Schwere, metallische Objekte. Glas. Licht. Keine "verspielten" Cartoons.



&nbsp;   Physik: Dinge erscheinen nicht einfach. Sie haben Masse. Sie verdrängen Luft. Animationen müssen mass, friction und tension haben.



1.8 src/PROJECT\_RULES\_LIGHTING.md (Die Licht-Regel)



Die technische Umsetzung der Ästhetik.



&nbsp;   Beleuchtung: Wir nutzen HDRI (High Dynamic Range Images) für realistische Reflexionen. Manuelle Lichtquellen (pointLight) sind nur Akzente.



&nbsp;   Schatten: Schatten sind weich (soft shadows), niemals hart.



1.9 .agent/handover/task.md (Der Status)



Das Kurzzeitgedächtnis.



&nbsp;   Inhalt: Eine Checkliste aller offenen und erledigten Aufgaben.



&nbsp;   Regel: Bevor ein Agent anfängt, muss er hier prüfen: "Wurde das schon gemacht?". Wenn ja, stoppt er. Wenn nein, markiert er es als \[IN PROGRESS].



1.10 .agent/handover/implementation\_plan.md (Der Plan)



Das Langzeitgedächtnis.



&nbsp;   Inhalt: Die 6 Phasen der Viron-Mission. Von der Architektur (Phase 1) bis zur Skalierung (Phase 6).



&nbsp;   Zweck: Hält den Agenten auf Kurs. Verhindert, dass er an Phase 6 arbeitet, wenn Phase 2 noch nicht fertig ist.



1.11 VIRON\_STUDIO\_INDEX.md (Das Inhaltsverzeichnis)



Die Karte.



&nbsp;   Inhalt: Eine Liste aller ~132 Dateien im Repo mit Pfad und Beschreibung.



&nbsp;   Zweck: Verhindert "File Not Found" Fehler. Der Agent weiß genau, wo er suchen muss.



1.12 .agent/handover/SUBAGENT\_BRIEFING\_TEMPLATE\_V8.0.md (Das Werkzeug)



Die Schablone.



&nbsp;   Inhalt: Die Struktur, die jeder Report haben muss ("THE X" Nomenklatur, Statistik-Tabelle, Beweis-Pflicht).



&nbsp;   Regel: Ein Report, der nicht diesem Template folgt, wird automatisch abgelehnt.



1.13 ORCHESTRATOR\_SELF\_AUDIT\_PROTOCOL.md (Die Kontrolle)



Das Gewissen.



&nbsp;   Inhalt: Eine Checkliste, die der Agent selbst durchlaufen muss, bevor er sagt "Ich bin fertig".



&nbsp;   Fragen: "Habe ich alle Dateien gelesen?", "Habe ich Code abgekürzt?", "Habe ich die Quellen zitiert?".



1.14 remotion-core/SKILL.md (Der Filter)



Die Referenz.



&nbsp;   Inhalt: Das Standard-Wissen über Remotion (wie es in der offiziellen Doku steht).



&nbsp;   Funktion: Alles, was HIER steht, ist redundant. Wir wollen es nicht in unseren Reports haben. Wir wollen nur das Delta (den Unterschied).



1.15 Remotion Recherche/00-master-workflow-2026-integration.md (Die Logik)



Die Verbindung.



&nbsp;   Inhalt: Entscheidungsbäume. "Wann nutze ich WebGL? Wann nutze ich Video?".



&nbsp;   Zweck: Hilft dem Agenten, die richtige Technologie für das richtige Problem zu wählen.


🧠 TEIL 2: DIE NEUE WAHRHEIT (Bridge \& Codex)



Status: ACTIVE INTELLIGENCE

Zweck: Diese Dateien sind keine statischen Regeln, sondern dynamische Speicher, die mit jedem Badge-Lauf wachsen. Sie verhindern, dass Agenten isoliert arbeiten und Fehler wiederholen.

2.1 VIRON\_KNOWLEDGE\_BRIDGE.md (Version 3.2)



Dies ist das wichtigste Dokument für die Synchronisation der Agenten. Es ist die Brücke, über die Wissen von einem Badge zum nächsten fließt.

Die Funktion



In einem System mit getrennten Agenten (Tabs) weiß der "Audio-Agent" nicht, was der "Infrastruktur-Agent" entschieden hat. Die Bridge löst das.



&nbsp;   Wenn Badge 7 entscheidet: "Wir haben nur 2GB RAM", schreibt es das in die Bridge.



&nbsp;   Wenn Badge 6 startet, liest er die Bridge und weiß: "Aha, ich darf keine speicherintensiven Audio-Analysen machen."



Der Inhalt (Aktueller Stand nach Badge 7 \& 1)



A. INFRASTRUKTUR (Die Grenzen der Physik)



&nbsp;   RAM-Limit: Wir haben ein hartes Limit von 2GB pro Thread. Das ist nicht verhandelbar. Jede Komponente, die mehr braucht, ist ein Bug.



&nbsp;       Warum: AWS Lambda Instanzen mit 4 vCPUs haben oft nur 3GB RAM. Wenn wir 16 Threads starten, crasht das System sofort (OOM).



&nbsp;   Concurrency-Cap: Wir starten maximal 16 parallele Prozesse.



&nbsp;       Warum: Mehr Prozesse führen zu "Diminishing Returns". Der Overhead für das Starten von Node.js und Chrome frisst den Geschwindigkeitsvorteil auf. Außerdem drohen I/O-Engpässe beim Schreiben der Video-Chunks.



&nbsp;   Cloud Tiers: Wir rendern nicht immer in höchster Qualität.



&nbsp;       Draft ($0.10): Für Previews. Niedrige Bitrate, schnelle Berechnung.



&nbsp;       Ultra ($2.80): Für den Release. Maximale Qualität, teuer.



B. ZEIT \& LOGIK (Die Gesetze der Timeline)



&nbsp;   Der Determinismus: useCurrentFrame() ist die einzige erlaubte Zeitquelle.



&nbsp;       Warum: Wenn wir ein Video auf 16 Servern rendern, muss Frame 100 überall gleich aussehen. Date.now() oder Math.random() würden dazu führen, dass Frame 100 auf Server A anders aussieht als auf Server B. Das Video würde flackern.



&nbsp;   No-CSS Law: Keine @keyframes. Keine CSS-Transitions.



&nbsp;       Warum: CSS-Animationen basieren auf der Systemzeit des Browsers. Remotion kann diese Zeit nicht kontrollieren ("seeken"). Wenn Remotion zu Frame 50 springt, weiß CSS nicht, wo die Animation stehen sollte. Nur JavaScript (spring, interpolate) kann das.



C. PROZESS \& SICHERHEIT



&nbsp;   Double-Turn-Lock: Änderungen werden erst vorgeschlagen, dann committet.



&nbsp;       Warum: Verhindert, dass halluzinierter Code in die Git-Historie gelangt.



&nbsp;   No-Lazy-Coding: Platzhalter wie //... sind verboten.



&nbsp;       Warum: Ein unvollständiges Skript ist wertlos. Wir brauchen ausführbaren Code.



2.2 EXTRACTION\_REPORT\_BADGE\_7\_CODEX\_V7\_FINAL.md



Dies ist der Beweis, dass unser System funktioniert. Es ist das Musterbeispiel (Gold Standard) für alle zukünftigen Reports.

Die Funktion



Wir nutzen dieses Dokument für "One-Shot Learning". Statt dem Agenten langatmig zu erklären, wie ein Report aussehen soll ("Sei ausführlich, nutze Tabellen..."), geben wir ihm dieses Dokument und sagen: "Mach es genau so."

Die Anatomie eines perfekten Codex (am Beispiel Badge 7)



&nbsp;   Vollständigkeit: Der Report ist über 18.000 Zeichen lang. Er kürzt nichts ab.



&nbsp;   Code-Integrität:



&nbsp;       Er enthält den vollständigen TypeScript-Code für den Concurrency Calculator (inklusive Imports und Kommentaren).



&nbsp;       Er enthält den vollständigen Python-Code für die Input Detection Logic.



&nbsp;   Narrative Tiefe:



&nbsp;       Er listet nicht nur Regeln auf ("Max 16 Threads").



&nbsp;       Er erklärt die Strategie dahinter ("Wir limitieren auf 16 Threads, um I/O-Bottlenecks bei der S3-Synchronisation zu vermeiden.").



&nbsp;   Struktur:



&nbsp;       Er nutzt die "THE X" Nomenklatur ("THE CLOUD PIPELINE", "THE ROUTING BRAIN").



&nbsp;       Er nutzt 🔑 Emojis für harte Fakten.



&nbsp;       Er nutzt Tabellen für Daten.



&nbsp;   Beweisführung:



&nbsp;       Am Ende steht ein Content Migration Audit. Eine Tabelle, die Zeile für Zeile auflistet: "Datei X wurde in Sektion Y integriert." Das ist der Beweis, dass wir die Originaldatei löschen dürfen.


🧬 TEIL 3: DIE PROMPT-WISSENSCHAFT (Evolution der Kontrolle)



Status: CRITICAL LEARNING

Zweck: Verständnis der Fehlermuster von LLMs und der Gegenmaßnahmen, die wir entwickelt haben.

3.1 Die Evolution des Scheiterns (Warum "gut gemeint" nicht reicht)



Wir haben gelernt, dass LLMs (auch Gemini 3.0 Pro) eine tief sitzende Tendenz zur Kompression haben. Sie sind darauf trainiert, "hilfreich" zu sein, und interpretieren "hilfreich" oft als "kurz und bündig". Für eine forensische Extraktion ist das fatal.

Fehler 1: Die "Zusammenfassungs-Falle" (V1-V5)



&nbsp;   Der Befehl: "Sei ausführlich."



&nbsp;   Die KI-Interpretation: "Schreibe einen langen Text, aber fasse den Code zusammen, damit er lesbar bleibt."



&nbsp;   Das Ergebnis: Reports mit viel Prosa, aber Code-Blöcken wie // ... logic here.



&nbsp;   Der Schaden: Das System ist nicht mehr ausführbar. Die Logik fehlt.



Fehler 2: Die "Struktur-Überladung" (V6-V7)



&nbsp;   Der Befehl: Wir gaben dem Agenten extrem komplexe Templates mit dutzenden Unterpunkten.



&nbsp;   Die KI-Reaktion: Der Agent versuchte, alle Punkte zu erfüllen, aber um das Token-Limit der Antwort nicht zu sprengen, kürzte er jeden einzelnen Punkt.



&nbsp;   Das Ergebnis: Ein Report, der zwar die richtige Struktur hatte, aber inhaltlich flach war ("Mile wide, inch deep").



Fehler 3: Die "Kontext-Vergessenheit" (V9)



&nbsp;   Der Befehl: Wir versuchten, den Prompt zu vereinfachen, um Tokens zu sparen.



&nbsp;   Die KI-Reaktion: Ohne die explizite Erinnerung an die "Gesetze" (No-CSS, RAM/2) fiel der Agent in sein Standard-Training zurück.



&nbsp;   Das Ergebnis: Er schlug plötzlich wieder CSS-Animationen vor, weil er vergessen hatte, dass Viron das verbietet.



3.2 Der Sieg: V8.2 + Segmentation (Die Lösung)



Wir haben das Problem gelöst, indem wir nicht mehr gegen die Natur der KI kämpfen, sondern sie austricksen.

A. Das "Paranoia-Mandat" (Psychologische Ebene)



Wir sagen dem Agenten nicht mehr nur "Sei gründlich". Wir sagen ihm:



&nbsp;   "Stell dir vor, ich lösche die Quelldateien SOFORT nach deiner Arbeit. Wenn ein Bit fehlt, stürzt das System ab."



&nbsp;   Der Effekt: Das versetzt den Agenten in einen Zustand der Hyper-Vigilanz. Er traut sich nicht mehr, etwas wegzulassen, weil er die Konsequenz ("Systemabsturz") fürchtet. Das aktiviert seine Sicherheits-Protokolle.



B. Die "Segmentierungs-Taktik" (Technische Ebene)



Das größte Problem war das Output-Token-Limit (die maximale Länge einer Antwort). Ein Agent kann keine 30.000 Zeichen in einer Nachricht schreiben. Wenn er merkt, dass der Platz knapp wird, fängt er an zu hetzen und zu kürzen.



&nbsp;   Die Lösung: Wir zwingen ihn zur Pause.



&nbsp;       "Schreibe TEIL 1. Stoppe. Warte auf den Befehl 'Weiter'. Dann schreibe TEIL 2."



&nbsp;   Der Effekt:



&nbsp;       Der Agent hat für jeden Teil das volle Token-Budget. Er muss nicht sparen.



&nbsp;       Er kann sich voll auf Sektion 1 konzentrieren, ohne Sektion 4 im Hinterkopf zu haben.



&nbsp;       Wir können nach Teil 1 eingreifen, wenn die Qualität nicht stimmt.



C. Der "Forensic Thought Process" (Kognitive Ebene)



Wir zwingen den Agenten, erst zu denken, dann zu schreiben.



&nbsp;   "Öffne einen <forensic\_thought\_process> Block. Analysiere erst die Dateien. Suche nach Widersprüchen. Erst wenn du sicher bist, schreibe den Report."



&nbsp;   Der Effekt: Das verhindert "Halluzinationen aus dem Stegreif". Der Agent muss seine Aussagen erst intern validieren. Wenn er im Denkprozess merkt "Moment, das widerspricht der Bridge", korrigiert er sich, bevor er den Fehler in den Report schreibt.



3.3 Die Prompt-Architektur (Das V8.2 Design)



Unser finaler Prompt ist kein einfacher Text, sondern ein Programmcode für das LLM. Er besteht aus Modulen:



&nbsp;   Identity Module: "Du bist kein Chatbot, du bist ein Architekt." (Setzt den Ton).



&nbsp;   Protocol Module: "Nutze Thought Process. Nutze Segmentation." (Steuert das Verhalten).



&nbsp;   Constraint Module: "No Lazy Coding. Min 500 Zeichen." (Setzt die Grenzen).



&nbsp;   Execution Module: "Schritt 1, Schritt 2, Schritt 3." (Definiert den Ablauf).



Diese Modularität macht den Prompt robust. Wenn wir merken, dass er bei "Code" schlampt, verschärfen wir nur das "Constraint Module", ohne den Rest zu brechen.


🚀 TEIL 4: DER MASTERPLAN FÜR DEN NEUSTART (Schritt-für-Schritt)



Status: READY TO EXECUTE

Zweck: Eine idiotensichere Anleitung, um die verbleibenden Badges (1, 4, 2, 3, 6) auf V8.2-Standard zu bringen.

SCHRITT 1: DIE VORBEREITUNG (Das Paket schnüren)



Bevor du einen Tab öffnest, stelle sicher, dass du die richtigen Dateien griffbereit hast.



Das "Universal Context Kit" (Muss in JEDEN Tab):



&nbsp;   .agent/AGENTS.md



&nbsp;   .agent/RULES\_CORE.md



&nbsp;   .agent/RULES\_WORKFLOW.md



&nbsp;   .agent/RULES\_TECHNICAL.md



&nbsp;   .agent/RULES\_MIGRATION\_GUIDE.md



&nbsp;   viron-core/vision.md



&nbsp;   THE\_VIRON\_AESTHETIC\_MANIFESTO.md



&nbsp;   src/PROJECT\_RULES\_LIGHTING.md



&nbsp;   .agent/handover/task.md



&nbsp;   .agent/handover/implementation\_plan.md



&nbsp;   VIRON\_STUDIO\_INDEX.md



&nbsp;   .agent/handover/SUBAGENT\_BRIEFING\_TEMPLATE\_V8.0.md



&nbsp;   ORCHESTRATOR\_SELF\_AUDIT\_PROTOCOL.md



&nbsp;   remotion-core/SKILL.md



&nbsp;   Remotion Recherche/00-master-workflow-2026-integration.md



Die "Wahrheit" (Muss in JEDEN Tab):

16\. VIRON\_KNOWLEDGE\_BRIDGE.md (Version 3.2 - Die Gesetze)

17\. EXTRACTION\_REPORT\_BADGE\_7\_CODEX\_V7\_FINAL.md (Das Beispiel für Qualität)



Die "Spezialisten" (Nur für das jeweilige Badge):



&nbsp;   Surgical Skills: Die 5-10 Dateien aus .agent/skills/remotion-best-practices/rules/, die zum Thema passen.



&nbsp;   Gold-Dateien: Die Recherche-Dateien (Remotion Recherche/...), die verarbeitet werden sollen.



SCHRITT 2: DAS SYSTEM-SETUP (Google AI Studio)



&nbsp;   Öffne einen neuen Tab.



&nbsp;   Wähle Modell: Gemini 1.5 Pro (oder 3.0 Pro Experimental, falls verfügbar).



&nbsp;       Hinweis: 1.5 Pro hat ein größeres Kontext-Fenster (2M Tokens) und ist oft stabiler bei langen Tasks.



&nbsp;   Setze Temperature auf 0.3.



&nbsp;   Aktiviere Code Execution (Wichtig für Logik-Checks).



&nbsp;   System Instructions: Kopiere den V8.2 MASTER PROMPT (aus Teil 3 dieses Dumps) in das linke Feld.



&nbsp;       Check: Steht dort <ip\_preservation\_mandate>? Steht dort NO LAZY CODING?



SCHRITT 3: DER START (Die Ingestion)



Lade alle Dateien hoch (Universal + Bridge + Beispiel + Skills + Gold).

Sende dann die Erste Nachricht:



&nbsp;   Mission: Badge \[N]: \[Name] (z.B. Badge 1: Core Engine).



&nbsp;   Kontext: Nutze den hochgeladenen Badge 7 Codex als dein qualitatives Vorbild. Dein Ziel ist es, diese Tiefe (20.000+ Zeichen) zu erreichen.



&nbsp;   Auftrag:



&nbsp;       Führe PHASE 1 (Ingest) durch: Bestätige, dass du alle Dateien hast.



&nbsp;       Führe PHASE 2 (Self-Briefing) durch: Erstelle dein internes Briefing SUBAGENT\_BRIEFING\_BADGE\_\[N]\_INTERNAL.md.



&nbsp;           Liste alle "Smoking Guns" auf.



&nbsp;           Bestätige, dass du die Limits aus der VIRON\_KNOWLEDGE\_BRIDGE (z.B. RAM/2) verstanden hast.



&nbsp;   🛑 STOPPE NACH DEM BRIEFING. Ich werde es prüfen.



SCHRITT 4: DIE KONTROLLE (Das Quality Gate)



Der Agent antwortet mit dem Briefing. Lies es.



Checkliste für dich:



&nbsp;   Hat er alle Gold-Dateien erwähnt?



&nbsp;   Hat er die "Smoking Guns" (konkrete Codes/Werte) identifiziert?



&nbsp;   Hat er die Bridge-Regeln (RAM/2, No-CSS) korrekt referenziert?



&nbsp;   Hat er bestätigt, dass er nichts kürzen wird?



&nbsp;   Wenn JA: Gehe zu Schritt 5.



&nbsp;   Wenn NEIN: Schreibe: "Kritik: Du hast Datei X ignoriert / Du hast die RAM-Regel vergessen. Korrigiere das Briefing."



SCHRITT 5: DIE EXEKUTION (Der Codex)



Sende die Zweite Nachricht:



&nbsp;   Genehmigt. Starte jetzt Phase 3.



&nbsp;   Erstelle den EXTRACTION\_REPORT\_BADGE\_\[N]\_CODEX.md.



&nbsp;   WICHTIG - SEGMENTIERUNG:

&nbsp;   Damit du nicht kürzen musst, schreibe den Report in Teilen.



&nbsp;       Schreibe TEIL 1 (Sektion 1 \& 2).



&nbsp;       Stoppe und schreibe "\[PAUSE - TEIL 1 FERTIG]".



&nbsp;       Warte auf mein "Weiter".



&nbsp;   NO LAZY CODING: Kopiere jeden Code zu 100%.

&nbsp;   NARRATIVE TIEFE: Erkläre jedes "Warum" mit min. 500 Zeichen.



&nbsp;   Fang an.



SCHRITT 6: DER LOOP (Das Finale)



&nbsp;   Der Agent schreibt Teil 1.



&nbsp;   Du prüfst kurz: Ist der Code vollständig? Ist die Erklärung lang genug?



&nbsp;   Du schreibst: "Weiter."



&nbsp;   Der Agent schreibt Teil 2.



&nbsp;   Du schreibst: "Weiter."



&nbsp;   Der Agent schreibt Teil 3 (inkl. Content Audit \& Conflict Log).



&nbsp;   Du kopierst alle Teile in eine lokale Datei.



SCHRITT 7: DER ABSCHLUSS (Die Sicherung)



&nbsp;   Speichere die Datei lokal.



&nbsp;   Lösche die Gold-Dateien dieses Badges aus deinem Ordner "Zu erledigen".



&nbsp;   Update die VIRON\_KNOWLEDGE\_BRIDGE.md mit den neuen Erkenntnissen aus diesem Badge (z.B. neue Design-Tokens aus Badge 4).



&nbsp;   Gehe zum nächsten Badge.


