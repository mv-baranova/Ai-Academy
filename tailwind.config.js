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
        'nexus-dark': '#010103',
        'nexus-gold': '#ffb800',
        'nexus-deep': '#000000',
        'nexus-accent': '#ff2e63',
      },
      backgroundImage: {
        'nexus-gradient': 'radial-gradient(circle at 50% 50%, #0a0a0f 0%, #000000 100%)',
        'premium-glass': 'linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.02) 100%)',
        'hologram-gradient': 'linear-gradient(90deg, transparent, rgba(0,242,255,0.2), transparent)',
      },
      boxShadow: {
        'spatial': '0 25px 60px -15px rgba(0, 0, 0, 0.9)',
        'hologram': '0 0 30px rgba(0, 242, 255, 0.3), inset 0 0 15px rgba(0, 242, 255, 0.2)',
        'premium-glow': '0 0 50px rgba(0, 242, 255, 0.1), inset 0 1px 1px rgba(255, 255, 255, 0.1)',
      },
      borderRadius: {
        '4xl': '2.5rem',
        '5xl': '3.5rem',
        '6xl': '5rem',
      },
      animation: {
        'float-slow': 'float 8s ease-in-out infinite',
        'glow-pulse': 'glow-pulse 3s ease-in-out infinite',
        'spin-slow': 'spin 12s linear infinite',
        'hologram-flicker': 'hologram-flicker 2s infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0) rotate(0deg)' },
          '50%': { transform: 'translateY(-30px) rotate(1deg)' },
        },
        'glow-pulse': {
          '0%, 100%': { opacity: 0.3, transform: 'scale(1)' },
          '50%': { opacity: 0.6, transform: 'scale(1.02)' },
        },
        'hologram-flicker': {
          '0%, 19.99%, 22%, 62.99%, 64%, 64.99%, 70%, 100%': { opacity: 1, filter: 'hue-rotate(0deg)' },
          '20%, 21.99%, 63%, 63.99%, 65%, 69.99%': { opacity: 0.4, filter: 'hue-rotate(90deg)' },
        }
      }
    },
  },
  plugins: [],
}
