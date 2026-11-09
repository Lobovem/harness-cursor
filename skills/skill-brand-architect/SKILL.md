---
name: skill-brand-architect
description: Guidelines for the Quasar Mobile Multi-Brand Architecture. Use when adding a new brand, modifying brand SCSS, accessing brand data in Vue components, or generating mobile icons/splash screens for a specific brand.
---

# Multi-Brand Architecture Guidelines

This project supports multiple "white-label" applications (Brand A, Brand B) from a single codebase.

## 🏗️ Brand Configuration

- **Location**: `src/brands/[brand_id]/`
- **Core Files**:
  - `config.ts`: Defines brand name, colors, and Capacitor `appId`.
  - `assets/`: Contains brand-specific logos and images.
- **Global Resolver**: `src/brands/index.ts`. The `BRAND` environment variable dictates which brand is loaded.

## 🎨 Styling & SCSS

- **Dynamic SCSS**: `src/css/quasar.variables.scss` is automatically generated based on the brand.
- **Rule**: Never hardcode colors in Vue components if they differ by brand. Always use Quasar color variables (e.g., `text-primary`, `bg-secondary`) which map to the brand's palette.

## 🧩 Vue Integration

Use the `useBrand` composable in Vue components to access brand data:

```typescript
import { useBrand } from 'src/composables/useBrand'

// Use brandId, appName, or logoUrl in your templates or logic
const { brandId, appName, logoUrl } = useBrand()
```

## 📱 Mobile Assets (Icons & Splash)

To generate native mobile assets (AppIcon and SplashScreen) for a brand:

1. Ensure `app-icon.png` (1024x1024) and `app-splash.png` (2732x2732) exist in `src/brands/[brand_id]/assets/app-system/`.
2. Run the generator script:
   ```bash
   npm run icons -- --brand=[brand_id]
   ```
   This automatically scales assets for iOS and Android and runs `npx cap sync`. Do not edit Xcode or Android Studio asset catalogs manually.

## 🚀 Adding a New Brand

1. Create a new folder `src/brands/[new_brand]`.
2. Copy an existing `config.ts` and update properties.
3. Add brand assets.
4. Register the new brand in `src/brands/index.ts`.
5. Add dedicated npm scripts in `package.json` (e.g., `npm run dev:[new_brand]`).
