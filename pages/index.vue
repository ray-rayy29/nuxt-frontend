<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800">
    <div class="container mx-auto px-4 py-16">
      <div class="flex justify-center items-center min-h-screen">
        <div class="w-full max-w-md">
          <!-- Logo / Header -->
          <div class="text-center mb-8">
            <div class="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-r from-blue-500 to-emerald-500 shadow-lg mb-4">
              <svg class="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"></path>
              </svg>
            </div>
            <h1 class="text-3xl font-bold bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">
              Sistem CRUD Laravel Nuxt
            </h1>
            <p class="text-slate-400 mt-2">Silakan login untuk melanjutkan</p>
          </div>

          <!-- Form Login Card -->
          <div class="bg-slate-800/60 backdrop-blur-sm rounded-2xl border border-slate-700/50 shadow-2xl p-8">
            <form @submit.prevent="handleLogin" class="space-y-6">
              <!-- Email -->
              <div>
                <label class="block text-sm font-medium text-slate-300 mb-2">Email</label>
                <div class="relative">
                  <svg class="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                  </svg>
                  <input
                    v-model="form.email"
                    type="email"
                    placeholder="Masukkan email"
                    class="w-full bg-slate-700/50 border border-slate-600/50 rounded-xl pl-12 pr-4 py-3 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent transition-all duration-200"
                    required
                  />
                </div>
              </div>

              <!-- Password -->
              <div>
                <label class="block text-sm font-medium text-slate-300 mb-2">Password</label>
                <div class="relative">
                  <svg class="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
                  </svg>
                  <input
                    v-model="form.password"
                    :type="showPassword ? 'text' : 'password'"
                    placeholder="Masukkan password"
                    class="w-full bg-slate-700/50 border border-slate-600/50 rounded-xl pl-12 pr-12 py-3 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent transition-all duration-200"
                    required
                  />
                  <button
                    type="button"
                    @click="showPassword = !showPassword"
                    class="absolute right-4 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-white transition-colors duration-200"
                  >
                    <svg v-if="!showPassword" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                    </svg>
                    <svg v-else class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"></path>
                    </svg>
                  </button>
                </div>
              </div>

              <!-- Remember Me -->
              <div class="flex items-center justify-between">
                <label class="flex items-center space-x-2 cursor-pointer">
                  <input type="checkbox" v-model="rememberMe" class="w-4 h-4 text-blue-500 rounded border-slate-600 focus:ring-blue-500 focus:ring-offset-0">
                  <span class="text-sm text-slate-400">Ingat saya</span>
                </label>
              </div>

              <!-- Submit Button -->
              <button
                type="submit"
                :disabled="loading"
                class="w-full bg-gradient-to-r from-blue-500 to-emerald-500 hover:from-blue-600 hover:to-emerald-600 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200 transform hover:scale-[1.02] shadow-lg shadow-blue-500/25 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span v-if="!loading" class="flex items-center justify-center">
                  <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"></path>
                  </svg>
                  Login
                </span>
                <span v-else class="flex items-center justify-center">
                  <svg class="animate-spin h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Memproses...
                </span>
              </button>

              <!-- Link to Register -->
              <div class="text-center">
                <p class="text-sm text-slate-400">
                  Belum punya akun?
                  <NuxtLink to="/register" class="text-blue-400 hover:text-blue-300 font-medium transition-colors duration-200">
                    Daftar di sini
                  </NuxtLink>
                </p>
              </div>
            </form>
          </div>

          <!-- Footer -->
          <div class="text-center mt-8">
            <p class="text-slate-500 text-sm">
              © 2024 Sistem CRUD Laravel Nuxt | Rayhan Fadhillah
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const loading = ref(false)
const showPassword = ref(false)
const rememberMe = ref(false)

const form = ref({
  email: '',
  password: ''
})

// === SEKARANG KITA PAKAI RUTE RELATIF UNTUK PROXY ===
const API_PATH = '/api/login'

// Handle Login
// Handle Login yang sudah diperbaiki
const handleLogin = async () => {
  if (!form.value.email || !form.value.password) {
    alert('Email dan password harus diisi!')
    return
  }

  loading.value = true

  try {
    const data = await $fetch(API_PATH, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
      },
      body: {
        email: form.value.email,
        password: form.value.password
      },
    })

    // KITA PERBAIKI LOGIKANYA DI SINI 👇
    // Kita cek apakah data user dibungkus di dalam 'data.user' atau langsung ada di 'data'
    const targetUser = data.user || data

    if (targetUser && targetUser.name && targetUser.email) {
      // Simpan data user ke storage
      const userData = {
        id: targetUser.id || 1,
        name: targetUser.name,
        email: targetUser.email,
        loginTime: new Date().toISOString()
      }

      if (rememberMe.value) {
        localStorage.setItem('user', JSON.stringify(userData))
        localStorage.setItem('isLoggedIn', 'true')
      } else {
        sessionStorage.setItem('user', JSON.stringify(userData))
        sessionStorage.setItem('isLoggedIn', 'true')
      }

      alert(`Selamat datang, ${targetUser.name}!`)
      router.push('/buku')
    } else {
      // Jika masih tidak terbaca, kita alert isi data aslinya biar kelihatan
      alert('Login gagal! Server merespons: ' + JSON.stringify(data))
    }

  } catch (err) {
    console.error('Error aslinya:', err)
    const errorMsg = err.data?.message || 'Gagal terhubung ke server atau password salah!'
    alert(errorMsg)
  } finally {
    loading.value = false
  }
}

// Cek apakah sudah login
onMounted(() => {
  const isLoggedIn = localStorage.getItem('isLoggedIn') || sessionStorage.getItem('isLoggedIn')
  if (isLoggedIn === 'true') {
    router.push('/buku')
  }
})
</script>
