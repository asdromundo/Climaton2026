# Reglas del Sub-Proyecto Motion Design (Cehuamilli)

Este documento contiene las directrices obligatorias para cualquier asistente o sesión de trabajo en el módulo `motion/`.

---

## 1. Contexto y Propósito
- **Proyecto**: Inserts de video animados (5 a 8 segundos) que se intercalarán con tomas reales (footage) en una presentación institucional del proyecto agrometeorológico y comunitario **Cehuamilli** en el volcán Teuhtli (Milpa Alta / Tláhuac, CDMX).
- **Equipo y Difusión**: Equipo de 6 personas; material para evento institucional y publicación por parte de la **UNAM**.
- **Contexto general**: Consulta [`../../docs/CATCH-UP.md`](../docs/CATCH-UP.md) para el contexto hidro-climatológico completo.
- **Entorno de ejecución**: Preferencia por **Bun** (`bun`, `bunx`) para gestión de paquetes y ejecución directa de scripts TypeScript.

---

## 2. Flujo de Trabajo
- **Un clip a la vez**: Desarrollar y afinar un clip de forma atómica. Solicitar aprobación explícita del usuario sobre el estilo y look antes de avanzar al siguiente.
- **Sin animaciones prematuras**: No comenzar escenas completas sin confirmación de guion o storyboard.

---

## 3. Dirección de Arte y Estética
- **Paleta y Tono**: Cálida, orgánica y artesanal. Tonos tierra volcánicos (Teuhtli), verdes de milpa/nopal y textura de papel amate/fibra.
- **Movimiento y Easings**: Easings intencionales (cúbicos, back suave). **NUNCA lineal**.
- **Composición**: Entradas escalonadas (stagger), abundante aire negativo para no saturar.
- **Tipografía sobre Video**: Textos de gran escala y alta legibilidad, diseñados para verse sobre video real sin perder contraste. Usar la configuración de [`src/theme.ts`](src/theme.ts).

---

## 4. Manejo Estricto de Datos
- **Solo datos reales**:
  - Las series climatológicas oficiales del SMN viven en `../../data/datos_climatologicos/`. **NO duplicar**.
  - Los polígonos territoriales viven en `../../notebooks/tulyehualco_*.geojson`.
  - Si se requieren datos horarios o satelitales adicionales (Open-Meteo, NASA POWER), descargarlos vía `bun scripts/fetch-data.ts` y guardarlos en `data/raw/` antes de procesar.
- **Prohibido inventar cifras**: Si falta una medición o una normal, mostrar explícitamente el placeholder:
  `DATO PENDIENTE`
  Nunca interpolar eventos extremos ni colocar valores ficticios para llenar la pantalla.

---

## 5. Salidas y Renders
- Los renders finales se exportan a:
  `motion/out/clip-NN-nombre.mp4` (H.264 / 1920x1080 @ 30fps).
- Para clips que van sobre tomas reales como superposición, exportar versión con canal alfa (ProRes 4444 o WebM con alfa).

---

## 6. Control de Versiones (Git)
- **Videos NUNCA se versionan**: Los archivos `.mp4`, `.mov`, `.webm`, `.gif`, etc. están en `.gitignore` y protegidos por el hook `scripts/hooks/pre-commit`.
- **NO desactivar el hook** ni forzar la adición de medios al repositorio.
- Las tomas reales van en `motion/footage/` (ignorada) y los renders en `motion/out/` (ignorada).

---

## 7. Licencias
- Estricta restricción de dependencias: **Solo MIT, Apache-2.0, ISC, BSD y fuentes OFL**.
- Queda prohibido cualquier paquete GPL, AGPL o con licencias comerciales/source-available (ej. NO Remotion).
- Auditoría con: `bunx license-checker --summary`.
