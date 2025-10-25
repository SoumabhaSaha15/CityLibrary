import { defineConfig, loadEnv } from 'vite';
import tailwindcss from "@tailwindcss/vite";
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), 'VITE_');
  const targetUrl = env.VITE_CORS_URL;
  return ({
    plugins: [
      react({
        babel: {
          plugins: [['babel-plugin-react-compiler']],
        },
      }), tailwindcss()
    ],
    server: {
      proxy: {
        '/api': {
          target: targetUrl,
          changeOrigin: true,
          rewrite: path => path.replace(/^\/api/, '')
        }
      },
    }
  })
})
