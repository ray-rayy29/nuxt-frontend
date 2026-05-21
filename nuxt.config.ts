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
  
  // PERBAIKAN BLOCK PROXY & HEADERS DI SINI 👇
  routeRules: {
    '/api/**': { 
      // 1. Alihkan request langsung ke backend InfinityFree
      proxy: 'https://laravel-backending.infinityfreeapp.com/api/**',
      
      // 2. Suntikkan header browser asli agar dikira manusia oleh proteksi AES Bot InfinityFree
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
        'Accept': 'application/json',
        'X-Requested-With': 'XMLHttpRequest'
      }
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
