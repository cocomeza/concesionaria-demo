# ✅ Checklist de Deploy en Vercel

## 📋 Pre-Deploy Checklist

### ✅ Configuración del Proyecto

- [x] **package.json** - Scripts correctos (`build`, `start`, `dev`)
- [x] **next.config.js** - Configurado con remotePatterns para imágenes
- [x] **tsconfig.json** - TypeScript en modo estricto
- [x] **.gitignore** - Incluye `.env*.local`, `.vercel`, `node_modules`
- [x] **middleware.ts** - Configurado correctamente para Supabase SSR
- [x] **vercel.json** - Archivo de configuración creado (opcional)

### ✅ Variables de Entorno

**Obligatorias:**
- [x] `NEXT_PUBLIC_SUPABASE_URL` - URL del proyecto Supabase
- [x] `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Anon Key de Supabase

**Opcionales:**
- [ ] `SUPABASE_SERVICE_ROLE_KEY` - Solo si necesitas operaciones admin en servidor
- [ ] `NEXT_PUBLIC_APP_URL` - Se configura automáticamente en Vercel

**Archivos creados:**
- [x] `.env.example` - Template de variables de entorno

### ✅ Base de Datos Supabase

**Scripts SQL a ejecutar:**
- [ ] `supabase/schema.sql` - Tablas, índices, RLS policies
- [ ] `supabase/storage-setup.sql` - Bucket y políticas de storage
- [ ] `supabase/get-user-id.sql` - Obtener UUID del usuario admin
- [ ] `supabase/insert-admin.sql` - Crear perfil admin

**Verificaciones:**
- [ ] Tabla `vehicles` creada con RLS
- [ ] Tabla `pedidos` creada con RLS
- [ ] Tabla `admin_profiles` creada
- [ ] Bucket `vehicle-images` creado y público
- [ ] Usuario admin creado y vinculado

### ✅ Código y Dependencias

**Correcciones aplicadas:**
- [x] Import faltante en `lib/supabase/client.ts` corregido
- [x] Función `createSupabaseServerClient` removida (no se usa)
- [x] Manejo de errores mejorado en middleware

**Dependencias:**
- [x] Todas las dependencias en `package.json`
- [x] Versiones compatibles con Next.js 14
- [x] No hay dependencias faltantes

### ✅ Optimizaciones

**Ya implementadas:**
- [x] Next.js Image Optimization
- [x] Server Components donde es posible
- [x] Code splitting automático
- [x] Lazy loading de componentes pesados
- [x] Middleware para actualización de sesión

**Configuración:**
- [x] `next.config.js` con remotePatterns para Supabase
- [x] Body size limit configurado (2mb para Server Actions)

### ✅ Seguridad

**Implementado:**
- [x] Row Level Security (RLS) en todas las tablas
- [x] Variables de entorno seguras
- [x] Service Role Key nunca expuesta al cliente
- [x] Validación de formularios con Zod
- [x] Sanitización de inputs
- [x] `.env*.local` en `.gitignore`

### ✅ Documentación

**Archivos creados:**
- [x] `DEPLOY.md` - Guía completa de deployment
- [x] `.env.example` - Template de variables
- [x] `README.md` - Actualizado con instrucciones de deploy
- [x] `DEPLOY_CHECKLIST.md` - Este archivo

## 🚀 Pasos para Deploy

### 1. Preparación en Supabase

```sql
-- Ejecutar en orden:
-- 1. supabase/schema.sql
-- 2. supabase/storage-setup.sql
-- 3. Crear usuario en Authentication
-- 4. supabase/get-user-id.sql (copiar UUID)
-- 5. supabase/insert-admin.sql (usar UUID copiado)
```

### 2. Deploy en Vercel

1. **Conectar repositorio**
   - Ve a vercel.com
   - "Add New Project"
   - Conecta GitHub/GitLab/Bitbucket

2. **Configurar proyecto**
   - Framework: Next.js (auto-detectado)
   - Build Command: `npm run build` (automático)
   - Output Directory: `.next` (automático)

3. **Variables de entorno**
   ```
   NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJxxx...
   ```

4. **Deploy**
   - Click "Deploy"
   - Esperar build
   - Verificar logs

### 3. Post-Deploy

**Verificaciones:**
- [ ] Homepage carga correctamente
- [ ] Catálogo de vehículos funciona
- [ ] Login de admin funciona
- [ ] Dashboard admin carga
- [ ] CRUD de vehículos funciona
- [ ] Formulario de contacto funciona
- [ ] Imágenes se cargan desde Supabase Storage
- [ ] Carrusel de imágenes funciona

**Configuración adicional:**
- [ ] Agregar dominio de Vercel a CORS en Supabase
- [ ] Configurar dominio personalizado (opcional)
- [ ] Habilitar Vercel Analytics (opcional)

## ⚠️ Problemas Comunes

### Build falla
- Verificar que todas las variables de entorno estén configuradas
- Revisar logs de build en Vercel
- Verificar que no haya errores de TypeScript

### Error de CORS
- Agregar dominio de Vercel a "Allowed Origins" en Supabase
- Verificar configuración de CORS en Supabase Dashboard

### Imágenes no cargan
- Verificar que el bucket `vehicle-images` existe
- Verificar que el bucket es público
- Verificar políticas RLS del bucket

### Login no funciona
- Verificar que el usuario admin existe en `admin_profiles`
- Verificar que el UUID coincide con `auth.users`
- Verificar variables de entorno

## 📊 Estado del Proyecto

### ✅ Listo para Producción

- **Código**: ✅ Sin errores críticos
- **Configuración**: ✅ Correcta
- **Dependencias**: ✅ Todas presentes
- **Seguridad**: ✅ RLS y validaciones implementadas
- **Documentación**: ✅ Completa

### ⚠️ Requiere Acción Manual

- **Supabase**: Ejecutar scripts SQL
- **Variables**: Configurar en Vercel
- **Admin**: Crear usuario admin
- **Storage**: Configurar bucket

## 🎯 Conclusión

El proyecto está **listo para deploy** en Vercel. Solo necesitas:

1. ✅ Ejecutar scripts SQL en Supabase
2. ✅ Configurar variables de entorno en Vercel
3. ✅ Crear usuario admin
4. ✅ Deploy!

**Tiempo estimado:** 15-20 minutos

