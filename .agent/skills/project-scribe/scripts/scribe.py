import os
import sys
import datetime
import json
import re

# --- Guardian Logic: Handover Schema ---
HANDOVER_SCHEMA = {
    "required_keys": ["protocol_version", "handover_id", "project", "state_snapshot", "decision_log"],
    "snapshots_keys": ["done", "in_progress", "blocking"]
}

def validate_handover_schema(content_str):
    """
    Validates that the content is valid JSON and strictly follows the Viron Handover Protocol v2.1.
    Throws ValueError if invalid.
    """
    try:
        # 1. Parse JSON
        data = json.loads(content_str)
    except json.JSONDecodeError as e:
        raise ValueError(f"CRITICAL: Handover content is NOT valid JSON. \nError: {e}")

    # 2. Check Top-Level Keys
    missing = [key for key in HANDOVER_SCHEMA["required_keys"] if key not in data]
    if missing:
        raise ValueError(f"CRITICAL: Schema Violation. Missing top-level keys: {missing}")

    # 3. Check State Snapshot Keys
    snapshot = data.get("state_snapshot", {})
    missing_snap = [key for key in HANDOVER_SCHEMA["snapshots_keys"] if key not in snapshot]
    if missing_snap:
        raise ValueError(f"CRITICAL: Schema Violation. Missing 'state_snapshot' keys: {missing_snap}")
    
    # 4. Check Decision Log format
    decisions = data.get("decision_log", [])
    if not isinstance(decisions, list):
        raise ValueError("CRITICAL: Schema Violation. 'decision_log' must be a list.")
    
    return True

def append_to_decision_log(decision_title, rationale, status="APPROVED"):
    """
    Surgically appends a new decision to DECISION_LOG.md without re-writing the whole file.
    """
    log_path = os.path.join(os.getcwd(), 'DECISION_LOG.md')
    
    # Generate ID based on line count or existing IDs (simplified for robustness)
    today = datetime.date.today().isoformat()
    
    if not os.path.exists(log_path):
        print(f"Error: {log_path} not found.")
        return

    # Read last few lines to find last ID (simplified logic)
    with open(log_path, 'r', encoding='utf-8') as f:
        lines = f.readlines()
    
    # Determine next ID
    last_id = 0
    for line in reversed(lines):
        if line.strip().startswith('| DEC-'):
            try:
                parts = line.split('|')
                current_id = int(parts[1].strip().replace('DEC-', ''))
                last_id = max(last_id, current_id)
                break
            except:
                continue
    
    new_id = f"DEC-{last_id + 1:02d}"
    
    # Format the new line
    new_line = f"| {new_id} | {today} | {decision_title} | {rationale} | {status} |\n"
    
    with open(log_path, 'a', encoding='utf-8') as f:
        f.write(new_line)
    
    print(f"Successfully logged {new_id}: {decision_title}")

def append_to_global_log(decision_title, rationale, status="APPROVED"):
    """
    Appends a decision to the GLOBAL .gemini/DECISION_LOG.md (Tier 3).
    """
    # Windows/Linux compatible home path detection
    home_dir = os.path.expanduser("~")
    log_path = os.path.join(home_dir, '.gemini', 'DECISION_LOG.md')
    
    today = datetime.date.today().isoformat()
    
    if not os.path.exists(log_path):
        print(f"Error: Global log at {log_path} not found.")
        return

    # Read existing IDs to determine next ID
    with open(log_path, 'r', encoding='utf-8') as f:
        lines = f.readlines()
    
    last_id = 0
    for line in reversed(lines):
        if line.strip().startswith('| DEC-'):
            try:
                parts = line.split('|')
                current_id = int(parts[1].strip().replace('DEC-', ''))
                last_id = max(last_id, current_id)
                break
            except:
                continue
    
    new_id = f"DEC-{last_id + 1:02d}"
    new_line = f"| {new_id} | {today} | {decision_title} | {rationale} | {status} |\n"
    
    with open(log_path, 'a', encoding='utf-8') as f:
        f.write(new_line)
    
    print(f"Successfully logged GLOBAL {new_id}: {decision_title}")

def update_log_entry(log_type, entry_id, new_content):
    """
    Updates an EXISTING decision log entry (Correction Mechanism).
    log_type: "local" or "global"
    entry_id: e.g. "DEC-04"
    new_content: The full new line content (or logic to replace specific fields)
    """
    print(f"UPDATE LOGIC: Replacing {entry_id} in {log_type} log with provided content.")
    # NOTE: Simplified placeholder for V1. Real impl requires regex replacement.
    # Logic: Read file, find line starting with entry_id, replace, write back.
    
    target_path = ""
    if log_type == "global":
        target_path = os.path.join(os.path.expanduser("~"), '.gemini', 'DECISION_LOG.md')
    else:
        target_path = os.path.join(os.getcwd(), 'DECISION_LOG.md')
        
    if not os.path.exists(target_path):
        print(f"Error: Log file {target_path} not found.")
        return

    with open(target_path, 'r', encoding='utf-8') as f:
        lines = f.readlines()
        
    found = False
    with open(target_path, 'w', encoding='utf-8') as f:
        for line in lines:
            if f"| {entry_id} |" in line:
                f.write(new_content if new_content.endswith('\n') else new_content + '\n')
                found = True
            else:
                f.write(line)
    
    if found:
        print(f"Successfully updated {entry_id} in {log_type} log.")
    else:
        print(f"Warning: {entry_id} not found in {log_type} log.")


def append_to_action_log(tier, action, file_affected="N/A"):
    """
    Appends a routine action to .agent/ACTION_LOG.json for Tier 0/1 audit trails.
    """
    log_path = os.path.join(os.getcwd(), '.agent', 'ACTION_LOG.json')
    
    # Ensure .agent directory exists
    os.makedirs(os.path.dirname(log_path), exist_ok=True)
    
    entry = {
        "timestamp": datetime.datetime.now().isoformat(),
        "tier": tier,
        "action": action,
        "file": file_affected
    }
    
    data = []
    if os.path.exists(log_path):
        try:
            with open(log_path, 'r', encoding='utf-8') as f:
                data = json.load(f)
        except json.JSONDecodeError:
            data = []
            
    data.append(entry)
    
    with open(log_path, 'w', encoding='utf-8') as f:
        json.dump(data, f, indent=2)
        
    print(f"Logged to ACTION_LOG.json: {action}")

def create_handover(project, topic, content):
    """
    Creates a standardized handover file, BUT FIRST Validates the JSON Schema.
    """
    # 1. Guardian Check
    try:
        validate_handover_schema(content)
        print("Schema Validation: PASSED")
    except ValueError as e:
        print(f"Schema Validation: FAILED -> {e}")
        # ABORT OPERATION to prevent corrupt handover
        return

    filename = f"HANDOVER_{project}_{topic}.md"
    path = os.path.join(os.getcwd(), filename)
    
    with open(path, 'w', encoding='utf-8') as f:
        f.write(content)
    
    print(f"Handover created at {path}")

def extract_json_from_markdown(content):
    """
    Extracts JSON payload from a Markdown file.
    Strategies:
    1. If file starts with '{', assume pure JSON.
    2. Look for ```json code block.
    Returns: JSON string or raises ValueError.
    """
    content = content.strip()
    
    # Strategy 1: Pure JSON
    if content.startswith('{'):
        return content
        
    # Strategy 2: Embedded Code Block
    pattern = r"```json\s*(\{.*?\})\s*```"
    match = re.search(pattern, content, re.DOTALL)
    if match:
        return match.group(1)
        
    raise ValueError("No valid JSON found. File must be pure JSON or contain a ```json block.")

if __name__ == "__main__":
    import argparse
    
    parser = argparse.ArgumentParser(description="Viron Project Scribe (The Guardian)")
    
    # Commands
    subparsers = parser.add_subparsers(dest="command", help="Available commands")
    
    # Cmd: Validate
    parser_val = subparsers.add_parser("validate", help="Validate a Handover file schema")
    parser_val.add_argument("file", help="Path to the file (JSON or Markdown)")
    
    # Cmd: Log Local
    parser_log = subparsers.add_parser("log-local", help="Log to local DECISION_LOG.md")
    parser_log.add_argument("--title", required=True)
    parser_log.add_argument("--rationale", required=True)
    parser_log.add_argument("--status", default="APPROVED")
    
    # Cmd: Log Global
    parser_glog = subparsers.add_parser("log-global", help="Log to GLOBAL (~/.gemini/DECISION_LOG.md)")
    parser_glog.add_argument("--title", required=True)
    parser_glog.add_argument("--rationale", required=True)
    parser_glog.add_argument("--status", default="APPROVED")

    args = parser.parse_args()
    
    if args.command == "validate":
        try:
            with open(args.file, 'r', encoding='utf-8') as f:
                content = f.read()
            
            # Hybrid extraction
            json_content = extract_json_from_markdown(content)
            
            # Validate
            validate_handover_schema(json_content)
            print(f"SUCCESS: '{args.file}' is valid.")
            sys.exit(0)
        except Exception as e:
            print(f"FAILURE: {e}")
            sys.exit(1)
            
    elif args.command == "log-local":
        append_to_decision_log(args.title, args.rationale, args.status)
        
    elif args.command == "log-global":
        append_to_global_log(args.title, args.rationale, args.status)
        
    else:
        parser.print_help()
