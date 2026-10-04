/**
 * prepare-data.ts
 *
 * Esqueleto para transformar las series climatológicas locales del SMN
 * (Milpa Alta y Tláhuac) y los polígonos GeoJSON de Tulyehualco en archivos JSON
 * limpios y optimizados para el render de animaciones en Revideo.
 * Ejecutable directamente con: bun scripts/prepare-data.ts
 *
 * FUENTES PRINCIPALES DEL REPOSITORIO (NO DUPLICAR):
 * - ../../data/datos_climatologicos/milpa_alta.txt (Estación 9032)
 * - ../../data/datos_climatologicos/normal_milpa_alta_1991_2020.txt
 * - ../../data/datos_climatologicos/tlahuac.txt
 * - ../../notebooks/tulyehualco_*.geojson
 *
 * DESTINO:
 * - ../data/processed/climatologia-resumen.json
 * - ../data/processed/tulyehualco-poligono.json
 *
 * NOTA: NO EJECUTAR TODAVÍA.
 */

import * as path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ROOT_DATA_DIR = path.resolve(
  __dirname,
  "../../data/datos_climatologicos",
);
const PROCESSED_DATA_DIR = path.resolve(__dirname, "../data/processed");

export interface ClimatologySummary {
  estacion: string;
  codigo: string;
  altitud_msnm: number;
  periodo: string;
  normales_1991_2020: {
    temp_max_anual: number;
    temp_min_anual: number;
    temp_media_anual: number;
    precipitacion_total_anual: number;
    dias_lluvia_anual: number;
  };
  anomalias_recientes: {
    precipitacion_2024_mm: number;
    precipitacion_2025_mm: number;
    alerta_temperatura_post2014: boolean;
  };
}

export async function prepareData(): Promise<void> {
  console.log("[prepare-data] Esqueleto preparado para ejecución con Bun.");
  console.log(`[prepare-data] Leyendo desde: ${ROOT_DATA_DIR}`);
  console.log(`[prepare-data] Destino: ${PROCESSED_DATA_DIR}`);
}

if (process.argv[1] && process.argv[1].endsWith("prepare-data.ts")) {
  console.log(
    "Script prepare-data listo. Ejecutar tras definir esquema de clips.",
  );
}
