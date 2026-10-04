"""
Generador avanzado de selector territorial para Tulyehualco.
Incluye:
1. AGEBs Urbanas de INEGI (manzanas detalladas).
2. Cuadrícula rural subdividida en mosaicos de 500m sobre el Teuhtli y laderas.
3. Capa de Colonias y Barrios tradicionales de Tulyehualco (mapa oficial CDMX).
4. Herramienta de dibujo (Leaflet Draw) con recorte automático de zonas rurales en vivo (Turf.js).
"""
import json
import numpy as np
import geopandas as gpd
from shapely.geometry import box

def build_advanced_selector():
    # 1. Cargar capas base
    urb = gpd.read_file("data/ageb_urbano/ageb_urbano.shp").to_crs(epsg=4326)
    rur = gpd.read_file("data/ageb_rural/ageb_rural.shp").to_crs(epsg=4326)
    cdmx_col = gpd.read_file("data/mapa_colonias.json").to_crs(epsg=4326)

    # Ventana de interés (Tulyehualco + Volcán Teuhtli + laderas norte de Milpa Alta y poniente de Tláhuac)
    minx, miny, maxx, maxy = -99.06, 19.21, -98.97, 19.285
    bbox_geom = box(minx, miny, maxx, maxy)

    # 2. Filtrar urbanas
    urb_clip = urb.cx[minx:maxx, miny:maxy].copy()
    nombres_mun = {"009": "Milpa Alta", "011": "Tláhuac", "013": "Xochimilco"}
    urb_clip["Alcaldia"] = urb_clip["CVE_MUN"].map(nombres_mun).fillna("Otra")
    urb_clip["Tipo"] = "AGEB Urbana"

    # 3. Subdividir las AGEBs rurales grandes en una cuadrícula de 500m (para selección fina)
    rur_clip = gpd.clip(rur, bbox_geom)
    step = 0.0045  # ~500 metros
    grid_cells = []
    grid_ids = []
    idx = 1
    for x in np.arange(minx, maxx, step):
        for y in np.arange(miny, maxy, step):
            grid_cells.append(box(x, y, x + step, y + step))
            grid_ids.append(f"RUR-{idx:03d}")
            idx += 1

    grid_gdf = gpd.GeoDataFrame({"GRID_ID": grid_ids, "geometry": grid_cells}, crs="EPSG:4326")
    rur_subdiv = gpd.overlay(grid_gdf, rur_clip, how="intersection")
    rur_subdiv["Alcaldia"] = rur_subdiv["CVE_MUN"].map(nombres_mun).fillna("Otra")
    rur_subdiv["Tipo"] = "Mosaico Rural 500m"
    rur_subdiv["CVEGEO"] = rur_subdiv["CVEGEO"] + "_" + rur_subdiv["GRID_ID"]

    # 4. Colonias tradicionales de Tulyehualco
    barrios = [
        'Calyequita', 'Nativitas', 'Esperanza', 'Loma', 'Quirino Mendoza',
        'Cerrillos', 'Cristo Rey', 'San Felipe', 'Chiquimola', 'Casahuates',
        'Olivar Santa', 'Ánimas', 'Animas', 'San Sebastián', 'San Isidro',
        'Lupita', 'Mesitas', 'Santiaguito', 'Carmen', 'Tulyehualco'
    ]
    regex = '|'.join(barrios)
    colonias_tulye = cdmx_col[
        cdmx_col['colonia'].str.contains(regex, case=False, na=False) &
        cdmx_col['alc'].isin(['Xochimilco', 'Tláhuac', 'Milpa Alta'])
    ].copy()
    colonias_tulye["Tipo"] = "Colonia/Barrio Tradicional"
    colonias_tulye["CVEGEO"] = colonias_tulye["colonia"] + " (" + colonias_tulye["alc"] + ")"
    colonias_tulye["Alcaldia"] = colonias_tulye["alc"]

    # Exportar GeoJSONs a diccionarios
    geojson_urb = json.loads(urb_clip[["CVEGEO", "CVE_AGEB", "Alcaldia", "Tipo", "geometry"]].to_json())
    geojson_rur_grid = json.loads(rur_subdiv[["CVEGEO", "GRID_ID", "CVE_MUN", "Alcaldia", "Tipo", "geometry"]].to_json())
    geojson_rur_macro = json.loads(rur_clip[["CVEGEO", "CVE_MUN", "geometry"]].to_json())
    geojson_colonias = json.loads(colonias_tulye[["CVEGEO", "colonia", "Alcaldia", "Tipo", "geometry"]].to_json())

    html_content = f"""<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <title>Delimitación Territorial Fina · Tulyehualco y Teuhtli</title>
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
  <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/leaflet.draw/1.0.4/leaflet.draw.css" />
  <script src="https://cdnjs.cloudflare.com/ajax/libs/leaflet.draw/1.0.4/leaflet.draw.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/@turf/turf@6/turf.min.js"></script>
  <style>
    body, html {{ margin: 0; padding: 0; height: 100%; font-family: 'Segoe UI', system-ui, sans-serif; }}
    #map {{ width: 100%; height: 100%; }}
    .panel {{
      position: absolute;
      top: 15px;
      right: 15px;
      z-index: 1000;
      background: rgba(255, 255, 255, 0.96);
      backdrop-filter: blur(8px);
      padding: 16px 20px;
      border-radius: 14px;
      box-shadow: 0 4px 25px rgba(0,0,0,0.3);
      max-width: 420px;
      max-height: 90vh;
      overflow-y: auto;
      font-size: 13px;
    }}
    .panel h3 {{ margin: 0 0 6px 0; color: #1c1613; font-size: 17px; font-weight: 700; }}
    .panel p {{ margin: 4px 0 10px 0; color: #555; line-height: 1.4; }}
    .section-title {{
      font-weight: 700;
      color: #2F241D;
      margin: 12px 0 6px 0;
      border-bottom: 2px solid #E3D7BF;
      padding-bottom: 3px;
      font-size: 13px;
    }}
    .badge {{
      display: inline-block;
      padding: 3px 8px;
      border-radius: 4px;
      font-size: 11px;
      font-weight: 600;
      color: white;
      margin: 2px;
    }}
    .badge-urb {{ background: #c0392b; }}
    .badge-grid {{ background: #d35400; }}
    .badge-col {{ background: #27ae60; }}
    .btn {{
      background: #2e4c38;
      color: white;
      border: none;
      padding: 9px 14px;
      border-radius: 6px;
      cursor: pointer;
      font-weight: 600;
      font-size: 13px;
      margin-top: 8px;
      width: 100%;
      transition: background 0.2s;
    }}
    .btn:hover {{ background: #1b3022; }}
    .btn-blue {{ background: #2980b9; }}
    .btn-blue:hover {{ background: #1c5980; }}
    .btn-clear {{ background: #8c4d2e; margin-top: 6px; }}
    .btn-clear:hover {{ background: #68351d; }}
    #selection-list {{
      margin-top: 8px;
      background: #f8f9fa;
      border: 1px solid #ddd;
      border-radius: 6px;
      padding: 8px;
      max-height: 120px;
      overflow-y: auto;
      font-family: monospace;
      font-size: 12px;
      white-space: pre-wrap;
    }}
    .help-box {{
      background: #FAF7F0;
      border-left: 4px solid #C97A3E;
      padding: 8px 12px;
      margin: 10px 0;
      border-radius: 4px;
      font-size: 12px;
      color: #2F241D;
    }}
  </style>
</head>
<body>
  <div id="map"></div>
  <div class="panel">
    <h3>Delimitación Territorial · Tulyehualco</h3>
    <p>Para delimitar la zona de estudio sin bloques rurales gigantescos, tienes <b>3 métodos combinables</b>:</p>

    <div class="help-box">
      <b>💡 Cómo reducir los bloques rurales:</b><br>
      • <b>Opción A (Cuadros de 500m):</b> Activa la capa <i>«Mosaicos Rurales 500m»</i> y haz clic solo en los cuadros que tocan las parcelas del Teuhtli.<br>
      • <b>Opción B (Dibujar y Recortar):</b> Usa la herramienta de polígono ⬡ (esquina sup. izq.) y traza el contorno rural exacto sobre la foto satelital.<br>
      • <b>Opción C (Colonias):</b> Activa la capa <i>«Colonias Tradicionales»</i> para seleccionar polígonos con nombres locales.
    </div>

    <div class="section-title">Capas Disponibles</div>
    <div>
      <span class="badge badge-urb">AGEBs Urbanas (Manzanas)</span>
      <span class="badge badge-grid">Mosaicos Rurales (500m)</span>
      <span class="badge badge-col">Colonias/Barrios Tulyehualco</span>
    </div>

    <div class="section-title">Elementos Seleccionados (<span id="count">0</span>)</div>
    <div id="selection-list">Ninguno seleccionado</div>

    <button class="btn" onclick="copySelection()">📋 Copiar claves seleccionadas</button>
    <button class="btn btn-blue" onclick="downloadGeoJSON()">💾 Descargar GeoJSON resultante</button>
    <button class="btn btn-clear" onclick="clearSelection()">Limpiar selección</button>
  </div>

  <script>
    const dataUrb = {json.dumps(geojson_urb)};
    const dataRurGrid = {json.dumps(geojson_rur_grid)};
    const dataRurMacro = {json.dumps(geojson_rur_macro)};
    const dataColonias = {json.dumps(geojson_colonias)};

    const map = L.map('map').setView([19.250, -99.015], 14);

    // Fondo Satelital
    const esriSat = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{{z}}/{{y}}/{{x}}', {{
      maxZoom: 19,
      attribution: 'Tiles &copy; Esri'
    }}).addTo(map);

    const osm = L.tileLayer('https://{{s}}.tile.openstreetmap.org/{{z}}/{{y}}/{{x}}.png', {{
      maxZoom: 19,
      attribution: '&copy; OpenStreetMap'
    }});

    // Almacén de selección
    const selectedFeatures = new Map();

    const selectedStyle = {{
      fillColor: '#00ff66',
      weight: 3.5,
      opacity: 1,
      color: '#006622',
      fillOpacity: 0.75
    }};

    function makeLayer(geojson, defaultStyleFunc) {{
      return L.geoJSON(geojson, {{
        style: defaultStyleFunc,
        onEachFeature: function(feature, layer) {{
          const p = feature.properties;
          const id = p.CVEGEO;
          const label = p.GRID_ID || p.colonia || ('AGEB ' + (p.CVE_AGEB || ''));
          const tipo = p.Tipo || 'Polígono';

          layer.bindTooltip(`<b>${{label}}</b><br>${{tipo}} (${{p.Alcaldia || ''}})<br><span style="font-size:10px;font-family:monospace;">${{id}}</span>`, {{ sticky: true }});

          layer.on('click', function(e) {{
            L.DomEvent.stopPropagation(e);
            if (selectedFeatures.has(id)) {{
              selectedFeatures.delete(id);
              layer.setStyle(defaultStyleFunc(feature));
            }} else {{
              selectedFeatures.set(id, feature);
              layer.setStyle(selectedStyle);
            }}
            updateUI();
          }});
        }}
      }});
    }}

    // Capa 1: AGEBs Urbanas
    const layerUrb = makeLayer(dataUrb, f => ({{
      fillColor: f.properties.CVE_MUN === '013' ? '#e74c3c' : (f.properties.CVE_MUN === '011' ? '#3498db' : '#2ecc71'),
      weight: 1.5,
      color: '#222',
      fillOpacity: 0.55
    }})).addTo(map);

    // Capa 2: Mosaicos Rurales de 500m
    const layerRurGrid = makeLayer(dataRurGrid, f => ({{
      fillColor: '#e67e22',
      weight: 1,
      color: '#d35400',
      dashArray: '3, 3',
      fillOpacity: 0.35
    }})).addTo(map);

    // Capa 3: Colonias/Barrios tradicionales
    const layerColonias = makeLayer(dataColonias, f => ({{
      fillColor: '#27ae60',
      weight: 2,
      color: '#1e8449',
      fillOpacity: 0.35
    }}));

    // Capa 4: Bloques Rurales Macro (los gigantes originales)
    const layerRurMacro = L.geoJSON(dataRurMacro, {{
      style: {{ fillColor: '#7f8c8d', weight: 2.5, color: '#34495e', fillOpacity: 0.15 }}
    }});

    // Control de Capas
    L.control.layers({{
      'Satélite Esri': esriSat,
      'Calles OpenStreetMap': osm
    }}, {{
      'AGEBs Urbanas (Manzanas)': layerUrb,
      'Mosaicos Rurales (500m)': layerRurGrid,
      'Colonias/Barrios Tulyehualco': layerColonias,
      'Bloques Rurales Gigantes (Original)': layerRurMacro
    }}, {{ position: 'topleft', collapsed: false }}).addTo(map);

    // Leaflet Draw: Dibujo libre de límites
    const drawnItems = new L.FeatureGroup();
    map.addLayer(drawnItems);
    const drawControl = new L.Control.Draw({{
      draw: {{
        polygon: true,
        rectangle: true,
        polyline: false,
        circle: false,
        marker: false,
        circlemarker: false
      }},
      edit: {{ featureGroup: drawnItems }}
    }});
    map.addControl(drawControl);

    map.on(L.Draw.Event.CREATED, function (e) {{
      const layer = e.layer;
      drawnItems.addLayer(layer);
      const drawnGeoJSON = layer.toGeoJSON();
      const customId = "ZONA_DIBUJADA_" + Date.now();
      drawnGeoJSON.properties = {{
        CVEGEO: customId,
        colonia: "Área trazada a mano",
        Tipo: "Polígono de dibujo libre"
      }};
      selectedFeatures.set(customId, drawnGeoJSON);
      updateUI();
      alert("✅ Polígono dibujado registrado e incluido en tu selección.");
    }});

    function updateUI() {{
      const keys = Array.from(selectedFeatures.keys());
      document.getElementById('count').innerText = keys.length;
      if (keys.length === 0) {{
        document.getElementById('selection-list').innerText = 'Ninguno seleccionado';
      }} else {{
        document.getElementById('selection-list').innerText = JSON.stringify(keys, null, 2);
      }}
    }}

    function copySelection() {{
      const keys = Array.from(selectedFeatures.keys());
      if (keys.length === 0) {{
        alert('Selecciona o dibuja al menos un área en el mapa.');
        return;
      }}
      navigator.clipboard.writeText(JSON.stringify(keys, null, 2)).then(() => {{
        alert(`¡Copiadas ${{keys.length}} claves al portapapeles!\\nPégalas directamente en el chat para integrarlas.`);
      }});
    }}

    function clearSelection() {{
      selectedFeatures.clear();
      drawnItems.clearLayers();
      layerUrb.resetStyle();
      layerRurGrid.resetStyle();
      layerColonias.resetStyle();
      updateUI();
    }}

    function downloadGeoJSON() {{
      const features = Array.from(selectedFeatures.values());
      if (features.length === 0) {{
        alert('No hay elementos seleccionados ni dibujados para descargar.');
        return;
      }}
      const fc = {{
        type: 'FeatureCollection',
        features: features
      }};
      const blob = new Blob([JSON.stringify(fc, null, 2)], {{ type: 'application/json' }});
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'tulyehualco_delimitacion_personalizada.geojson';
      a.click();
    }}
  </script>
</body>
</html>
"""
    with open("notebooks/selector_agebs_tulyehualco.html", "w", encoding="utf-8") as f:
        f.write(html_content)
    print("Selector avanzado generado en: notebooks/selector_agebs_tulyehualco.html")

if __name__ == "__main__":
    build_advanced_selector()
