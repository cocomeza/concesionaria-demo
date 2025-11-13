-- ============================================
-- QUERY 1: OBTENER EL UUID DE UN USUARIO
-- ============================================
-- Ejecuta SOLO este query primero (sin los comentarios de abajo)

SELECT id, email, created_at
FROM auth.users
ORDER BY created_at DESC;

