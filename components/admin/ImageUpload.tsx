'use client'

import { useState, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { X, Upload, Image as ImageIcon } from 'lucide-react'
import { uploadImage, deleteImage } from '@/lib/supabase/storage'
import { useToast } from '@/hooks/use-toast'
import Image from 'next/image'

interface ImageUploadProps {
  value: string[]
  onChange: (urls: string[]) => void
  maxImages?: number
  disabled?: boolean
}

export function ImageUpload({
  value = [],
  onChange,
  maxImages = 10,
  disabled = false,
}: ImageUploadProps) {
  const [uploading, setUploading] = useState(false)
  const [previews, setPreviews] = useState<string[]>([])
  const fileInputRef = useRef<HTMLInputElement>(null)
  const { toast } = useToast()

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files || files.length === 0) return

    // Validar cantidad máxima
    if (value.length + files.length > maxImages) {
      toast({
        title: 'Límite de imágenes',
        description: `Solo puedes subir hasta ${maxImages} imágenes`,
        variant: 'destructive',
      })
      return
    }

    // Validar tipos de archivo
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp']
    const invalidFiles = Array.from(files).filter(
      (file) => !validTypes.includes(file.type)
    )

    if (invalidFiles.length > 0) {
      toast({
        title: 'Tipo de archivo inválido',
        description: 'Solo se permiten imágenes (JPG, PNG, WebP)',
        variant: 'destructive',
      })
      return
    }

    // Validar tamaño (máx 5MB por imagen)
    const maxSize = 5 * 1024 * 1024 // 5MB
    const oversizedFiles = Array.from(files).filter(
      (file) => file.size > maxSize
    )

    if (oversizedFiles.length > 0) {
      toast({
        title: 'Archivo muy grande',
        description: 'Cada imagen debe ser menor a 5MB',
        variant: 'destructive',
      })
      return
    }

    setUploading(true)

    try {
      // Crear previews locales
      const newPreviews: string[] = []
      Array.from(files).forEach((file) => {
        const reader = new FileReader()
        reader.onload = (e) => {
          if (e.target?.result) {
            newPreviews.push(e.target.result as string)
            setPreviews([...previews, ...newPreviews])
          }
        }
        reader.readAsDataURL(file)
      })

      // Subir imágenes
      const uploadPromises = Array.from(files).map((file) =>
        uploadImage(file)
      )
      const uploadedUrls = await Promise.all(uploadPromises)

      // Actualizar estado
      const newUrls = [...value, ...uploadedUrls]
      onChange(newUrls)
      setPreviews([])

      toast({
        title: 'Imágenes subidas',
        description: `${uploadedUrls.length} imagen(es) subida(s) exitosamente`,
      })
    } catch (error: any) {
      toast({
        title: 'Error al subir imágenes',
        description: error.message || 'Ocurrió un error al subir las imágenes',
        variant: 'destructive',
      })
      setPreviews([])
    } finally {
      setUploading(false)
      if (fileInputRef.current) {
        fileInputRef.current.value = ''
      }
    }
  }

  const handleRemove = async (index: number) => {
    const urlToRemove = value[index]
    const newUrls = value.filter((_, i) => i !== index)

    // Intentar eliminar del storage si es de Supabase
    try {
      if (urlToRemove.includes('supabase.co')) {
        await deleteImage(urlToRemove)
      }
    } catch (error) {
      console.error('Error al eliminar imagen del storage:', error)
      // Continuar aunque falle la eliminación del storage
    }

    onChange(newUrls)
  }

  const handleSetMainImage = (index: number) => {
    if (index === 0) return // Ya es la principal

    const newUrls = [...value]
    const mainImage = newUrls[0]
    newUrls[0] = newUrls[index]
    newUrls[index] = mainImage
    onChange(newUrls)
  }

  return (
    <div className="space-y-4">
      <div>
        <Label>Imágenes del Vehículo</Label>
        <p className="text-sm text-gray-500 mt-1">
          Máximo {maxImages} imágenes. La primera será la imagen principal.
        </p>
      </div>

      {/* Input de archivo */}
      <div>
        <Input
          ref={fileInputRef}
          type="file"
          accept="image/jpeg,image/jpg,image/png,image/webp"
          multiple
          onChange={handleFileSelect}
          disabled={disabled || uploading || value.length >= maxImages}
          className="hidden"
          id="image-upload"
        />
        <Label htmlFor="image-upload">
          <Button
            type="button"
            variant="outline"
            disabled={disabled || uploading || value.length >= maxImages}
            className="w-full"
            onClick={() => fileInputRef.current?.click()}
          >
            <Upload className="w-4 h-4 mr-2" />
            {uploading ? 'Subiendo...' : 'Subir Imágenes'}
          </Button>
        </Label>
      </div>

      {/* Grid de imágenes */}
      {value.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {value.map((url, index) => (
            <div
              key={index}
              className="relative group aspect-video rounded-lg overflow-hidden border-2 border-gray-200"
            >
              <Image
                src={url}
                alt={`Imagen ${index + 1}`}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 50vw, 25vw"
              />
              
              {/* Overlay con acciones */}
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                {index === 0 && (
                  <span className="absolute top-2 left-2 bg-green-500 text-white text-xs px-2 py-1 rounded">
                    Principal
                  </span>
                )}
                {index !== 0 && (
                  <Button
                    type="button"
                    size="sm"
                    variant="secondary"
                    onClick={() => handleSetMainImage(index)}
                    className="text-xs"
                  >
                    Hacer Principal
                  </Button>
                )}
                <Button
                  type="button"
                  size="sm"
                  variant="destructive"
                  onClick={() => handleRemove(index)}
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Previews mientras se suben */}
      {previews.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {previews.map((preview, index) => (
            <div
              key={`preview-${index}`}
              className="relative aspect-video rounded-lg overflow-hidden border-2 border-gray-200 opacity-50"
            >
              <Image
                src={preview}
                alt={`Preview ${index + 1}`}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 50vw, 25vw"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                <span className="text-white text-sm">Subiendo...</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Contador */}
      <p className="text-sm text-gray-500">
        {value.length} / {maxImages} imágenes
      </p>
    </div>
  )
}

