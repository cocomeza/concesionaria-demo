# 📊 Funcionalidad de Exportación - AutoElite

## ✅ Implementado

Se ha agregado funcionalidad completa para exportar datos del panel administrativo en formato PDF y Excel.

## 📁 Archivos Creados

### Componentes
- `components/admin/ExportButton.tsx` - Botón dropdown para exportar
- `components/admin/InventarioExport.tsx` - Wrapper para exportar inventario
- `components/admin/PedidosExport.tsx` - Wrapper para exportar pedidos
- `components/ui/dropdown-menu.tsx` - Componente dropdown de shadcn/ui

### Librerías de Exportación
- `lib/export/pdf.ts` - Funciones para exportar a PDF
- `lib/export/excel.ts` - Funciones para exportar a Excel

## 🎯 Funcionalidades

### Exportación de Inventario
- **Ubicación:** `/dashboard/inventario`
- **Datos exportados:**
  - Marca, Modelo, Año
  - Precio, Kilometraje
  - Combustible, Transmisión, Carrocería
  - Color, Puertas
  - Estado, Destacado, Vistas
  - Fecha de creación

### Exportación de Pedidos
- **Ubicación:** `/dashboard/pedidos`
- **Datos exportados:**
  - Cliente (nombre, email, teléfono)
  - Vehículo consultado
  - Tipo de consulta
  - Estado
  - Mensaje
  - Fecha de creación

## 📦 Dependencias Agregadas

```json
{
  "jspdf": "^2.5.1",
  "jspdf-autotable": "^3.8.3",
  "xlsx": "^0.18.5"
}
```

## 🚀 Instalación

```bash
npm install
```

Esto instalará las nuevas dependencias:
- `jspdf` - Para generar PDFs
- `jspdf-autotable` - Para tablas en PDFs
- `xlsx` - Para generar archivos Excel

## 💡 Uso

### En el Dashboard

1. **Inventario:**
   - Ve a `/dashboard/inventario`
   - Haz clic en el botón "Exportar" (junto a "Nuevo Vehículo")
   - Selecciona "Exportar como PDF" o "Exportar como Excel"

2. **Pedidos:**
   - Ve a `/dashboard/pedidos`
   - Haz clic en el botón "Exportar" (arriba a la derecha)
   - Selecciona el formato deseado

### Características

- ✅ **Lazy Loading:** Las librerías se cargan solo cuando se necesitan
- ✅ **Nombres automáticos:** Los archivos incluyen fecha automáticamente
- ✅ **Formato profesional:** PDFs con tablas formateadas, Excel con columnas ajustadas
- ✅ **Feedback visual:** Toasts de éxito/error
- ✅ **Validación:** No permite exportar si no hay datos

## 📝 Ejemplo de Uso Programático

```typescript
import { exportToPDF } from '@/lib/export/pdf'
import { exportToExcel } from '@/lib/export/excel'

// Exportar a PDF
await exportToPDF({
  title: 'Mi Reporte',
  headers: ['Columna 1', 'Columna 2'],
  rows: [['Dato 1', 'Dato 2']],
  filename: 'mi_reporte.pdf'
})

// Exportar a Excel
await exportToExcel({
  title: 'Mi Reporte',
  headers: ['Columna 1', 'Columna 2'],
  rows: [['Dato 1', 'Dato 2']],
  filename: 'mi_reporte.xlsx'
})
```

## 🎨 Estilos

- Botón con gradiente cyan/blue consistente con el diseño
- Dropdown menu con iconos para cada formato
- Estados de carga durante la exportación
- Mensajes de error/success con toasts

## 🔧 Personalización

Puedes personalizar los estilos de PDF editando `lib/export/pdf.ts`:
- Colores de header
- Tamaño de fuente
- Espaciado
- Estilos de filas alternas

Para Excel, puedes ajustar:
- Ancho de columnas
- Formato de celdas
- Múltiples hojas

## 📋 Próximas Mejoras Opcionales

- [ ] Exportar con filtros aplicados
- [ ] Seleccionar columnas específicas para exportar
- [ ] Plantillas personalizadas de PDF
- [ ] Exportación programada (cron jobs)
- [ ] Envío por email de reportes
- [ ] Exportación de estadísticas del dashboard

