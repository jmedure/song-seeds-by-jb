/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  darkMode: 'class',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
    './src/app/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      animation: {
        'slide-in-right': 'slideInRight 0.5s ease-out',
        'slide-out-left': 'slideOutLeft 0.5s ease-out',
        flip: 'flip 100ms ease-in-out',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        'j-blue': '#3756C3',
      },
      fontFamily: {
        fruit: ['CardinalFruit', 'serif'],
        mont: ['NeueMontreal', 'sans'],
      },
      keyframes: {
        slideInRight: {
          from: {
            transform: 'translateX(100%)',
          },
          to: {
            transform: 'translateX(0)',
          },
        },
        slideOutLeft: {
          from: {
            transform: 'translateX(0)',
          },
          to: {
            transform: 'translateX(-100%)',
          },
        },
        wiggle: {
          '0%, 100%': {
            transform: 'rotate(-1deg) translateY(-1%)',
          },
          '50%': { transform: 'rotate(1deg) translateY(4%)' },
        },
        wiggle1: {
          '0%, 100%': {
            transform: 'rotate(-1deg) translateY(-2%)',
          },
          '50%': { transform: 'rotate(2deg) translateY(4%)' },
        },
        bouncy: {
          '0%, 100%': {
            transform: 'translateY(-25%)',
          },
          '50%': {
            transform: 'translateY(25%)',
          },
        },
        flip: {
          '0%': { transform: 'rotateY(180deg)' },
        },
      },
    },
  },
  plugins: [require('tailwindcss-3d')({ legacy: true })],
};
