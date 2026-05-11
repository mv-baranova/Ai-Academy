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
      },
      backgroundImage: {
        'nexus-gradient': 'radial-gradient(circle at 50% 50%, #1a1a1a 0%, #050505 100%)',
        'nexus-glow': 'radial-gradient(circle at 50% 50%, rgba(0, 242, 255, 0.1) 0%, transparent 70%)',
      },
      boxShadow: {
        'nexus-glass': '0 8px 32px 0 rgba(0, 0, 0, 0.8)',
        'nexus-neon': '0 0 20px rgba(0, 242, 255, 0.3)',
        'nexus-neon-purple': '0 0 20px rgba(112, 0, 255, 0.3)',
      },
      borderRadius: {
        '3xl': '2rem',
        '4xl': '3rem',
      }
    },
  },
  plugins: [],
}
