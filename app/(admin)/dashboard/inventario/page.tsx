import { createSupabaseServerComponentClient } from '@/lib/supabase/server'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { formatPrice } from '@/lib/utils'
import Link from 'next/link'
import { Plus } from 'lucide-react'
import { InventarioExport } from '@/components/admin/InventarioExport'
import { VehicleActions } from '@/components/admin/VehicleActions'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

export default async function InventarioPage() {
  const supabase = await createSupabaseServerComponentClient()

  const { data: vehiculos, error } = await supabase
    .from('vehicles')
    .select('*')
    .order('created_at', { ascending: false })

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Gestión de Vehículos</h1>
          <p className="text-gray-600 mt-2">
            {vehiculos?.length || 0} vehículo{(vehiculos?.length || 0) !== 1 ? 's' : ''} en inventario
          </p>
        </div>
        <div className="flex items-center gap-3">
          {vehiculos && vehiculos.length > 0 && (
            <InventarioExport vehiculos={vehiculos} />
          )}
          <Link href="/dashboard/inventario/nuevo">
            <Button className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700">
              <Plus className="w-4 h-4 mr-2" />
              Nuevo Vehículo
            </Button>
          </Link>
        </div>
      </div>

      {error ? (
        <Card>
          <CardContent className="p-6">
                <p className="text-cyan-500">Error al cargar vehículos</p>
          </CardContent>
        </Card>
      ) : vehiculos && vehiculos.length > 0 ? (
        <Card>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Imagen</TableHead>
                    <TableHead>Marca / Modelo</TableHead>
                    <TableHead>Año</TableHead>
                    <TableHead>Precio</TableHead>
                    <TableHead>Estado</TableHead>
                    <TableHead>Destacado</TableHead>
                    <TableHead>Vistas</TableHead>
                    <TableHead className="text-right">Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {vehiculos.map((vehiculo) => (
                    <TableRow key={vehiculo.id}>
                      <TableCell>
                        <div className="w-16 h-12 relative rounded overflow-hidden bg-gray-200">
                          {vehiculo.imagen_principal ? (
                            <img
                              src={vehiculo.imagen_principal}
                              alt={`${vehiculo.marca} ${vehiculo.modelo}`}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs">
                              Sin imagen
                            </div>
                          )}
                        </div>
                      </TableCell>
                      <TableCell className="font-medium">
                        {vehiculo.marca} {vehiculo.modelo}
                      </TableCell>
                      <TableCell>{vehiculo.año}</TableCell>
                      <TableCell className="font-semibold bg-gradient-to-r from-cyan-500 to-blue-600 bg-clip-text text-transparent">
                        {formatPrice(vehiculo.precio, 'USD')}
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            vehiculo.estado === 'disponible'
                              ? 'success'
                              : vehiculo.estado === 'reservado'
                              ? 'warning'
                              : 'secondary'
                          }
                        >
                          {vehiculo.estado}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {vehiculo.destacado ? (
                          <Badge variant="default">Sí</Badge>
                        ) : (
                          <span className="text-gray-400">No</span>
                        )}
                      </TableCell>
                      <TableCell>{vehiculo.views || 0}</TableCell>
                      <TableCell className="text-right">
                        <VehicleActions
                          vehicleId={vehiculo.id}
                          vehicleName={`${vehiculo.marca} ${vehiculo.modelo}`}
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardContent className="p-12 text-center">
            <p className="text-gray-500 mb-4">No hay vehículos en inventario</p>
            <Link href="/dashboard/inventario/nuevo">
              <Button className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700">
                <Plus className="w-4 h-4 mr-2" />
                Agregar Primer Vehículo
              </Button>
            </Link>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

