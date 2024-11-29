import typography from '@tailwindcss/typography';
import scrollbar from 'tailwind-scrollbar';
import type { Config } from 'tailwindcss';
import animate from 'tailwindcss-animate';

/** @type {import('tailwindcss').Config} */
const config: Config = {
  content: ['./index.html', './src/**/*.{ts,tsx,css}'],
  theme: {
    extend: {
      screens: {
        xl: '1280px',
        '2xl': '1536px',
        '3xl': '1920px',
      },
      colors: {
        fern: {
          '50': '#f3faf3',
          '100': '#e3f5e3',
          '200': '#c9e9ca',
          '300': '#9ed7a1',
          '400': '#5eb663',
          '500': '#47a04d',
          '600': '#36833a',
          '700': '#2d6831',
          '800': '#28532b',
          '900': '#224525',
          '950': '#0e2511',
        },
        steel: {
          '50': '#f6f5f6',
          '100': '#e7e6e7',
          '200': '#d1d0d1',
          '300': '#b0afb1',
          '400': '#888789',
          '500': '#6d6c6e',
          '600': '#5d5c5e',
          '700': '#504e50',
          '800': '#464446',
          '900': '#3d3c3d',
          '950': '#313031',
        },
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.1s ease-out',
        'accordion-up': 'accordion-up 0.1s ease-out',
      },
      boxShadow: {
        sm: '0 1px 2px 0 rgba(0, 0, 0, 0.15)',
        DEFAULT: '0 1px 3px 0 rgba(0, 0, 0, 0.2), 0 1px 2px -1px rgba(0, 0, 0, 0.2)',
        md: '0 4px 6px -1px rgba(0, 0, 0, 0.25), 0 2px 4px -2px rgba(0, 0, 0, 0.25)',
        lg: '0 10px 15px -3px rgba(0, 0, 0, 0.3), 0 4px 6px -4px rgba(0, 0, 0, 0.3)',
        xl: '0 20px 25px -5px rgba(0, 0, 0, 0.35), 0 8px 10px -6px rgba(0, 0, 0, 0.35)',
        '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.4)',
        inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.15)',
      },
    },
  },
  plugins: [animate, scrollbar, typography],
};

export default config;
