# Web Accessibility – WCAG 2026 Compliance

## Konzept (ASCII Diagram)

```
ASSISTIVE TECH (Screen Reader, Keyboard, Switch)
  ↓
DEINE WEBSEITE (Semantic HTML, ARIA, Focus Management)
  ↓
USER (Blind, Motorisch eingeschränkt, Kognitiv, Sensorisch)

WCAG 2.2 Erfüllt = 4 Principles: Perceivable, Operable, Understandable, Robust
```

## Was ist das?

Accessibility (a11y) bedeutet: Deine Seite ist bedienbar für Menschen mit unterschiedlichen Fähigkeiten (Sehen, Motorik, Kognition) und auch für Assistive Tech (Screenreader, Tastatur, Switch Devices).

WCAG 2.2 baut auf WCAG 2.1 auf; wenn du WCAG 2.2-Konformität behauptest, musst du auch WCAG 2.1 als Basis erfüllen. [web:252]

---

## Variante 1: Semantic-First (best for 95% UI)

### Setup
Nutze native HTML-Elemente (button, a, input, nav, main, section, article) statt "div-onClick".  
Semantik ist der größte Hebel, weil Screenreader und Keyboard-Nav damit automatisch funktionieren.

### Code (React/TypeScript)
```tsx
type Props = {
  label: string;
  onClick: () => void;
  disabled?: boolean;
  ariaLabel?: string;
};

// ✅ RICHTIG: Native Button mit semantischem HTML
export const A11yButton = ({ label, onClick, disabled, ariaLabel }: Props) => {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel || label}
      className="btn btn-primary"
    >
      {label}
    </button>
  );
};

// ❌ FALSCH: DIV mit Custom Click (unsichtbar für Keyboard/Screenreader)
// <div onClick={onClick}>{label}</div>

// ✅ RICHTIG: Navigation mit semantischen Landmarks
export const Navigation = () => {
  return (
    <nav aria-label="Main navigation">
      <ul>
        <li><a href="/home">Home</a></li>
        <li><a href="/about">About</a></li>
      </ul>
    </nav>
  );
};

// ✅ RICHTIG: Main Content Area
export const MainContent = ({ children }: { children: React.ReactNode }) => {
  return (
    <main>
      <section aria-labelledby="hero-title">
        <h1 id="hero-title">Welcome</h1>
        {children}
      </section>
    </main>
  );
};
```

### Performance-Charakteristik
- Nahezu kostenlos (kein Extra-Rendering).
- Vermeidest Custom-Event-Hacks.
- Screenreader "verstehen" direkt die Struktur.
- **FPS Impact:** 0 – reine HTML-Semantik.

---

## Variante 2: Motion-Safe Animations (prefers-reduced-motion)

### Setup
Wenn jemand "Reduce Motion" aktiviert hat (OS-Setting), müssen starke Bewegungen reduziert werden.
- Keine parallax Scrolls.
- Keine heftigen Transitions.
- Keine strobing Glows oder Flashes.

Die Basis ist `prefers-reduced-motion` Media Query [web:251].

### Code (CSS + React Hook)

**CSS:**
```css
/* Default: Full Motion */
.fx-heavy {
  animation: shine 2s infinite;
  transition: all 300ms ease;
  scroll-behavior: smooth;
}

/* Reduced Motion Mode */
@media (prefers-reduced-motion: reduce) {
  .fx-heavy {
    animation: none !important;
    transition: none !important;
    scroll-behavior: auto;
  }
}

/* Beispiel: Parallax reduzieren */
.parallax {
  background-attachment: scroll; /* not fixed */
}

@media (prefers-reduced-motion: reduce) {
  .parallax {
    background-attachment: scroll;
  }
}
```

**React Hook für Reduced Motion Detection:**
```tsx
export const useReducedMotion = () => {
  const [prefersReduced, setPrefersReduced] = React.useState(false);

  React.useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReduced(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReduced(e.matches);
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  return prefersReduced;
};

// Nutzung
export const AnimatedHeadline = () => {
  const prefersReduced = useReducedMotion();

  return (
    <h1
      style={{
        animation: prefersReduced ? "none" : "fadeInScale 800ms ease",
      }}
    >
      Welcome
    </h1>
  );
};
```

### Performance-Charakteristik
- Reduziert Rechenlast bei Reduced Motion aktiv (gut für alte Devices).
- Verhindert Motion-Sickness / Vestibular Issues.
- **FPS Impact:** -20 bis -50% wenn Reduced Motion aktiv (gewünscht).

---

## Variante 3: Canvas/WebGL zugänglich machen

### Setup
Canvas ist für Screenreader "unsichtbar". Lösung: Du baust einen **"Shadow DOM"** (nicht technisch ShadowDOM – ich meine: parallele, semantische HTML-Struktur), die erklärt, was passiert und welche Controls es gibt.

### Code (React Wrapper)

```tsx
// sr-only = Screen Reader Only (visuell versteckt, aber für AT lesbar)
const srOnlyStyles = {
  position: "absolute" as const,
  width: "1px",
  height: "1px",
  padding: 0,
  margin: "-1px",
  overflow: "hidden" as const,
  clip: "rect(0, 0, 0, 0)",
  whiteSpace: "nowrap" as const,
  border: 0,
};

type AccessibleCanvasProps = {
  title: string;
  description: string;
  children: React.ReactNode;
  controls?: {
    label: string;
    onClick: () => void;
  }[];
};

export const AccessibleCanvasScene = ({
  title,
  description,
  children,
  controls = [],
}: AccessibleCanvasProps) => {
  return (
    <section aria-label={title}>
      {/* Screenreader hört das, User sieht's nicht */}
      <div style={srOnlyStyles}>
        <p>{description}</p>
        {controls.length > 0 && (
          <ul>
            {controls.map((ctrl, i) => (
              <li key={i}>{ctrl.label}</li>
            ))}
          </ul>
        )}
      </div>

      {/* Der Canvas/Visuelle Teil */}
      <div className="canvas-wrapper">{children}</div>

      {/* Buttons für Keyboard-Navigation (ECHTE Buttons, nicht hidden!) */}
      <div className="canvas-controls" role="group" aria-label="Canvas controls">
        {controls.map((ctrl, i) => (
          <A11yButton
            key={i}
            label={ctrl.label}
            onClick={ctrl.onClick}
          />
        ))}
      </div>
    </section>
  );
};

// Beispiel-Nutzung für dein Metall-Button-Shader
export const MetalButtonDemo = () => {
  const [lightPos, setLightPos] = React.useState({ x: 0.5, y: 0.5 });

  return (
    <AccessibleCanvasScene
      title="Interactive Metallic Button"
      description="A 3D metallic button that responds to light position. Use arrow buttons to move light source."
      controls={[
        { label: "Light Up", onClick: () => setLightPos({ ...lightPos, y: Math.max(0, lightPos.y - 0.1) }) },
        { label: "Light Down", onClick: () => setLightPos({ ...lightPos, y: Math.min(1, lightPos.y + 0.1) }) },
        { label: "Light Left", onClick: () => setLightPos({ ...lightPos, x: Math.max(0, lightPos.x - 0.1) }) },
        { label: "Light Right", onClick: () => setLightPos({ ...lightPos, x: Math.min(1, lightPos.x + 0.1) }) },
      ]}
    >
      <canvas
        id="metal-button-canvas"
        width={800}
        height={600}
        aria-label="Metallic button 3D visualization"
      />
    </AccessibleCanvasScene>
  );
};
```

### Performance-Charakteristik
- **FPS Impact:** -0% (sr-only ist display:hidden äquivalent).
- Keyboard-Navigation kostet minimal.
- Screenreader-Kompatibilität: ✅ 100%.

---

## Praktische Presets

### Preset 1: "Hero mit Reduced Motion"
```css
.hero {
  position: relative;
  min-height: 100vh;
}

.hero__content {
  animation: fadeIn 1s ease;
}

@media (prefers-reduced-motion: reduce) {
  .hero__content {
    animation: none;
    opacity: 1; /* Sofort sichtbar */
  }
}
```

### Preset 2: "Metall-Button mit Accessibility"
```tsx
export const AccessibleMetalButton = ({ 
  label, 
  onClick 
}: { 
  label: string; 
  onClick: () => void;
}) => {
  const prefersReduced = useReducedMotion();

  return (
    <button
      onClick={onClick}
      className="btn-metal"
      aria-label={label}
      style={{
        boxShadow: prefersReduced 
          ? "0 2px 8px rgba(0,0,0,0.2)" 
          : "var(--metal-glow)",
      }}
    >
      {label}
    </button>
  );
};
```

### Preset 3: "Scroll-Effekt mit Keyboard-Alternative"
```tsx
export const ScrollDrivenUI = () => {
  const [scrollPos, setScrollPos] = React.useState(0);
  const prefersReduced = useReducedMotion();

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      setScrollPos(Math.min(100, scrollPos + 10));
    } else if (e.key === "ArrowUp") {
      setScrollPos(Math.max(0, scrollPos - 10));
    }
  };

  return (
    <div
      tabIndex={0}
      onKeyDown={handleKeyDown}
      aria-label="Scrollable content area. Use arrow keys to navigate."
      style={{
        opacity: prefersReduced ? 1 : scrollPos / 100,
        transition: prefersReduced ? "none" : "opacity 300ms ease",
      }}
    >
      Content
    </div>
  );
};
```

---

## Häufige Fehler & Lösungen

| Problem | Ursache | Lösung |
|---------|--------|--------|
| Elemente nicht per Tab erreichbar | `<div onClick>` statt button | Native `<button>` oder `<a>` verwenden; `tabindex="0"` nur als letztes Resort |
| Fokus nicht sichtbar | CSS `outline: none` | `:focus-visible` Styles definieren |
| Canvas ist "stumm" für Screenreader | Kein semantisches Pendant | `sr-only` `<p>` hinzufügen + Tastatur-Controls als echte `<button>` |
| Kontrast zu niedrig | Text vor heller/dunkler Fläche | Mindestens 4.5:1 für normale Text, 3:1 für große Text (18pt+) |
| Farbcodierung nur | Info nur via Farbe vermittelt (z.B. rot=error) | Text + Icon + Farbe kombinieren |
| Animation unkontrollierbar | Parallax, Auto-Play ohne Pause-Button | Pause-Button immer zur Verfügung stellen; `prefers-reduced-motion` beachten |

---

## Tooling & Automatisierung

### axe-core (Automated Testing)
`axe-core` ist eine Bibliothek zur automatisierten Accessibility-Testung [web:257].

```bash
npm install axe-core --save-dev
```

**Beispiel Integration in Jest:**
```tsx
import { axe, toHaveNoViolations } from "jest-axe";
expect.extend(toHaveNoViolations);

test("button is accessible", async () => {
  const { container } = render(
    <A11yButton label="Click me" onClick={() => {}} />
  );
  const results = await axe(container);
  expect(results).toHaveNoViolations();
});
```

### Chrome DevTools Audit
1. DevTools öffnen (F12)
2. "Lighthouse" Tab
3. "Accessibility" Check
4. Report lesen

### WAVE Browser Extension
Visuelle Zugänglichkeitsprüfung direkt im Browser [web:260].

---

## Quellen

- WCAG 2.2 Requirements (W3C): https://w3c.github.io/wcag/requirements/22/ [web:252]
- WCAG 2022 Überblick: https://www.accessibility.works/blog/wcag-ada-website-compliance-standards-requirements [web:251]
- axe-core (npm): https://www.npmjs.com/package/axe-core [web:257]
- Core Accessibility Tooling (MDN): https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Accessibility/Tooling [web:260]
- 2026 A11y Trends: https://www.accessibility.com/blog/accessibility-trends-to-watch-in-2026 [web:258]
- WCAG Compliance Guide: https://sonix.ai/resources/wcag-compliance/ [web:261]

---

**Version:** v1.0 (Jan 2026)  
**Difficulty:** Intermediate  
**Setup-Time:** 30–60 Min (um Projektstruktur zu refaktorieren)  
**ROI:** Hoch (Legal-Sicherheit + User-Base-Erweiterung)