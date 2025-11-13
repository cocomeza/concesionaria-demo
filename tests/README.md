# 🧪 Tests Automatizados - AutoElite

Este directorio contiene todos los tests automatizados para la plataforma AutoElite.

## 📁 Estructura

```
tests/
├── e2e/              # Tests End-to-End con Playwright
├── unit/             # Tests unitarios con Vitest
├── performance/      # Tests de Performance
├── visual/           # Tests Visuales
├── seo/              # Tests de SEO
├── accessibility/    # Tests de Accesibilidad
├── security/         # Tests de Seguridad
└── fixtures/         # Datos de prueba y helpers
```

## 🚀 Ejecutar Tests

### Todos los tests
```bash
npm test
```

### Tests E2E (Playwright)
```bash
npm run test:e2e
```

### Tests Unitarios (Vitest)
```bash
npm run test:unit
```

### Tests de Performance
```bash
npm run test:performance
```

### Tests Visuales
```bash
npm run test:visual
```

### Tests de SEO
```bash
npm run test:seo
```

### Tests de Accesibilidad
```bash
npm run test:a11y
```

### Tests de Seguridad
```bash
npm run test:security
```

### Ejecutar en modo UI (Playwright)
```bash
npm run test:e2e:ui
```

### Ejecutar tests en navegadores específicos
```bash
# Chromium
npm run test:e2e -- --project=chromium

# Firefox
npm run test:e2e -- --project=firefox

# Edge
npm run test:e2e -- --project=edge
```

## 📋 Requisitos

- Node.js 18+
- Variables de entorno configuradas en `.env.test`
- Servidor de desarrollo corriendo (`npm run dev`) para tests E2E

## 🔧 Configuración

Los tests usan las siguientes herramientas:

- **Playwright**: Tests E2E, Visuales, Performance, Accesibilidad
- **Vitest**: Tests unitarios e integración
- **@axe-core/playwright**: Tests de accesibilidad
- **Lighthouse CI**: Tests de performance y SEO

## 📝 Notas

- Los tests E2E requieren que el servidor esté corriendo
- Los tests visuales generan screenshots en `tests/visual/screenshots/`
- Los tests de performance generan reportes en `tests/performance/reports/`

