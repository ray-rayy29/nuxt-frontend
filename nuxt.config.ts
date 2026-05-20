import tailwindcss from "@tailwindcss/vite";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  css: ['./assets/css/tailwind.css'],
  
  // Tambahkan runtime config untuk environment variables
  runtimeConfig: {
    public: {
      apiBase: process.env.NUXT_PUBLIC_API_URL || 'http://localhost:8000/api',
      storageUrl: process.env.NUXT_PUBLIC_STORAGE_URL || 'http://localhost:8000/storage'
    }
  },
  
  // Konfigurasi untuk production
  nitro: {
    preset: 'vercel',
    compressPublicAssets: true
  },
  
  vite: {
    plugins: [
      tailwindcss(),
    ],
  },
});
