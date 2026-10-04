import { defineConfig } from "vite";
import revideoPlugin from "@revideo/vite-plugin";

// Interoperabilidad ESM / CommonJS para el plugin de Vite
const revideo =
  typeof revideoPlugin === "function"
    ? revideoPlugin
    : (revideoPlugin as any).default;

export default defineConfig({
  plugins: [
    revideo({
      project: "./src/project.ts",
    }),
  ],
  server: {
    port: 9000,
  },
  build: {
    target: "esnext",
  },
});
