export const BACKEND_URL =
  import.meta.env.VITE_ENV == "dev"
    ? import.meta.env.VITE_BACKEND_DEV
    : import.meta.env.VITE_BACKEND_PROD;
