import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // ローカル開発時のAPIリクエストをSAMローカルAPIにプロキシ
      "/api/hello-world": {
        // SAM Localのデフォルトポートにプロキシします
        target: "http://localhost:3000",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/hello-world/, "/hello-world"),
      },
    },
  },
});
