<template>
  <nav class="bg-slate-800/60 backdrop-blur-sm border-b border-slate-700/50 sticky top-0 z-50">
    <div class="container mx-auto px-4">
      <div class="flex justify-between items-center py-4">
        <!-- Logo -->
        <NuxtLink to="/buku" class="flex items-center space-x-3 hover:opacity-80 transition-opacity duration-200">
          <div class="w-2 h-8 bg-gradient-to-b from-blue-400 to-emerald-400 rounded-full"></div>
          <div>
            <h1 class="text-xl font-bold bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">
              Sistem CRUD
            </h1>
            <p class="text-xs text-slate-500">Laravel Nuxt</p>
          </div>
        </NuxtLink>

        <!-- Navigation Links (Desktop) -->
        <div class="hidden md:flex items-center space-x-1">
          <NuxtLink 
            to="/buku" 
            class="px-4 py-2 rounded-xl transition-all duration-200 flex items-center space-x-2"
            :class="currentPage === 'buku' ? 'bg-blue-500/20 text-blue-400' : 'text-slate-300 hover:bg-slate-700/50'"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/>
            </svg>
            <span>Buku</span>
          </NuxtLink>

          <NuxtLink 
            to="/buku_tematik" 
            class="px-4 py-2 rounded-xl transition-all duration-200 flex items-center space-x-2"
            :class="currentPage === 'buku_tematik' ? 'bg-blue-500/20 text-blue-400' : 'text-slate-300 hover:bg-slate-700/50'"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m6-10.747c1.174.07 2.175.35 3 .747v13c-1.168-.776-2.754-1.253-4.5-1.253-1.747 0-3.333.477-4.5 1.253m0-13c-1.168-.776-2.754-1.253-4.5-1.253-1.747 0-3.333.477-4.5 1.253v13c1.168-.776 2.754-1.253 4.5-1.253 1.746 0 3.332.477 4.5 1.253" />
            </svg>
            <span>Buku Tematik</span>
          </NuxtLink>

          <NuxtLink 
            to="/atk" 
            class="px-4 py-2 rounded-xl transition-all duration-200 flex items-center space-x-2"
            :class="currentPage === 'atk' ? 'bg-blue-500/20 text-blue-400' : 'text-slate-300 hover:bg-slate-700/50'"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 5v2m0 4v2m0 4v2M5 5h14a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2z"/>
            </svg>
            <span>ATK</span>
          </NuxtLink>

          <NuxtLink 
            to="/barang" 
            class="px-4 py-2 rounded-xl transition-all duration-200 flex items-center space-x-2"
            :class="currentPage === 'barang' ? 'bg-blue-500/20 text-blue-400' : 'text-slate-300 hover:bg-slate-700/50'"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"/>
            </svg>
            <span>Barang</span>
          </NuxtLink>
        </div>

        <!-- User Info & Logout -->
        <div class="flex items-center space-x-4">
          <div class="text-right hidden sm:block">
            <p class="text-xs text-slate-400">Welcome,</p>
            <p class="text-sm font-semibold text-white">{{ currentUser?.name || 'User' }}</p>
          </div>
          <button
            @click="handleLogout"
            class="bg-red-500/20 hover:bg-red-500/30 border border-red-500/50 text-red-400 px-4 py-2 rounded-xl transition-all duration-200 flex items-center space-x-2"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/>
            </svg>
            <span class="hidden sm:inline">Logout</span>
          </button>
        </div>

        <!-- Mobile Menu Button -->
        <button 
          @click="mobileMenuOpen = !mobileMenuOpen"
          class="md:hidden p-2 rounded-lg hover:bg-slate-700/50 transition-colors duration-200"
        >
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path v-if="!mobileMenuOpen" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
            <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
          </svg>
        </button>
      </div>

      <!-- Mobile Menu -->
      <div v-if="mobileMenuOpen" class="md:hidden py-4 border-t border-slate-700/50">
        <div class="flex flex-col space-y-2">
          <NuxtLink 
            to="/buku" 
            class="px-4 py-3 rounded-xl transition-all duration-200 flex items-center space-x-3"
            :class="currentPage === 'buku' ? 'bg-blue-500/20 text-blue-400' : 'text-slate-300 hover:bg-slate-700/50'"
            @click="mobileMenuOpen = false"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/>
            </svg>
            <span>Buku</span>
          </NuxtLink>

          <NuxtLink 
            to="/buku_tematik" 
            class="px-4 py-3 rounded-xl transition-all duration-200 flex items-center space-x-3"
            :class="currentPage === 'buku_tematik' ? 'bg-blue-500/20 text-blue-400' : 'text-slate-300 hover:bg-slate-700/50'"
            @click="mobileMenuOpen = false"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m6-10.747c1.174.07 2.175.35 3 .747v13c-1.168-.776-2.754-1.253-4.5-1.253-1.747 0-3.333.477-4.5 1.253m0-13c-1.168-.776-2.754-1.253-4.5-1.253-1.747 0-3.333.477-4.5 1.253v13c1.168-.776 2.754-1.253 4.5-1.253 1.746 0 3.332.477 4.5 1.253" />
            </svg>
            <span>Buku Tematik</span>
          </NuxtLink>

          <NuxtLink 
            to="/atk" 
            class="px-4 py-3 rounded-xl transition-all duration-200 flex items-center space-x-3"
            :class="currentPage === 'atk' ? 'bg-blue-500/20 text-blue-400' : 'text-slate-300 hover:bg-slate-700/50'"
            @click="mobileMenuOpen = false"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 5v2m0 4v2m0 4v2M5 5h14a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2z"/>
            </svg>
            <span>ATK</span>
          </NuxtLink>

          <NuxtLink 
            to="/barang" 
            class="px-4 py-3 rounded-xl transition-all duration-200 flex items-center space-x-3"
            :class="currentPage === 'barang' ? 'bg-blue-500/20 text-blue-400' : 'text-slate-300 hover:bg-slate-700/50'"
            @click="mobileMenuOpen = false"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"/>
            </svg>
            <span>Barang</span>
          </NuxtLink>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const props = defineProps({
  currentPage: {
    type: String,
    default: 'buku'
  }
})

const router = useRouter()
const mobileMenuOpen = ref(false)
const currentUser = ref(null)

// Gunakan runtime config
const config = useRuntimeConfig()
const API_URL = config.public.apiBase

// Logout
const handleLogout = async () => {
  if (confirm('Yakin ingin logout?')) {
    try {
      await fetch(`${API_URL}/logout`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      })
    } catch (err) {
      console.error('Logout API error:', err)
    }
    
    localStorage.removeItem('user')
    localStorage.removeItem('isLoggedIn')
    sessionStorage.removeItem('user')
    sessionStorage.removeItem('isLoggedIn')
    
    router.push('/')
  }
}

onMounted(() => {
  const userData = localStorage.getItem('user') || sessionStorage.getItem('user')
  if (userData) {
    currentUser.value = JSON.parse(userData)
  }
})
</script>
