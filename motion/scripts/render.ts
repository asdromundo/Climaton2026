import { renderVideo } from "@revideo/renderer";
import path from "path";

const projectFile = path.resolve("./src/project.ts");

console.log("🎬 Iniciando renderizado de Cehuamilli Video Master...");
console.log("📐 Resolución: 1920x1080 (Full HD)");
console.log("⏱️  Framerate: 30 fps");
console.log("📦 Formato: MP4 (H.264)");

try {
  const outputPath = await renderVideo({
    projectFile,
    settings: {
      logProgress: true,
      outFile: "cehuamilli-video-master.mp4",
      outDir: "./out",
    },
  });

  console.log(`\n✅ ¡Video renderizado exitosamente!`);
  console.log(`📁 Ubicación: ${outputPath}`);
} catch (error) {
  console.error("❌ Error durante el renderizado:", error);
  process.exit(1);
}
