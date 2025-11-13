'use client'

import { useEffect, useState } from 'react'
import { createSupabaseClient } from '@/lib/supabase/client'
import { ExportButton } from '@/components/admin/ExportButton'
import { formatPrice } from '@/lib/utils'
import type { Vehicle } from '@/types'

interface InventarioExportProps {
  vehiculos: Vehicle[]
}

export function InventarioExport({ vehiculos }: InventarioExportProps) {
  // Preparar datos para exportación
  const headers = [
    'Marca',
    'Modelo',
    'Año',
    'Precio',
    'Kilometraje',
    'Combustible',
    'Transmisión',
    'Carrocería',
    'Color',
    'Puertas',
    'Estado',
    'Destacado',
    'Vistas',
    'Fecha Creación',
  ]

  const rows = vehiculos.map((v) => [
    v.marca,
    v.modelo,
    v.año,
    formatPrice(v.precio, 'USD'),
    v.kilometraje ? `${v.kilometraje.toLocaleString()} km` : 'N/A',
    v.combustible || 'N/A',
    v.transmision || 'N/A',
    v.carroceria || 'N/A',
    v.color || 'N/A',
    v.puertas || 'N/A',
    v.estado,
    v.destacado ? 'Sí' : 'No',
    v.views || 0,
    new Date(v.created_at).toLocaleDateString('es-AR'),
  ])

  return (
    <ExportButton
      title="Inventario de Vehículos"
      headers={headers}
      rows={rows}
      filename={`inventario_vehiculos_${new Date().toISOString().split('T')[0]}`}
    />
  )
}

