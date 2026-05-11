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
      },
      backgroundImage: {
        'nexus-gradient': 'linear-gradient(135deg, #050505 0%, #101010 100%)',
        'nexus-glow': 'radial-gradient(circle at 50% 50%, rgba(0, 242, 255, 0.15) 0%, transparent 70%)',
      },
      boxShadow: {
        'nexus-glass': '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
        'nexus-neon': '0 0 15px rgba(0, 242, 255, 0.5)',
      },
    },
  },
  plugins: [],
}
