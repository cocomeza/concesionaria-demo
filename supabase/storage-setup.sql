-- ============================================
-- CONFIGURACIÓN DE STORAGE PARA IMÁGENES
-- ============================================

-- Crear bucket para imágenes de vehículos
INSERT INTO storage.buckets (id, name, public)
VALUES ('vehicle-images', 'vehicle-images', true)
ON CONFLICT (id) DO NOTHING;

-- Política para permitir lectura pública
CREATE POLICY "Public Access"
ON storage.objects FOR SELECT
USING (bucket_id = 'vehicle-images');

-- Política para permitir subida solo a usuarios autenticados con perfil admin
CREATE POLICY "Admins can upload images"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'vehicle-images' AND
  EXISTS (
    SELECT 1 FROM admin_profiles
    WHERE id = auth.uid()
  )
);

-- Política para permitir eliminación solo a admins
CREATE POLICY "Admins can delete images"
ON storage.objects FOR DELETE
USING (
  bucket_id = 'vehicle-images' AND
  EXISTS (
    SELECT 1 FROM admin_profiles
    WHERE id = auth.uid()
  )
);

-- Política para permitir actualización solo a admins
CREATE POLICY "Admins can update images"
ON storage.objects FOR UPDATE
USING (
  bucket_id = 'vehicle-images' AND
  EXISTS (
    SELECT 1 FROM admin_profiles
    WHERE id = auth.uid()
  )
);

