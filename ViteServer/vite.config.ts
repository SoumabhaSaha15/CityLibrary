import path from "path";
import babel from "@rolldown/plugin-babel";
// import { DevTools } from "@vitejs/devtools";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig, loadEnv } from "vite";
import { devtools } from "@tanstack/devtools-vite";
import { tanstackRouter } from "@tanstack/router-plugin/vite";
import react, { reactCompilerPreset } from "@vitejs/plugin-react";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "VITE_");
  const targetUrl = env.VITE_CORS_URL;
  return {
    devtools: {
      enabled: true,
    },
    resolve: {
      alias: {
        "@": path.resolve("./src"),
      },
    },
    plugins: [
      // DevTools(),
      devtools({ enhancedLogs: { enabled: true }, logging: true }),
      tanstackRouter({ target: "react", autoCodeSplitting: true }),
      react(),
      babel({
        presets: [reactCompilerPreset()],
      }),
      tailwindcss(),
    ],
    server: {
      port: 7000,
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
