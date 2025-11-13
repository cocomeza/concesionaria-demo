import { VehicleForm } from '@/components/admin/VehicleForm'

export default function NuevoVehiculoPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Nuevo Vehículo</h1>
        <p className="text-gray-600 mt-2">
          Agrega un nuevo vehículo al inventario
        </p>
      </div>

      <VehicleForm />
    </div>
  )
}

