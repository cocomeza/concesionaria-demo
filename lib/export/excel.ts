/**
 * Funciones para exportar datos a Excel
 */

import type { ExportData } from './pdf'

export async function exportToExcel(data: ExportData) {
  // Lazy load XLSX solo cuando se necesite
  const XLSX = await import('xlsx')

  // Crear workbook
  const wb = XLSX.utils.book_new()

  // Preparar datos con headers
  const worksheetData = [data.headers, ...data.rows]

  // Crear worksheet
  const ws = XLSX.utils.aoa_to_sheet(worksheetData)

  // Estilos básicos (ancho de columnas)
  const colWidths = data.headers.map((_, index) => {
    const maxLength = Math.max(
      data.headers[index].length,
      ...data.rows.map((row) => String(row[index] || '').length)
    )
    return { wch: Math.min(Math.max(maxLength + 2, 10), 50) }
  })
  ws['!cols'] = colWidths

  // Agregar worksheet al workbook
  XLSX.utils.book_append_sheet(wb, ws, data.title.substring(0, 31)) // Excel limita nombres a 31 caracteres

  // Generar nombre de archivo
  const filename = data.filename || `${data.title.toLowerCase().replace(/\s+/g, '_')}_${new Date().toISOString().split('T')[0]}.xlsx`

  // Descargar
  XLSX.writeFile(wb, filename)
}

