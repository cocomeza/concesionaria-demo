/**
 * Funciones para exportar datos a PDF
 */

export interface ExportData {
  title: string
  headers: string[]
  rows: (string | number)[][]
  filename?: string
}

export async function exportToPDF(data: ExportData) {
  // Lazy load jsPDF solo cuando se necesite
  const { jsPDF } = await import('jspdf')
  const autoTableModule = await import('jspdf-autotable')
  const autoTable = autoTableModule.default || (autoTableModule as any)

  const doc = new jsPDF()
  
  // Título
  doc.setFontSize(18)
  doc.text(data.title, 14, 20)
  
  // Tabla
  autoTable(doc, {
    head: [data.headers],
    body: data.rows,
    startY: 30,
    styles: {
      fontSize: 9,
      cellPadding: 3,
    },
    headStyles: {
      fillColor: [41, 128, 185], // Azul
      textColor: 255,
      fontStyle: 'bold',
    },
    alternateRowStyles: {
      fillColor: [245, 245, 245],
    },
  })

  // Guardar
  const filename = data.filename || `${data.title.toLowerCase().replace(/\s+/g, '_')}_${new Date().toISOString().split('T')[0]}.pdf`
  doc.save(filename)
}

