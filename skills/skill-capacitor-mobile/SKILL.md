---
name: skill-capacitor-mobile
description: Best practices and guidelines for Vue 3 + Quasar + Capacitor mobile development. Use when debugging mobile-specific UI issues (safe areas, status bar), handling native device plugins (keyboard, permissions, splash screen), or writing cross-platform Vue components.
---

# Capacitor & Quasar Mobile Guidelines

This skill provides best practices for developing hybrid mobile applications using Quasar (Vue 3) and Capacitor.

## Core Principles

1. **Platform Checks**: Always check the platform before calling native plugins.
   ```typescript
   import { Platform } from 'quasar'
   if (Platform.is.capacitor) {
     // Safe to call Capacitor plugins
   }
   ```
2. **Safe Areas**: Use Quasar's CSS variables to respect iOS/Android safe areas. Avoid hardcoding padding for notches.
   ```scss
   .my-container {
     padding-top: env(safe-area-inset-top);
     padding-bottom: env(safe-area-inset-bottom);
   }
   ```

## Native Plugins

### Status Bar

- Do not assume the status bar is transparent or opaque. Configure it per platform or per brand in Capacitor settings.
- When toggling dark/light mode in the app, remember to sync the status bar style using `@capacitor/status-bar`.

### Keyboard

- Use `@capacitor/keyboard`.
- For iOS, avoid pushing the whole webview up unless explicitly desired (`Keyboard.setAccessoryBarVisible(false)` might be needed).
- Listen to keyboard lifecycle events to adjust UI, especially for fixed-bottom elements.

### Splash Screen

- Use `@capacitor/splash-screen`.
- Hide the splash screen manually when your Vue app has fully mounted and data is ready, rather than relying on auto-hide, to prevent white flashes.
  ```typescript
  import { SplashScreen } from '@capacitor/splash-screen'
  // inside App.vue onMounted
  await SplashScreen.hide()
  ```

## Permissions

- Before using device features (Camera, Geolocation), always check and request permissions via the respective Capacitor plugin.
- Handle denial gracefully in the UI.

## Build and Sync

- After modifying `capacitor.config.ts` or installing new native plugins, always run `npx cap sync`.
- Never manually edit files inside `src-capacitor/android` or `src-capacitor/ios` unless adding custom native code that Capacitor cannot handle.
