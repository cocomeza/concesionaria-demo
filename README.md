# AutoElite - Concesionaria Premium

Plataforma web completa para gestión de concesionaria de vehículos construida con Next.js 14, TypeScript, Tailwind CSS y Supabase.

## 🚀 Características

- **Frontend Público**: Catálogo de vehículos con búsqueda y filtros avanzados
- **Dashboard Admin**: Gestión completa de inventario y pedidos
- **Autenticación**: Sistema de login/registro con Supabase Auth
- **Base de Datos**: PostgreSQL con Row Level Security (RLS)
- **Diseño Responsive**: Mobile-first con Tailwind CSS
- **TypeScript**: Tipado estricto en todo el proyecto

## 📋 Requisitos Previos

- Node.js 18+ 
- npm o yarn
- Cuenta de Supabase (gratuita)

## 🛠️ Instalación

1. **Clonar el repositorio**
```bash
git clone <repo-url>
cd concesionaria-app
```

2. **Instalar dependencias**
```bash
npm install
```

3. **Configurar variables de entorno**

Crea un archivo `.env.local` en la raíz del proyecto:

```env
NEXT_PUBLIC_SUPABASE_URL=tu_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=tu_supabase_service_role_key
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

4. **Configurar la base de datos**

- Ve a tu proyecto de Supabase
- Abre el SQL Editor
- Ejecuta el contenido del archivo `supabase/schema.sql`
- Esto creará todas las tablas, índices, políticas RLS y datos de ejemplo

5. **Configurar Storage de Supabase**

- En el SQL Editor, ejecuta el contenido del archivo `supabase/storage-setup.sql`
- Esto creará el bucket `vehicle-images` y las políticas de acceso
- Alternativamente, puedes crear el bucket manualmente desde la interfaz:
  - Ve a **Storage** en Supabase
  - Crea un nuevo bucket llamado `vehicle-images`
  - Marca como público
  - Configura las políticas de acceso según el archivo SQL

6. **Ejecutar el proyecto en desarrollo**
```bash
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

## 📁 Estructura del Proyecto

```
concesionaria-app/
├── app/
│   ├── (auth)/          # Rutas de autenticación
│   ├── (public)/        # Rutas públicas
│   ├── (admin)/         # Rutas del dashboard admin
│   └── api/             # API routes
├── components/
│   ├── ui/              # Componentes shadcn/ui
│   ├── vehiculos/       # Componentes de vehículos
│   └── admin/           # Componentes del admin
├── lib/
│   ├── supabase/        # Clientes de Supabase
│   └── utils.ts         # Utilidades
├── types/               # Tipos TypeScript
├── hooks/               # Custom hooks
└── supabase/            # Schema SQL
```

## 🗄️ Schema de Base de Datos

### Tablas principales:

- **vehicles**: Información de vehículos
- **pedidos**: Consultas y pedidos de clientes
- **admin_profiles**: Perfiles de administradores

### Seguridad:

- Row Level Security (RLS) habilitado en todas las tablas
- Políticas de acceso configuradas
- Solo admins pueden modificar vehículos
- Cualquiera puede crear pedidos
- Solo admins pueden ver todos los pedidos

## 🔐 Autenticación

El sistema utiliza Supabase Auth con:
- Email/password
- Roles: `admin` y `vendedor`
- Protección de rutas con middleware

## 🎨 Componentes UI

El proyecto usa [shadcn/ui](https://ui.shadcn.com/) para componentes accesibles:
- Button, Input, Select, Textarea
- Card, Badge, Dialog
- Toast, Form components
- Y más...

## 📝 Scripts Disponibles

### Desarrollo
- `npm run dev` - Inicia servidor de desarrollo
- `npm run build` - Construye para producción
- `npm run start` - Inicia servidor de producción
- `npm run lint` - Ejecuta ESLint
- `npm run type-check` - Verifica tipos TypeScript
- `npm run format` - Formatea código con Prettier

### Tests
- `npm test` - Ejecuta todos los tests
- `npm run test:unit` - Tests unitarios (Vitest)
- `npm run test:e2e` - Tests E2E (Playwright)
- `npm run test:e2e:ui` - Tests E2E en modo UI interactivo
- `npm run test:performance` - Tests de performance
- `npm run test:visual` - Tests visuales
- `npm run test:seo` - Tests de SEO
- `npm run test:a11y` - Tests de accesibilidad
- `npm run test:security` - Tests de seguridad
- `npm run test:install` - Instala navegadores de Playwright

Ver [tests/README.md](./tests/README.md) para más información sobre los tests.

## 🚢 Deployment

### Vercel (Recomendado)

1. **Preparación:**
   - Ejecuta los scripts SQL en Supabase (`schema.sql`, `storage-setup.sql`)
   - Crea un usuario admin siguiendo `supabase/get-user-id.sql` y `supabase/insert-admin.sql`

2. **Deploy:**
   - Conecta tu repositorio a Vercel
   - Configura las variables de entorno (ver `.env.example`)
   - Deploy automático en cada push

3. **Variables de entorno requeridas en Vercel:**
   ```
   NEXT_PUBLIC_SUPABASE_URL=tu_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=tu_supabase_anon_key
   ```

4. **Post-deploy:**
   - Verifica que el sitio carga correctamente
   - Prueba login de admin
   - Verifica carga de imágenes

📖 **Guía completa de deployment:** Ver [DEPLOY.md](./DEPLOY.md) para instrucciones detalladas.





