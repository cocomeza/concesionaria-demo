'use client'

import { Button } from '@/components/ui/button'
import { Download, FileDown, FileSpreadsheet } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { exportToPDF } from '@/lib/export/pdf'
import { exportToExcel } from '@/lib/export/excel'
import { useState } from 'react'
import { useToast } from '@/hooks/use-toast'

interface ExportButtonProps {
  title: string
  headers: string[]
  rows: (string | number)[][]
  filename?: string
}

export function ExportButton({ title, headers, rows, filename }: ExportButtonProps) {
  const [isExporting, setIsExporting] = useState(false)
  const { toast } = useToast()

  const handleExportPDF = async () => {
    if (rows.length === 0) {
      toast({
        title: 'Sin datos',
        description: 'No hay datos para exportar',
        variant: 'destructive',
      })
      return
    }

    try {
      setIsExporting(true)
      await exportToPDF({ title, headers, rows, filename })
      toast({
        title: 'Exportación exitosa',
        description: 'El archivo PDF se ha descargado correctamente',
      })
    } catch (error) {
      console.error('Error al exportar PDF:', error)
      toast({
        title: 'Error',
        description: 'No se pudo exportar el archivo PDF',
        variant: 'destructive',
      })
    } finally {
      setIsExporting(false)
    }
  }

  const handleExportExcel = async () => {
    if (rows.length === 0) {
      toast({
        title: 'Sin datos',
        description: 'No hay datos para exportar',
        variant: 'destructive',
      })
      return
    }

    try {
      setIsExporting(true)
      await exportToExcel({ title, headers, rows, filename })
      toast({
        title: 'Exportación exitosa',
        description: 'El archivo Excel se ha descargado correctamente',
      })
    } catch (error) {
      console.error('Error al exportar Excel:', error)
      toast({
        title: 'Error',
        description: 'No se pudo exportar el archivo Excel',
        variant: 'destructive',
      })
    } finally {
      setIsExporting(false)
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          disabled={isExporting || rows.length === 0}
          className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white border-0"
        >
          <Download className="w-4 h-4 mr-2" />
          {isExporting ? 'Exportando...' : 'Exportar'}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={handleExportPDF} disabled={isExporting}>
          <FileDown className="w-4 h-4 mr-2" />
          Exportar como PDF
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleExportExcel} disabled={isExporting}>
          <FileSpreadsheet className="w-4 h-4 mr-2" />
          Exportar como Excel
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

