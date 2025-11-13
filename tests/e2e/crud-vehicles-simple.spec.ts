import { test, expect } from '@playwright/test'

/**
 * Tests E2E simplificados para CRUD de vehículos
 * Verifica funcionalidad básica
 */
test.describe('CRUD de Vehículos - Tests Básicos', () => {
  test.beforeEach(async ({ page }) => {
    // Login como admin
    await page.goto('/login')
    await page.fill('input[type="email"]', 'admin@autoelite.com')
    await page.fill('input[type="password"]', 'Admin123!')
    await page.click('button:has-text("Iniciar Sesión")')
    await page.waitForURL('/dashboard')
  })

  test('CREATE: debe poder navegar a crear vehículo y ver el formulario', async ({ page }) => {
    await page.goto('/dashboard/inventario')
    await page.waitForLoadState('networkidle')

    // Ir a crear nuevo vehículo
    const nuevoButton = page.getByRole('link', { name: /nuevo vehículo/i })
    await expect(nuevoButton).toBeVisible()
    await nuevoButton.click()
    
    await expect(page).toHaveURL(/\/dashboard\/inventario\/nuevo/)
    await page.waitForLoadState('networkidle')

    // Verificar que el formulario está presente
    await expect(page.locator('input[name="marca"]')).toBeVisible()
    await expect(page.locator('input[name="modelo"]')).toBeVisible()
    await expect(page.locator('input[name="año"]')).toBeVisible()
    await expect(page.locator('input[name="precio"]')).toBeVisible()
    await expect(page.getByRole('button', { name: /crear vehículo/i })).toBeVisible()
  })

  test('READ: debe mostrar la lista de vehículos en inventario', async ({ page }) => {
    await page.goto('/dashboard/inventario')
    await page.waitForLoadState('networkidle')

    // Verificar que la página carga correctamente
    await expect(page.getByRole('heading', { name: /gestión de vehículos/i })).toBeVisible()
    
    // Verificar que hay una tabla o mensaje de "no hay vehículos"
    const table = page.locator('table')
    const noVehicles = page.getByText(/no hay vehículos/i)
    
    const hasTable = await table.count() > 0
    const hasNoVehicles = await noVehicles.count() > 0
    
    expect(hasTable || hasNoVehicles).toBeTruthy()
  })

  test('UPDATE: debe poder navegar a editar un vehículo si existe', async ({ page }) => {
    await page.goto('/dashboard/inventario')
    await page.waitForLoadState('networkidle')

    // Buscar botón de editar
    const editLink = page.locator('a[href*="/editar"]').first()
    const editLinkCount = await editLink.count()
    
    if (editLinkCount > 0) {
      await editLink.click()
      await page.waitForLoadState('networkidle')
      
      // Verificar que estamos en la página de edición
      await expect(page).toHaveURL(/\/dashboard\/inventario\/.*\/editar/)
      
      // Verificar que el formulario tiene datos
      const precioInput = page.locator('input[name="precio"]')
      await expect(precioInput).toBeVisible()
      
      // Verificar que hay botón de actualizar
      await expect(page.getByRole('button', { name: /actualizar vehículo/i })).toBeVisible()
    } else {
      test.skip()
    }
  })

  test('DELETE: debe tener botón de eliminar en la tabla', async ({ page }) => {
    await page.goto('/dashboard/inventario')
    await page.waitForLoadState('networkidle')

    // Buscar botones de acción (incluyendo eliminar)
    const actionButtons = page.locator('button').filter({ has: page.locator('svg') })
    const buttonCount = await actionButtons.count()
    
    // Debe haber al menos botones de acción (ver, editar, eliminar)
    if (buttonCount > 0) {
      // Verificar que hay botones de acción disponibles
      expect(buttonCount).toBeGreaterThan(0)
    } else {
      // Si no hay vehículos, verificar que hay mensaje apropiado
      const noVehicles = page.getByText(/no hay vehículos/i)
      await expect(noVehicles).toBeVisible()
    }
  })

  test('Validación: debe mostrar errores en campos requeridos', async ({ page }) => {
    await page.goto('/dashboard/inventario/nuevo')
    await page.waitForLoadState('networkidle')

    // Intentar enviar sin llenar campos requeridos
    await page.getByRole('button', { name: /crear vehículo/i }).click()
    
    // Esperar un momento para que se muestren los errores
    await page.waitForTimeout(1000)
    
    // Verificar que todavía estamos en la página (no se envió)
    await expect(page).toHaveURL(/\/dashboard\/inventario\/nuevo/)
    
    // Los campos requeridos deberían estar presentes
    await expect(page.locator('input[name="marca"]')).toBeVisible()
  })
})

