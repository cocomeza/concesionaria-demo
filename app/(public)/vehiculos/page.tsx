import { createSupabaseServerComponentClient } from '@/lib/supabase/server'
import { VehicleCard } from '@/components/vehiculos/VehicleCard'
import { VehicleFilters } from '@/components/vehiculos/VehicleFilters'
import { Input } from '@/components/ui/input'
import { Search } from 'lucide-react'

export default async function VehiculosPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  const supabase = await createSupabaseServerComponentClient()

  // Construir query con filtros
  let query = supabase
    .from('vehicles')
    .select('*')
    .eq('estado', 'disponible')

  // Aplicar filtros
  const marca = searchParams.marca as string
  const precioMin = searchParams.precioMin as string
  const precioMax = searchParams.precioMax as string
  const combustible = searchParams.combustible as string
  const transmision = searchParams.transmision as string
  const carroceria = searchParams.carroceria as string

  if (marca) {
    query = query.eq('marca', marca)
  }
  if (combustible) {
    query = query.eq('combustible', combustible)
  }
  if (transmision) {
    query = query.eq('transmision', transmision)
  }
  if (carroceria) {
    query = query.eq('carroceria', carroceria)
  }
  if (precioMin) {
    query = query.gte('precio', precioMin)
  }
  if (precioMax) {
    query = query.lte('precio', precioMax)
  }

  // Ordenamiento
  const sortBy = (searchParams.sortBy as string) || 'created_at'
  const sortOrder = (searchParams.sortOrder as string) || 'desc'
  query = query.order(sortBy, { ascending: sortOrder === 'asc' })

  const { data: vehiculos, error } = await query

  // Obtener marcas únicas para el filtro
  const { data: marcas } = await supabase
    .from('vehicles')
    .select('marca')
    .eq('estado', 'disponible')

  const marcasUnicas = Array.from(
    new Set(marcas?.map((v) => v.marca) || [])
  ).sort()

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <div className="container mx-auto px-4 py-6 md:py-8">
        <div className="mb-6 md:mb-8">
          <h1 className="text-2xl md:text-4xl font-bold mb-2 md:mb-4">Catálogo de Vehículos</h1>
          <p className="text-sm md:text-base text-gray-400">
            Encuentra el vehículo perfecto para ti
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-4 md:gap-8">
          {/* Sidebar de filtros */}
          <aside className="lg:w-64 flex-shrink-0">
            <VehicleFilters marcas={marcasUnicas} />
          </aside>

          {/* Contenido principal */}
          <main className="flex-1">
            {/* Barra de búsqueda */}
            <div className="mb-6">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  placeholder="Buscar por marca, modelo o versión..."
                  className="pl-10 bg-slate-900/80 border-slate-800 text-white placeholder:text-gray-500 focus:border-cyan-500/50"
                />
              </div>
            </div>

            {/* Resultados */}
            {error ? (
              <div className="text-center py-12">
                <p className="text-cyan-500">Error al cargar vehículos</p>
              </div>
            ) : vehiculos && vehiculos.length > 0 ? (
              <>
                <div className="mb-4 text-sm text-gray-400">
                  {vehiculos.length} vehículo{vehiculos.length !== 1 ? 's' : ''}{' '}
                  encontrado{vehiculos.length !== 1 ? 's' : ''}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {vehiculos.map((vehiculo) => (
                    <VehicleCard key={vehiculo.id} vehiculo={vehiculo} />
                  ))}
                </div>
              </>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-400">
                  No se encontraron vehículos con los filtros seleccionados
                </p>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  )
}

