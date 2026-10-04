/**
 * fetch-data.ts
 *
 * Esqueleto para descargar datos agrometeorológicos complementarios
 * (Open-Meteo / NASA POWER) para la zona del volcán Teuhtli (Milpa Alta / Tláhuac).
 * Ejecutable directamente con: bun scripts/fetch-data.ts
 *
 * NOTA: NO EJECUTAR TODAVÍA. Requiere confirmación de endpoints y variables.
 */

import * as path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Coordenadas del volcán Teuhtli / Estación Milpa Alta
const TEUHTLI_COORDS = {
  latitude: 19.19055,
  longitude: -99.02194,
  elevation: 2420, // msnm
};

const RAW_DATA_DIR = path.resolve(__dirname, "../data/raw");

export async function fetchTeuhtliWeatherData(): Promise<void> {
  console.log("[fetch-data] Esqueleto preparado para ejecución con Bun.");
  console.log(`[fetch-data] Destino configurado en: ${RAW_DATA_DIR}`);
  console.log(
    `[fetch-data] Coordenadas: Lat ${TEUHTLI_COORDS.latitude}, Lon ${TEUHTLI_COORDS.longitude}`,
  );
}

if (process.argv[1] && process.argv[1].endsWith("fetch-data.ts")) {
  console.log(
    "Script fetch-data listo. Configura parámetros antes de ejecutar.",
  );
}
