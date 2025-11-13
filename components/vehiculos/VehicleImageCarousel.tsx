'use client'

import { useState } from 'react'
import Image from 'next/image'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Star } from 'lucide-react'
import { Dialog, DialogContent } from '@/components/ui/dialog'

interface VehicleImageCarouselProps {
  images: string[]
  vehicleName: string
  destacado?: boolean
}

export function VehicleImageCarousel({
  images,
  vehicleName,
  destacado = false,
}: VehicleImageCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [modalIndex, setModalIndex] = useState(0)

  if (!images || images.length === 0) {
    return null
  }

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1))
  }

  const goToNext = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1))
  }

  const goToSlide = (index: number) => {
    setCurrentIndex(index)
  }

  const openModal = (index: number) => {
    setModalIndex(index)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
  }

  const goToPreviousModal = () => {
    setModalIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1))
  }

  const goToNextModal = () => {
    setModalIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1))
  }

  return (
    <>
      <div className="space-y-4">
        {/* Imagen principal con navegación */}
        <div className="relative aspect-video w-full rounded-lg overflow-hidden group">
          <Image
            src={images[currentIndex]}
            alt={`${vehicleName} - Imagen ${currentIndex + 1}`}
            fill
            className="object-cover cursor-pointer"
            priority
            sizes="(max-width: 768px) 100vw, 50vw"
            onClick={() => openModal(currentIndex)}
          />

          {/* Badge destacado */}
          {destacado && (
            <div className="absolute top-4 left-4 z-10">
              <Badge className="bg-gradient-to-r from-cyan-500 to-blue-600">
                <Star className="w-3 h-3 mr-1" />
                Destacado
              </Badge>
            </div>
          )}

          {/* Contador de imágenes */}
          {images.length > 1 && (
            <div className="absolute top-4 right-4 z-10 bg-black/60 px-3 py-1 rounded-full text-sm">
              {currentIndex + 1} / {images.length}
            </div>
          )}

          {/* Botones de navegación */}
          {images.length > 1 && (
            <>
              <button
                onClick={goToPrevious}
                className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-black/60 hover:bg-black/80 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                aria-label="Imagen anterior"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={goToNext}
                className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-black/60 hover:bg-black/80 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                aria-label="Siguiente imagen"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </>
          )}

          {/* Indicadores de puntos */}
          {images.length > 1 && (
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 flex gap-2">
              {images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    index === currentIndex
                      ? 'bg-cyan-500 w-6'
                      : 'bg-white/50 hover:bg-white/75'
                  }`}
                  aria-label={`Ir a imagen ${index + 1}`}
                />
              ))}
            </div>
          )}
        </div>

        {/* Miniaturas */}
        {images.length > 1 && (
          <div className="grid grid-cols-4 sm:grid-cols-5 gap-2">
            {images.map((img, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`relative aspect-video rounded-lg overflow-hidden border-2 transition-all ${
                  index === currentIndex
                    ? 'border-cyan-500 ring-2 ring-cyan-500/50'
                    : 'border-transparent hover:border-cyan-500/50'
                }`}
                aria-label={`Ver imagen ${index + 1}`}
              >
                <Image
                  src={img}
                  alt={`${vehicleName} - Miniatura ${index + 1}`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 25vw, 20vw"
                  loading={index < 4 ? "eager" : "lazy"}
                />
                {index === currentIndex && (
                  <div className="absolute inset-0 bg-cyan-500/20" />
                )}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Modal para vista ampliada */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-7xl w-full p-0 bg-black/95 border-none">
          <div className="relative aspect-video w-full">
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 z-20 bg-black/60 hover:bg-black/80 text-white p-2 rounded-full"
              aria-label="Cerrar"
            >
              <X className="w-6 h-6" />
            </button>

            <Image
              src={images[modalIndex]}
              alt={`${vehicleName} - Vista ampliada ${modalIndex + 1}`}
              fill
              className="object-contain"
              sizes="100vw"
            />

            {images.length > 1 && (
              <>
                <button
                  onClick={goToPreviousModal}
                  className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-black/60 hover:bg-black/80 text-white p-3 rounded-full"
                  aria-label="Imagen anterior"
                >
                  <ChevronLeft className="w-8 h-8" />
                </button>
                <button
                  onClick={goToNextModal}
                  className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-black/60 hover:bg-black/80 text-white p-3 rounded-full"
                  aria-label="Siguiente imagen"
                >
                  <ChevronRight className="w-8 h-8" />
                </button>

                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 bg-black/60 px-4 py-2 rounded-full text-sm">
                  {modalIndex + 1} / {images.length}
                </div>
              </>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}

