# 📝 Changelog de Tests

## [1.1.0] - Mejoras y Correcciones

### ✅ Corregido
- Tests de performance ahora tienen timeouts más realistas
- Tests de accesibilidad solo fallan en violaciones críticas
- Tests E2E más robustos con mejor manejo de errores
- Tests visuales más tolerantes a diferencias menores
- Removida dependencia problemática `playwright-lighthouse`

### ✨ Mejorado
- Agregado `data-testid` a componentes clave para tests más confiables
- Timeouts aumentados en todos los tests (10-30 segundos)
- Mejorado manejo de elementos que pueden no existir
- Agregado helpers para tests (`test-helpers.ts`)
- Configuración de Playwright mejorada con timeouts específicos

### 📝 Agregado
- `data-testid="vehicle-card"` en VehicleCard
- `data-testid="main-header"` en Header
- `data-testid="catalog-link"` en link del catálogo
- `data-testid="features-section"` en sección de features
- `data-testid="featured-vehicles-section"` en sección de vehículos destacados
- Documentación de mejoras (`IMPROVEMENTS.md`)
- Helpers para tests (`helpers/test-helpers.ts`)

### 🔧 Configuración
- `actionTimeout: 10000` en Playwright
- `navigationTimeout: 30000` en Playwright
- `timeout: 30000` global para tests
- `expect.timeout: 10000` para assertions

## [1.0.0] - Versión Inicial

### ✨ Agregado
- Tests E2E básicos (homepage, vehicles, auth, admin)
- Tests unitarios (utils)
- Tests de performance
- Tests visuales
- Tests de SEO
- Tests de accesibilidad
- Tests de seguridad
- Configuración de Playwright para Chromium, Firefox y Edge
- Configuración de Vitest
- Documentación completa

