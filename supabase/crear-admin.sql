-- ============================================
-- CREAR USUARIO ADMINISTRADOR
-- ============================================
-- 
-- PASOS:
-- 1. Ve a Authentication > Users > Add user
-- 2. Crea un usuario con estos datos:
--    Email: admin@autoelite.com
--    Password: Admin123!
--    Auto Confirm: ✅
-- 3. Copia el UUID del usuario creado
-- 4. Reemplaza 'XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX' abajo con tu UUID real
-- 5. Ejecuta este script
--
-- ============================================

-- Primero, veamos qué usuarios existen:
SELECT id, email, created_at 
FROM auth.users 
ORDER BY created_at DESC;

-- Luego, ejecuta esto con TU UUID real (reemplaza las X):
INSERT INTO admin_profiles (id, nombre, email, role)
VALUES (
  'XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX',  -- ⚠️ REEMPLAZA ESTO
  'Administrador Principal',
  'admin@autoelite.com',
  'admin'
)
ON CONFLICT (id) DO NOTHING;

-- Verificar que se creó:
SELECT * FROM admin_profiles;

