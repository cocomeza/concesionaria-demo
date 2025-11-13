'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { vehicleSchema, type VehicleFormData } from '@/lib/validations/vehicle.schema'
import { useCreateVehicle, useUpdateVehicle, useVehicle } from '@/hooks/useVehicles'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ImageUpload } from './ImageUpload'
import { useToast } from '@/hooks/use-toast'

interface VehicleFormProps {
  vehicleId?: string
}

export function VehicleForm({ vehicleId }: VehicleFormProps) {
  const router = useRouter()
  const { toast } = useToast()
  const isEditing = !!vehicleId

  const { data: vehicleData } = useVehicle(vehicleId || '')
  const createVehicle = useCreateVehicle()
  const updateVehicle = useUpdateVehicle()

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<VehicleFormData>({
    resolver: zodResolver(vehicleSchema),
    defaultValues: {
      estado: 'disponible',
      destacado: false,
      caracteristicas: [],
      imagenes: [],
    },
  })

  const [caracteristicas, setCaracteristicas] = useState<string[]>([])
  const [nuevaCaracteristica, setNuevaCaracteristica] = useState('')
  const imagenes = watch('imagenes') || []

  // Cargar datos del vehículo si está editando
  useEffect(() => {
    if (vehicleData) {
      Object.keys(vehicleData).forEach((key) => {
        const value = vehicleData[key as keyof typeof vehicleData]
        if (value !== null && value !== undefined) {
          setValue(key as any, value)
        }
      })
      if (Array.isArray(vehicleData.caracteristicas)) {
        setCaracteristicas(vehicleData.caracteristicas as string[])
      }
    }
  }, [vehicleData, setValue])

  const onSubmit = async (data: VehicleFormData) => {
    try {
      const formData = {
        ...data,
        caracteristicas,
        imagen_principal: imagenes[0] || null,
      }

      if (isEditing && vehicleId) {
        await updateVehicle.mutateAsync({ id: vehicleId, ...formData })
        router.push('/dashboard/inventario')
        router.refresh()
      } else {
        await createVehicle.mutateAsync(formData)
        router.push('/dashboard/inventario')
        router.refresh()
      }
    } catch (error: any) {
      console.error('Error al guardar vehículo:', error)
      toast({
        title: 'Error al guardar',
        description: error.message || 'Ocurrió un error al guardar el vehículo',
        variant: 'destructive',
      })
    }
  }

  const agregarCaracteristica = () => {
    if (nuevaCaracteristica.trim()) {
      setCaracteristicas([...caracteristicas, nuevaCaracteristica.trim()])
      setNuevaCaracteristica('')
    }
  }

  const eliminarCaracteristica = (index: number) => {
    setCaracteristicas(caracteristicas.filter((_, i) => i !== index))
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Información Básica */}
      <Card>
        <CardHeader>
          <CardTitle>Información Básica</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="marca">
                Marca <span className="text-red-500">*</span>
              </Label>
              <Input
                id="marca"
                {...register('marca')}
                placeholder="Ej: Toyota"
              />
              {errors.marca && (
                <p className="text-sm text-red-500">{errors.marca.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="modelo">
                Modelo <span className="text-red-500">*</span>
              </Label>
              <Input
                id="modelo"
                {...register('modelo')}
                placeholder="Ej: Corolla"
              />
              {errors.modelo && (
                <p className="text-sm text-red-500">{errors.modelo.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="año">
                Año <span className="text-red-500">*</span>
              </Label>
              <Input
                id="año"
                type="number"
                {...register('año', { valueAsNumber: true })}
                placeholder="2024"
              />
              {errors.año && (
                <p className="text-sm text-red-500">{errors.año.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="precio">
                Precio <span className="text-red-500">*</span>
              </Label>
              <Input
                id="precio"
                type="number"
                step="0.01"
                {...register('precio', { valueAsNumber: true })}
                placeholder="25000"
              />
              {errors.precio && (
                <p className="text-sm text-red-500">{errors.precio.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="precio_anterior">Precio Anterior</Label>
              <Input
                id="precio_anterior"
                type="number"
                step="0.01"
                {...register('precio_anterior', { valueAsNumber: true })}
                placeholder="Opcional"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="kilometraje">Kilometraje</Label>
              <Input
                id="kilometraje"
                type="number"
                {...register('kilometraje', { valueAsNumber: true })}
                placeholder="0"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Especificaciones */}
      <Card>
        <CardHeader>
          <CardTitle>Especificaciones</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="combustible">Combustible</Label>
              <Select
                onValueChange={(value) =>
                  setValue('combustible', value as any)
                }
                value={watch('combustible') || undefined}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Seleccionar" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="nafta">Nafta</SelectItem>
                  <SelectItem value="diesel">Diesel</SelectItem>
                  <SelectItem value="electrico">Eléctrico</SelectItem>
                  <SelectItem value="hibrido">Híbrido</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="transmision">Transmisión</Label>
              <Select
                onValueChange={(value) =>
                  setValue('transmision', value as any)
                }
                value={watch('transmision') || undefined}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Seleccionar" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="manual">Manual</SelectItem>
                  <SelectItem value="automatica">Automática</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="carroceria">Carrocería</Label>
              <Select
                onValueChange={(value) => setValue('carroceria', value as any)}
                value={watch('carroceria') || undefined}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Seleccionar" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="sedan">Sedán</SelectItem>
                  <SelectItem value="suv">SUV</SelectItem>
                  <SelectItem value="pickup">Pickup</SelectItem>
                  <SelectItem value="coupe">Coupé</SelectItem>
                  <SelectItem value="hatchback">Hatchback</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="color">Color</Label>
              <Input
                id="color"
                {...register('color')}
                placeholder="Ej: Blanco"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="puertas">Puertas</Label>
              <Input
                id="puertas"
                type="number"
                {...register('puertas', { valueAsNumber: true })}
                placeholder="4"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="patente">Patente</Label>
              <Input
                id="patente"
                {...register('patente')}
                placeholder="ABC123"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Imágenes */}
      <Card>
        <CardHeader>
          <CardTitle>Imágenes</CardTitle>
        </CardHeader>
        <CardContent>
          <ImageUpload
            value={imagenes}
            onChange={(urls) => setValue('imagenes', urls)}
            maxImages={10}
          />
        </CardContent>
      </Card>

      {/* Características */}
      <Card>
        <CardHeader>
          <CardTitle>Características y Equipamiento</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <Input
              value={nuevaCaracteristica}
              onChange={(e) => setNuevaCaracteristica(e.target.value)}
              placeholder="Ej: ABS, Airbags, Bluetooth..."
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault()
                  agregarCaracteristica()
                }
              }}
            />
            <Button
              type="button"
              onClick={agregarCaracteristica}
              variant="outline"
            >
              Agregar
            </Button>
          </div>

          {caracteristicas.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {caracteristicas.map((caracteristica, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 bg-gray-100 px-3 py-1 rounded-full"
                >
                  <span className="text-sm">{caracteristica}</span>
                  <button
                    type="button"
                    onClick={() => eliminarCaracteristica(index)}
                    className="text-red-500 hover:text-red-700"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Descripción y Estado */}
      <Card>
        <CardHeader>
          <CardTitle>Descripción y Estado</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="descripcion">Descripción</Label>
            <Textarea
              id="descripcion"
              {...register('descripcion')}
              placeholder="Descripción detallada del vehículo..."
              rows={6}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="estado">Estado</Label>
              <Select
                onValueChange={(value) => setValue('estado', value as any)}
                value={watch('estado') || 'disponible'}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="disponible">Disponible</SelectItem>
                  <SelectItem value="reservado">Reservado</SelectItem>
                  <SelectItem value="vendido">Vendido</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="destacado">Destacado</Label>
              <Select
                onValueChange={(value) =>
                  setValue('destacado', value === 'true')
                }
                value={watch('destacado') ? 'true' : 'false'}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="true">Sí</SelectItem>
                  <SelectItem value="false">No</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Botones de acción */}
      <div className="flex justify-end gap-4">
        <Button
          type="button"
          variant="outline"
          onClick={() => router.back()}
        >
          Cancelar
        </Button>
        <Button
          type="submit"
          disabled={createVehicle.isPending || updateVehicle.isPending}
          className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700"
        >
          {createVehicle.isPending || updateVehicle.isPending
            ? 'Guardando...'
            : isEditing
            ? 'Actualizar Vehículo'
            : 'Crear Vehículo'}
        </Button>
      </div>
    </form>
  )
}

