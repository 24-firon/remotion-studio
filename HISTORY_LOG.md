# Viron Button History & Feedback Log

This document tracks the evolution of the Viron Button, specifically focusing on user feedback regarding **Reflections** (Material/Light) vs **Geometry** (Shape/Artifacts).

---

## 🛑 The "Ring of Death" Era (Geometry Artifacts)

### **V1 - V3: Early Drafts**

- **Status:** ❌ REJECTED
- **Feedback:** Too dark, wrong metallic feel.

### **V4, V5, V6: The Shape Emerges**

- **Geometry:** `RoundedBox`
- **Feedback:** Shape is okay, but...

### **🏆 V7: "Ultra Sharp" (The Reference)**

- **Geometry:** `RoundedBox` (Artifact present)
- **Reflections:** `preset="studio"`
- **Feedback:** **"Reflections were super." "Really good settings."**
- **Problem:** The **"White Ring"** (bevel artifact) ruined it.
- **Root Cause:** We kept fixing the reflections but ignoring the ring artifact.

### **V8 - V12: The Struggle**

- **Feedback:** "Everything is getting worse." "Ring is annoying."

---

## 🛠️ The "Geometry Fix" Era (Capsule)

### **V13: Capsule Geometry**

- **Geometry:** `CapsuleGeometry` (Artifact GONE!)
- **Reflections:** Custom implementation.
- **Feedback:** **"Ring is gone!"** BUT... **"Now it looks matte/dull."** (Lost the V7 spark).

### **V14 - V22: Trying to restore Reflections**

- **Approach:** Custom Lightformers (White Room, Grey Studio, etc.)
- **Feedback:** "Too dark", "Black Metal", "Pixels", "Not Silver".
- **Learning:** Custom lights failed to match the realism of V7's HDRI.

### **V23 - V24: Return to HDRI**

- **Approach:** Using `preset="city"`, `apartment`, etc.
- **Feedback:** "Weird objects visible." "I don't want houses in my button."

### **V25 - V26: Custom Studio (Again)**

- **Approach:** Pure Lightformers.
- **Feedback:** "Still looks like a workaround." "Looks black/white."

---

## 💎 The "Best of Both Worlds" Era (Current)

### **V27: Hybrid Master**

- **Components:** V7 Reflections (`preset="studio"`) + V13 Geometry (`Capsule`).
- **Feedback:** "Light stands are visible." "Make it blurry."
- **Status:** CLOSE. Needs more blur to hide the studio equipment.

### **V28: V7 Restored (Target)**

- **Goal:**
  1.  **Reflections:** Exactly like V7 (brightness, lush silver).
  2.  **Geometry:** Exactly like V13 (No ring).
  3.  **Cleanliness:** High Blur to remove the "Studio Objects".
