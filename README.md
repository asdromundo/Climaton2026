# 🌱 Cehuamilli — Climatón 2026

Proyecto de análisis agrometeorológico y comunitario en la zona del volcán Teuhtli (Milpa Alta / Tláhuac, CDMX).

Consulta [`docs/CATCH-UP.md`](docs/CATCH-UP.md) para el estado del análisis climatológico y datos geoespaciales.

---

## 🎬 Sub-proyecto Motion Design (`motion/`)

Inserts de video animados (1920x1080 @ 30 fps, 5 a 8 segundos) construidos con **Revideo** (licencia MIT) y gestionados con **Bun** para intercalar con tomas reales en presentaciones institucionales (UNAM).

### Estructura
- `motion/src/` — Configuración de escenas (`project.ts`), tema visual (`theme.ts`), componentes y clips.
- `motion/assets/` — Fuentes tipográficas locales (OFL) y texturas artesanales (papel/amate).
- `motion/data/` — Datos procesados derivados de las series climatológicas del SMN (`data/datos_climatologicos/`).
- `motion/footage/` — Tomas reales (directorio ignorado por Git).
- `motion/out/` — Renders exportados en MP4 (directorio ignorado por Git).

### Uso con Bun

1. **Instalación de dependencias**:
   ```bash
   cd motion
   bun install
   ```

2. **Previsualización en navegador (Editor Revideo)**:
   ```bash
   bun start
   # Abre http://localhost:9000 en el navegador
   ```

3. **Renderizado de videos**:
   ```bash
   bun run render
   # Los videos generados se guardan en motion/out/
   ```

4. **Auditoría de licencias**:
   ```bash
   bun run license-check
   # Equivalente a: bunx license-checker --summary
   ```

5. **Transformación de datos**:
   ```bash
   bun run prepare-data
   ```

> [!NOTE]
> Los archivos de video (`.mp4`, `.mov`, etc.) están excluidos del control de versiones y bloqueados por el hook `scripts/hooks/pre-commit`.
