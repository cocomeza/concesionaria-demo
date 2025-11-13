# 🚀 Guía Rápida: Configurar Supabase

## Paso 1: Crear Proyecto en Supabase

1. Ve a [https://supabase.com](https://supabase.com)
2. Crea una cuenta (si no tienes una)
3. Haz clic en **"New Project"**
4. Completa:
   - **Name**: `autoelite` (o el nombre que prefieras)
   - **Database Password**: Guarda esta contraseña (la necesitarás)
   - **Region**: Elige la más cercana a ti
5. Espera a que se cree el proyecto (2-3 minutos)

## Paso 2: Obtener las Credenciales

1. En tu proyecto de Supabase, ve a **Settings** (⚙️) > **API**
2. Copia estos valores:
   - **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
   - **anon public** key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - **service_role** key → `SUPABASE_SERVICE_ROLE_KEY` (⚠️ Mantén esto secreto)

## Paso 3: Crear el Archivo .env.local

En la raíz del proyecto, crea un archivo `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=https://xxxxxxxxxxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

**Reemplaza** los valores con los que copiaste de Supabase.

## Paso 4: Ejecutar el Schema SQL

1. En Supabase, ve a **SQL Editor** (en el menú lateral)
2. Haz clic en **"New query"**
3. Abre el archivo `supabase/schema.sql` de este proyecto
4. **Copia TODO el contenido** del archivo
5. Pégalo en el SQL Editor de Supabase
6. Haz clic en **"Run"** (o presiona Ctrl+Enter)
7. Deberías ver: ✅ "Success. No rows returned"

Esto creará:
- ✅ Las 3 tablas: `vehicles`, `pedidos`, `admin_profiles`
- ✅ Todos los índices para optimización
- ✅ Las políticas de Row Level Security (RLS)
- ✅ 10 vehículos de ejemplo

## Paso 5: Configurar Storage para Imágenes

1. En el mismo **SQL Editor**, crea una nueva query
2. Abre el archivo `supabase/storage-setup.sql`
3. **Copia TODO el contenido**
4. Pégalo en el SQL Editor
5. Haz clic en **"Run"**

Esto creará:
- ✅ El bucket `vehicle-images` para almacenar imágenes
- ✅ Las políticas de acceso (lectura pública, escritura solo para admins)

**Alternativa manual** (si prefieres):
1. Ve a **Storage** en Supabase
2. Haz clic en **"New bucket"**
3. Nombre: `vehicle-images`
4. Marca como **Public bucket**
5. Crea el bucket
6. Luego ejecuta solo las políticas del archivo `storage-setup.sql`

## Paso 6: Crear Usuario Administrador

### Opción A: Desde la Interfaz de Supabase

1. Ve a **Authentication** > **Users**
2. Haz clic en **"Add user"** > **"Create new user"**
3. Completa:
   - **Email**: `admin@autoelite.com` (o el que prefieras)
   - **Password**: Crea una contraseña segura
   - **Auto Confirm User**: ✅ Activa esto
4. Haz clic en **"Create user"**
5. **Copia el User UID** (es un UUID largo)

### Opción B: Usando el Formulario de Registro

1. Ejecuta `npm run dev`
2. Ve a `http://localhost:3000/login`
3. Por ahora, usa la opción de registro (si existe) o crea el usuario desde Supabase

### Insertar el Perfil Admin

1. Ve al **SQL Editor** en Supabase
2. Ejecuta este SQL (reemplaza `TU_USER_ID_AQUI` con el UUID que copiaste):

```sql
INSERT INTO admin_profiles (id, nombre, email, role)
VALUES (
  'TU_USER_ID_AQUI',
  'Administrador',
  'admin@autoelite.com',
  'admin'
);
```

**Ejemplo:**
```sql
INSERT INTO admin_profiles (id, nombre, email, role)
VALUES (
  'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
  'Administrador',
  'admin@autoelite.com',
  'admin'
);
```

## Paso 7: Verificar que Todo Funciona

1. Reinicia el servidor de desarrollo:
   ```bash
   # Detén el servidor (Ctrl+C) y vuelve a ejecutar:
   npm run dev
   ```

2. Abre `http://localhost:3000/inicio`
   - Deberías ver la homepage con vehículos destacados

3. Abre `http://localhost:3000/vehiculos`
   - Deberías ver el catálogo completo con los 10 vehículos de ejemplo

4. Abre `http://localhost:3000/login`
   - Inicia sesión con el usuario admin que creaste
   - Deberías ser redirigido a `/dashboard`

## ✅ Checklist de Verificación

- [ ] Proyecto creado en Supabase
- [ ] Archivo `.env.local` creado con las 3 variables
- [ ] Schema SQL ejecutado correctamente
- [ ] Storage SQL ejecutado correctamente
- [ ] Usuario admin creado en Authentication
- [ ] Perfil admin insertado en `admin_profiles`
- [ ] Servidor de desarrollo funcionando
- [ ] Puedes ver vehículos en la página pública
- [ ] Puedes iniciar sesión como admin

## 🐛 Solución de Problemas

### Error: "Missing Supabase environment variables"
- Verifica que `.env.local` existe en la raíz del proyecto
- Verifica que las variables no tienen espacios extra
- Reinicia el servidor (`npm run dev`)

### Error: "No tienes permisos de administrador"
- Verifica que el usuario existe en `admin_profiles`
- Verifica que el `id` en `admin_profiles` coincide con el `id` del usuario en `auth.users`
- Puedes verificar ejecutando en SQL Editor:
  ```sql
  SELECT * FROM admin_profiles;
  SELECT id, email FROM auth.users;
  ```

### Error al ejecutar el schema SQL
- Asegúrate de ejecutar TODO el contenido del archivo
- Si hay errores de "already exists", puedes ignorarlos (significa que ya está creado)
- Si necesitas empezar de cero, puedes eliminar las tablas primero:
  ```sql
  DROP TABLE IF EXISTS pedidos CASCADE;
  DROP TABLE IF EXISTS vehicles CASCADE;
  DROP TABLE IF EXISTS admin_profiles CASCADE;
  ```

### No veo las imágenes de los vehículos
- Los vehículos de ejemplo usan URLs de Unsplash
- Cuando subas imágenes nuevas desde el dashboard, se guardarán en Supabase Storage
- Verifica que el bucket `vehicle-images` existe y es público

## 📚 Próximos Pasos

Una vez que todo esté funcionando:

1. ✅ Personaliza los datos de ejemplo
2. ✅ Agrega más vehículos desde el dashboard
3. ✅ Configura emails de notificación (opcional)
4. ✅ Prepara para deployment en Vercel

## 💡 Tips

- **Mantén seguro** el `SUPABASE_SERVICE_ROLE_KEY` - nunca lo expongas en el frontend
- **Backup**: Exporta tu base de datos regularmente desde Supabase
- **Monitoreo**: Usa el dashboard de Supabase para ver logs y métricas
- **RLS**: Las políticas de seguridad están activas, solo admins pueden modificar datos

