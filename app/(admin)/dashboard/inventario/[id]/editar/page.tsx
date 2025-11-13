import { VehicleForm } from '@/components/admin/VehicleForm'

export default function EditarVehiculoPage({
  params,
}: {
  params: { id: string }
}) {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Editar Vehículo</h1>
        <p className="text-gray-600 mt-2">
          Modifica la información del vehículo
        </p>
      </div>

      <VehicleForm vehicleId={params.id} />
    </div>
  )
}

