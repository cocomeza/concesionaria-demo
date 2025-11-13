# Guía de Instalación - AutoElite

## Paso 1: Instalar Dependencias

```bash
npm install
```

## Paso 2: Configurar Supabase

### 2.1 Crear Proyecto en Supabase

1. Ve a [supabase.com](https://supabase.com) y crea una cuenta
2. Crea un nuevo proyecto
3. Anota tu `Project URL` y `anon public key`

### 2.2 Ejecutar Schema SQL

1. En tu proyecto de Supabase, ve a **SQL Editor**
2. Abre el archivo `supabase/schema.sql` de este proyecto
3. Copia todo el contenido y pégalo en el SQL Editor
4. Ejecuta el script (botón "Run")
5. Esto creará:
   - Todas las tablas necesarias
   - Índices para optimización
   - Políticas de Row Level Security (RLS)
   - Datos de ejemplo (10 vehículos)

### 2.3 Configurar Storage

1. En el SQL Editor, ejecuta el contenido del archivo `supabase/storage-setup.sql`
2. Esto creará el bucket `vehicle-images` para almacenar imágenes
3. Alternativamente, puedes crear el bucket manualmente:
   - Ve a **Storage** en Supabase
   - Crea un nuevo bucket llamado `vehicle-images`
   - Marca como **público**
   - Las políticas de acceso se configurarán automáticamente con el SQL

### 2.4 Crear Usuario Admin

Para crear un usuario administrador:

1. Ve a **Authentication** > **Users** en Supabase
2. Crea un nuevo usuario manualmente o usa el registro
3. Anota el `user_id` (UUID) del usuario creado
4. En el SQL Editor, ejecuta:

```sql
INSERT INTO admin_profiles (id, nombre, email, role)
VALUES (
  'TU_USER_ID_AQUI',
  'Tu Nombre',
  'tu@email.com',
  'admin'
);
```

Reemplaza `TU_USER_ID_AQUI` con el UUID del usuario.

## Paso 3: Configurar Variables de Entorno

**Nota:** Ya no necesitas configurar Cloudinary, estamos usando Supabase Storage.

Crea un archivo `.env.local` en la raíz del proyecto:

```env
NEXT_PUBLIC_SUPABASE_URL=https://tu-proyecto.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu_anon_key_aqui
SUPABASE_SERVICE_ROLE_KEY=tu_service_role_key_aqui
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

**Importante:** 
- `NEXT_PUBLIC_SUPABASE_URL` y `NEXT_PUBLIC_SUPABASE_ANON_KEY` están en **Settings** > **API**
- `SUPABASE_SERVICE_ROLE_KEY` también está en **Settings** > **API** (manténlo secreto)

## Paso 4: Ejecutar el Proyecto

```bash
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

## Paso 5: Acceder al Dashboard Admin

1. Ve a `/login`
2. Inicia sesión con el usuario admin que creaste
3. Serás redirigido a `/dashboard`

## Estructura de Rutas

### Públicas
- `/` o `/inicio` - Homepage con vehículos destacados
- `/vehiculos` - Catálogo completo con filtros
- `/vehiculos/[id]` - Detalle de vehículo

### Admin (requiere autenticación)
- `/dashboard` - Dashboard principal con estadísticas
- `/dashboard/inventario` - Gestión de vehículos
- `/dashboard/pedidos` - Gestión de pedidos/consultas

### Autenticación
- `/login` - Iniciar sesión

## Solución de Problemas

### Error: "Missing Supabase environment variables"
- Verifica que el archivo `.env.local` existe
- Verifica que las variables están correctamente escritas
- Reinicia el servidor de desarrollo

### Error: "No tienes permisos de administrador"
- Verifica que el usuario existe en `admin_profiles`
- Verifica que el `id` en `admin_profiles` coincide con el `id` del usuario en `auth.users`

### Error al ejecutar el schema SQL
- Asegúrate de ejecutar todo el script completo
- Verifica que no hay errores de sintaxis
- Si hay conflictos, elimina las tablas existentes primero

## Próximos Pasos

1. Personaliza los colores y estilos en `tailwind.config.ts`
2. Agrega más vehículos desde el dashboard
3. Configura el dominio en producción
4. Configura emails con Supabase (opcional)

