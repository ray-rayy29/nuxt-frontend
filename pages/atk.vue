<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 text-white">
    <Navbar :current-page="'atk'" />

    <div class="container mx-auto px-4 py-8">
      <!-- Header -->
      <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
        <div>
          <h1 class="text-2xl font-bold bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">
            Manajemen ATK
          </h1>
          <p class="text-slate-400 text-sm">Kelola Alat Tulis Kantor</p>
        </div>
        <button
          @click="openAddModal"
          class="bg-gradient-to-r from-blue-500 to-emerald-500 hover:from-blue-600 hover:to-emerald-600 text-white font-semibold py-2 px-5 rounded-xl transition-all duration-200 flex items-center space-x-2 text-sm"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          <span>Tambah ATK</span>
        </button>
      </div>

      <!-- Stats Cards -->
      <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <div class="bg-slate-800/60 rounded-xl border border-slate-700/50 p-4">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-slate-400 text-xs">Total Item</p>
              <p class="text-2xl font-bold text-blue-400">{{ dataList.length }}</p>
            </div>
            <div class="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center">
              <svg class="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7v10c0 2.21-3.582 4-8 4s-8-1.79-8-4V7m16 0c0 2.21-3.582 4-8 4s-8-1.79-8-4m16 0c0-2.21-3.582-4-8-4s-8 1.79-8 4" />
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
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
            </div>
          </div>
        </div>
        <div class="bg-slate-800/60 rounded-xl border border-slate-700/50 p-4">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-slate-400 text-xs">Halaman</p>
              <p class="text-2xl font-bold text-purple-400">{{ currentPage }}</p>
            </div>
            <div class="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center">
              <svg class="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      <!-- Search Bar -->
      <div class="bg-slate-800/60 rounded-xl border border-slate-700/50 p-4 mb-6">
        <div class="flex flex-col lg:flex-row gap-3">
          <div class="flex-1">
            <input
              v-model="searchQuery"
              @input="handleSearch"
              type="text"
              placeholder="Cari kode, nama, atau kategori..."
              class="w-full bg-slate-700/50 border border-slate-600/50 rounded-lg px-4 py-2 text-white placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50"
            />
          </div>
          <div class="flex gap-2">
            <select v-model="searchCategory" @change="handleSearch" class="bg-slate-700/50 border border-slate-600/50 text-white rounded-lg px-3 py-2 text-sm">
              <option value="all">Semua</option>
              <option value="kode_barang">Kode</option>
              <option value="nama_barang">Nama</option>
              <option value="kategori">Kategori</option>
            </select>
            <button @click="clearSearch" class="bg-slate-700/50 hover:bg-slate-600/50 border border-slate-600/50 text-slate-300 px-3 py-2 rounded-lg text-sm">Reset</button>
            <button @click="exportToExcel" class="bg-green-600/20 hover:bg-green-600/30 border border-green-500/50 text-green-400 px-3 py-2 rounded-lg text-sm">Export</button>
          </div>
        </div>
      </div>

      <!-- Table -->
      <div class="bg-slate-800/60 rounded-xl border border-slate-700/50 overflow-hidden">
        <div class="overflow-x-auto">
          <table class="w-full text-sm">
            <thead class="bg-slate-700/50">
              <tr>
                <th class="py-3 px-3 text-left text-slate-300">NO</th>
                <th @click="sortData('kode_barang')" class="py-3 px-3 text-left text-slate-300 cursor-pointer hover:bg-slate-600/50">Kode</th>
                <th @click="sortData('nama_barang')" class="py-3 px-3 text-left text-slate-300 cursor-pointer hover:bg-slate-600/50">Nama Barang</th>
                <th @click="sortData('kategori')" class="py-3 px-3 text-left text-slate-300 cursor-pointer hover:bg-slate-600/50">Kategori</th>
                <th @click="sortData('satuan')" class="py-3 px-3 text-left text-slate-300 cursor-pointer hover:bg-slate-600/50">Satuan</th>
                <th @click="sortData('stok')" class="py-3 px-3 text-left text-slate-300 cursor-pointer hover:bg-slate-600/50">Stok</th>
                <th class="py-3 px-3 text-center text-slate-300">Aksi</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-700/30">
              <tr v-for="(item, index) in paginatedData" :key="item.id" class="hover:bg-slate-700/30">
                <td class="py-2 px-3">{{ getRowNumber(index) }}</td>
                <td class="py-2 px-3 font-mono text-emerald-400">{{ item.kode_barang }}</td>
                <td class="py-2 px-3">
                  <div class="flex items-center space-x-2">
                    <img v-if="item.gambar" :src="getImageUrl(item.gambar)" class="w-6 h-6 rounded object-cover">
                    <span>{{ item.nama_barang }}</span>
                  </div>
                </td>
                <td class="py-2 px-3">
                  <span :class="getKategoriClass(item.kategori)" class="text-xs px-2 py-0.5 rounded-full">
                    {{ getKategoriLabel(item.kategori) }}
                  </span>
                </td>
                <td class="py-2 px-3">{{ item.satuan }}</td>
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
                <td colspan="7" class="py-10 text-center text-slate-400">Belum ada data</td>
              </tr>
            </tbody>
           </table>
        </div>

        <!-- Pagination -->
        <div class="px-4 py-3 border-t border-slate-700/50 flex flex-col sm:flex-row justify-between items-center gap-3 text-sm">
          <div class="text-slate-400">Menampilkan {{ startIndex }} - {{ endIndex }} dari {{ filteredData.length }} data</div>
          <div class="flex items-center space-x-2">
            <button @click="prevPage" :disabled="currentPage === 1" class="p-1.5 rounded border border-slate-600 disabled:opacity-50">◀</button>
            <span class="px-3 py-1 bg-slate-700/50 rounded">Halaman {{ currentPage }} dari {{ totalPages }}</span>
            <button @click="nextPage" :disabled="currentPage === totalPages" class="p-1.5 rounded border border-slate-600 disabled:opacity-50">▶</button>
            <select v-model="itemsPerPage" @change="resetPagination" class="bg-slate-700/50 border border-slate-600/50 rounded px-2 py-1 text-sm">
              <option :value="5">5</option>
              <option :value="10">10</option>
              <option :value="25">25</option>
            </select>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal Form -->
    <div v-if="modalOpen" class="fixed inset-0 z-50 flex items-center justify-center px-4">
      <div class="fixed inset-0 bg-black/70" @click="closeModal"></div>
      <div class="relative bg-slate-800 rounded-xl w-full max-w-md max-h-[85vh] overflow-y-auto border border-slate-700">
        <div class="sticky top-0 bg-slate-800 p-4 border-b border-slate-700 flex justify-between items-center">
          <h2 class="text-lg font-semibold">{{ isEditing ? 'Edit ATK' : 'Tambah ATK' }}</h2>
          <button @click="closeModal" class="text-slate-400 hover:text-white text-xl">×</button>
        </div>
        <form @submit.prevent="isEditing ? updateData() : addData()" enctype="multipart/form-data" class="p-4 space-y-3">
          <div>
            <label class="block text-xs text-slate-400 mb-1">Kode Barang</label>
            <input v-model="form.kode_barang" type="text" class="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-3 py-2 text-white text-sm" required />
          </div>
          <div>
            <label class="block text-xs text-slate-400 mb-1">Nama Barang</label>
            <input v-model="form.nama_barang" type="text" class="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-3 py-2 text-white text-sm" required />
          </div>
          <div class="grid grid-cols-2 gap-3">
            <div>
              <label class="block text-xs text-slate-400 mb-1">Kategori</label>
              <select v-model="form.kategori" class="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-3 py-2 text-white text-sm">
                <option value="alat_tulis">Alat Tulis</option>
                <option value="kertas">Kertas</option>
                <option value="peralatan">Peralatan</option>
                <option value="lainnya">Lainnya</option>
              </select>
            </div>
            <div>
              <label class="block text-xs text-slate-400 mb-1">Satuan</label>
              <select v-model="form.satuan" class="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-3 py-2 text-white text-sm">
                <option value="pcs">Pcs</option>
                <option value="box">Box</option>
                <option value="pak">Pak</option>
                <option value="rim">Rim</option>
              </select>
            </div>
          </div>
          <div>
            <label class="block text-xs text-slate-400 mb-1">Stok</label>
            <input v-model.number="form.stok" type="number" min="0" class="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-3 py-2 text-white text-sm" required />
          </div>
          <div>
            <label class="block text-xs text-slate-400 mb-1">Keterangan</label>
            <textarea v-model="form.keterangan" rows="2" class="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-3 py-2 text-white text-sm"></textarea>
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
const API_URL = `${config.public.apiBase}/atk`
const STORAGE_URL = config.public.storageUrl

// Data
const dataList = ref([])
const loading = ref(false)
const isEditing = ref(false)
const gambarFile = ref(null)

const form = ref({
  id: null,
  kode_barang: '',
  nama_barang: '',
  kategori: 'alat_tulis',
  satuan: 'pcs',
  stok: 0,
  keterangan: '',
  gambar: null,
  gambarPreview: null
})

// Pagination
const currentPage = ref(1)
const itemsPerPage = ref(10)

// Search & Sort
const searchQuery = ref('')
const searchCategory = ref('all')
const sortField = ref('id')
const sortDirection = ref('asc')

// Computed
const totalStok = computed(() => dataList.value.reduce((sum, item) => sum + (item.stok || 0), 0))

const filteredData = computed(() => {
  if (!searchQuery.value) return dataList.value
  const q = searchQuery.value.toLowerCase()
  return dataList.value.filter(item => {
    if (searchCategory.value === 'all') {
      return item.kode_barang?.toLowerCase().includes(q) ||
        item.nama_barang?.toLowerCase().includes(q) ||
        item.kategori?.toLowerCase().includes(q)
    } else {
      return item[searchCategory.value]?.toLowerCase().includes(q)
    }
  })
})

const sortedData = computed(() => {
  const data = [...filteredData.value]
  return data.sort((a, b) => {
    let aVal = a[sortField.value] ?? ''
    let bVal = b[sortField.value] ?? ''
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

const getKategoriLabel = (kategori) => {
  const labels = { alat_tulis: 'Alat Tulis', kertas: 'Kertas', peralatan: 'Peralatan', lainnya: 'Lainnya' }
  return labels[kategori] || kategori
}

const getKategoriClass = (kategori) => {
  const classes = {
    alat_tulis: 'bg-blue-500/20 text-blue-400',
    kertas: 'bg-green-500/20 text-green-400',
    peralatan: 'bg-purple-500/20 text-purple-400',
    lainnya: 'bg-gray-500/20 text-gray-400'
  }
  return classes[kategori] || 'bg-gray-500/20'
}

const getImageUrl = (path) => path ? `${STORAGE_URL}/${path}` : ''

// Methods
const handleSearch = () => { currentPage.value = 1 }
const clearSearch = () => { searchQuery.value = ''; searchCategory.value = 'all'; currentPage.value = 1 }
const sortData = (field) => {
  if (sortField.value === field) sortDirection.value = sortDirection.value === 'asc' ? 'desc' : 'asc'
  else { sortField.value = field; sortDirection.value = 'asc' }
}
const prevPage = () => { if (currentPage.value > 1) currentPage.value-- }
const nextPage = () => { if (currentPage.value < totalPages.value) currentPage.value++ }
const resetPagination = () => { currentPage.value = 1 }

const openAddModal = () => {
  resetForm()
  isEditing.value = false
  modalOpen.value = true
}

const closeModal = () => {
  modalOpen.value = false
  resetForm()
}

const resetForm = () => {
  form.value = {
    id: null,
    kode_barang: '',
    nama_barang: '',
    kategori: 'alat_tulis',
    satuan: 'pcs',
    stok: 0,
    keterangan: '',
    gambar: null,
    gambarPreview: null
  }
  gambarFile.value = null
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
  } catch (err) { alert('Gagal memuat data!') }
}

const addData = async () => {
  if (!form.value.kode_barang || !form.value.nama_barang) { alert('Isi kode dan nama barang!'); return }
  loading.value = true
  try {
    const fd = new FormData()
    fd.append('kode_barang', form.value.kode_barang)
    fd.append('nama_barang', form.value.nama_barang)
    fd.append('kategori', form.value.kategori)
    fd.append('satuan', form.value.satuan)
    fd.append('stok', form.value.stok)
    fd.append('keterangan', form.value.keterangan)
    if (gambarFile.value) fd.append('gambar', gambarFile.value)
    const res = await fetch(API_URL, { method: 'POST', body: fd })
    if (!res.ok) throw new Error()
    await fetchData()
    closeModal()
    alert('Data berhasil ditambahkan!')
  } catch (err) { alert('Gagal menambah data!') }
  finally { loading.value = false }
}

const editData = (item) => {
  form.value = { ...item, gambar: null, gambarPreview: item.gambar ? getImageUrl(item.gambar) : null }
  isEditing.value = true
  modalOpen.value = true
}

const updateData = async () => {
  loading.value = true
  try {
    const fd = new FormData()
    fd.append('kode_barang', form.value.kode_barang)
    fd.append('nama_barang', form.value.nama_barang)
    fd.append('kategori', form.value.kategori)
    fd.append('satuan', form.value.satuan)
    fd.append('stok', form.value.stok)
    fd.append('keterangan', form.value.keterangan)
    fd.append('_method', 'PUT')
    if (gambarFile.value) fd.append('gambar', gambarFile.value)
    const res = await fetch(`${API_URL}/${form.value.id}`, { method: 'POST', body: fd })
    if (!res.ok) throw new Error()
    await fetchData()
    closeModal()
    alert('Data berhasil diupdate!')
  } catch (err) { alert('Gagal update data!') }
  finally { loading.value = false }
}

const deleteData = async (id) => {
  if (confirm('Yakin hapus data ini?')) {
    try {
      await fetch(`${API_URL}/${id}`, { method: 'DELETE' })
      await fetchData()
      alert('Data berhasil dihapus!')
    } catch (err) { alert('Gagal hapus data!') }
  }
}

const tambahStok = async (item) => {
  try {
    const fd = new FormData()
    fd.append('kode_barang', item.kode_barang)
    fd.append('nama_barang', item.nama_barang)
    fd.append('kategori', item.kategori)
    fd.append('satuan', item.satuan)
    fd.append('stok', item.stok + 1)
    fd.append('keterangan', item.keterangan)
    fd.append('_method', 'PUT')
    await fetch(`${API_URL}/${item.id}`, { method: 'POST', body: fd })
    await fetchData()
  } catch (err) { alert('Gagal update stok') }
}

const kurangiStok = async (item) => {
  if (item.stok > 0) {
    try {
      const fd = new FormData()
      fd.append('kode_barang', item.kode_barang)
      fd.append('nama_barang', item.nama_barang)
      fd.append('kategori', item.kategori)
      fd.append('satuan', item.satuan)
      fd.append('stok', item.stok - 1)
      fd.append('keterangan', item.keterangan)
      fd.append('_method', 'PUT')
      await fetch(`${API_URL}/${item.id}`, { method: 'POST', body: fd })
      await fetchData()
    } catch (err) { alert('Gagal update stok') }
  }
}

const applyCellStyle = (ws, cellAddress, style) => {
  if (!ws[cellAddress]) return
  ws[cellAddress].s = style
}

const getExportTimestamp = () => {
  const now = new Date()
  const pad = (value) => String(value).padStart(2, '0')

  return {
    display: `${pad(now.getDate())}/${pad(now.getMonth() + 1)}/${now.getFullYear()} ${pad(now.getHours())}:${pad(now.getMinutes())}`,
    file: `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}_${pad(now.getHours())}-${pad(now.getMinutes())}-${pad(now.getSeconds())}`
  }
}

const exportToExcel = () => {
  try {
    const headers = ['NO', 'Kode Barang', 'Nama Barang', 'Kategori', 'Satuan', 'Stok', 'Keterangan']
    const exportRows = dataList.value.map((item, index) => [
      index + 1,
      item.kode_barang || '-',
      item.nama_barang || '-',
      getKategoriLabel(item.kategori),
      item.satuan || '-',
      Number(item.stok || 0),
      item.keterangan || '-'
    ])
    const totalExportStok = exportRows.reduce((sum, row) => sum + row[5], 0)
    const timestamp = getExportTimestamp()

    const sheetData = [
      ['LAPORAN DATA ATK'],
      [`Diekspor pada ${timestamp.display} | Total data: ${exportRows.length}`],
      [],
      headers,
      ...exportRows,
      [],
      ['', '', '', '', 'Total Stok', totalExportStok, '']
    ]

    const ws = XLSX.utils.aoa_to_sheet(sheetData)
    const lastDataRow = exportRows.length + 4
    const summaryRow = exportRows.length + 6

    ws['!cols'] = [
      { wch: 6 },
      { wch: 18 },
      { wch: 34 },
      { wch: 22 },
      { wch: 14 },
      { wch: 10 },
      { wch: 42 }
    ]
    ws['!rows'] = [
      { hpt: 26 },
      { hpt: 20 },
      { hpt: 8 },
      { hpt: 22 }
    ]
    ws['!merges'] = [
      { s: { r: 0, c: 0 }, e: { r: 0, c: 6 } },
      { s: { r: 1, c: 0 }, e: { r: 1, c: 6 } }
    ]
    ws['!autofilter'] = { ref: `A4:G${Math.max(lastDataRow, 4)}` }
    ws['!freeze'] = { xSplit: 0, ySplit: 4 }
    ws['!ref'] = `A1:G${summaryRow}`

    applyCellStyle(ws, 'A1', {
      font: { bold: true, sz: 16, color: { rgb: '1F2937' } },
      alignment: { horizontal: 'center', vertical: 'center' }
    })
    applyCellStyle(ws, 'A2', {
      font: { italic: true, color: { rgb: '64748B' } },
      alignment: { horizontal: 'center' }
    })

    const headerStyle = {
      font: { bold: true, color: { rgb: 'FFFFFF' } },
      fill: { fgColor: { rgb: '2563EB' } },
      alignment: { horizontal: 'center', vertical: 'center' }
    }
    const centerStyle = { alignment: { horizontal: 'center', vertical: 'center' } }
    const numberStyle = { alignment: { horizontal: 'right', vertical: 'center' } }
    const summaryStyle = {
      font: { bold: true },
      fill: { fgColor: { rgb: 'DBEAFE' } },
      alignment: { horizontal: 'right', vertical: 'center' }
    }

    for (let C = 0; C < headers.length; C++) {
      applyCellStyle(ws, XLSX.utils.encode_cell({ r: 3, c: C }), headerStyle)
    }
    for (let R = 4; R < exportRows.length + 4; R++) {
      ;[0, 1, 3, 4].forEach((C) => applyCellStyle(ws, XLSX.utils.encode_cell({ r: R, c: C }), centerStyle))
      applyCellStyle(ws, XLSX.utils.encode_cell({ r: R, c: 5 }), numberStyle)
    }
    applyCellStyle(ws, `E${summaryRow}`, summaryStyle)
    applyCellStyle(ws, `F${summaryRow}`, summaryStyle)

    const wb = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(wb, ws, 'Data ATK')
    XLSX.writeFile(wb, `Data_ATK_${timestamp.file}.xlsx`)
    alert(`Berhasil mengeksport ${exportRows.length} data ATK!`)
  } catch (err) {
    console.error('Export error:', err)
    alert('Gagal mengeksport data!')
  }
}

// Auth check
const checkAuth = () => {
  const isLoggedIn = localStorage.getItem('isLoggedIn') || sessionStorage.getItem('isLoggedIn')
  if (isLoggedIn !== 'true') router.push('/')
}

onMounted(() => {
  checkAuth()
  fetchData()
})
</script>
