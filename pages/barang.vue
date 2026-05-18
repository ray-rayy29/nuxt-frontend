<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 text-white">
    <Navbar :current-page="'barang'" />

    <div class="container mx-auto px-4 py-8">
      <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
        <div>
          <h1 class="text-2xl font-bold bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">
            Manajemen Barang
          </h1>
          <p class="text-slate-400 text-sm">Kelola data barang inventaris</p>
        </div>
        <button
          @click="openAddModal"
          class="bg-gradient-to-r from-blue-500 to-emerald-500 hover:from-blue-600 hover:to-emerald-600 text-white font-semibold py-2 px-5 rounded-xl transition-all duration-200 flex items-center space-x-2 text-sm"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          <span>Tambah Barang</span>
        </button>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <div class="bg-slate-800/60 rounded-xl border border-slate-700/50 p-4">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-slate-400 text-xs">Total Barang</p>
              <p class="text-2xl font-bold text-blue-400">{{ dataList.length }}</p>
            </div>
            <div class="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center">
              <svg class="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
              </svg>
            </div>
          </div>
        </div>
        <div class="bg-slate-800/60 rounded-xl border border-slate-700/50 p-4">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-slate-400 text-xs">Total Stok</p>
              <p class="text-2xl font-bold text-emerald-400">{{ totalStok }}</p>
            </div>
            <div class="w-10 h-10 bg-emerald-500/20 rounded-lg flex items-center justify-center">
              <svg class="w-5 h-5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 8h14l-1 12H6L5 8zm2-4h10l1 4H6l1-4z" />
              </svg>
            </div>
          </div>
        </div>
        <div class="bg-slate-800/60 rounded-xl border border-slate-700/50 p-4">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-slate-400 text-xs">Total Merk</p>
              <p class="text-2xl font-bold text-purple-400">{{ totalMerk }}</p>
            </div>
            <div class="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center">
              <svg class="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M3 11l8.5-8.5a2.121 2.121 0 013 0L21 9v8a4 4 0 01-4 4H9l-6-6v-4z" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      <div class="bg-slate-800/60 rounded-xl border border-slate-700/50 p-4 mb-6">
        <div class="flex flex-col lg:flex-row gap-3">
          <div class="flex-1">
            <input
              v-model="searchQuery"
              @input="handleSearch"
              type="text"
              placeholder="Cari nama atau merk barang..."
              class="w-full bg-slate-700/50 border border-slate-600/50 rounded-lg px-4 py-2 text-white placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50"
            />
          </div>
          <div class="flex gap-2">
            <select v-model="searchCategory" @change="handleSearch" class="bg-slate-700/50 border border-slate-600/50 text-white rounded-lg px-3 py-2 text-sm">
              <option value="all">Semua</option>
              <option value="nama">Nama</option>
              <option value="merk">Merk</option>
            </select>
            <button @click="clearSearch" class="bg-slate-700/50 hover:bg-slate-600/50 border border-slate-600/50 text-slate-300 px-3 py-2 rounded-lg text-sm">Reset</button>
            <button @click="exportToExcel" class="bg-green-600/20 hover:bg-green-600/30 border border-green-500/50 text-green-400 px-3 py-2 rounded-lg text-sm">Export</button>
          </div>
        </div>
      </div>

      <div class="bg-slate-800/60 rounded-xl border border-slate-700/50 overflow-hidden">
        <div class="overflow-x-auto">
          <table class="w-full text-sm">
            <thead class="bg-slate-700/50">
              <tr>
                <th class="py-3 px-3 text-left text-slate-300">NO</th>
                <th @click="sortData('nama')" class="py-3 px-3 text-left text-slate-300 cursor-pointer hover:bg-slate-600/50">Nama</th>
                <th @click="sortData('merk')" class="py-3 px-3 text-left text-slate-300 cursor-pointer hover:bg-slate-600/50">Merk</th>
                <th @click="sortData('stok')" class="py-3 px-3 text-left text-slate-300 cursor-pointer hover:bg-slate-600/50">Stok</th>
                <th class="py-3 px-3 text-center text-slate-300">Aksi</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-700/30">
              <tr v-for="(item, index) in paginatedData" :key="item.id" class="hover:bg-slate-700/30">
                <td class="py-2 px-3">{{ getRowNumber(index) }}</td>
                <td class="py-2 px-3">
                  <div class="flex items-center space-x-2">
                    <img v-if="item.gambar" :src="getImageUrl(item.gambar)" class="w-8 h-8 rounded object-cover">
                    <span>{{ item.nama }}</span>
                  </div>
                </td>
                <td class="py-2 px-3">{{ item.merk }}</td>
                <td class="py-2 px-3">
                  <div class="flex items-center space-x-1">
                    <span :class="item.stok > 0 ? 'text-green-400' : 'text-red-400'">{{ item.stok }}</span>
                    <button @click="tambahStok(item)" class="bg-green-500/20 hover:bg-green-500/30 text-green-400 w-5 h-5 rounded text-xs">+</button>
                    <button v-if="item.stok > 0" @click="kurangiStok(item)" class="bg-yellow-500/20 hover:bg-yellow-500/30 text-yellow-400 w-5 h-5 rounded text-xs">-</button>
                  </div>
                </td>
                <td class="py-2 px-3 text-center">
                  <div class="flex justify-center space-x-1">
                    <button @click="editData(item)" class="bg-yellow-500/20 hover:bg-yellow-500/30 text-yellow-400 p-1 rounded" title="Edit">
                      <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                    </button>
                    <button @click="deleteData(item.id)" class="bg-red-500/20 hover:bg-red-500/30 text-red-400 p-1 rounded" title="Hapus">
                      <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                </td>
              </tr>
              <tr v-if="!paginatedData.length">
                <td colspan="5" class="py-10 text-center text-slate-400">Belum ada data</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="px-4 py-3 border-t border-slate-700/50 flex flex-col sm:flex-row justify-between items-center gap-3 text-sm">
          <div class="text-slate-400">Menampilkan {{ startIndex }} - {{ endIndex }} dari {{ filteredData.length }} data</div>
          <div class="flex items-center space-x-2">
            <button @click="prevPage" :disabled="currentPage === 1" class="p-1.5 rounded border border-slate-600 disabled:opacity-50">Prev</button>
            <span class="px-3 py-1 bg-slate-700/50 rounded">Halaman {{ currentPage }} dari {{ totalPages }}</span>
            <button @click="nextPage" :disabled="currentPage === totalPages" class="p-1.5 rounded border border-slate-600 disabled:opacity-50">Next</button>
            <select v-model="itemsPerPage" @change="resetPagination" class="bg-slate-700/50 border border-slate-600/50 rounded px-2 py-1 text-sm">
              <option :value="5">5</option>
              <option :value="10">10</option>
              <option :value="25">25</option>
            </select>
          </div>
        </div>
      </div>
    </div>

    <div v-if="modalOpen" class="fixed inset-0 z-50 flex items-center justify-center px-4">
      <div class="fixed inset-0 bg-black/70" @click="closeModal"></div>
      <div class="relative bg-slate-800 rounded-xl w-full max-w-md max-h-[85vh] overflow-y-auto border border-slate-700">
        <div class="sticky top-0 bg-slate-800 p-4 border-b border-slate-700 flex justify-between items-center">
          <h2 class="text-lg font-semibold">{{ isEditing ? 'Edit Barang' : 'Tambah Barang' }}</h2>
          <button @click="closeModal" class="text-slate-400 hover:text-white text-xl">x</button>
        </div>
        <form @submit.prevent="isEditing ? updateData() : addData()" enctype="multipart/form-data" class="p-4 space-y-3">
          <div>
            <label class="block text-xs text-slate-400 mb-1">Nama</label>
            <input v-model="form.nama" type="text" class="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-3 py-2 text-white text-sm" required />
          </div>
          <div>
            <label class="block text-xs text-slate-400 mb-1">Merk</label>
            <input v-model="form.merk" type="text" class="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-3 py-2 text-white text-sm" required />
          </div>
          <div>
            <label class="block text-xs text-slate-400 mb-1">Stok</label>
            <input v-model.number="form.stok" type="number" min="0" class="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-3 py-2 text-white text-sm" required />
          </div>
          <div>
            <label class="block text-xs text-slate-400 mb-1">Gambar</label>
            <input type="file" @change="handleFileUpload" accept="image/*" class="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-3 py-2 text-white text-sm" />
            <img v-if="form.gambarPreview" :src="form.gambarPreview" class="mt-2 h-16 w-16 object-cover rounded">
          </div>
          <div class="flex space-x-3 pt-3">
            <button type="submit" :disabled="loading" class="flex-1 bg-gradient-to-r from-blue-500 to-emerald-500 text-white font-semibold py-2 rounded-lg text-sm">{{ loading ? 'Proses...' : (isEditing ? 'Update' : 'Simpan') }}</button>
            <button type="button" @click="closeModal" class="px-4 py-2 border border-slate-600 text-slate-300 rounded-lg text-sm">Batal</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import * as XLSX from 'xlsx'
import Navbar from '@/components/Navbar.vue'

const router = useRouter()
const modalOpen = ref(false)

const config = useRuntimeConfig()
const API_URL = `${config.public.apiBase}/barang`
const STORAGE_URL = config.public.storageUrl

const dataList = ref([])
const loading = ref(false)
const isEditing = ref(false)
const gambarFile = ref(null)

const form = ref({
  id: null,
  nama: '',
  merk: '',
  stok: 0,
  gambar: null,
  gambarPreview: null
})

const currentPage = ref(1)
const itemsPerPage = ref(10)
const searchQuery = ref('')
const searchCategory = ref('all')
const sortField = ref('id')
const sortDirection = ref('asc')

const totalStok = computed(() => dataList.value.reduce((sum, item) => sum + Number(item.stok || 0), 0))
const totalMerk = computed(() => new Set(dataList.value.map(item => item.merk).filter(Boolean)).size)

const filteredData = computed(() => {
  if (!searchQuery.value) return dataList.value
  const q = searchQuery.value.toLowerCase()

  return dataList.value.filter(item => {
    if (searchCategory.value === 'all') {
      return item.nama?.toLowerCase().includes(q) || item.merk?.toLowerCase().includes(q)
    }

    return item[searchCategory.value]?.toLowerCase().includes(q)
  })
})

const sortedData = computed(() => {
  const data = [...filteredData.value]
  return data.sort((a, b) => {
    let aVal = a[sortField.value] ?? ''
    let bVal = b[sortField.value] ?? ''

    if (sortField.value === 'stok') {
      aVal = Number(aVal)
      bVal = Number(bVal)
      return sortDirection.value === 'asc' ? aVal - bVal : bVal - aVal
    }

    aVal = String(aVal)
    bVal = String(bVal)
    return sortDirection.value === 'asc' ? aVal.localeCompare(bVal) : bVal.localeCompare(aVal)
  })
})

const totalPages = computed(() => Math.ceil(sortedData.value.length / itemsPerPage.value) || 1)
const paginatedData = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value
  return sortedData.value.slice(start, start + itemsPerPage.value)
})
const startIndex = computed(() => paginatedData.value.length ? (currentPage.value - 1) * itemsPerPage.value + 1 : 0)
const endIndex = computed(() => Math.min(currentPage.value * itemsPerPage.value, filteredData.value.length))

const getRowNumber = (index) => (currentPage.value - 1) * itemsPerPage.value + index + 1
const getImageUrl = (path) => path ? `${STORAGE_URL}/${path}` : ''

const handleSearch = () => { currentPage.value = 1 }
const clearSearch = () => { searchQuery.value = ''; searchCategory.value = 'all'; currentPage.value = 1 }
const sortData = (field) => {
  if (sortField.value === field) sortDirection.value = sortDirection.value === 'asc' ? 'desc' : 'asc'
  else { sortField.value = field; sortDirection.value = 'asc' }
}
const prevPage = () => { if (currentPage.value > 1) currentPage.value-- }
const nextPage = () => { if (currentPage.value < totalPages.value) currentPage.value++ }
const resetPagination = () => { currentPage.value = 1 }

const resetForm = () => {
  form.value = {
    id: null,
    nama: '',
    merk: '',
    stok: 0,
    gambar: null,
    gambarPreview: null
  }
  gambarFile.value = null
}

const openAddModal = () => {
  resetForm()
  isEditing.value = false
  modalOpen.value = true
}

const closeModal = () => {
  modalOpen.value = false
  resetForm()
}

const handleFileUpload = (event) => {
  const file = event.target.files[0]
  if (file) {
    if (file.size > 2 * 1024 * 1024) { alert('File maksimal 2MB'); return }
    gambarFile.value = file
    const reader = new FileReader()
    reader.onload = (e) => { form.value.gambarPreview = e.target.result }
    reader.readAsDataURL(file)
  }
}

const fetchData = async () => {
  try {
    const res = await fetch(API_URL)
    if (!res.ok) throw new Error()
    dataList.value = await res.json()
  } catch (err) {
    alert('Gagal memuat data!')
  }
}

const fillFormData = (source) => {
  const fd = new FormData()
  fd.append('nama', source.nama)
  fd.append('merk', source.merk)
  fd.append('stok', source.stok)
  if (gambarFile.value) fd.append('gambar', gambarFile.value)
  return fd
}

const addData = async () => {
  if (!form.value.nama || !form.value.merk) { alert('Isi nama dan merk barang!'); return }
  loading.value = true

  try {
    const res = await fetch(API_URL, { method: 'POST', body: fillFormData(form.value) })
    if (!res.ok) throw new Error()
    await fetchData()
    closeModal()
    alert('Data berhasil ditambahkan!')
  } catch (err) {
    alert('Gagal menambah data!')
  } finally {
    loading.value = false
  }
}

const editData = (item) => {
  form.value = { ...item, gambar: null, gambarPreview: item.gambar ? getImageUrl(item.gambar) : null }
  isEditing.value = true
  modalOpen.value = true
}

const updateData = async () => {
  loading.value = true

  try {
    const fd = fillFormData(form.value)
    fd.append('_method', 'PUT')
    const res = await fetch(`${API_URL}/${form.value.id}`, { method: 'POST', body: fd })
    if (!res.ok) throw new Error()
    await fetchData()
    closeModal()
    alert('Data berhasil diupdate!')
  } catch (err) {
    alert('Gagal update data!')
  } finally {
    loading.value = false
  }
}

const deleteData = async (id) => {
  if (confirm('Yakin hapus data ini?')) {
    try {
      await fetch(`${API_URL}/${id}`, { method: 'DELETE' })
      await fetchData()
      alert('Data berhasil dihapus!')
    } catch (err) {
      alert('Gagal hapus data!')
    }
  }
}

const updateStok = async (item, stok) => {
  try {
    const fd = new FormData()
    fd.append('nama', item.nama)
    fd.append('merk', item.merk)
    fd.append('stok', stok)
    fd.append('_method', 'PUT')
    await fetch(`${API_URL}/${item.id}`, { method: 'POST', body: fd })
    await fetchData()
  } catch (err) {
    alert('Gagal update stok')
  }
}

const tambahStok = (item) => updateStok(item, Number(item.stok || 0) + 1)
const kurangiStok = (item) => {
  if (item.stok > 0) updateStok(item, Number(item.stok || 0) - 1)
}

const exportToExcel = () => {
  try {
    const exportData = sortedData.value.map((item, index) => ({
      NO: index + 1,
      Nama: item.nama,
      Merk: item.merk,
      Stok: Number(item.stok || 0)
    }))
    const ws = XLSX.utils.json_to_sheet(exportData)
    ws['!cols'] = [{ wch: 6 }, { wch: 36 }, { wch: 24 }, { wch: 10 }]
    const wb = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(wb, ws, 'Data Barang')
    XLSX.writeFile(wb, `Data_Barang_${Date.now()}.xlsx`)
    alert(`Berhasil mengeksport ${exportData.length} data barang!`)
  } catch (err) {
    alert('Gagal mengeksport data!')
  }
}

const checkAuth = () => {
  const isLoggedIn = localStorage.getItem('isLoggedIn') || sessionStorage.getItem('isLoggedIn')
  if (isLoggedIn !== 'true') router.push('/')
}

onMounted(() => {
  checkAuth()
  fetchData()
})
</script>
