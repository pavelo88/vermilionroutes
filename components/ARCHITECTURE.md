# Arquitectura de Componentes — Feature-Sliced Design (FSD Lite)

## Estructura

```
components/
│
├── features/               ← Componentes agrupados por DOMINIO DE NEGOCIO
│   ├── home/               
│   │   └── index.ts        ← Barrel: re-exporta todos los componentes de la home
│   ├── admin/              
│   │   └── index.ts        ← Barrel: re-exporta todos los componentes del panel admin
│   └── tours/              
│       └── index.ts        ← Barrel: re-exporta TourGallery, TourModal, etc.
│
├── shared/                 ← Componentes REUTILIZABLES entre features
│   ├── ui/                 
│   │   └── index.ts        ← Barrel: Button, TourCard, ConciergeWidget, etc.
│   └── layout/             
│       └── index.ts        ← Barrel: Navbar, Footer, ConditionalFooter
│
│── admin/                  ← (LEGACY) Implementaciones reales — no mover aún
├── home/                   ← (LEGACY) Implementaciones reales — no mover aún
├── layout/                 ← (LEGACY) Implementaciones reales — no mover aún
├── tours/                  ← (LEGACY) Implementaciones reales — no mover aún
├── ui/                     ← (LEGACY) Implementaciones reales — no mover aún
└── providers/              ← Providers de React context (ThemeProvider, etc.)
```

## Reglas de importación

### ✅ Forma nueva (preferida en código nuevo)
```ts
// Importar desde el barrel de la feature
import { HeroSlider, FeaturedTours } from '@/components/features/home';
import { AdminDashboard } from '@/components/features/admin';
import { Button, TourCard } from '@/components/shared/ui';
import { Navbar } from '@/components/shared/layout';
```

### ✅ Forma legacy (sigue siendo válida — no romper)
```ts
// Los imports directos siguen funcionando
import { HeroSlider } from '@/components/home/HeroSlider';
import { Button } from '@/components/ui/Button';
```

## Migración gradual

Los directorios `legacy` (`components/home/`, `components/admin/`, etc.) contienen
las implementaciones reales. Los directorios FSD (`features/`, `shared/`) son
**barrel-only** — únicamente re-exportan desde legacy.

La migración completa (mover los archivos físicos) debe hacerse de forma incremental,
feature por feature, con un PR dedicado por dominio para facilitar el code review.

## Convenciones FSD

| Capa | Directorio | Puede importar de |
|------|------------|-------------------|
| `features/*` | Dominio de negocio | `shared/*` |
| `shared/ui` | Primitivos de UI | Nada de `features` |
| `shared/layout` | Chrome de la app | `shared/ui` |

> **Regla de oro:** Las capas inferiores nunca importan de capas superiores.
> `shared` no sabe nada de `features`.
