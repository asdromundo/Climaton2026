"""
Generador cartográfico de alta resolución para Cehuamilli Motion Design.
Produce 'cdmx-mapa-referencia.png' y actualiza 'cdmx-outline.json' con:
- Todas las alcaldías de la CDMX.
- Delimitación del Suelo de Conservación (alcaldías del sur y AGEBs rurales).
- Polígono oficial consolidado de la Zona de Estudio de Tulyehualco (1,661 ha).
- Volcán Teuhtli con curvas de nivel y sitio de Cehuamilli en la ladera.
"""
import json
import matplotlib.pyplot as plt
import matplotlib.patches as mpatches
from matplotlib.patches import Polygon as MplPolygon, Circle as MplCircle
import geopandas as gpd
from shapely.geometry import box, Point

def generar_mapa():
    # 1. Cargar capas oficiales
    colonias = gpd.read_file("data/mapa_colonias.json").to_crs(epsg=4326)
    rur = gpd.read_file("data/ageb_rural/ageb_rural.shp").to_crs(epsg=4326)
    zona_estudio = gpd.read_file("motion/data/processed/tulyehualco_zona_estudio.geojson").to_crs(epsg=4326)

    # 2. Disolver alcaldías de CDMX
    alcaldias = colonias.dissolve(by="alc", as_index=False)
    contorno_cdmx = colonias.dissolve()

    # Identificar alcaldías del Suelo de Conservación sur
    alcaldias_conservacion = ['Milpa Alta', 'Tlalpan', 'Xochimilco', 'Tláhuac', 'Cuajimalpa de Morelos', 'La Magdalena Contreras']

    # 3. Configurar figura Matplotlib 4K con estética amate
    fig, ax = plt.subplots(figsize=(16, 18), dpi=200)
    fig.patch.set_facecolor('#FAF7F0')
    ax.set_facecolor('#FAF7F0')

    # Bounding box general de CDMX
    bounds = contorno_cdmx.total_bounds # [minx, miny, maxx, maxy]
    ax.set_xlim(bounds[0] - 0.02, bounds[2] + 0.02)
    ax.set_ylim(bounds[1] - 0.02, bounds[3] + 0.02)
    ax.set_aspect('equal')

    # 4. Dibujar polígono base de la CDMX
    contorno_cdmx.plot(ax=ax, facecolor='#F5EFE1', edgecolor='#C9BBA0', linewidth=1.2, zorder=1)

    # 5. Dibujar Suelo de Conservación (AGEBs rurales de INEGI)
    rur.plot(ax=ax, facecolor='#E3EDDC', edgecolor='#7D9D64', linewidth=0.8, alpha=0.7, zorder=2)

    # 6. Dibujar límites de las alcaldías
    for _, row in alcaldias.iterrows():
        alc_nombre = row['alc']
        geom = row['geometry']
        is_sur = alc_nombre in alcaldias_conservacion

        # Borde de alcaldía
        gpd.GeoSeries([geom]).boundary.plot(
            ax=ax, color='#8C4D2E' if is_sur else '#B8A890',
            linewidth=1.2 if is_sur else 0.8, linestyle='-', zorder=3, alpha=0.8
        )

        # Rótulo de la alcaldía
        pt = geom.centroid
        if alc_nombre in ['Xochimilco', 'Tláhuac', 'Milpa Alta', 'Tlalpan']:
            ax.text(pt.x, pt.y, alc_nombre.upper(), fontsize=11, fontweight='bold',
                    color='#2F241D', ha='center', va='center', zorder=5,
                    bbox=dict(boxstyle='round,pad=0.2', facecolor='#FAF7F0', edgecolor='none', alpha=0.75))
        elif alc_nombre in ['Iztapalapa', 'Coyoacán', 'Cuauhtémoc', 'Benito Juárez']:
            ax.text(pt.x, pt.y, alc_nombre, fontsize=9, color='#7A6855', ha='center', va='center', zorder=5, alpha=0.85)

    # 7. Dibujar POLÍGONO OFICIAL DE LA ZONA DE ESTUDIO (Santiago Tulyehualco - 1,661 ha)
    zona_estudio.plot(
        ax=ax, facecolor='#E67E22', edgecolor='#A04000', linewidth=2.8, alpha=0.45, zorder=4
    )
    zona_estudio.boundary.plot(
        ax=ax, color='#78281F', linewidth=2.8, linestyle='-', zorder=4
    )

    # Rótulo y flecha hacia la Zona de Estudio
    z_centroid = zona_estudio.geometry.iloc[0].centroid
    ax.annotate(
        "ZONA DE ESTUDIO\nSantiago Tulyehualco\n(1,661 ha · Temporal)",
        xy=(z_centroid.x, z_centroid.y),
        xytext=(z_centroid.x + 0.06, z_centroid.y + 0.05),
        arrowprops=dict(facecolor='#8C4D2E', edgecolor='#2F241D', width=1.5, headwidth=7),
        fontsize=11, fontweight='bold', color='#1C1613', zorder=10,
        bbox=dict(boxstyle='round,pad=0.4', facecolor='#F2EBD9', edgecolor='#C97A3E', linewidth=1.5)
    )

    # 8. Volcán Teuhtli (Curvas de nivel concéntricas y cráter)
    tx, ty = -99.0270, 19.2450
    for r, col, lw, ls in [
        (0.016, '#C97A3E', 1.2, '--'),  # Cota 2,300 msnm (base)
        (0.011, '#C97A3E', 1.5, '-'),   # Cota 2,450 msnm (ladera)
        (0.006, '#8C4D2E', 1.8, '-'),   # Cota 2,600 msnm (falda alta)
        (0.0025, '#2F241D', 2.2, '-')   # Cota 2,710 msnm (cráter)
    ]:
        circle = MplCircle((tx, ty), r, fill=False, edgecolor=col, linewidth=lw, linestyle=ls, zorder=6)
        ax.add_patch(circle)

    # Cráter central y marcador Cehuamilli en la ladera
    ax.plot(tx, ty, marker='^', markersize=9, color='#2F241D', zorder=7)
    ax.text(tx, ty - 0.006, "Volcán Teuhtli\n2,710 msnm", fontsize=10, fontweight='bold',
            color='#2F241D', ha='center', va='top', zorder=7,
            bbox=dict(boxstyle='round,pad=0.2', facecolor='#FAF7F0', edgecolor='#8C4D2E', alpha=0.85))

    # Punto Cehuamilli (Ladera norte, en parcelas de amaranto)
    cx, cy = tx - 0.004, ty + 0.009
    ax.plot(cx, cy, marker='o', markersize=8, color='#C0392B', markeredgecolor='#FAF7F0', markeredgewidth=2, zorder=8)
    ax.text(cx - 0.008, cy + 0.004, "📍 Cehuamilli", fontsize=11, fontweight='bold', color='#C0392B', zorder=8)

    # 9. Título editorial y cartela
    ax.text(
        bounds[0] + 0.01, bounds[3] - 0.02,
        "CIUDAD DE MÉXICO\nSuelo de Conservación y Zona de Estudio",
        fontsize=16, fontweight='bold', color='#2F241D', family='serif',
        bbox=dict(boxstyle='round,pad=0.5', facecolor='#F2EBD9', edgecolor='#C97A3E', linewidth=1.5)
    )

    # Leyenda cartográfica
    leyenda_parches = [
        mpatches.Patch(facecolor='#E3EDDC', edgecolor='#7D9D64', label='Suelo de Conservación (Rural CDMX)'),
        mpatches.Patch(facecolor='#F5EFE1', edgecolor='#B8A890', label='Zona Urbana Consolidada'),
        mpatches.Patch(facecolor='#E67E22', edgecolor='#78281F', linewidth=1.5, label='Zona de Estudio: Tulyehualco (1,661 ha)'),
        mpatches.Patch(facecolor='none', edgecolor='#C97A3E', linestyle='--', label='Curvas de nivel: Volcán Teuhtli'),
    ]
    ax.legend(handles=leyenda_parches, loc='lower left', frameon=True, facecolor='#FAF7F0', edgecolor='#C97A3E', fontsize=10)

    ax.set_axis_off()
    plt.tight_layout()

    out_png = "motion/assets/textures/cdmx-mapa-referencia.png"
    plt.savefig(out_png, dpi=200, bbox_inches='tight', facecolor='#FAF7F0')
    plt.close()
    print(f"Mapa generado exitosamente en: {out_png}")

    # 10. Calcular posiciones relativas para Revideo (coordenadas de pantalla normalizadas)
    total_w = (bounds[2] + 0.02) - (bounds[0] - 0.02)
    total_h = (bounds[3] + 0.02) - (bounds[1] - 0.02)

    # Normalizado (-0.5 a 0.5 respecto al centro de la imagen)
    mid_x = (bounds[0] + bounds[2]) / 2
    mid_y = (bounds[1] + bounds[3]) / 2

    teuhtli_norm_x = (tx - mid_x) / total_w
    teuhtli_norm_y = -(ty - mid_y) / total_h  # Eje Y invertido en pantalla

    tulye_norm_x = (z_centroid.x - mid_x) / total_w
    tulye_norm_y = -(z_centroid.y - mid_y) / total_h

    coords_data = {
        "cdmx_bounds": [float(b) for b in bounds],
        "teuhtli_coords": {"lon": tx, "lat": ty, "norm_x": teuhtli_norm_x, "norm_y": teuhtli_norm_y},
        "tulyehualco_coords": {"lon": z_centroid.x, "lat": z_centroid.y, "norm_x": tulye_norm_x, "norm_y": tulye_norm_y},
        "area_hectareas": 1661.48
    }

    with open("motion/data/processed/cdmx-outline.json", "w", encoding="utf-8") as f:
        json.dump(coords_data, f, indent=2)

    print(f"Coordenadas normalizadas guardadas en motion/data/processed/cdmx-outline.json:")
    print(f"  Tulyehualco normalizado: x={tulye_norm_x:.4f}, y={tulye_norm_y:.4f}")
    print(f"  Teuhtli normalizado:     x={teuhtli_norm_x:.4f}, y={teuhtli_norm_y:.4f}")

if __name__ == "__main__":
    generar_mapa()
