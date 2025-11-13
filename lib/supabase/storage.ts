import { createSupabaseClient } from './client'
import { createSupabaseAdminClient } from './client'

const BUCKET_NAME = 'vehicle-images'

/**
 * Sube una imagen al storage de Supabase
 * @param file - Archivo de imagen a subir
 * @param folder - Carpeta donde guardar (opcional)
 * @returns URL pública de la imagen subida
 */
export async function uploadImage(
  file: File,
  folder: string = 'vehicles'
): Promise<string> {
  const supabase = createSupabaseClient()
  
  // Generar nombre único para el archivo
  const fileExt = file.name.split('.').pop()
  const fileName = `${folder}/${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`
  
  const { data, error } = await supabase.storage
    .from(BUCKET_NAME)
    .upload(fileName, file, {
      cacheControl: '3600',
      upsert: false,
    })

  if (error) {
    throw new Error(`Error al subir imagen: ${error.message}`)
  }

  // Obtener URL pública
  const {
    data: { publicUrl },
  } = supabase.storage.from(BUCKET_NAME).getPublicUrl(data.path)

  return publicUrl
}

/**
 * Sube múltiples imágenes
 */
export async function uploadImages(
  files: File[],
  folder: string = 'vehicles'
): Promise<string[]> {
  const uploadPromises = files.map((file) => uploadImage(file, folder))
  return Promise.all(uploadPromises)
}

/**
 * Elimina una imagen del storage
 */
export async function deleteImage(imageUrl: string): Promise<void> {
  const supabase = createSupabaseAdminClient()
  
  // Extraer el path del URL
  const url = new URL(imageUrl)
  const pathParts = url.pathname.split('/')
  const bucketIndex = pathParts.indexOf(BUCKET_NAME)
  
  if (bucketIndex === -1) {
    throw new Error('URL de imagen inválida')
  }
  
  const filePath = pathParts.slice(bucketIndex + 1).join('/')
  
  const { error } = await supabase.storage
    .from(BUCKET_NAME)
    .remove([filePath])

  if (error) {
    throw new Error(`Error al eliminar imagen: ${error.message}`)
  }
}

/**
 * Elimina múltiples imágenes
 */
export async function deleteImages(imageUrls: string[]): Promise<void> {
  const deletePromises = imageUrls.map((url) => deleteImage(url))
  await Promise.all(deletePromises)
}

/**
 * Obtiene la URL pública de una imagen
 */
export function getImageUrl(path: string): string {
  const supabase = createSupabaseClient()
  const {
    data: { publicUrl },
  } = supabase.storage.from(BUCKET_NAME).getPublicUrl(path)
  return publicUrl
}

/**
 * Verifica si una URL es de Supabase Storage
 */
export function isSupabaseStorageUrl(url: string): boolean {
  try {
    const urlObj = new URL(url)
    return urlObj.hostname.includes('supabase.co') || urlObj.hostname.includes('supabase')
  } catch {
    return false
  }
}

