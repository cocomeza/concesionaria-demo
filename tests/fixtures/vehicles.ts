/**
 * Fixtures para vehículos en tests
 */

export const mockVehicle = {
  id: 'test-vehicle-id',
  marca: 'Toyota',
  modelo: 'Corolla',
  año: 2022,
  precio: 25000,
  kilometraje: 15000,
  combustible: 'nafta',
  transmision: 'automatica',
  carroceria: 'sedan',
  color: 'Blanco',
  puertas: 4,
  descripcion: 'Excelente estado',
  estado: 'disponible',
  destacado: true,
  imagen_principal: 'https://example.com/image.jpg',
}

export const mockVehicles = [
  mockVehicle,
  {
    ...mockVehicle,
    id: 'test-vehicle-id-2',
    marca: 'Ford',
    modelo: 'Ranger',
    precio: 35000,
  },
]

