import path from "path"
import tailwindcss from "@tailwindcss/vite"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    server: {
      host: true, // listens on 0.0.0.0
      port: 5173,
    },
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  base: "/",
});