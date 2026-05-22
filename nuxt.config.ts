import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  css: ['./assets/css/tailwind.css'],
  
  runtimeConfig: {
    public: {
      // Saat production di Vercel, arahkan ke rute lokal '/api' agar memicu routeRules
      apiBase: process.env.NODE_ENV === 'production' ? '/api' : 'http://localhost:8000/api',
      storageUrl: process.env.NUXT_PUBLIC_STORAGE_URL || 'http://localhost:8000/storage'
    }
  },
  
  routeRules: {
    '/api/**': { 
      // Alihkan request dari Vercel langsung ke backend InfinityFree
      proxy: 'https://laravel-backending.infinityfreeapp.com/api/**',
      // Manipulasi header agar lolos dari verifikasi Bot sistem InfinityFree
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
