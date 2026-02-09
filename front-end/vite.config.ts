import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: "0.0.0.0", // Permite acesso externo (Docker)
    port: 5175,
    watch: {
      usePolling: true, // Necessário para hot reload no Docker
    },
    hmr: {
      host: "localhost", // Hot Module Replacement
    },
  },
});
