# Viron Dynamic Content Rules

## 1. LIQUID LAYOUTS (The "FitText" Law)

Content length is variable. A fixed font size is a bug.

- **Problem:** "Hello" fits. "Guten Tag zusammen" breaks the layout.
- **Solution:** Use `@remotion/layout-utils`.
- **Code:**

  ```tsx
  import { fitText } from "@remotion/layout-utils";

  const { fontSize } = fitText({
    text: props.title,
    withinWidth: 800,
    fontFamily: "Inter",
    minFontSize: 20,
    maxFontSize: 100,
  });

  return <h1 style={{ fontSize }}>{props.title}</h1>;
  ```

## 2. RUNTIME THEME INJECTION

Do not hardcode colors in `theme.ts` if you need Multi-Tenancy.

- **Pattern:** Inject the theme via `inputProps`.
- **Validation:** Use Zod to ensure the theme is complete.

```tsx
// src/Root.tsx
const ThemeSchema = z.object({
  primary: zColor(),
  secondary: zColor(),
  logoUrl: z.string().url(),
});

export const RemotionRoot = () => {
  return (
    <Composition
      // ...
      schema={z.object({ theme: ThemeSchema })}
      defaultProps={{
        theme: { primary: "#BFF549", secondary: "#000000", logoUrl: "..." },
      }}
    />
  );
};
```

## 3. INTERNATIONALIZATION (i18n)

- **RTL Support:** If `props.language` is 'ar' or 'he', set `dir="rtl"` on the container.
- **Font Fallbacks:** Define a font stack that covers CJK (Chinese/Japanese/Korean) characters if needed (e.g., Noto Sans).
