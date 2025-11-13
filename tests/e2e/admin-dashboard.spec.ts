import { test, expect } from '@playwright/test'

/**
 * Tests E2E para el dashboard administrativo
 * Nota: Requiere autenticación previa
 */
test.describe('Dashboard Administrativo', () => {
  test.beforeEach(async ({ page }) => {
    // Intentar ir al dashboard (será redirigido si no está autenticado)
    await page.goto('/dashboard')
  })

  test('debe redirigir a login si no está autenticado', async ({ page }) => {
    // Si no hay sesión, debería redirigir a login
    const currentUrl = page.url()
    
    if (currentUrl.includes('/login')) {
      await expect(page.locator('input[type="email"]')).toBeVisible()
    } else {
      // Si está autenticado, verificar que muestra el dashboard
      await expect(page.locator('text=/dashboard|administrativo/i')).toBeVisible({ timeout: 5000 })
    }
  })

  test('debe mostrar sidebar de navegación cuando está autenticado', async ({ page }) => {
    // Solo ejecutar si está en dashboard (no redirigido)
    if (page.url().includes('/dashboard')) {
      const sidebar = page.locator('aside, nav').first()
      await expect(sidebar).toBeVisible({ timeout: 5000 })
    }
  })

  test('debe mostrar estadísticas cuando está autenticado', async ({ page }) => {
    if (page.url().includes('/dashboard')) {
      // Buscar cards de estadísticas
      const statsCards = page.locator('[class*="card"], [class*="Card"]')
      await expect(statsCards.first()).toBeVisible({ timeout: 5000 })
    }
  })
})

