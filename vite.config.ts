import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  // Use repository subpath only for production builds. Keeps local dev/preview working at '/'.
  // Prefer explicit VITE_BASE from .env files; fallback to NODE_ENV logic.
  // Note: Vite's `base` usually ends with a trailing slash for proper asset resolution.
  base: process.env.VITE_BASE ?? (process.env.NODE_ENV === 'production' ? '/my-knowledge-app/' : '/'),
  plugins: [tailwindcss(), react()],
});
