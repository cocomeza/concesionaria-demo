import { z } from 'zod'

export const vehicleSchema = z.object({
  marca: z.string().min(1, 'La marca es requerida'),
  modelo: z.string().min(1, 'El modelo es requerido'),
  año: z
    .number()
    .int()
    .min(1900, 'El año debe ser válido')
    .max(new Date().getFullYear() + 1, 'El año no puede ser futuro'),
  precio: z.number().min(0, 'El precio debe ser mayor a 0'),
  precio_anterior: z.number().min(0).nullable().optional(),
  kilometraje: z.number().int().min(0).nullable().optional(),
  combustible: z
    .enum(['nafta', 'diesel', 'electrico', 'hibrido'])
    .nullable()
    .optional(),
  transmision: z.enum(['manual', 'automatica']).nullable().optional(),
  carroceria: z
    .enum(['sedan', 'suv', 'pickup', 'coupe', 'hatchback'])
    .nullable()
    .optional(),
  color: z.string().nullable().optional(),
  puertas: z.number().int().min(2).max(6).nullable().optional(),
  descripcion: z.string().nullable().optional(),
  caracteristicas: z.array(z.string()).default([]),
  imagenes: z.array(z.string().url()).default([]),
  imagen_principal: z.string().url().nullable().optional(),
  estado: z.enum(['disponible', 'reservado', 'vendido']).default('disponible'),
  destacado: z.boolean().default(false),
  patente: z.string().nullable().optional(),
})

export type VehicleFormData = z.infer<typeof vehicleSchema>

export const pedidoSchema = z.object({
  vehicle_id: z.string().uuid().nullable().optional(),
  cliente_nombre: z.string().min(1, 'El nombre es requerido'),
  cliente_email: z.string().email('Email inválido'),
  cliente_telefono: z.string().min(1, 'El teléfono es requerido'),
  mensaje: z.string().nullable().optional(),
  tipo: z.enum(['consulta', 'test_drive', 'compra']).default('consulta'),
})

export type PedidoFormData = z.infer<typeof pedidoSchema>

