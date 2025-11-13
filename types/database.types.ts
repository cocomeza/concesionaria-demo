export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      vehicles: {
        Row: {
          id: string
          marca: string
          modelo: string
          año: number
          precio: number
          precio_anterior: number | null
          kilometraje: number | null
          combustible: 'nafta' | 'diesel' | 'electrico' | 'hibrido' | null
          transmision: 'manual' | 'automatica' | null
          carroceria: 'sedan' | 'suv' | 'pickup' | 'coupe' | 'hatchback' | null
          color: string | null
          puertas: number | null
          descripcion: string | null
          caracteristicas: Json
          imagenes: string[]
          imagen_principal: string | null
          estado: 'disponible' | 'reservado' | 'vendido'
          destacado: boolean
          views: number
          patente: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          marca: string
          modelo: string
          año: number
          precio: number
          precio_anterior?: number | null
          kilometraje?: number | null
          combustible?: 'nafta' | 'diesel' | 'electrico' | 'hibrido' | null
          transmision?: 'manual' | 'automatica' | null
          carroceria?: 'sedan' | 'suv' | 'pickup' | 'coupe' | 'hatchback' | null
          color?: string | null
          puertas?: number | null
          descripcion?: string | null
          caracteristicas?: Json
          imagenes?: string[]
          imagen_principal?: string | null
          estado?: 'disponible' | 'reservado' | 'vendido'
          destacado?: boolean
          views?: number
          patente?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          marca?: string
          modelo?: string
          año?: number
          precio?: number
          precio_anterior?: number | null
          kilometraje?: number | null
          combustible?: 'nafta' | 'diesel' | 'electrico' | 'hibrido' | null
          transmision?: 'manual' | 'automatica' | null
          carroceria?: 'sedan' | 'suv' | 'pickup' | 'coupe' | 'hatchback' | null
          color?: string | null
          puertas?: number | null
          descripcion?: string | null
          caracteristicas?: Json
          imagenes?: string[]
          imagen_principal?: string | null
          estado?: 'disponible' | 'reservado' | 'vendido'
          destacado?: boolean
          views?: number
          patente?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      pedidos: {
        Row: {
          id: string
          vehicle_id: string | null
          cliente_nombre: string
          cliente_email: string
          cliente_telefono: string
          mensaje: string | null
          tipo: 'consulta' | 'test_drive' | 'compra'
          estado: 'pendiente' | 'contactado' | 'finalizado' | 'cancelado'
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          vehicle_id?: string | null
          cliente_nombre: string
          cliente_email: string
          cliente_telefono: string
          mensaje?: string | null
          tipo?: 'consulta' | 'test_drive' | 'compra'
          estado?: 'pendiente' | 'contactado' | 'finalizado' | 'cancelado'
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          vehicle_id?: string | null
          cliente_nombre?: string
          cliente_email?: string
          cliente_telefono?: string
          mensaje?: string | null
          tipo?: 'consulta' | 'test_drive' | 'compra'
          estado?: 'pendiente' | 'contactado' | 'finalizado' | 'cancelado'
          created_at?: string
          updated_at?: string
        }
      }
      admin_profiles: {
        Row: {
          id: string
          nombre: string
          email: string
          role: 'admin' | 'vendedor'
          created_at: string
        }
        Insert: {
          id: string
          nombre: string
          email: string
          role?: 'admin' | 'vendedor'
          created_at?: string
        }
        Update: {
          id?: string
          nombre?: string
          email?: string
          role?: 'admin' | 'vendedor'
          created_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}

