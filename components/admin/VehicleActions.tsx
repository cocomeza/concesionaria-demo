'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useDeleteVehicle } from '@/hooks/useVehicles'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Edit, Trash2, Eye } from 'lucide-react'
import Link from 'next/link'

interface VehicleActionsProps {
  vehicleId: string
  vehicleName: string
}

export function VehicleActions({ vehicleId, vehicleName }: VehicleActionsProps) {
  const router = useRouter()
  const deleteVehicle = useDeleteVehicle()
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)

  const handleDelete = async () => {
    setIsDeleting(true)
    try {
      await deleteVehicle.mutateAsync(vehicleId)
      setShowDeleteDialog(false)
      router.refresh()
    } catch (error) {
      console.error('Error al eliminar vehículo:', error)
    } finally {
      setIsDeleting(false)
    }
  }

  return (
    <>
      <div className="flex items-center justify-end gap-2">
        <Link href={`/vehiculos/${vehicleId}`}>
          <Button variant="ghost" size="icon" title="Ver detalles">
            <Eye className="w-4 h-4" />
          </Button>
        </Link>
        <Link href={`/dashboard/inventario/${vehicleId}/editar`}>
          <Button variant="ghost" size="icon" title="Editar">
            <Edit className="w-4 h-4" />
          </Button>
        </Link>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setShowDeleteDialog(true)}
          className="text-red-600 hover:text-red-700 hover:bg-red-50"
          title="Eliminar"
        >
          <Trash2 className="w-4 h-4" />
        </Button>
      </div>

      <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>¿Eliminar vehículo?</DialogTitle>
            <DialogDescription>
              Estás a punto de eliminar el vehículo <strong>{vehicleName}</strong>. Esta acción no se puede deshacer.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowDeleteDialog(false)}
              disabled={isDeleting}
            >
              Cancelar
            </Button>
            <Button
              variant="destructive"
              onClick={handleDelete}
              disabled={isDeleting}
            >
              {isDeleting ? 'Eliminando...' : 'Eliminar'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}

