# 🚀 Guía de Deployment en Vercel

## ✅ Checklist Pre-Deploy

### 1. Variables de Entorno

**⚠️ IMPORTANTE:** Las variables de entorno deben configurarse directamente en el dashboard de Vercel, NO en el archivo `vercel.json`.

**Cómo configurar las variables en Vercel:**

1. Ve a tu proyecto en [Vercel Dashboard](https://vercel.com/dashboard)
2. Click en **Settings** → **Environment Variables**
3. Agrega cada variable una por una:

**Obligatorias:**
- `NEXT_PUBLIC_SUPABASE_URL` - URL de tu proyecto Supabase (ej: `https://xxxxx.supabase.co`)
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Anon Key de Supabase (la encuentras en Supabase → Settings → API)

**Opcionales:**
- `SUPABASE_SERVICE_ROLE_KEY` - Solo si necesitas operaciones admin en servidor (⚠️ Mantén esto secreto)
- `NEXT_PUBLIC_APP_URL` - URL de producción (se configura automáticamente en Vercel, pero puedes sobrescribirla)

**Para cada variable:**
- Selecciona los ambientes: **Production**, **Preview**, y **Development**
- Click en **Save**
- **Reinicia el deployment** después de agregar variables nuevas

**Dónde encontrar las credenciales de Supabase:**
1. Ve a tu proyecto en [Supabase Dashboard](https://supabase.com/dashboard)
2. Click en **Settings** (⚙️) → **API**
3. Copia:
   - **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
   - **anon public** key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - **service_role** key → `SUPABASE_SERVICE_ROLE_KEY` (solo si lo necesitas)

### 2. Base de Datos Supabase

✅ Ejecuta estos scripts en el SQL Editor de Supabase:

1. **Schema principal**: `supabase/schema.sql`
   - Crea tablas: `vehicles`, `pedidos`, `admin_profiles`
   - Configura RLS policies
   - Crea índices

2. **Storage setup**: `supabase/storage-setup.sql`
   - Crea bucket `vehicle-images`
   - Configura políticas de acceso

3. **Crear admin**: `supabase/get-user-id.sql` → `supabase/insert-admin.sql`
   - Obtén el UUID del usuario
   - Crea el perfil admin

### 3. Configuración de Supabase Storage

1. Ve a **Storage** en Supabase Dashboard
2. Crea bucket `vehicle-images` (si no lo creaste con SQL)
3. Configura como **público** para lectura
4. Verifica políticas RLS para escritura (solo admins)

### 4. Configuración de CORS en Supabase

En Supabase Dashboard → Settings → API:
- Agrega tu dominio de Vercel a "Allowed Origins"
- Ejemplo: `https://tu-proyecto.vercel.app`

## 📋 Pasos para Deploy en Vercel

### Opción 1: Deploy desde GitHub (Recomendado)

1. **Conecta tu repositorio**
   - Ve a [vercel.com](https://vercel.com)
   - Click en "Add New Project"
   - Conecta tu repositorio de GitHub

2. **Configura el proyecto**
   - Framework Preset: **Next.js** (detectado automáticamente)
   - Root Directory: `.` (raíz del proyecto)
   - Build Command: `npm run build` (automático)
   - Output Directory: `.next` (automático)

3. **Variables de entorno**
   - Agrega todas las variables de `.env.example`
   - **IMPORTANTE**: No incluyas `SUPABASE_SERVICE_ROLE_KEY` a menos que sea necesario

4. **Deploy**
   - Click en "Deploy"
   - Espera a que termine el build
   - Verifica que no haya errores

### Opción 2: Deploy desde CLI

```bash
# Instalar Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy
vercel

# Deploy a producción
vercel --prod
```

## 🔍 Verificaciones Post-Deploy

### 1. Verificar Build
- ✅ El build debe completarse sin errores
- ✅ No debe haber warnings críticos

### 2. Verificar Funcionalidad
- ✅ Homepage carga correctamente
- ✅ Catálogo de vehículos funciona
- ✅ Login de admin funciona
- ✅ Dashboard admin carga
- ✅ CRUD de vehículos funciona
- ✅ Formulario de contacto funciona
- ✅ Imágenes se cargan correctamente

### 3. Verificar Variables de Entorno
- ✅ Las variables están configuradas en Vercel
- ✅ No hay variables faltantes en los logs

### 4. Verificar Supabase
- ✅ Conexión a Supabase funciona
- ✅ RLS policies están activas
- ✅ Storage funciona correctamente

## 🐛 Troubleshooting

### Error: "Environment Variable references Secret which does not exist"
**Solución:**
- Este error ocurre cuando `vercel.json` referencia secretos que no existen
- **Solución:** Elimina la sección `env` del `vercel.json` (ya está corregido)
- Configura las variables directamente en Vercel Dashboard → Settings → Environment Variables
- No uses la sintaxis `@secret_name` en `vercel.json` para variables de entorno

### Error: "Missing Supabase environment variables"
- Verifica que las variables estén configuradas en Vercel Dashboard → Settings → Environment Variables
- Asegúrate de que los nombres sean exactos (case-sensitive): `NEXT_PUBLIC_SUPABASE_URL` y `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- Reinicia el deployment después de agregar variables nuevas
- Verifica que hayas seleccionado los ambientes correctos (Production, Preview, Development)

### Error: "Failed to fetch" o CORS
- Verifica configuración de CORS en Supabase
- Agrega tu dominio de Vercel a "Allowed Origins"

### Error: "Image optimization error"
- Verifica que `next.config.js` tenga los dominios correctos
- Asegúrate de que las URLs de imágenes sean válidas

### Error: "Authentication failed"
- Verifica que las keys de Supabase sean correctas
- Asegúrate de usar `NEXT_PUBLIC_SUPABASE_ANON_KEY` (no service role en cliente)

### Build falla
- Revisa los logs de build en Vercel
- Verifica que todas las dependencias estén en `package.json`
- Asegúrate de que no haya errores de TypeScript

## 📊 Optimizaciones para Producción

### Ya implementadas:
- ✅ Next.js Image Optimization
- ✅ Server Components donde es posible
- ✅ Lazy loading de componentes pesados
- ✅ Code splitting automático
- ✅ Optimización de imágenes de Supabase

### Recomendaciones adicionales:
- Configura CDN para assets estáticos
- Habilita compresión gzip/brotli (automático en Vercel)
- Configura cache headers si es necesario
- Monitorea performance con Vercel Analytics

## 🔐 Seguridad

### ✅ Implementado:
- Row Level Security (RLS) en Supabase
- Variables de entorno seguras
- Service Role Key nunca expuesta al cliente
- Validación de formularios con Zod
- Sanitización de inputs

### ⚠️ Recordatorios:
- Nunca commits `.env.local` o `.env`
- No expongas `SUPABASE_SERVICE_ROLE_KEY` al cliente
- Mantén las keys de Supabase seguras
- Revisa las RLS policies regularmente

## 📝 Notas Adicionales

- El proyecto usa Next.js 14 con App Router
- TypeScript en modo estricto
- Tailwind CSS para estilos
- Supabase para backend completo
- Vercel Edge Network para mejor performance global

## 🆘 Soporte

Si encuentras problemas durante el deploy:
1. Revisa los logs de build en Vercel
2. Verifica la configuración de Supabase
3. Asegúrate de que todas las variables estén configuradas
4. Revisa la documentación de Next.js y Supabase

