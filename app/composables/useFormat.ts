/**
 * Format angka menjadi Rupiah, contoh: 299000 -> "Rp299.000"
 */
export function formatRupiah(value: number): string {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  })
    .format(value)
    .replace(/\s/g, '')
}

export function useFormat() {
  return { formatRupiah }
}
