import os
import re

dateiliste_path = r"C:\Workspace\Repos\remotion-studio\.agent\handover\AIStudio\Omega_Onboarding\Dateiliste.md"
final_round_dir = r"C:\Workspace\Repos\remotion-studio\.agent\handover\AIStudio\Omega_Onboarding\FINAL_ROUND"

# 1. Parse unique files from Dateiliste.md
unique_files_in_list = set()
with open(dateiliste_path, 'r', encoding='utf-8') as f:
    for line in f:
        line = line.strip()
        if not line:
            continue
        # Clean up Markdown escaping and numbers
        # e.g. "RULES\_CORE.md" -> "RULES_CORE.md"
        # e.g. "17. V43_MASTER_PLAN.md" -> "V43_MASTER_PLAN.md"
        clean = re.sub(r'\\_', '_', line)
        clean = re.sub(r'^\d+\.\s*', '', clean)
        # Remove parenthetical comments
        clean = re.sub(r'\s*\(.*\)', '', clean)
        
        # If it looks like a .md or .tsx file
        if clean.endswith('.md') or clean.endswith('.tsx'):
            unique_files_in_list.add(clean)

# 2. List files in directory
files_in_dir = set(os.listdir(final_round_dir))

# 3. Compare
missing = unique_files_in_list - files_in_dir
extra = files_in_dir - unique_files_in_list

print(f"Unique files in Dateiliste.md: {len(unique_files_in_list)}")
print(f"Files in FINAL_ROUND: {len(files_in_dir)}")
print(f"Missing files: {missing}")
print(f"Extra files: {extra}")

# Special check for SKILL.md which were renamed
skill_names = {"SKILL_v1_Master.md", "SKILL_v2_Conflict_Master.md"}
if "SKILL.md" in unique_files_in_list and skill_names.issubset(files_in_dir):
    print("Note: SKILL.md in list was successfully split into v1/v2 in directory.")
