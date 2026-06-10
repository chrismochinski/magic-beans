/**
 * @file Vite configuration for the client.
 * @description
 * Enables the React plugin (JSX + Fast Refresh) and pins the dev server to port 5180, which is the
 * origin the server allows via CORS (`CLIENT_ORIGIN`). We use 5180 (not Vite's default 5173) to
 * avoid colliding with other local projects, and `strictPort` so it fails loudly instead of
 * silently drifting to another port (which would break CORS). API base URL comes from `VITE_API_URL`.
 * @author Chris "Mo" Mochinski
 */

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5180,
    strictPort: true,
  },
});
