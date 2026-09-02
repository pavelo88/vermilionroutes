# scripts/ops — Utilidades de Mantenimiento

Scripts de operaciones manuales para Vermilion Routes.
**No se ejecutan automáticamente en el build de producción.**

## Scripts disponibles

| Archivo | Propósito | Ejecutar con |
|---------|-----------|-------------|
| `addBlog.cjs` | Agrega entradas de blog de ejemplo a Firestore | `npm run ops:blog` |
| `fixTitles.cjs` | Capitaliza títulos en `data/mock.ts` y `data/dailyToursData.ts` | `npm run ops:titles` |
| `replaceTerms.cjs` | Renombra términos en archivos de datos | `npm run ops:terms` |
| `fix-images.js` | Actualiza rutas de imágenes en `data/mock.ts` | `npm run ops:images` |
| `fix_images.mjs` | Actualiza imágenes directamente en Firestore (requiere `serviceAccountKey.json`) | `npm run ops:images-db` |
| `test-email.mjs` | Verifica conexión SMTP | `npm run ops:test-smtp` |
| `test-send.mjs` | Envía email de prueba SMTP | `npm run ops:test-send` |
| `scratch-fix.cjs` / `scratch-fix.js` | Inserta claves de traducción faltantes en `/messages` | Uso interno |

## ⚠️ Importante
- `fix_images.mjs` requiere un archivo `serviceAccountKey.json` en la raíz (NO incluido en git).
- `fixTitles.cjs` y `fixTitles.js` son duplicados funcionales — se mantienen ambos por compatibilidad.
- Ningún script de esta carpeta debe añadirse al hook `prebuild`.
