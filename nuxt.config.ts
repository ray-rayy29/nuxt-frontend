import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  css: ['./assets/css/tailwind.css'],
  
  runtimeConfig: {
    public: {
      // Di production, biarkan dia menembak ke url lokal '/api' agar lewat proxy Vercel
      apiBase: process.env.NODE_ENV === 'production' ? '/api' : 'http://localhost:8000/api',
      storageUrl: process.env.NUXT_PUBLIC_STORAGE_URL || 'http://localhost:8000/storage'
    }
  },
  
  // TAMBAHKAN ROUTE RULES PROXY INI 👇
  routeRules: {
    '/api/**': { 
      proxy: 'https://laravel-backending.infinityfreeapp.com/api/**' 
    }
  },
  
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
