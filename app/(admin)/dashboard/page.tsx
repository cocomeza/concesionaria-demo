import { createSupabaseServerComponentClient } from '@/lib/supabase/server'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Car, DollarSign, TrendingUp } from 'lucide-react'
import { formatPrice } from '@/lib/utils'

export default async function DashboardPage() {
  const supabase = await createSupabaseServerComponentClient()

  // Obtener estadísticas
  const [vehiclesResult, totalValueResult] = await Promise.all([
    supabase.from('vehicles').select('id, estado, precio', { count: 'exact' }),
    supabase
      .from('vehicles')
      .select('precio')
      .eq('estado', 'disponible'),
  ])

  const totalVehicles = vehiclesResult.count || 0
  const availableVehicles =
    vehiclesResult.data?.filter((v) => v.estado === 'disponible').length || 0
  const inventoryValue =
    totalValueResult.data?.reduce((sum, v) => sum + Number(v.precio), 0) || 0

  const stats = [
    {
      title: 'Vehículos Disponibles',
      value: `${availableVehicles}`,
      subtitle: `De ${totalVehicles} totales`,
      icon: Car,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
    },
    {
      title: 'Valor Inventario',
      value: formatPrice(inventoryValue, 'USD'),
      subtitle: `${availableVehicles} unidades`,
      icon: DollarSign,
      color: 'text-green-600',
      bgColor: 'bg-green-100',
    },
    {
      title: 'Vehículos Vendidos',
      value: `${totalVehicles - availableVehicles}`,
      subtitle: 'Total vendidos',
      icon: Car,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100',
    },
    {
      title: 'Vehículos Reservados',
      value: `${vehiclesResult.data?.filter((v) => v.estado === 'reservado').length || 0}`,
      subtitle: 'En reserva',
      icon: TrendingUp,
      color: 'text-orange-600',
      bgColor: 'bg-orange-100',
    },
  ]

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Dashboard Administrativo</h1>
        <p className="text-gray-600 mt-2">
          Resumen general de tu concesionaria
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <Card key={stat.title} className="overflow-hidden">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-xs sm:text-sm font-medium text-gray-600 truncate pr-2">
                {stat.title}
              </CardTitle>
              <div className={`${stat.bgColor} p-2 rounded-lg flex-shrink-0`}>
                <stat.icon className={`w-4 h-4 sm:w-5 sm:h-5 ${stat.color}`} />
              </div>
            </CardHeader>
            <CardContent className="min-h-[80px]">
              <div className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold break-words leading-tight">
                {stat.value}
              </div>
              <p className="text-xs text-gray-500 mt-1">{stat.subtitle}</p>
            </CardContent>
          </Card>
        ))}
      </div>

    </div>
  )
}

