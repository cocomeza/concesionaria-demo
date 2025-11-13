# 🚀 Configuración de Tests

## Instalación

### 1. Instalar dependencias

```bash
npm install
```

### 2. Instalar navegadores de Playwright

```bash
npm run test:install
```

Esto instalará Chromium, Firefox y Edge para los tests E2E.

## Configuración de Variables de Entorno

Crea un archivo `.env.test` en la raíz del proyecto:

```env
NEXT_PUBLIC_SUPABASE_URL=https://tu-proyecto-test.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu_anon_key_test
SUPABASE_SERVICE_ROLE_KEY=tu_service_role_key_test
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

**Nota:** Para tests E2E, puedes usar un proyecto de Supabase separado o datos de prueba.

## Estructura de Carpetas

```
tests/
├── e2e/                 # Tests End-to-End
│   ├── homepage.spec.ts
│   ├── vehicles.spec.ts
│   ├── auth.spec.ts
│   └── admin-dashboard.spec.ts
├── unit/                # Tests unitarios
│   └── utils.test.ts
├── performance/         # Tests de performance
│   └── lighthouse.spec.ts
├── visual/              # Tests visuales
│   └── screenshots.spec.ts
├── seo/                 # Tests de SEO
│   └── metadata.spec.ts
├── accessibility/       # Tests de accesibilidad
│   └── a11y.spec.ts
├── security/            # Tests de seguridad
│   └── security.spec.ts
├── fixtures/            # Datos de prueba
│   ├── auth.ts
│   └── vehicles.ts
├── setup/               # Configuración
│   └── vitest.setup.ts
└── README.md
```

## Ejecutar Tests

### Todos los tests
```bash
npm test
```

### Tests específicos

**E2E:**
```bash
npm run test:e2e
```

**Unitarios:**
```bash
npm run test:unit
```

**Performance:**
```bash
npm run test:performance
```

**Visuales:**
```bash
npm run test:visual
```

**SEO:**
```bash
npm run test:seo
```

**Accesibilidad:**
```bash
npm run test:a11y
```

**Seguridad:**
```bash
npm run test:security
```

### Modo interactivo

```bash
# UI de Playwright
npm run test:e2e:ui

# Watch mode para unitarios
npm run test:unit:watch

# Debug mode
npm run test:e2e:debug
```

## Navegadores

Los tests E2E se ejecutan en:
- **Chromium** (Desktop)
- **Firefox** (Desktop)
- **Edge** (Desktop)
- **Mobile Chrome** (Pixel 5)
- **Mobile Safari** (iPhone 12)

Para ejecutar en un navegador específico:

```bash
npm run test:e2e -- --project=chromium
npm run test:e2e -- --project=firefox
npm run test:e2e -- --project=edge
```

## Coverage

Para generar reporte de cobertura:

```bash
npm run test:unit:coverage
```

El reporte se generará en `coverage/`.

## Screenshots y Videos

- Screenshots: Se guardan en `test-results/` cuando fallan
- Videos: Se guardan en `test-results/` cuando fallan
- Reportes HTML: Se generan en `playwright-report/`

## CI/CD

Para ejecutar en CI, usa:

```bash
CI=true npm run test:e2e
```

Esto configurará:
- Retries: 2
- Workers: 1
- Timeouts aumentados

## Troubleshooting

### Error: "Browser not found"
Ejecuta: `npm run test:install`

### Error: "Port 3000 already in use"
Detén el servidor de desarrollo o cambia el puerto en `.env.test`

### Tests visuales fallan
Los screenshots de referencia se guardan en `tests/visual/screenshots/`. 
Acepta los nuevos screenshots si hiciste cambios visuales:

```bash
npm run test:visual -- --update-snapshots
```

### Tests de accesibilidad fallan
Revisa los reportes en `test-results/` para ver qué violaciones se encontraron.

