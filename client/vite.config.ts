import path from "path";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig, loadEnv } from "vite";
import { tanstackRouter } from "@tanstack/router-plugin/vite";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "VITE_");
  const targetUrl = env.VITE_CORS_URL;
  return {
    resolve: {
      alias: {
        "@": path.resolve("./src"),
      },
    },
    plugins: [
      tanstackRouter({ target: "react", autoCodeSplitting: true }),
      react({
        babel: {
          plugins: [["babel-plugin-react-compiler"]],
        },
      }),
      tailwindcss(),
    ],
    server: {
      proxy: {
        "/api": {
          target: targetUrl,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ""),
        },
      },
    },
  };
});
