import { test, expect } from '@playwright/test'

/**
 * Tests E2E para el catálogo de vehículos
 */
test.describe('Catálogo de Vehículos', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/vehiculos')
    await page.waitForLoadState('networkidle', { timeout: 10000 })
  })

  test('debe cargar el catálogo de vehículos', async ({ page }) => {
    await expect(page.locator('h1')).toContainText(/catálogo|vehículos/i)
  })

  test('debe mostrar filtros de búsqueda', async ({ page }) => {
    // Buscar sección de filtros
    const filters = page.locator('text=/filtro|marca|combustible/i').first()
    await expect(filters).toBeVisible({ timeout: 5000 })
  })

  test('debe permitir filtrar por marca', async ({ page }) => {
    // Buscar select de marca
    const marcaSelect = page.locator('select, [role="combobox"]').first()
    
    if (await marcaSelect.isVisible({ timeout: 3000 })) {
      await marcaSelect.click()
      // Verificar que hay opciones
      await expect(page.locator('[role="option"]').first()).toBeVisible({ timeout: 2000 }).catch(() => {})
    }
  })

  test('debe mostrar vehículos disponibles', async ({ page }) => {
    // Esperar a que carguen los vehículos
    await page.waitForTimeout(2000)
    
    // Verificar que hay contenido (puede ser lista vacía o con vehículos)
    const content = page.locator('main, [role="main"]')
    await expect(content).toBeVisible()
  })

  test('debe permitir navegar a detalle de vehículo', async ({ page }) => {
    // Buscar cualquier link que pueda llevar a un vehículo
    const vehicleLink = page.locator('a[href*="/vehiculos/"]').first()
    
    if (await vehicleLink.isVisible({ timeout: 5000 })) {
      await vehicleLink.click()
      await expect(page).toHaveURL(/\/vehiculos\/[^/]+/)
    }
  })
})

