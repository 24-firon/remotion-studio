# SERVER ACTIONS & React 19: Die Mutations-Architektur für Viron

**Status:** Architecture Blueprint | **Version:** 2.0 | **Gültig ab:** 13. Januar 2026  
**Abhängigkeiten:** Next.js 16.1 / React 19.2.3 / TypeScript 5.7 / Zod 4.3  
**Synergien:** useTransition, useActionState, Error Boundaries, Suspense

---

## 🎯 PARADIGMENWECHSEL: Das Ende der API-Routes Ära

Im Mastery Tier 2026 schreiben wir **keine REST API-Endpunkte mehr** für einfache Daten-Mutations. Stattdessen definieren wir **`'use server'` Funktionen**, die der React-Compiler automatisch für Seriierung optimiert [web:176][web:423].

### Der Mentale Modell-Shift

| Konzept | Alt (2023) | Neu (2026) |
|---------|-----------|-----------|
| **Mutation Definition** | `POST /api/users` Route Handler | `'use server'` Function in `app/actions.ts` |
| **Type Safety** | TypeScript + Manual Fetch Types | Automatic Parameter Serialization |
| **State Management** | `useEffect` + `useState` + Fetch | `useActionState` Hook |
| **Loading State** | Prop-Drilling `isLoading` | `useFormStatus` (automatic) [web:331] |
| **Optimistic UI** | Manual `setState` before Fetch | `useOptimistic` Hook (new in React 19) |
| **Errors** | Try/Catch in Client | Server Exception → Error Boundary |
| **Revalidation** | Manual `mutate()` | Automatic via `revalidatePath()` |

---

## 🛠️ DIE VOLLSTÄNDIGE ARCHITEKTUR

### 1. Schema Definition (Single Source of Truth)

```typescript
// lib/schemas.ts
import { z } from 'zod';

// ✅ Single Schema = Client Validation + Server Validation
export const ContactFormSchema = z.object({
  email: z.string()
    .email("Invalid email address")
    .toLowerCase()
    .trim(),
  
  name: z.string()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name must be less than 100 characters"),
  
  message: z.string()
    .min(10, "Message must be at least 10 characters")
    .max(5000, "Message must be less than 5000 characters"),
  
  urgency: z.enum(["low", "medium", "high"]).default("medium"),
});

// ✅ Automatic TypeScript Inference
export type ContactFormData = z.infer<typeof ContactFormSchema>;
```

**Warum Single Schema?**
- Client und Server nutzen **exakt** die gleichen Validierungsregeln
- Wenn Schema sich ändert → Beide Seiten updaten sich automatisch
- Reduziert die Chance von Hydration Mismatches

### 2. Server Action mit vollständiger Fehlerbehandlung

```typescript
// app/actions/contact.ts
'use server'
import { ContactFormSchema } from '@/lib/schemas';
import { revalidatePath } from 'next/cache';
import { sendEmail } from '@/lib/email-service';

// ✅ Type-Safe Action mit Zod Validation
export async function submitContactForm(
  prevState: any,
  formData: FormData
) {
  // 1️⃣ Parse & Validiere
  const data = Object.fromEntries(formData);
  const result = ContactFormSchema.safeParse(data);

  if (!result.success) {
    // ✅ Return field-level errors an den Client
    return {
      success: false,
      errors: result.error.flatten().fieldErrors,
      data: null,
    };
  }

  // 2️⃣ Künstliche Verzögerung für Demo (entfernen in Production)
  await new Promise(res => setTimeout(res, 800));

  // 3️⃣ Server-seitige Logik (Datenbank, Email, Webhooks)
  try {
    // Beispiel: Email versenden
    await sendEmail({
      to: 'contact@viron.de',
      subject: `New Contact: ${result.data.name} (${result.data.urgency})`,
      body: result.data.message,
    });

    // Beispiel: In Datenbank speichern (statt Memory)
    // await db.contact.create({ data: result.data });

    // 4️⃣ Cache invalidieren (Next.js 16 Feature)
    revalidatePath('/contact');
    revalidatePath('/admin/messages');

    return {
      success: true,
      message: 'Message sent successfully! We\'ll be in touch.',
      errors: null,
      data: result.data,
    };
  } catch (error) {
    // ✅ Server Error wird zu Error Boundary geleitet
    return {
      success: false,
      message: 'Failed to send message. Please try again.',
      errors: { form: ['Server error occurred'] },
      data: null,
    };
  }
}
```

### 3. Form Component mit vollständiger UX

```tsx
// components/ContactForm.tsx
'use client'
import { useActionState } from 'react';
import { useFormStatus } from 'react-dom';
import { submitContactForm } from '@/app/actions/contact';

// ✅ Child-Komponente für Button (nutzt useFormStatus)
function SubmitButton() {
  const { pending } = useFormStatus();
  
  return (
    <button
      type="submit"
      disabled={pending}
      className={`btn-primary ${pending ? 'opacity-50 cursor-wait' : ''}`}
    >
      {pending ? (
        <>
          <Spinner className="mr-2 h-4 w-4" />
          Sending...
        </>
      ) : (
        'Send Message'
      )}
    </button>
  );
}

// ✅ Main Form mit useActionState (ersetzt useFormState)
export function ContactForm() {
  // useActionState gibt zurück: [state, formAction, isPending]
  const [state, formAction] = useActionState(submitContactForm, {
    success: false,
    message: '',
    errors: null,
    data: null,
  });

  return (
    <form action={formAction} className="space-y-6">
      {/* Email Field */}
      <div className="space-y-2">
        <label htmlFor="email" className="block text-sm font-medium">
          Email Address
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          aria-describedby="email-error"
        />
        {state.errors?.email && (
          <p id="email-error" className="text-red-500 text-sm">
            {state.errors.email[0]}
          </p>
        )}
      </div>

      {/* Name Field */}
      <div className="space-y-2">
        <label htmlFor="name" className="block text-sm font-medium">
          Full Name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          aria-describedby="name-error"
        />
        {state.errors?.name && (
          <p id="name-error" className="text-red-500 text-sm">
            {state.errors.name[0]}
          </p>
        )}
      </div>

      {/* Message Field */}
      <div className="space-y-2">
        <label htmlFor="message" className="block text-sm font-medium">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          required
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          aria-describedby="message-error"
        />
        {state.errors?.message && (
          <p id="message-error" className="text-red-500 text-sm">
            {state.errors.message[0]}
          </p>
        )}
      </div>

      {/* Urgency Select */}
      <div className="space-y-2">
        <label htmlFor="urgency" className="block text-sm font-medium">
          Priority
        </label>
        <select
          id="urgency"
          name="urgency"
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          defaultValue="medium"
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
      </div>

      {/* Status Messages */}
      {state.success && (
        <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
          <p className="text-green-800 font-medium">{state.message}</p>
        </div>
      )}

      {!state.success && state.message && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-800 font-medium">{state.message}</p>
        </div>
      )}

      {state.errors?.form && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
          <ul className="list-disc list-inside text-red-800">
            {state.errors.form.map((error, idx) => (
              <li key={idx}>{error}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Submit Button */}
      <SubmitButton />
    </form>
  );
}
```

---

## ⚡ ADVANCED: useTransition für Non-Form Actions

Nutze `useTransition`, wenn du **ohne `<form>` Element** Daten mutieren willst [web:332]:

```tsx
'use client'
import { useTransition } from 'react';
import { toggleFavorite } from '@/app/actions/favorites';

export function FavoriteButton({ itemId }: { itemId: string }) {
  const [isPending, startTransition] = useTransition();

  const handleToggle = () => {
    startTransition(async () => {
      // Die UI bleibt responsiv, während Server arbeitet
      await toggleFavorite(itemId);
    });
  };

  return (
    <button
      onClick={handleToggle}
      disabled={isPending}
      className={isPending ? 'opacity-50' : ''}
    >
      {isPending ? '❤️' : '🤍'} Add to Favorites
    </button>
  );
}
```

---

## 🎭 OPTIMISTIC UI Pattern (React 19 `useOptimistic`)

Zeige Änderungen **sofort** an, während der Server arbeitet:

```tsx
'use client'
import { useOptimistic } from 'react';
import { updateUserPreference } from '@/app/actions/user';

export function ThemeToggle({ currentTheme }: { currentTheme: 'light' | 'dark' }) {
  // optimisticTheme zeigt sofort die Änderung an
  const [optimisticTheme, addOptimisticTheme] = useOptimistic(currentTheme);

  const handleToggle = async () => {
    const newTheme = optimisticTheme === 'light' ? 'dark' : 'light';
    
    // 1️⃣ Sofort UI updaten (optimistisch)
    addOptimisticTheme(newTheme);
    
    // 2️⃣ Server-Mutation im Hintergrund
    await updateUserPreference({ theme: newTheme });
    // Falls Error: Automatic Rollback zum alten Wert
  };

  return (
    <button onClick={handleToggle}>
      {optimisticTheme === 'light' ? '🌞' : '🌙'} {optimisticTheme}
    </button>
  );
}
```

**Warum das Magisch ist:**
- Nutzer sieht **sofort** die Änderung (0ms Latenz)
- Falls Server-Error: UI rollt automatisch zurück (kein Manual `setState`)
- Moderne UX ohne Komplexität

---

## 🚨 PITFALLS & VIRON RULES

### Rule 1: Zod-Validierung ist nicht optional
```typescript
// ❌ FALSCH (keine Validierung = Sicherheitsloch)
export async function createUser(formData: FormData) {
  const data = Object.fromEntries(formData);
  // Keine Validierung → Code-Injection möglich
  await db.user.create({ data });
}

// ✅ RICHTIG
export async function createUser(formData: FormData) {
  const data = Object.fromEntries(formData);
  const result = UserSchema.safeParse(data);
  if (!result.success) return { errors: result.error.flatten().fieldErrors };
  await db.user.create({ data: result.data });
}
```

### Rule 2: useFormStatus nur in Child-Komponenten
```tsx
// ❌ FALSCH (Hook aus falscher Komponente)
export function Form() {
  const { pending } = useFormStatus(); // undefined!
  return <form action={formAction}>...</form>;
}

// ✅ RICHTIG (Button ist Child)
export function Form() {
  return (
    <form action={formAction}>
      <SubmitButton /> {/* SubmitButton nutzt useFormStatus */}
    </form>
  );
}
```

### Rule 3: Server Actions sind keine GraphQL-Ersatz
```typescript
// ❌ FALSCH (zu viele Verantwortung)
export async function doEverything(action: 'create' | 'update' | 'delete', data: any) {
  // 100 Lines für verschiedene Cases
}

// ✅ RICHTIG (Single Responsibility)
export async function createUser(formData: FormData) { /* ... */ }
export async function updateUser(formData: FormData) { /* ... */ }
export async function deleteUser(userId: string) { /* ... */ }
```

---

## 🔗 SYNERGIEN MIT ANDEREN LEARNINGS

### 1. **Error Boundaries** (file:321)
Server Actions werfen Exceptions → Error Boundary fängt sie ab:
```tsx
<ErrorBoundary fallback={<ErrorUI />}>
  <ContactForm /> {/* Server Action wirft Error → Boundary zeigt Fallback */}
</ErrorBoundary>
```

### 2. **Zod Validation** (file:322)
Die gleiche Zod-Schema wird für Client-Validierung (IDE-Hints) und Server-Validierung (Security) genutzt.

### 3. **Suspense & PPR** (file:320)
Server Actions nutzen Suspense für Streaming:
```tsx
<Suspense fallback={<SkeletonForm />}>
  <ContactForm /> {/* Rendert sofort, Daten streamen nach */}
</Suspense>
```

---

## ✅ VIRON CHECKLIST: Vor jedem Deploy

- [ ] Alle Server Actions nutzen Zod-Schema
- [ ] Alle Mutations haben Error-Handling mit `safeParse`
- [ ] SubmitButton nutzt `useFormStatus` (nicht `isPending`)
- [ ] `revalidatePath()` ist konfiguriert für Cache-Invalidierung
- [ ] Optimistic UI (wenn sinnvoll) nutzt `useOptimistic`
- [ ] Error Boundary wraps kritische Formen
- [ ] k6 Load Test: Server Actions unter Last testen

---

**Dokument Version:** 2.0 | **Erstellt:** 13. Januar 2026 | **Status:** Production Validated  
**Nächste Review:** Q2 2026 (React 19.3 Release mit weiteren Hooks)
