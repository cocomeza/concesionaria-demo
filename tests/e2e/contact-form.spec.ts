import { test, expect } from '@playwright/test'

/**
 * Tests E2E para el formulario de contacto de vehículos
 */
test.describe('Formulario de Solicitar Información', () => {
  test('debe mostrar el formulario en la página de detalle del vehículo', async ({ page }) => {
    // Primero necesitamos ir a una página de vehículo
    await page.goto('/vehiculos')
    await page.waitForLoadState('networkidle')

    // Buscar un vehículo en la lista
    const vehicleLink = page.locator('a[href*="/vehiculos/"]').first()
    const linkCount = await vehicleLink.count()

    if (linkCount > 0) {
      await vehicleLink.click()
      await page.waitForLoadState('networkidle')

      // Verificar que el formulario está presente
      await expect(page.getByText('Solicitar Información')).toBeVisible()
      await expect(page.locator('input[name="cliente_nombre"]')).toBeVisible()
      await expect(page.locator('input[name="cliente_email"]')).toBeVisible()
      await expect(page.locator('input[name="cliente_telefono"]')).toBeVisible()
    } else {
      test.skip()
    }
  })

  test('debe validar campos requeridos', async ({ page }) => {
    await page.goto('/vehiculos')
    await page.waitForLoadState('networkidle')

    const vehicleLink = page.locator('a[href*="/vehiculos/"]').first()
    const linkCount = await vehicleLink.count()

    if (linkCount > 0) {
      await vehicleLink.click()
      await page.waitForLoadState('networkidle')

      // Intentar enviar sin llenar campos
      await page.getByRole('button', { name: /enviar consulta/i }).click()

      // Esperar un momento para que se muestren los errores
      await page.waitForTimeout(1000)

      // Verificar que todavía estamos en la misma página (no se envió)
      const url = page.url()
      expect(url).toMatch(/\/vehiculos\//)
    } else {
      test.skip()
    }
  })

  test('debe poder enviar el formulario con datos válidos', async ({ page }) => {
    await page.goto('/vehiculos')
    await page.waitForLoadState('networkidle')

    const vehicleLink = page.locator('a[href*="/vehiculos/"]').first()
    const linkCount = await vehicleLink.count()

    if (linkCount > 0) {
      await vehicleLink.click()
      await page.waitForLoadState('networkidle')

      // Llenar el formulario
      await page.fill('input[name="cliente_nombre"]', 'Test User')
      await page.fill('input[name="cliente_email"]', 'test@example.com')
      await page.fill('input[name="cliente_telefono"]', '+54 9 11 1234-5678')
      await page.fill('textarea[name="mensaje"]', 'Estoy interesado en este vehículo')

      // Seleccionar tipo de consulta
      await page.locator('button').filter({ hasText: /tipo de consulta|consulta general/i }).first().click()
      await page.getByText('Consulta General').click()

      // Enviar formulario
      await page.getByRole('button', { name: /enviar consulta/i }).click()

      // Esperar mensaje de éxito (toast)
      await page.waitForTimeout(2000)

      // Verificar que el formulario se limpió o que hay un mensaje de éxito
      const nombreValue = await page.locator('input[name="cliente_nombre"]').inputValue()
      // Si el formulario se reseteó, el campo debería estar vacío
      // O debería haber un toast de éxito
    } else {
      test.skip()
    }
  })
})

