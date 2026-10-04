# 📜 Licencias y Dependencias — Cehuamilli Motion Design

## Política de Licencias del Proyecto

Este sub-proyecto de Motion Design está sujeto a restricciones estrictas para su publicación y difusión institucional por parte de la **UNAM**:

- ✅ **Permitidas**: MIT, Apache-2.0, ISC, BSD (2-Clause / 3-Clause) y fuentes con SIL Open Font License (OFL).
- ❌ **Prohibidas**: GPL, AGPL, licencias "source-available" o restrictivas para uso comercial/institucional (por ejemplo, Remotion no está permitido).
- 🔒 **Material multimedia**: Texturas y material gráfico deben ser de autoría propia o de dominio público / Creative Commons CC0 / CC-BY. Las fuentes tipográficas deben ser 100% OFL locales.

---

## Resumen de `bunx license-checker --summary`

Ejecutado en `motion/`:

```
├─ MIT: 133
├─ ISC: 28
├─ Apache-2.0: 14
├─ BSD-3-Clause: 5
├─ MPL-2.0: 3
├─ LGPL-2.1: 2
├─ UNKNOWN: 1
├─ GPL-3.0: 1
├─ UNLICENSED: 1
├─ BSD-2-Clause: 1
├─ CC-BY-3.0: 1
├─ CC0-1.0: 1
└─ (MIT AND CC-BY-3.0): 1
```

---

## ⚠️ Hallazgos Importantes de la Auditoría

1. **`GPL-3.0: 1` (`@ffprobe-installer/linux-x64@5.2.0`)**:
   - Este paquete es una dependencia transitiva descargada por `@revideo/ffmpeg` -> `@ffprobe-installer/ffprobe`.
   - Distribuye un binario estático de FFprobe compilado con librerías GPL.
2. **`LGPL-2.1: 2` y `UNKNOWN: 1` (`@ffmpeg-installer/linux-x64`)**:
   - Binario estático de FFmpeg descargado por `@revideo/ffmpeg`.
3. **`UNLICENSED: 1`**:
   - Corresponde a la raíz local del proyecto (`cehuamilli-motion@0.1.0`), licenciada como MIT en `LICENSE`.

> **Impacto Institucional**: Si la UNAM prohíbe de forma estricta cualquier binario o paquete con licencia GPL-3.0 en el entorno de build/distribución, `@revideo/ffmpeg` viola esta restricción a través de sus instaladores de binarios embebidos. En tal caso, debe considerarse el **Plan B** (HTML + Playwright + FFmpeg nativo del sistema).

---

## Fuentes Tipográficas

| Familia              | Uso                           | Licencia                        |
| -------------------- | ----------------------------- | ------------------------------- |
| **Libertinus Serif** | Títulos y narrativa           | SIL Open Font License 1.1 (OFL) |
| **Fira Sans**        | Datos y etiquetas             | SIL Open Font License 1.1 (OFL) |
| **Fira Code**        | Coordenadas y cifras técnicas | SIL Open Font License 1.1 (OFL) |
