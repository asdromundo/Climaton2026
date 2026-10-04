import { makeProject } from "@revideo/core";

import toma01 from "./clips/toma-01";
import toma02 from "./clips/toma-02";
import toma03 from "./clips/toma-03";
import toma04 from "./clips/toma-04";
import toma05 from "./clips/toma-05";
import toma06 from "./clips/toma-06";
import toma07 from "./clips/toma-07";
import toma08 from "./clips/toma-08";

/**
 * Proyecto Maestro Cehuamilli · Climatón 2026
 *
 * Estructura secuencial cronológica (Tomas 1 a 8):
 * - Toma 1: 19.65 s (INS-01 Ubicación + INS-02 Cadena Amaranto)
 * - Toma 2: 20.24 s (INS-03 >90% INEGI y Siembra Tardía)
 * - Toma 3: 23.06 s (INS-04 El Niño NOAA + INS-05 De lo Global a lo Local)
 * - Toma 4: 38.76 s (INS-06 Alturas + INS-07 Alerta Ladera + INS-08 Vacío de Datos)
 * - Toma 5: 21.61 s (INS-09 El Manual Vivo)
 * - Toma 6: 28.18 s (INS-10 Las Tres Etapas + Financiamiento)
 * - Toma 7: 26.90 s (INS-11 Recarga del Acuífero + INS-12 Escalabilidad)
 * - Toma 8:  8.70 s (INS-13 Cierre Milpa + Título + Logos)
 *
 * Duración total continua: ~3 min 07 s
 */
export default makeProject({
  scenes: [toma01, toma02, toma03, toma04, toma05, toma06, toma07, toma08],
  settings: {
    shared: {
      size: { x: 1920, y: 1080 },
    },
    rendering: {
      fps: 30,
    },
    preview: {
      fps: 30,
    },
  },
});
