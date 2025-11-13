'use client'

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { createSupabaseClient } from '@/lib/supabase/client'
import type { Vehicle, VehicleFilters, VehicleSort } from '@/types'
import { useToast } from '@/hooks/use-toast'

export function useVehicles(filters?: VehicleFilters, sort?: VehicleSort) {
  const supabase = createSupabaseClient()

  return useQuery({
    queryKey: ['vehicles', filters, sort],
    queryFn: async () => {
      let query = supabase.from('vehicles').select('*')

      if (filters) {
        if (filters.marca) query = query.eq('marca', filters.marca)
        if (filters.modelo) query = query.eq('modelo', filters.modelo)
        if (filters.precioMin) query = query.gte('precio', filters.precioMin)
        if (filters.precioMax) query = query.lte('precio', filters.precioMax)
        if (filters.añoMin) query = query.gte('año', filters.añoMin)
        if (filters.añoMax) query = query.lte('año', filters.añoMax)
        if (filters.kilometrajeMax)
          query = query.lte('kilometraje', filters.kilometrajeMax)
        if (filters.combustible)
          query = query.eq('combustible', filters.combustible)
        if (filters.transmision)
          query = query.eq('transmision', filters.transmision)
        if (filters.carroceria)
          query = query.eq('carroceria', filters.carroceria)
        if (filters.estado) query = query.eq('estado', filters.estado)
        if (filters.destacado !== undefined)
          query = query.eq('destacado', filters.destacado)
      }

      if (sort) {
        query = query.order(sort.field, {
          ascending: sort.order === 'asc',
        })
      } else {
        query = query.order('created_at', { ascending: false })
      }

      const { data, error } = await query

      if (error) throw error
      return data as Vehicle[]
    },
  })
}

export function useVehicle(id: string) {
  const supabase = createSupabaseClient()

  return useQuery({
    queryKey: ['vehicle', id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('vehicles')
        .select('*')
        .eq('id', id)
        .single()

      if (error) throw error
      return data as Vehicle
    },
    enabled: !!id,
  })
}

export function useCreateVehicle() {
  const supabase = createSupabaseClient()
  const queryClient = useQueryClient()
  const { toast } = useToast()

  return useMutation({
    mutationFn: async (vehicle: any) => {
      const { data, error } = await supabase
        .from('vehicles')
        .insert(vehicle)
        .select()
        .single()

      if (error) throw error
      return data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['vehicles'] })
      toast({
        title: 'Vehículo creado',
        description: 'El vehículo se ha agregado exitosamente',
      })
    },
    onError: (error: any) => {
      toast({
        title: 'Error',
        description: error.message || 'Error al crear el vehículo',
        variant: 'destructive',
      })
    },
  })
}

export function useUpdateVehicle() {
  const supabase = createSupabaseClient()
  const queryClient = useQueryClient()
  const { toast } = useToast()

  return useMutation({
    mutationFn: async ({ id, ...updates }: { id: string; [key: string]: any }) => {
      // Obtener el vehículo actual para comparar la patente
      const { data: currentVehicle } = await supabase
        .from('vehicles')
        .select('patente')
        .eq('id', id)
        .single()

      // Si la patente no cambió, excluirla del update para evitar el error de restricción única
      if (currentVehicle && updates.patente === currentVehicle.patente) {
        const { patente, ...updatesWithoutPatente } = updates
        updates = updatesWithoutPatente
      }

      // Si la patente está vacía o es null, establecerla como null explícitamente
      if (updates.patente === '' || updates.patente === undefined) {
        updates.patente = null
      }

      const { data, error } = await supabase
        .from('vehicles')
        .update(updates)
        .eq('id', id)
        .select()
        .single()

      if (error) throw error
      return data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['vehicles'] })
      queryClient.invalidateQueries({ queryKey: ['vehicle'] })
      toast({
        title: 'Vehículo actualizado',
        description: 'Los cambios se han guardado exitosamente',
      })
    },
    onError: (error: any) => {
      // Mensaje de error más amigable para el usuario
      let errorMessage = error.message || 'Error al actualizar el vehículo'
      
      if (error.message?.includes('patente_key')) {
        errorMessage = 'La patente ingresada ya está registrada en otro vehículo'
      }

      toast({
        title: 'Error',
        description: errorMessage,
        variant: 'destructive',
      })
    },
  })
}

export function useDeleteVehicle() {
  const supabase = createSupabaseClient()
  const queryClient = useQueryClient()
  const { toast } = useToast()

  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from('vehicles').delete().eq('id', id)

      if (error) throw error
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['vehicles'] })
      toast({
        title: 'Vehículo eliminado',
        description: 'El vehículo se ha eliminado exitosamente',
      })
    },
    onError: (error: any) => {
      toast({
        title: 'Error',
        description: error.message || 'Error al eliminar el vehículo',
        variant: 'destructive',
      })
    },
  })
}

