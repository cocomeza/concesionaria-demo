'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { pedidoSchema, type PedidoFormData } from '@/lib/validations/vehicle.schema'
import { createSupabaseClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useToast } from '@/hooks/use-toast'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

interface VehicleContactFormProps {
  vehicleId: string
}

export function VehicleContactForm({ vehicleId }: VehicleContactFormProps) {
  const [loading, setLoading] = useState(false)
  const { toast } = useToast()
  const supabase = createSupabaseClient()

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
    watch,
  } = useForm<PedidoFormData>({
    resolver: zodResolver(pedidoSchema),
    defaultValues: {
      vehicle_id: vehicleId,
      tipo: 'consulta',
    },
  })

  const tipoValue = watch('tipo')

  const onSubmit = async (data: PedidoFormData) => {
    setLoading(true)
    try {
      const { error } = await supabase.from('pedidos').insert({
        ...data,
        vehicle_id: vehicleId,
      })

      if (error) throw error

      toast({
        title: 'Consulta enviada',
        description: 'Nos pondremos en contacto contigo pronto',
      })

      reset()
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message || 'Error al enviar la consulta',
        variant: 'destructive',
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card className="bg-slate-900/80 border-slate-800">
      <CardHeader>
        <CardTitle className="text-white">Solicitar Información</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="tipo" className="text-gray-300">
              Tipo de consulta
            </Label>
            <Select
              onValueChange={(value: any) => setValue('tipo', value, { shouldValidate: true })}
              value={tipoValue}
            >
              <SelectTrigger className="bg-slate-900 border-slate-800 text-white hover:border-cyan-500/50">
                <SelectValue placeholder="Seleccionar tipo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="consulta">Consulta General</SelectItem>
                <SelectItem value="test_drive">Test Drive</SelectItem>
                <SelectItem value="compra">Interesado en Comprar</SelectItem>
              </SelectContent>
            </Select>
            {errors.tipo && (
              <p className="text-sm text-red-500">
                {errors.tipo.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="cliente_nombre" className="text-gray-300">
              Nombre *
            </Label>
            <Input
              id="cliente_nombre"
              {...register('cliente_nombre')}
              className="bg-slate-900 border-slate-800 text-white placeholder:text-gray-500 focus:border-cyan-500/50"
              placeholder="Tu nombre"
            />
            {errors.cliente_nombre && (
              <p className="text-sm text-red-500">
                {errors.cliente_nombre.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="cliente_email" className="text-gray-300">
              Email *
            </Label>
            <Input
              id="cliente_email"
              type="email"
              {...register('cliente_email')}
              className="bg-slate-900 border-slate-800 text-white placeholder:text-gray-500 focus:border-cyan-500/50"
              placeholder="tu@email.com"
            />
            {errors.cliente_email && (
              <p className="text-sm text-red-500">
                {errors.cliente_email.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="cliente_telefono" className="text-gray-300">
              Teléfono *
            </Label>
            <Input
              id="cliente_telefono"
              {...register('cliente_telefono')}
              className="bg-slate-900 border-slate-800 text-white placeholder:text-gray-500 focus:border-cyan-500/50"
              placeholder="+54 9 11 1234-5678"
            />
            {errors.cliente_telefono && (
              <p className="text-sm text-red-500">
                {errors.cliente_telefono.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="mensaje" className="text-gray-300">
              Mensaje
            </Label>
            <Textarea
              id="mensaje"
              {...register('mensaje')}
              className="bg-slate-900 border-slate-800 text-white placeholder:text-gray-500 focus:border-cyan-500/50"
              placeholder="Escribe tu mensaje aquí..."
              rows={4}
            />
          </div>

          <Button
            type="submit"
            className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700"
            disabled={loading}
          >
            {loading ? 'Enviando...' : 'Enviar Consulta'}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}

