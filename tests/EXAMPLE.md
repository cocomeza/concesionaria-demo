# 📝 Ejemplos de Tests

Este documento contiene ejemplos de cómo escribir diferentes tipos de tests.

## Tests E2E - Ejemplo Completo

```typescript
import { test, expect } from '@playwright/test'

test.describe('Mi Funcionalidad', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/mi-ruta')
  })

  test('debe hacer algo específico', async ({ page }) => {
    // Tu código de test aquí
    await expect(page.locator('h1')).toBeVisible()
  })
})
```

## Tests Unitarios - Ejemplo

```typescript
import { describe, it, expect, vi } from 'vitest'
import { myFunction } from '@/lib/myFunction'

describe('myFunction', () => {
  it('debe retornar el valor esperado', () => {
    const result = myFunction('input')
    expect(result).toBe('expected-output')
  })
})
```

## Tests de Accesibilidad - Ejemplo

```typescript
import { test, expect } from '@playwright/test'
import AxeBuilder from '@axe-core/playwright'

test('debe ser accesible', async ({ page }) => {
  await page.goto('/mi-ruta')
  
  const results = await new AxeBuilder({ page })
    .withTags(['wcag2a', 'wcag2aa'])
    .analyze()
  
  expect(results.violations).toEqual([])
})
```

## Tests Visuales - Ejemplo

```typescript
import { test, expect } from '@playwright/test'

test('debe verse correctamente', async ({ page }) => {
  await page.goto('/mi-ruta')
  await expect(page).toHaveScreenshot('mi-componente.png')
})
```

## Tests de Performance - Ejemplo

```typescript
import { test, expect } from '@playwright/test'

test('debe cargar rápido', async ({ page }) => {
  const startTime = Date.now()
  await page.goto('/mi-ruta')
  await page.waitForLoadState('networkidle')
  const loadTime = Date.now() - startTime
  
  expect(loadTime).toBeLessThan(2000)
})
```

## Usar Fixtures

```typescript
import { testAdminUser } from '../fixtures/auth'

test('debe usar datos de prueba', async ({ page }) => {
  // Usar datos de fixtures
  await page.fill('input[type="email"]', testAdminUser.email)
})
```

## Múltiples Navegadores

```typescript
import { test, expect } from '@playwright/test'

test.describe('Cross-browser', () => {
  ['chromium', 'firefox', 'edge'].forEach((browser) => {
    test(`debe funcionar en ${browser}`, async ({ page, browserName }) => {
      if (browserName === browser) {
        await page.goto('/mi-ruta')
        await expect(page.locator('h1')).toBeVisible()
      }
    })
  })
})
```

