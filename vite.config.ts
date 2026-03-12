import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import { imagetools } from "vite-imagetools";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    imagetools({
      defaultDirectives: (url) => {
        if (url.pathname.endsWith(".svg")) return new URLSearchParams();
        return new URLSearchParams({ format: "webp", quality: "75", as: "url" });
      },
    }),
    mode === "development" && componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    chunkSizeWarningLimit: 600,
    rollupOptions: {
      output: {
        manualChunks(id: string) {
          // React + react-dom + scheduler devem ficar JUNTOS em vendor-misc
          // para evitar erros de inicialização (forwardRef undefined)
          if (id.includes("/node_modules/framer-motion/")) {
            return "vendor-motion";
          }
          if (id.includes("/node_modules/@tanstack/")) {
            return "vendor-query";
          }
          if (id.includes("/node_modules/@supabase/")) {
            return "vendor-supabase";
          }
          if (
            id.includes("/node_modules/recharts/") ||
            id.includes("/node_modules/d3-") ||
            id.includes("/node_modules/victory-")
          ) {
            return "vendor-charts";
          }
          if (id.includes("/node_modules/@radix-ui/")) {
            return "vendor-ui";
          }
          if (id.includes("/node_modules/")) {
            return "vendor-misc";
          }
        },
      },
    },
  },
}));
