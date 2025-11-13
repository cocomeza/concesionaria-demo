import { describe, it, expect } from 'vitest'
import { formatPrice, formatNumber, slugify } from '@/lib/utils'

describe('Utils', () => {
  describe('formatPrice', () => {
    it('debe formatear precio en USD', () => {
      const result = formatPrice(25000, 'USD')
      expect(result).toContain('25')
      expect(result).toContain('000')
    })

    it('debe formatear precio sin decimales', () => {
      const result = formatPrice(1000.99, 'USD')
      expect(result).not.toContain('.99')
    })

    it('debe manejar cero', () => {
      const result = formatPrice(0, 'USD')
      expect(result).toBeTruthy()
    })
  })

  describe('formatNumber', () => {
    it('debe formatear números grandes', () => {
      const result = formatNumber(1000000)
      expect(result).toContain('1')
    })

    it('debe formatear números pequeños', () => {
      const result = formatNumber(100)
      expect(result).toBe('100')
    })
  })

  describe('slugify', () => {
    it('debe convertir texto a slug', () => {
      const result = slugify('Toyota Corolla 2022')
      expect(result).toBe('toyota-corolla-2022')
    })

    it('debe eliminar caracteres especiales', () => {
      const result = slugify('Test@#$%^&*()')
      expect(result).toBe('test')
    })

    it('debe manejar espacios múltiples', () => {
      const result = slugify('Test    Multiple    Spaces')
      expect(result).toBe('test-multiple-spaces')
    })
  })
})

