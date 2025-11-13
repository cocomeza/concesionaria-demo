import type { Database } from './database.types'

export type Vehicle = Database['public']['Tables']['vehicles']['Row']
export type VehicleInsert = Database['public']['Tables']['vehicles']['Insert']
export type VehicleUpdate = Database['public']['Tables']['vehicles']['Update']

export type Pedido = Database['public']['Tables']['pedidos']['Row']
export type PedidoInsert = Database['public']['Tables']['pedidos']['Insert']
export type PedidoUpdate = Database['public']['Tables']['pedidos']['Update']

export type AdminProfile = Database['public']['Tables']['admin_profiles']['Row']

export interface VehicleFilters {
  marca?: string
  modelo?: string
  precioMin?: number
  precioMax?: number
  añoMin?: number
  añoMax?: number
  kilometrajeMax?: number
  combustible?: Vehicle['combustible']
  transmision?: Vehicle['transmision']
  carroceria?: Vehicle['carroceria']
  estado?: Vehicle['estado']
  destacado?: boolean
}

export interface VehicleSort {
  field: 'precio' | 'año' | 'kilometraje' | 'created_at'
  order: 'asc' | 'desc'
}

