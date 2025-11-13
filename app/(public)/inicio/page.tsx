import { createSupabaseServerComponentClient } from '@/lib/supabase/server'
import { VehicleCard } from '@/components/vehiculos/VehicleCard'
import { Button } from '@/components/ui/button'
import { Car, Shield, DollarSign, ArrowRight } from 'lucide-react'
import Link from 'next/link'

export default async function InicioPage() {
  const supabase = await createSupabaseServerComponentClient()
  
  // Obtener vehículos destacados
  const { data: destacados } = await supabase
    .from('vehicles')
    .select('*')
    .eq('destacado', true)
    .eq('estado', 'disponible')
    .limit(6)
    .order('created_at', { ascending: false })

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden min-h-[90vh] flex items-center">
        {/* Imagen de fondo del auto */}
        <div className="absolute inset-0 z-0">
          {/* Imagen de fondo */}
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: "url('https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=1920&q=80')",
              backgroundPosition: 'right center',
              backgroundSize: 'cover',
            }}
          />
          {/* Overlay oscuro para contraste (más suave) */}
          <div className="absolute inset-0 bg-slate-950/60 z-10" />
          {/* Gradientes para mejor legibilidad del texto */}
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/50 to-transparent z-20" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-slate-950/80 z-20" />
        </div>

        <div className="relative z-20 container mx-auto px-4 py-12 md:py-20 lg:py-32">
          <div className="max-w-3xl">
            <h1 className="text-3xl md:text-5xl lg:text-7xl font-bold mb-4 md:mb-6 leading-tight">
              Tu Próximo{' '}
              <span className="block bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">Vehículo Está Aquí</span>
            </h1>

            <p className="text-base md:text-xl text-gray-300 mb-6 md:mb-8 max-w-2xl">
              La mejor selección de vehículos usados y 0km. Financiación y
              permutas disponibles.
            </p>

            <Link href="/vehiculos" data-testid="catalog-link">
              <Button size="lg" className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white shadow-lg shadow-cyan-500/30 transition-all hover:scale-105 border-0 w-full md:w-auto">
                Ver Catálogo Completo
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>

            {/* Stats */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 md:gap-12 lg:gap-16 mt-8 md:mt-12">
              <div className="text-center">
                <div className="text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">200+</div>
                <div className="text-gray-400 mt-2 text-sm md:text-base">Vehículos</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">15+</div>
                <div className="text-gray-400 mt-2 text-sm md:text-base">Años</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">98%</div>
                <div className="text-gray-400 mt-2 text-sm md:text-base">Satisfacción</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section data-testid="features-section" className="relative z-20 bg-slate-50 py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white rounded-lg p-8 border border-gray-200 hover:border-cyan-500/50 transition-all hover:scale-105 shadow-md hover:shadow-cyan-500/20 text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-lg flex items-center justify-center mb-4 mx-auto">
                <Shield className="w-8 h-8 text-cyan-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900">Garantía Total</h3>
              <p className="text-gray-600">Todos los vehículos revisados</p>
            </div>

            <div className="bg-white rounded-lg p-8 border border-gray-200 hover:border-cyan-500/50 transition-all hover:scale-105 shadow-md hover:shadow-cyan-500/20 text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-lg flex items-center justify-center mb-4 mx-auto">
                <DollarSign className="w-8 h-8 text-cyan-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900">Financiación</h3>
              <p className="text-gray-600">Planes a tu medida</p>
            </div>

            <div className="bg-white rounded-lg p-8 border border-gray-200 hover:border-cyan-500/50 transition-all hover:scale-105 shadow-md hover:shadow-cyan-500/20 text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-lg flex items-center justify-center mb-4 mx-auto">
                <DollarSign className="w-8 h-8 text-cyan-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900">Mejor Precio</h3>
              <p className="text-gray-600">Precios competitivos</p>
            </div>

            <div className="bg-white rounded-lg p-8 border border-gray-200 hover:border-cyan-500/50 transition-all hover:scale-105 shadow-md hover:shadow-cyan-500/20 text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-lg flex items-center justify-center mb-4 mx-auto">
                <Car className="w-8 h-8 text-cyan-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900">Permutas</h3>
              <p className="text-gray-600">Aceptamos tu usado</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Vehicles */}
      {destacados && destacados.length > 0 && (
        <section data-testid="featured-vehicles-section" className="relative z-20 py-12 md:py-20 bg-slate-950">
          <div className="container mx-auto px-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6 md:mb-8">
              <h2 className="text-2xl md:text-4xl font-bold text-white">Vehículos Destacados</h2>
              <Link href="/vehiculos">
                <Button variant="outline" className="border-cyan-500/50 text-white hover:bg-cyan-500/10 hover:border-cyan-500 w-full sm:w-auto">
                  Ver todos
                </Button>
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {destacados.map((vehiculo) => (
                <VehicleCard key={vehiculo.id} vehiculo={vehiculo} />
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  )
}

