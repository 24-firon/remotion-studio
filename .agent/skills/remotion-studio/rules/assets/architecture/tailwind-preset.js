
/** @type {import('tailwindcss').Config} */

module.exports = {

  theme: {

    extend: {

      colors: {

        brand: {

          50: '#fff1f1',

          100: '#ffe1e1',

          200: '#ffc7c7',

          300: '#ff9d9d',

          400: '#ff6464',

          500: '#ff4d4d',

          600: '#ed1515',

          700: '#c80d0d',

          800: '#a50f0f',

          900: '#1a0000',

        },

        cyber: {

          cyan: '#00ffff',

          magenta: '#ff00ff',

          yellow: '#ffff00',

        },

        // Semantic Colors (shadcn/ui compatible fallback)

        background: 'hsl(var(--background))',

        foreground: 'hsl(var(--foreground))',

        primary: {

          DEFAULT: 'hsl(var(--primary))',

          foreground: 'hsl(var(--primary-foreground))',

        },

      },

      fontFamily: {

        sans: ['Inter', 'system-ui', 'sans-serif'],

        mono: ['JetBrains Mono', 'Courier New', 'monospace'],

        display: ['Cal Sans', 'Inter', 'system-ui', 'sans-serif'],

      },

      animation: {

        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',

        'float': 'float 6s ease-in-out infinite',

      },

      keyframes: {

        float: {

          '0%, 100%': { transform: 'translateY(0px)' },

          '50%': { transform: 'translateY(-20px)' },

        },

      },

    },

  },

  plugins: [

    require('@tailwindcss/typography'),

    require('@tailwindcss/forms'),

    require('@tailwindcss/container-queries'),

  ],

};

