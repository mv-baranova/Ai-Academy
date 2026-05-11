/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'nexus-blue': '#00f2ff',
        'nexus-purple': '#7000ff',
        'nexus-dark': '#050505',
        'nexus-gold': '#ffb800',
        'nexus-deep': '#020205',
      },
      backgroundImage: {
        'nexus-gradient': 'radial-gradient(circle at 50% 50%, #111111 0%, #020205 100%)',
        'nexus-glow': 'radial-gradient(circle at 50% 50%, rgba(0, 242, 255, 0.15) 0%, transparent 70%)',
        'nexus-glow-purple': 'radial-gradient(circle at 50% 50%, rgba(112, 0, 255, 0.1) 0%, transparent 70%)',
      },
      boxShadow: {
        'nexus-glass': '0 8px 32px 0 rgba(0, 0, 0, 0.8)',
        'nexus-neon': '0 0 25px rgba(0, 242, 255, 0.4)',
        'nexus-neon-purple': '0 0 25px rgba(112, 0, 255, 0.4)',
        'premium': '0 20px 50px rgba(0, 0, 0, 0.5), inset 0 1px 1px rgba(255, 255, 255, 0.1)',
      },
      borderRadius: {
        '3xl': '2rem',
        '4xl': '3rem',
        '5xl': '4rem',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        }
      }
    },
  },
  plugins: [],
}
