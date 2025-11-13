# 📊 Guía Rápida: Exportación de Datos

## 🚀 Instalación

```bash
npm install
```

Esto instalará automáticamente:
- `jspdf` - Para PDFs
- `jspdf-autotable` - Para tablas en PDFs  
- `xlsx` - Para archivos Excel

## 📍 Ubicación de la Funcionalidad

### Inventario
- **Ruta:** `/dashboard/inventario`
- **Botón:** "Exportar" (arriba a la derecha, junto a "Nuevo Vehículo")
- **Formatos:** PDF y Excel

### Pedidos
- **Ruta:** `/dashboard/pedidos`
- **Botón:** "Exportar" (arriba a la derecha)
- **Formatos:** PDF y Excel

## 💻 Cómo Usar

1. Ve a la sección que quieres exportar (Inventario o Pedidos)
2. Haz clic en el botón **"Exportar"**
3. Selecciona el formato:
   - **PDF** - Para imprimir o compartir
   - **Excel** - Para análisis y edición
4. El archivo se descargará automáticamente

## 📄 Formato de Archivos

### PDF
- Título del reporte
- Tabla con todos los datos
- Headers con fondo azul
- Filas alternas con fondo gris claro
- Nombre: `inventario_vehiculos_YYYY-MM-DD.pdf` o `pedidos_consultas_YYYY-MM-DD.pdf`

### Excel
- Primera fila con headers
- Datos en filas siguientes
- Columnas ajustadas automáticamente
- Nombre: `inventario_vehiculos_YYYY-MM-DD.xlsx` o `pedidos_consultas_YYYY-MM-DD.xlsx`

## ⚠️ Notas Importantes

- Los botones de exportación solo aparecen si hay datos
- Las exportaciones incluyen TODOS los registros (no solo los visibles)
- Los archivos se guardan en la carpeta de descargas del navegador
- Los nombres incluyen la fecha automáticamente

## 🔧 Solución de Problemas

### Error: "No hay datos para exportar"
- Verifica que haya registros en la base de datos
- Recarga la página

### Error al descargar PDF/Excel
- Verifica que las dependencias estén instaladas: `npm install`
- Revisa la consola del navegador para más detalles
- Asegúrate de tener permisos para descargar archivos

### El archivo no se descarga
- Verifica la configuración de descargas del navegador
- Revisa si hay bloqueadores de pop-ups activos

## 📚 Más Información

Ver `EXPORT_FEATURE.md` para documentación técnica completa.

