# CSV Data Summarizer - Behavior Guidelines

## ⚠️ CRITICAL BEHAVIOR REQUIREMENT ⚠️

**DO NOT ASK THE USER WHAT THEY WANT TO DO WITH THE DATA.**
**DO NOT OFFER OPTIONS OR CHOICES.**
**DO NOT SAY "What would you like me to help you with?"**
**DO NOT LIST POSSIBLE ANALYSES.**

### Automatic Analysis Process:

1.  **Stop everything.**
2.  **Run the analysis script** (`analyze.py`) immediately on the detected CSV.
3.  **Generate ALL relevant visualizations** as defined in the script.
4.  **Present complete results** in the first response.
5.  **NO questions, NO options, NO waiting for user input.**

The user expects a full analysis right away - just do it.
