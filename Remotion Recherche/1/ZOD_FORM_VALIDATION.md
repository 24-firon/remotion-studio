# Zod Form Validation: Die Data-Integrity-Architektur

**Status:** Security & Architecture Blueprint | **Version:** 2.0 | **Gültig ab:** 13. Januar 2026  
**Abhängigkeiten:** Zod 4.3 / Next.js 16.1 / React 19 / TypeScript 5.7  
**Synergien:** Server Actions, Error Boundaries, Type Safety

---

## 🎯 KERNKONZEPT: "Single Schema = Shared Truth Everywhere"

Zod ist nicht nur ein Form-Validator. Es ist das **Rückgrat der Type-Safety** von Client bis Datenbank [web:389][web:390].

### Der Data-Flow

```
Client Input (Formular)
  ↓
useActionState Serialisierung
  ↓
Server Action erhält FormData
  ↓
Zod.safeParse() (Validation + Type-Coercion)
  ↓
type UserType = z.infer<typeof UserSchema> (Automatic TS-Type)
  ↓
Datenbank-Insert mit garantierter Integrität
```

**Jeder Schritt nutzt die gleiche Schema-Datei.**

---

## 🛠️ DIE VOLLSTÄNDIGE ARCHITEKTUR

### 1. Zentrale Schema-Definition

```typescript
// lib/schemas.ts
import { z } from 'zod';

// ===== USER REGISTRATION SCHEMA =====
export const UserRegistrationSchema = z.object({
  email: z.string()
    .email("Bitte geben Sie eine gültige Email-Adresse ein")
    .toLowerCase()
    .trim(),
  
  password: z.string()
    .min(8, "Passwort muss mindestens 8 Zeichen lang sein")
    .regex(/[A-Z]/, "Mindestens ein Großbuchstabe erforderlich")
    .regex(/[0-9]/, "Mindestens eine Zahl erforderlich"),
  
  confirmPassword: z.string(),
  
  companyName: z.string()
    .min(2, "Firmenname zu kurz")
    .optional(),
  
  acceptTerms: z.boolean()
    .refine(val => val === true, "AGB müssen akzeptiert werden"),
  
  role: z.enum(["admin", "user"], { message: "Ungültige Rolle" }).default("user"),
}).superRefine(({ password, confirmPassword }, ctx) => {
  // Custom Validierung: Passwörter müssen gleich sein
  if (confirmPassword !== password) {
    ctx.addIssue({
      code: "custom",
      message: "Passwörter stimmen nicht überein",
      path: ["confirmPassword"],
    });
  }
});

// ===== LEAD FORM SCHEMA =====
export const ContactFormSchema = z.object({
  name: z.string()
    .min(2, "Name zu kurz")
    .max(100, "Name zu lang"),
  
  email: z.string()
    .email("Ungültige Email")
    .toLowerCase()
    .trim(),
  
  message: z.string()
    .min(10, "Nachricht zu kurz")
    .max(5000, "Nachricht zu lang"),
  
  urgency: z.enum(["low", "medium", "high"]).default("medium"),
});

// ===== AUTOMATIC TYPE INFERENCE =====
// Diese Types werden automatisch aus dem Schema generiert
export type UserRegistration = z.infer<typeof UserRegistrationSchema>;
export type ContactForm = z.infer<typeof ContactFormSchema>;

// Wenn Schema sich ändert → Types ändern sich automatisch
// Keine manuellen Type-Definitionen nötig!
```

### 2. Server Action mit vollständiger Validierung

```typescript
// app/actions/user.ts
'use server'
import { UserRegistrationSchema } from '@/lib/schemas';
import { revalidatePath } from 'next/cache';
import { hash } from 'bcryptjs';

export async function registerUser(
  prevState: any,
  formData: FormData
) {
  // 1️⃣ Parse FormData
  const rawData = Object.fromEntries(formData);
  
  // 2️⃣ Validate mit Zod (safeParse verhindert Crashes)
  const result = UserRegistrationSchema.safeParse(rawData);

  if (!result.success) {
    // ✅ Field-Level Errors werden einzeln zurückgegeben
    return {
      success: false,
      errors: result.error.flatten().fieldErrors,
      data: null,
    };
  }

  // 3️⃣ result.data ist jetzt 100% valide und korrekt getypt
  const { email, password, companyName, role } = result.data;

  try {
    // 4️⃣ Server-seitige Logik (Datenbank, Hashing, etc.)
    const hashedPassword = await hash(password, 12);
    
    // In echtem Projekt: await db.user.create(...)
    // Hier simulieren wir nur:
    console.log('Creating user:', { email, hashedPassword, companyName, role });

    // 5️⃣ Cache Invalidation
    revalidatePath('/dashboard');
    revalidatePath('/admin/users');

    return {
      success: true,
      message: 'User erfolgreich registriert!',
      errors: null,
      data: { email, companyName, role }, // Nicht das Passwort zurückgeben!
    };
  } catch (error) {
    return {
      success: false,
      message: 'Fehler beim Registrieren',
      errors: { server: ['Server-Fehler aufgetreten'] },
      data: null,
    };
  }
}
```

### 3. Form Component mit Fehler-Rendering

```tsx
// components/RegistrationForm.tsx
'use client'
import { useActionState } from 'react';
import { useFormStatus } from 'react-dom';
import { registerUser } from '@/app/actions/user';

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className={`w-full btn-primary ${pending ? 'opacity-50' : ''}`}
    >
      {pending ? 'Wird registriert...' : 'Jetzt registrieren'}
    </button>
  );
}

export function RegistrationForm() {
  const [state, formAction] = useActionState(registerUser, {
    success: false,
    message: '',
    errors: null,
    data: null,
  });

  return (
    <form action={formAction} className="max-w-md mx-auto space-y-6">
      {/* Email Field */}
      <div>
        <label htmlFor="email" className="block text-sm font-medium mb-2">
          Business-Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          className={`w-full px-4 py-2 border rounded-lg ${
            state.errors?.email ? 'border-red-500' : 'border-gray-300'
          }`}
          aria-describedby={state.errors?.email ? 'email-error' : undefined}
        />
        {state.errors?.email && (
          <p id="email-error" className="text-red-500 text-sm mt-1">
            {state.errors.email[0]}
          </p>
        )}
      </div>

      {/* Password Field */}
      <div>
        <label htmlFor="password" className="block text-sm font-medium mb-2">
          Passwort
        </label>
        <input
          id="password"
          name="password"
          type="password"
          required
          className={`w-full px-4 py-2 border rounded-lg ${
            state.errors?.password ? 'border-red-500' : 'border-gray-300'
          }`}
          aria-describedby={state.errors?.password ? 'password-error' : undefined}
        />
        {state.errors?.password && (
          <p id="password-error" className="text-red-500 text-sm mt-1">
            {state.errors.password[0]}
          </p>
        )}
      </div>

      {/* Confirm Password */}
      <div>
        <label htmlFor="confirmPassword" className="block text-sm font-medium mb-2">
          Passwort bestätigen
        </label>
        <input
          id="confirmPassword"
          name="confirmPassword"
          type="password"
          required
          className={`w-full px-4 py-2 border rounded-lg ${
            state.errors?.confirmPassword ? 'border-red-500' : 'border-gray-300'
          }`}
        />
        {state.errors?.confirmPassword && (
          <p className="text-red-500 text-sm mt-1">
            {state.errors.confirmPassword[0]}
          </p>
        )}
      </div>

      {/* Company Name */}
      <div>
        <label htmlFor="companyName" className="block text-sm font-medium mb-2">
          Firmenname (Optional)
        </label>
        <input
          id="companyName"
          name="companyName"
          type="text"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg"
        />
      </div>

      {/* Terms */}
      <div className="flex items-center">
        <input
          id="acceptTerms"
          name="acceptTerms"
          type="checkbox"
          required
          className="w-4 h-4 rounded"
        />
        <label htmlFor="acceptTerms" className="ml-2 text-sm">
          Ich akzeptiere die <a href="/terms" className="text-blue-600">AGB</a>
        </label>
        {state.errors?.acceptTerms && (
          <p className="text-red-500 text-sm ml-2">
            {state.errors.acceptTerms[0]}
          </p>
        )}
      </div>

      {/* Status Messages */}
      {state.success && (
        <div className="p-4 bg-green-50 border border-green-200 rounded-lg text-green-800">
          {state.message}
        </div>
      )}

      {state.errors?.server && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-800">
          {state.errors.server[0]}
        </div>
      )}

      <SubmitButton />
    </form>
  );
}
```

---

## 🚀 ADVANCED PATTERNS

### Pattern 1: Conditional Validation (Abhängige Felder)

```typescript
export const AddressSchema = z.object({
  country: z.enum(['DE', 'AT', 'CH']),
  zipCode: z.string(),
}).superRefine(({ country, zipCode }, ctx) => {
  // Validiere zipCode nur basierend auf country
  if (country === 'DE' && zipCode.length !== 5) {
    ctx.addIssue({
      code: 'custom',
      message: 'Deutsche Postleitzahlen haben 5 Ziffern',
      path: ['zipCode'],
    });
  }
  if (country === 'AT' && zipCode.length !== 4) {
    ctx.addIssue({
      code: 'custom',
      message: 'Österreichische Postleitzahlen haben 4 Ziffern',
      path: ['zipCode'],
    });
  }
});
```

### Pattern 2: Transform & Coerce

```typescript
export const PricingSchema = z.object({
  price: z.coerce.number() // String → Number conversion
    .positive("Preis muss positiv sein")
    .max(9999, "Maximaler Preis: 9999€"),
  
  discount: z.string()
    .transform(val => parseFloat(val)) // "10.5" → 10.5
    .pipe(z.number().min(0).max(100)),
  
  email: z.string()
    .toLowerCase()
    .trim(), // Daten automatisch normalisieren
});
```

---

## 🔗 SYNERGIEN MIT ANDEREN LEARNINGS

### 1. **Server Actions** (file:319)
Server Actions + Zod = Die perfekte Kombination:
- Client sendet FormData
- Server validiert sofort mit Zod
- Type-safe result.data für DB-Insert

### 2. **Error Boundaries** (file:321)
Zod Fehler werden in Server Actions gefangen → Error Boundary rendert Error UI.

### 3. **Type Safety Across Stack**
```typescript
// lib/schemas.ts
export type UserData = z.infer<typeof UserSchema>;

// components/UserCard.tsx (type-safe prop)
function UserCard({ user }: { user: UserData }) {
  // TypeScript weiß GENAU welche Props user hat
}
```

---

## ✅ VIRON CHECKLIST

- [ ] Alle Formulare haben Zod-Schemas
- [ ] Schemas sind in `lib/schemas.ts` zentralisiert
- [ ] Jede Server Action nutzt `safeParse()`
- [ ] `z.infer<>` für automatische TypeScript-Types
- [ ] Field-Level Error-Messages sind multilingua
- [ ] Error-UI zeigt keine sensiblen Daten (kein Stack-Trace)
- [ ] k6 Test: Validation unter Last (100+ concurrent)
- [ ] Sentry Integration: Invalid Data wird geloggt

---

**Dokument Version:** 2.0 | **Erstellt:** 13. Januar 2026 | **Status:** Production Ready  
**Nächste Review:** Q2 2026 (Zod 5.0 mit native validation)
