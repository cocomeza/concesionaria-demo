'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

interface VehicleFiltersProps {
  marcas: string[]
}

export function VehicleFilters({ marcas }: VehicleFiltersProps) {
  const router = useRouter()
  const searchParams = useSearchParams()

  const handleFilterChange = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString())
    if (value && value !== 'all') {
      params.set(key, value)
    } else {
      params.delete(key)
    }
    router.push(`/vehiculos?${params.toString()}`)
  }

  const clearFilters = () => {
    router.push('/vehiculos')
  }

  return (
    <Card className="bg-slate-900/80 backdrop-blur-sm border-slate-800">
      <CardHeader>
        <CardTitle className="text-white">Filtros</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label className="text-gray-300">Marca</Label>
          <Select
            value={searchParams.get('marca') || 'all'}
            onValueChange={(value) => handleFilterChange('marca', value)}
          >
            <SelectTrigger className="bg-slate-900 border-slate-800 text-white hover:border-cyan-500/50">
              <SelectValue placeholder="Todas las marcas" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todas las marcas</SelectItem>
              {marcas.map((marca) => (
                <SelectItem key={marca} value={marca}>
                  {marca}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label className="text-gray-300">Combustible</Label>
          <Select
            value={searchParams.get('combustible') || 'all'}
            onValueChange={(value) => handleFilterChange('combustible', value)}
          >
            <SelectTrigger className="bg-slate-900 border-slate-800 text-white hover:border-cyan-500/50">
              <SelectValue placeholder="Todos" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos</SelectItem>
              <SelectItem value="nafta">Nafta</SelectItem>
              <SelectItem value="diesel">Diesel</SelectItem>
              <SelectItem value="electrico">Eléctrico</SelectItem>
              <SelectItem value="hibrido">Híbrido</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label className="text-gray-300">Transmisión</Label>
          <Select
            value={searchParams.get('transmision') || 'all'}
            onValueChange={(value) => handleFilterChange('transmision', value)}
          >
            <SelectTrigger className="bg-slate-900 border-slate-800 text-white hover:border-cyan-500/50">
              <SelectValue placeholder="Todas" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todas</SelectItem>
              <SelectItem value="manual">Manual</SelectItem>
              <SelectItem value="automatica">Automática</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label className="text-gray-300">Carrocería</Label>
          <Select
            value={searchParams.get('carroceria') || 'all'}
            onValueChange={(value) => handleFilterChange('carroceria', value)}
          >
            <SelectTrigger className="bg-slate-900 border-slate-800 text-white hover:border-cyan-500/50">
              <SelectValue placeholder="Todas" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todas</SelectItem>
              <SelectItem value="sedan">Sedán</SelectItem>
              <SelectItem value="suv">SUV</SelectItem>
              <SelectItem value="pickup">Pickup</SelectItem>
              <SelectItem value="coupe">Coupé</SelectItem>
              <SelectItem value="hatchback">Hatchback</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label className="text-gray-300">Precio Mínimo</Label>
          <Input
            type="number"
            placeholder="0"
            value={searchParams.get('precioMin') || ''}
            onChange={(e) => handleFilterChange('precioMin', e.target.value)}
            className="bg-slate-900 border-slate-800 text-white placeholder:text-gray-500 focus:border-cyan-500/50"
          />
        </div>

        <div className="space-y-2">
          <Label className="text-gray-300">Precio Máximo</Label>
          <Input
            type="number"
            placeholder="Sin límite"
            value={searchParams.get('precioMax') || ''}
            onChange={(e) => handleFilterChange('precioMax', e.target.value)}
            className="bg-slate-900 border-slate-800 text-white placeholder:text-gray-500 focus:border-cyan-500/50"
          />
        </div>

        <Button
          variant="outline"
          className="w-full border-cyan-500/50 bg-cyan-500/10 text-cyan-400 hover:bg-cyan-500/20 hover:border-cyan-500 hover:text-cyan-300"
          onClick={clearFilters}
        >
          Limpiar Filtros
        </Button>
      </CardContent>
    </Card>
  )
}

