/**
 * Tipos para jspdf-autotable
 */
declare module 'jspdf-autotable' {
  import { jsPDF } from 'jspdf'

  interface UserOptions {
    head?: (string | number)[][]
    body?: (string | number)[][]
    startY?: number
    styles?: any
    headStyles?: any
    alternateRowStyles?: any
    [key: string]: any
  }

  function autoTable(doc: jsPDF, options: UserOptions): void

  export default autoTable
}

