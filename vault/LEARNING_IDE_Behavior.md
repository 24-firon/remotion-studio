# 🧠 Learning: AI-IDE Behavior & Git Integrity

Diese Datei fasst die Ergebnisse der Experiment-Reihe vom 28.01.2026 zusammen. Sie dient als Grundlage für die Definition sicherer Entwicklungs-Workflows in Antigravity.

## 📊 Experiment-Matrix

| ID     | Fokus           | Befund        | Implikation                                                    |
| :----- | :-------------- | :------------ | :------------------------------------------------------------- |
| **H1** | Schreib-Latenz  | **Sofort**    | Dateien landen auf Disk, _bevor_ der Nutzer "Accept" klickt.   |
| **H2** | Reject-Handling | **Rollback**  | IDE setzt Datei bei Ablehnung physisch zurück.                 |
| **H3** | Git-Interaktion | **Race-Risk** | Git kann "Pending"-Daten committen, die dann abgelehnt werden. |
| **H4** | UI-Korrelation  | **Lose**      | Git-Reject schließt nicht zwingend Datei-Fenster.              |

## ⚠️ Das "Timeline-Problem" (Agenten-Blindheit)

Ein Agent sieht keine UI-Events (Button-Klicks). Seine einzige Wahrnehmung sind die Ergebnisse der Tools (Dateisystem-Status). Das führt dazu, dass der Agent "denkt", seine Arbeit sei getan, während der Nutzer sie in der UI noch prüft oder ablehnt.

## 🏗️ Workflow-Vorschläge (Diskussionbasis)

1. **Strikte Turn-Separation (TSC):**
   - Ein Turn darf niemals Edits _und_ Git-Befehle enthalten.
   - Grund: Git würde das unbestätigte (aber physisch vorhandene) "Pending-File" erfassen.

2. **Forensischer Validierungscheck:**
   - Vor jedem Git-Commit muss der Agent den Datei-Inhalt erneut lesen, um sicherzustellen, dass kein unbemerktes "Reject" stattgefunden hat.

3. **Globaler Safety Lock:**
   - Destruktive Git-Befehle (`reset --hard` etc.) sind agentenseitig gesperrt (bereits in `gemini.md` hinterlegt).

_Status: Entwurf zur gemeinsamen Finalisierung_
