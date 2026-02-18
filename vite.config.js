import { defineConfig } from "vite";

export default defineConfig({
  base: "/my-3d-room/",
  optimizeDeps: {
    include: ["events"],
  },
  resolve: {
    alias: {
      events: "events",
    },
  },
});
