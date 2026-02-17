import { defineConfig } from "vite";

export default defineConfig({
  optimizeDeps: {
    include: ["events"],
  },
  resolve: {
    alias: {
      events: "events",
    },
  },
});
