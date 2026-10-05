import { VitePWA } from "vite-plugin-pwa";
import pkg from "./package.json" with { type: "json" };
export default () =>
  VitePWA({
    manifest: {
      name: pkg.name.toUpperCase(),
      short_name: "LMS",
      description: pkg.description,
      start_url: "/",
      scope: "/",
      display: "standalone",
      theme_color: "#15ffd8",
      icons: [
        {
          src: "pwa-64x64.png",
          sizes: "64x64",
          type: "image/png",
        },
        {
          src: "pwa-192x192.png",
          sizes: "192x192",
          type: "image/png",
        },
        {
          src: "pwa-512x512.png",
          sizes: "512x512",
          type: "image/png",
          purpose: "any",
        },
        {
          src: "maskable-icon-512x512.png",
          sizes: "512x512",
          type: "image/png",
          purpose: "maskable",
        },
      ],
    },
  });
