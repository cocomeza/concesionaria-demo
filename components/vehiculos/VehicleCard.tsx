import Image from 'next/image'
import Link from 'next/link'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { formatPrice } from '@/lib/utils'
import type { Vehicle } from '@/types'
import { Star, Eye } from 'lucide-react'

interface VehicleCardProps {
  vehiculo: Vehicle
}

export function VehicleCard({ vehiculo }: VehicleCardProps) {
  const imageUrl =
    vehiculo.imagen_principal ||
    vehiculo.imagenes?.[0] ||
    'https://via.placeholder.com/400x300?text=Sin+Imagen'

  return (
    <Link href={`/vehiculos/${vehiculo.id}`} data-testid="vehicle-card">
      <Card className="group overflow-hidden border-slate-800 bg-slate-900/80 backdrop-blur-sm hover:border-cyan-500/50 transition-all cursor-pointer h-full shadow-lg hover:shadow-cyan-500/20">
        <div className="relative aspect-video w-full overflow-hidden">
          <Image
            src={imageUrl}
            alt={`${vehiculo.marca} ${vehiculo.modelo}`}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          {vehiculo.destacado && (
            <div className="absolute top-2 right-2">
              <Badge className="bg-gradient-to-r from-cyan-500 to-blue-600">
                <Star className="w-3 h-3 mr-1" />
                Destacado
              </Badge>
            </div>
          )}
          <div className="absolute top-2 left-2">
            <Badge variant="secondary" className="bg-black/50 text-white">
              {vehiculo.estado}
            </Badge>
          </div>
        </div>
        <CardContent className="p-4">
          <div className="flex items-start justify-between mb-2">
            <div>
              <h3 className="text-lg font-semibold text-white group-hover:text-cyan-400 transition-colors">
                {vehiculo.marca} {vehiculo.modelo}
              </h3>
              <p className="text-sm text-gray-400">{vehiculo.año}</p>
            </div>
          </div>

          <div className="flex items-center justify-between mt-4">
            <div className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              {formatPrice(vehiculo.precio, 'USD')}
            </div>
            {vehiculo.views > 0 && (
              <div className="flex items-center gap-1 text-gray-400 text-sm">
                <Eye className="w-4 h-4" />
                {vehiculo.views}
              </div>
            )}
          </div>

          <div className="flex flex-wrap gap-2 mt-3">
            {vehiculo.kilometraje && (
              <span className="text-xs text-gray-400">
                {vehiculo.kilometraje.toLocaleString('es-AR')} km
              </span>
            )}
            {vehiculo.combustible && (
              <span className="text-xs text-gray-400 capitalize">
                {vehiculo.combustible}
              </span>
            )}
            {vehiculo.transmision && (
              <span className="text-xs text-gray-400 capitalize">
                {vehiculo.transmision}
              </span>
            )}
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}

