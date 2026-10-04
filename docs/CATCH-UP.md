# 🌱 Cehuamilli — Catch-Up (2026-10-04)

## ¿Qué es?

**Cehuamilli** es un proyecto para el **Climatón 2026**, enfocado en el análisis climático e hidrológico de la zona de **Tulyehualco** y alrededores (Milpa Alta, Tláhuac) en la **Ciudad de México**.

---

## Datos Disponibles

### 🌧️ Climatológicos (CONAGUA/SMN)

Dos estaciones meteorológicas:

| Estación | Código | Ubicación | Altitud | Periodo |
|---|---|---|---|---|
| **Milpa Alta** | 9032 | 19.19°N, -99.02°W | 2420 msnm | 1929–2026 |
| **Tláhuac** | — | — | — | Similar |

Variables disponibles por estación:
- Lluvia máxima 24h, lluvia total mensual
- Evaporación mensual (solo hasta ~2010)
- Temperaturas: máxima/mínima promedio, máxima/mínima extrema, media mensual

Normal climatológica 1991-2020 (Milpa Alta): T.máx 20.1°C, T.mín 8.1°C, T.media 14.1°C, precipitación 749.6 mm/año, 100 días con lluvia.

### 🗺️ Geoespaciales
- AGEB rurales y urbanos (shapefiles INEGI)
- Localidades amanzanadas (shapefile INEGI)
- 6 GeoJSON de Tulyehualco (rural, urbano, oficial, combinado, completo, AOI oficial)
- Mapa de colonias (GeoJSON)
- IECM 2019 (datos demográficos/electorales)

---

## Estado del Análisis

### Notebook principal: `notebooks/datos_climatologicos.ipynb`
- ✅ Parsing de datos de texto plano del SMN para ambas estaciones
- ✅ Estrategia de nulos documentada:
  - Lluvia: NaN (no interpolar)
  - Extremos: NaN estricto
  - Temperaturas: imputar con media mensual multianual
  - Evaporación: NaN (usar fórmulas indirectas)
- ✅ ~20+ visualizaciones generadas
- ✅ Renderizado a HTML/PDF vía Quarto

### Notebooks secundarios
- `exploracion.ipynb` — exploración geoespacial inicial
- `cehuamilli.ipynb` — notebook secundario

---

## ⚠️ Anomalías Detectadas

1. **Temperatura Milpa Alta post-2014**: Caída drástica de T.máx promedio (de ~22°C a ~12°C en 2025). Probablemente problema instrumental, no señal climática. Investigar.
2. **Precipitación 2024-2025**: Valores extraordinarios (1211 y 1448 mm vs normal de 750 mm). Posible tendencia real de intensificación.

---

## Tareas Pendientes

- [ ] Verificar anomalía de temperatura post-2014 en Milpa Alta
- [ ] Integrar análisis geoespacial con datos climáticos
- [ ] Explorar datos de Earth Engine (geemap ya instalado)
- [ ] Análisis de frecuencia de extremos (Gumbel, Pearson III)
- [ ] Balance hídrico con evaporación estimada (Thornthwaite/Hargreaves)
- [ ] Integrar datos demográficos (IECM) con datos climáticos
- [ ] Limpiar archivos y organizar repositorio

---

## Stack
Python 3.14 · uv · Jupyter/Quarto · geopandas · folium · geemap · Earth Engine API · matplotlib · seaborn · pandas · numpy
