-- ============================================
-- CREAR USUARIO ADMIN DE EJEMPLO
-- ============================================
-- 
-- IMPORTANTE: Primero debes crear el usuario desde la interfaz de Supabase:
-- 1. Ve a Authentication > Users > Add user > Create new user
-- 2. Email: admin@autoelite.com
-- 3. Password: Admin123! (o la que prefieras)
-- 4. Auto Confirm User: ✅ Activa esto
-- 5. Copia el User UID que te muestra
-- 6. Reemplaza 'TU_UUID_AQUI' con ese UUID en el INSERT de abajo
--
-- ============================================

-- Paso 1: Ver todos los usuarios existentes para encontrar el UUID
SELECT 
  id as user_id,
  email,
  created_at
FROM auth.users
ORDER BY created_at DESC;

-- Paso 2: Una vez que tengas el UUID, ejecuta este INSERT
-- (Reemplaza 'TU_UUID_AQUI' con el UUID real que copiaste arriba)

-- Ejemplo con datos ficticios (reemplaza el UUID):
INSERT INTO admin_profiles (id, nombre, email, role)
VALUES (
  'TU_UUID_AQUI',  -- ⚠️ REEMPLAZA ESTO con el UUID real del usuario
  'Administrador Principal',
  'admin@autoelite.com',
  'admin'
)
ON CONFLICT (id) DO UPDATE
SET 
  nombre = EXCLUDED.nombre,
  email = EXCLUDED.email,
  role = EXCLUDED.role;

-- ============================================
-- ALTERNATIVA: Si quieres crear varios admins
-- ============================================

-- Ejemplo para crear múltiples perfiles admin (después de crear los usuarios):
-- INSERT INTO admin_profiles (id, nombre, email, role) VALUES
--   ('uuid-usuario-1', 'Admin Principal', 'admin@autoelite.com', 'admin'),
--   ('uuid-usuario-2', 'Vendedor 1', 'vendedor1@autoelite.com', 'vendedor'),
--   ('uuid-usuario-3', 'Vendedor 2', 'vendedor2@autoelite.com', 'vendedor')
-- ON CONFLICT (id) DO UPDATE
-- SET nombre = EXCLUDED.nombre, email = EXCLUDED.email, role = EXCLUDED.role;

-- ============================================
-- VERIFICAR QUE SE CREÓ CORRECTAMENTE
-- ============================================

-- Ejecuta esto después del INSERT para verificar:
SELECT 
  ap.id,
  ap.nombre,
  ap.email,
  ap.role,
  ap.created_at,
  au.email as auth_email
FROM admin_profiles ap
LEFT JOIN auth.users au ON ap.id = au.id
ORDER BY ap.created_at DESC;

