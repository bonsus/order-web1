import type { AppIcon } from '#components'

type IconName = InstanceType<typeof AppIcon>['name']

export interface FeatureContent {
  id: string
  icon: IconName
  title: string
  summary: string
  points: string[]
}

export const features: FeatureContent[] = [
  {
    id: 'order',
    icon: 'order',
    title: 'Order Management',
    summary:
      'Satukan seluruh order dari semua channel ke dalam satu antrean kerja yang rapi dan bebas kesalahan input.',
    points: [
      'Order masuk otomatis dari marketplace & website',
      'Deteksi order duplikat dan alamat tidak lengkap',
      'Status real-time: baru, proses, dikemas, dikirim',
      'Cetak label & invoice massal dalam sekali klik',
    ],
  },
  {
    id: 'inventory',
    icon: 'inventory',
    title: 'Inventory & FIFO',
    summary:
      'Kelola stok akurat lintas gudang dengan metode FIFO sehingga HPP dan margin selalu tepat.',
    points: [
      'Stok tersinkron otomatis ke semua channel',
      'Perhitungan HPP berbasis FIFO per batch',
      'Peringatan stok menipis & fast/slow moving',
      'Kartu stok & histori mutasi lengkap',
    ],
  },
  {
    id: 'marketplace',
    icon: 'marketplace',
    title: 'Marketplace Integration',
    summary:
      'Terhubung ke marketplace populer untuk tarik order, update stok, dan sinkron harga secara otomatis.',
    points: [
      'Integrasi Shopee, Tokopedia, TikTok Shop, Lazada',
      'Sinkronisasi stok & harga dua arah',
      'Mapping SKU antar channel',
      'Kelola banyak toko dalam satu dashboard',
    ],
  },
  {
    id: 'warehouse',
    icon: 'warehouse',
    title: 'Warehouse Operation',
    summary:
      'Operasional gudang terstruktur mulai dari picking, packing, hingga serah terima ke kurir.',
    points: [
      'Picking list & packing berbasis barcode',
      'Multi-gudang & lokasi rak (bin location)',
      'Verifikasi scan untuk cegah salah kirim',
      'Serah terima kurir dengan manifest digital',
    ],
  },
  {
    id: 'cod',
    icon: 'cod',
    title: 'COD & Shipping Reconciliation',
    summary:
      'Rekonsiliasi dana COD dan biaya ongkir dari kurir otomatis, tidak ada lagi selisih yang bocor.',
    points: [
      'Cocokkan pencairan COD dengan order terkirim',
      'Deteksi selisih ongkir & potongan kurir',
      'Laporan aging piutang COD per kurir',
      'Rekap retur & paket bermasalah',
    ],
  },
  {
    id: 'analytics',
    icon: 'analytics',
    title: 'Analytics & Finance Report',
    summary:
      'Dashboard analitik dan laporan keuangan yang siap dipakai untuk mengambil keputusan cepat.',
    points: [
      'Laporan laba rugi & arus kas per periode',
      'Analitik penjualan per channel & produk',
      'Margin per SKU dan per pesanan',
      'Ekspor laporan ke Excel/PDF',
    ],
  },
]

export const workflowSteps = [
  {
    step: '01',
    title: 'Hubungkan channel',
    description:
      'Sambungkan marketplace dan website Anda ke Ordeo dalam beberapa menit tanpa perlu tim teknis.',
  },
  {
    step: '02',
    title: 'Order masuk otomatis',
    description:
      'Semua pesanan tersentralisasi ke satu antrean kerja lengkap dengan status dan prioritas.',
  },
  {
    step: '03',
    title: 'Proses & kirim',
    description:
      'Tim gudang melakukan picking, packing berbasis scan, lalu serah terima ke kurir dengan manifest.',
  },
  {
    step: '04',
    title: 'Rekonsiliasi & laporan',
    description:
      'Dana COD, ongkir, dan stok direkonsiliasi otomatis lalu tersaji dalam laporan keuangan real-time.',
  },
]

export const testimonials = [
  {
    quote:
      'Sejak pakai Ordeo, selisih dana COD kami hampir nol. Rekonsiliasi yang dulu makan 2 hari sekarang selesai dalam hitungan menit.',
    name: 'Rangga Pratama',
    role: 'Founder, Rumah Gadget ID',
    initials: 'RP',
  },
  {
    quote:
      'Stok di 4 marketplace akhirnya sinkron. Tidak ada lagi overselling saat flash sale. Tim gudang jauh lebih tenang.',
    name: 'Sarah Wijaya',
    role: 'Operation Lead, Beauty Nest',
    initials: 'SW',
  },
  {
    quote:
      'Laporan laba rugi per channel bikin kami tahu produk mana yang benar-benar untung. Keputusan restock jadi lebih cepat.',
    name: 'Dimas Nugroho',
    role: 'CEO, Sportfuel Indonesia',
    initials: 'DN',
  },
]

export const faqs = [
  {
    q: 'Apakah Ordeo cocok untuk seller yang baru mulai?',
    a: 'Sangat cocok. Paket Starter dirancang untuk seller yang ingin merapikan operasional order dan stok tanpa ribet. Anda bisa upgrade kapan saja saat bisnis bertumbuh.',
  },
  {
    q: 'Marketplace apa saja yang didukung?',
    a: 'Ordeo mendukung integrasi dengan Shopee, Tokopedia, TikTok Shop, dan Lazada, serta website toko Anda sendiri. Channel akan terus kami tambah secara berkala.',
  },
  {
    q: 'Bagaimana Ordeo menangani pembayaran COD?',
    a: 'Ordeo mencocokkan otomatis dana COD yang dicairkan kurir dengan order yang terkirim, mendeteksi selisih ongkir dan potongan, sehingga arus kas COD Anda selalu akurat.',
  },
  {
    q: 'Apakah data bisnis saya aman?',
    a: 'Kami menerapkan enkripsi saat transit, kontrol akses berbasis peran, dan backup berkala. Keamanan data adalah prioritas utama Ordeo.',
  },
  {
    q: 'Apakah ada kontrak jangka panjang?',
    a: 'Tidak. Langganan bersifat bulanan dan bisa dibatalkan kapan saja. Anda hanya membayar untuk periode yang berjalan.',
  },
  {
    q: 'Bagaimana proses migrasi data awal?',
    a: 'Tim onboarding kami membantu import katalog produk dan stok awal. Untuk paket Business tersedia dedicated account manager untuk pendampingan penuh.',
  },
]

export const stats = [
  { value: '2.500+', label: 'Seller aktif' },
  { value: '18 jt+', label: 'Order diproses' },
  { value: '99,9%', label: 'Uptime sistem' },
  { value: '4,9/5', label: 'Rating kepuasan' },
]
