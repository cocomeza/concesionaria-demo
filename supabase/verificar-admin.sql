-- ============================================
-- QUERY 3: VERIFICAR QUE SE CREÓ CORRECTAMENTE
-- ============================================
-- Ejecuta este query para verificar que el admin se creó bien

SELECT 
  ap.id,
  ap.nombre,
  ap.email,
  ap.role,
  ap.created_at
FROM admin_profiles ap
ORDER BY ap.created_at DESC;

