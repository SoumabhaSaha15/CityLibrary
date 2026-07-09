/// <reference types="vite/client" />
interface ImportMetaEnv {
  readonly VITE_CORS_URL: string;
  readonly VITE_DEFAULT_ADMIN_IMAGE: string;
  readonly VITE_DEFAULT_USER_IMAGE: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}