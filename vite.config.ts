import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  // Use repository subpath only for production builds. Keeps local dev/preview working at '/'.
  base: process.env.NODE_ENV === 'production' ? '/my-knowledge-app' : '/',
  plugins: [tailwindcss(), react()],
});
