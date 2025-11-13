import { createSupabaseServerComponentClient } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'
import { Card, CardContent } from '@/components/ui/card'
import { formatPrice } from '@/lib/utils'
import { Calendar, Gauge, Fuel, Settings, Car } from 'lucide-react'
import { VehicleContactForm } from '@/components/vehiculos/VehicleContactForm'
import { VehicleImageCarousel } from '@/components/vehiculos/VehicleImageCarousel'

export default async function VehicleDetailPage({
  params,
}: {
  params: { id: string }
}) {
  const supabase = await createSupabaseServerComponentClient()

  const { data: vehiculo, error } = await supabase
    .from('vehicles')
    .select('*')
    .eq('id', params.id)
    .single()

  if (error || !vehiculo) {
    notFound()
  }

  // Incrementar views
  await supabase
    .from('vehicles')
    .update({ views: (vehiculo.views || 0) + 1 })
    .eq('id', params.id)

  const images = vehiculo.imagenes && vehiculo.imagenes.length > 0
    ? vehiculo.imagenes
    : vehiculo.imagen_principal
    ? [vehiculo.imagen_principal]
    : ['https://via.placeholder.com/800x600?text=Sin+Imagen']

  const caracteristicas = Array.isArray(vehiculo.caracteristicas)
    ? vehiculo.caracteristicas
    : []

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <div className="container mx-auto px-4 py-6 md:py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
          {/* Galería de imágenes con carrusel */}
          <div>
            <VehicleImageCarousel
              images={images}
              vehicleName={`${vehiculo.marca} ${vehiculo.modelo}`}
              destacado={vehiculo.destacado}
            />
          </div>

          {/* Información del vehículo */}
          <div className="space-y-4 md:space-y-6">
            <div>
              <h1 className="text-2xl md:text-4xl font-bold mb-2">
                {vehiculo.marca} {vehiculo.modelo}
              </h1>
              <p className="text-xl md:text-2xl bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent font-bold mb-4">
                {formatPrice(vehiculo.precio, 'USD')}
              </p>
              {vehiculo.precio_anterior && (
                <p className="text-gray-400 line-through">
                  {formatPrice(vehiculo.precio_anterior, 'USD')}
                </p>
              )}
            </div>

            {/* Especificaciones */}
            <Card className="bg-slate-900/90 border-slate-700">
              <CardContent className="p-4 md:p-6">
                <h2 className="text-lg md:text-xl font-semibold mb-4 text-white">
                  Especificaciones
                </h2>
                <div className="grid grid-cols-2 gap-3 md:gap-4">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-cyan-400" />
                    <div>
                      <p className="text-sm text-gray-300">Año</p>
                      <p className="font-semibold text-white">{vehiculo.año}</p>
                    </div>
                  </div>
                  {vehiculo.kilometraje && (
                    <div className="flex items-center gap-2">
                      <Gauge className="w-5 h-5 text-cyan-400" />
                      <div>
                        <p className="text-sm text-gray-300">Kilometraje</p>
                        <p className="font-semibold text-white">
                          {vehiculo.kilometraje.toLocaleString('es-AR')} km
                        </p>
                      </div>
                    </div>
                  )}
                  {vehiculo.combustible && (
                    <div className="flex items-center gap-2">
                      <Fuel className="w-5 h-5 text-cyan-400" />
                      <div>
                        <p className="text-sm text-gray-300">Combustible</p>
                        <p className="font-semibold capitalize text-white">
                          {vehiculo.combustible}
                        </p>
                      </div>
                    </div>
                  )}
                  {vehiculo.transmision && (
                    <div className="flex items-center gap-2">
                      <Settings className="w-5 h-5 text-cyan-400" />
                      <div>
                        <p className="text-sm text-gray-300">Transmisión</p>
                        <p className="font-semibold capitalize text-white">
                          {vehiculo.transmision}
                        </p>
                      </div>
                    </div>
                  )}
                  {vehiculo.carroceria && (
                    <div className="flex items-center gap-2">
                      <Car className="w-5 h-5 text-cyan-400" />
                      <div>
                        <p className="text-sm text-gray-300">Carrocería</p>
                        <p className="font-semibold capitalize text-white">
                          {vehiculo.carroceria}
                        </p>
                      </div>
                    </div>
                  )}
                  {vehiculo.color && (
                    <div className="flex items-center gap-2">
                      <div className="w-5 h-5 rounded-full border-2 border-cyan-400" />
                      <div>
                        <p className="text-sm text-gray-300">Color</p>
                        <p className="font-semibold text-white">{vehiculo.color}</p>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Características */}
            {caracteristicas.length > 0 && (
              <Card className="bg-slate-900/80 border-slate-800">
                <CardContent className="p-4 md:p-6">
                  <h2 className="text-lg md:text-xl font-semibold mb-4">
                    Características y Equipamiento
                  </h2>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {caracteristicas.map((caracteristica: string, idx: number) => (
                      <li key={idx} className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-cyan-500 rounded-full" />
                        <span className="text-gray-300">{caracteristica}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )}

            {/* Descripción */}
            {vehiculo.descripcion && (
              <Card className="bg-slate-900/80 border-slate-800">
                <CardContent className="p-4 md:p-6">
                  <h2 className="text-lg md:text-xl font-semibold mb-4">Descripción</h2>
                  <p className="text-sm md:text-base text-gray-300 whitespace-pre-line">
                    {vehiculo.descripcion}
                  </p>
                </CardContent>
              </Card>
            )}

            {/* Formulario de contacto */}
            <VehicleContactForm vehicleId={vehiculo.id} />
          </div>
        </div>
      </div>
    </div>
  )
}

