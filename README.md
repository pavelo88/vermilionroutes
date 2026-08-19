# Vermilion Routes — Premium South American Travel Platform

> **Tailor-Made Curated Expeditions across Ecuador and the Galápagos Islands**  
> Luxury Boutique Tour Operator • TripAdvisor Travelers' Choice Winner

---

## 🌟 Overview

**Vermilion Routes** is a modern, high-performance web platform built with **Next.js 15**, **React 19**, **TypeScript**, and **Tailwind CSS**. It delivers an editorial-grade luxury travel experience with multi-language internationalization (8 languages), real-time Firestore database synchronization, automated editorial PDF brochure generation, and direct TripAdvisor integration.

---

## 🛠️ Tech Stack & Architecture

- **Framework**: [Next.js 15](https://nextjs.org/) (App Router, Server & Client Components)
- **UI & Animation**: React 19, Tailwind CSS v4, Lucide Icons, GSAP, Three.js / React Three Fiber
- **Internationalization**: `next-intl` (English, Spanish, French, German, Italian, Portuguese, Japanese, Simplified Chinese)
- **Database & Storage**: Firebase Firestore & Firebase Storage
- **PDF Engine**: jsPDF with custom National Geographic editorial magazine layout
- **Testing**: Vitest, Playwright
- **AI & Integrations**: Google GenAI, Stripe Checkout

---

## 🚀 Getting Started

### 1. Prerequisites
- Node.js 20+ (LTS)
- npm / yarn / pnpm

### 2. Installation
```bash
npm install
```

### 3. Environment Variables
Create a `.env.local` file based on `.env.example`:
```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
...
```

### 4. Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📜 Available Scripts

- `npm run dev`: Launch the local development server.
- `npm run build`: Build production optimized bundle.
- `npm run start`: Start production server.
- `npm run test`: Run Vitest unit & integration test suite.
- `npm run lint`: Run TypeScript type checking.
- `npm run seed`: Seed initial database configuration and tours.
- `npm run optimize`: Optimize and process image assets.

---

## 📄 Editorial PDF Brochure Generation

To generate the single consolidated 47-page master catalog of all 16 expeditions:
```bash
npx tsx scripts/generate-single-pdf.ts
```
To generate individual tour brochures:
```bash
npx tsx scripts/generate-all-pdfs.ts
```

---

## 🔒 License & Ownership

© 2026 Vermilion Routes. All Rights Reserved.
