import react from '@vitejs/plugin-react';
import autoprefixer from 'autoprefixer';
import path from 'path';
import tailwindcss from 'tailwindcss';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [react()],
  css: {
    postcss: {
      plugins: [tailwindcss, autoprefixer],
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    target: 'es2020',
    sourcemap: true,
    rollupOptions: {
      output: {
        manualChunks: {
          // group react dependencies together
          'vendor-react': ['react', 'react-dom', 'react-router-dom'],

          // group radix ui components
          'vendor-radix': [
            '@radix-ui/react-accordion',
            '@radix-ui/react-avatar',
            '@radix-ui/react-dialog',
            '@radix-ui/react-dropdown-menu',
            '@radix-ui/react-label',
            '@radix-ui/react-popover',
            '@radix-ui/react-scroll-area',
            '@radix-ui/react-slot',
            '@radix-ui/react-tabs',
            '@radix-ui/react-toggle',
            '@radix-ui/react-toggle-group',
            '@radix-ui/react-tooltip',
          ],

          // group form-related dependencies
          'vendor-form': ['react-hook-form', '@hookform/resolvers', 'zod'],

          // group utility libraries
          'vendor-utils': [
            'class-variance-authority',
            'clsx',
            'tailwind-merge',
            'zustand',
          ],

          // group blueprint stuffs
          'vendor-blueprint': ['pako'],

          // group supabase stuffs
          'vendor-supabase': ['@supabase/supabase-js'],

          // group markdown stuffs
          'vendor-markdown': ['@uiw/react-md-editor'],

          // group image stuffs
          'vendor-image': ['browser-image-compression'],
        },
        chunkFileNames: 'assets/js/[name]-[hash].js',
        entryFileNames: 'assets/js/[name]-[hash].js',
        assetFileNames: 'assets/[ext]/[name]-[hash].[ext]',
        // minimize property names
        compact: true,
      },
    },
    // enable minification optimizations
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
    // reduce chunk size warnings threshold
    chunkSizeWarningLimit: 1000,
    // enable build-time optimizations
    reportCompressedSize: true,
  },
});
