# AGENTE DE DISEÑO LUXURY VERMILION
## Reglas de Oro para Interfaces Premium

> Estas reglas aplican a TODA página que diseñes para Vermilion Routes.
> No son sugerencias — son restricciones arquitectónicas de la marca.

---

## 🎨 PALETA METÁLICA — ÚNICA Y SAGRADA

```
Oro Principal:   #C9A84C → #F5D78A → #B8860B  (gradiente, nunca flat)
Oro Hover:       #D4AF37 → #9A6E0A
Plata Texto:     #D4D4D4 (títulos) / #A9A9A9 (subtítulos)
Gris Inactivo:   #6B6B6B (hint) / #4A4A4A (placeholder mínimo)
Fondo Oscuro:    #0A0A0F o zinc-950 (NUNCA negro puro #000000 salvo cajas de código)
Fondo Tarjetas:  bg-white/[0.03] con border border-white/8
Caja de Código:  #050508 con borde dorado #C9A84C/15
```

### PROHIBIDO en cualquier componente del portal de Afiliados:
- ❌ `amber-500` / `amber-400` (naranja Tailwind) — usa el gradiente dorado `#C9A84C`
- ❌ `bg-zinc-900` plano sin transparencia — usa `bg-white/[0.03]` o `dark:bg-zinc-900/60`
- ❌ Colores saturados (azul brillante, verde neón, morado) excepto en badges de estado muy pequeños
- ❌ Bordes gruesos o sólidos sin transparencia — usa siempre `border-white/8` o `border-[#C9A84C]/30`

---

## ✍️ TIPOGRAFÍA EDITORIAL

```
Títulos grandes:  font-serif (Playfair Display / Cormorant Garamond) — font-light o font-normal
Texto cuerpo:     font-sans (Inter) — regular, nunca bold para párrafos
Monospace:        font-mono solo para URLs, IDs, códigos de afiliado
Tracking:         Etiquetas uppercase → tracking-[0.15em] o tracking-[0.2em]
```

### Jerarquía de títulos:
- `text-3xl sm:text-4xl font-serif font-light` — H1 de página
- `text-lg font-serif font-light` — H2 de sección
- `text-[10px] uppercase tracking-[0.2em] text-[#C9A84C]` — Etiqueta decorativa sobre título

---

## 🃏 TARJETAS Y CONTENEDORES

```tsx
// Tarjeta estándar luxury:
<div className="rounded-[20px] border border-white/8 bg-white/[0.03] backdrop-blur-sm p-5 
                hover:border-[#C9A84C]/30 transition-all duration-300 relative overflow-hidden">
  {/* Hover glow sutil */}
  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 
                  bg-gradient-to-br from-[#C9A84C]/5 to-transparent rounded-[20px]" />
  {/* Contenido aquí */}
</div>

// Separador decorativo antes de título de sección:
<div className="flex items-center gap-3 mb-1">
  <div className="h-px w-8 bg-gradient-to-r from-[#C9A84C] to-transparent" />
  <span className="text-[10px] uppercase tracking-[0.2em] text-[#C9A84C]">Etiqueta</span>
</div>
```

---

## 🔘 BOTONES

| Tipo | Estilo |
|------|--------|
| **Primario (CTA)** | `bg-gradient-to-r from-[#C9A84C] via-[#F5D78A] to-[#B8860B]` + `text-[#0A0A0F] font-bold` |
| **Secundario** | `border border-white/10 bg-white/[0.03] text-[#A9A9A9] hover:text-white hover:border-[#C9A84C]/30` |
| **Activo/Seleccionado** | Mismo que Primario + `shadow-lg shadow-[#C9A84C]/20` |
| **Peligro** | `border-rose-500/30 text-rose-700 dark:text-rose-400` |

### Propiedades universales de botones:
- Siempre `cursor-pointer` explícito
- `transition-all duration-200` o `transition-colors`
- `hover:scale-[1.01] active:scale-95` en CTAs principales

---

## 💡 ÍCONOS Y ACENTOS

- Íconos siempre de Lucide React, trazo fino `w-4 h-4` o `w-3.5 h-3.5`
- En estado activo/dorado: `text-[#C9A84C]` o `text-[#0A0A0F]` (sobre fondo dorado)
- En estado inactivo: `text-[#6B6B6B]`
- Punto de estado activo (online): `w-1.5 h-1.5 rounded-full bg-[#C9A84C] animate-pulse`

---

## 📦 CAJAS DE CÓDIGO / URLS

```tsx
<div className="bg-[#050508] rounded-2xl p-4 border border-[#C9A84C]/15 relative overflow-hidden">
  {/* Línea dorada superior decorativa */}
  <div className="absolute top-0 left-0 right-0 h-px 
                  bg-gradient-to-r from-transparent via-[#C9A84C]/30 to-transparent" />
  <p className="font-mono text-xs text-[#C9A84C] break-all leading-relaxed tracking-wide">
    {url}
  </p>
</div>
```

---

## 🌐 MODO CLARO

- Siempre usar `dark:` variants — el portal debe funcionar en ambos modos
- En modo claro: fondos `bg-white` o `bg-[#FDFBF7]` (crema), texto `text-zinc-900`
- Labels e inputs en modo claro: `bg-zinc-100 border-zinc-300 text-zinc-900`
- Info boxes: texto de color oscuro explícito ej: `text-blue-800 dark:text-blue-300`
- **NUNCA** uses solo `dark:text-xxx` sin su equivalente claro — las letras desaparecerán

---

## 🔆 TOGGLE DE TEMA

Todo panel de afiliados DEBE incluir el toggle dark/light:

```tsx
import { useTheme } from 'next-themes';
const { theme, setTheme } = useTheme();

<button
  onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
  className="p-2.5 rounded-xl border border-white/10 bg-white/5 
             hover:border-[#C9A84C]/40 text-[#A9A9A9] hover:text-white transition-all cursor-pointer"
>
  {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
</button>
```

---

## 📐 ESPACIADO Y LAYOUT

- `max-w-6xl mx-auto` para contenedores de dashboard
- `p-6 sm:p-8` para el padding del área de contenido
- `space-y-8` entre secciones principales
- `gap-3` entre tarjetas de estadísticas (no `gap-4` en móvil)
- `rounded-[20px]` tarjetas / `rounded-[24px]` contenedores grandes / `rounded-xl` inputs

---

## ⚡ ANIMACIONES PERMITIDAS

- `transition-all duration-300` — para hover en tarjetas
- `transition-colors` — para cambios de color en botones/links
- `animate-pulse` — solo en indicadores de estado (punto verde/dorado)
- `animate-spin` — solo en spinners de carga
- `opacity-0 group-hover:opacity-100 transition-opacity duration-500` — glow sutil en cards

### PROHIBIDAS:
- ❌ Animaciones de escala grandes (`scale-110`, `scale-125`)
- ❌ Transitions largas en texto (`> 500ms`)
- ❌ Bounces o efectos bounce en UI de gestión

---

## 📝 FORMULARIOS Y MODALES

- Modal max-width: `max-w-lg` con `max-h-[90vh]` y `overflow-y-auto`
- Inputs: `py-2` (compacto) o `py-3` (estándar), nunca `py-4`
- Spacing entre campos: `space-y-3` (no `space-y-4`)
- Grid para campos en par: `grid grid-cols-2 gap-2`
- Info boxes deben tener contraste explícito en ambos modos: `text-blue-800 dark:text-blue-300`
