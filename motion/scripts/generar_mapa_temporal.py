"""
Generador cartográfico de la Modalidad Hídrica y Agricultura de Temporal en la CDMX.
Muestra que más del 90% (12,180 ha / 91.6%) de la tierra cultivada depende 100% de la lluvia (temporal).
Diseñado para la Toma 2 de Cehuamilli Motion Design con estética de papel amate y cartografía editorial.
"""
import json
import matplotlib.pyplot as plt
import matplotlib.patches as mpatches
from matplotlib.patches import Circle as MplCircle
import matplotlib.patheffects as pe
import geopandas as gpd
import pandas as pd

def generar_mapa_temporal():
    # 1. Cargar capas de INEGI y de estudio
    colonias = gpd.read_file("data/mapa_colonias.json").to_crs(epsg=4326)
    rur = gpd.read_file("data/ageb_rural/ageb_rural.shp").to_crs(epsg=4326)
    zona_estudio = gpd.read_file("motion/data/processed/tulyehualco_zona_estudio.geojson").to_crs(epsg=4326)

    # 2. Alcaldías oficiales consolidadas y contorno continuo de CDMX
    alcaldias = colonias.dissolve(by="alc", as_index=False)
    contorno_cdmx = colonias.dissolve()

    # Bounding box con margen proporcional
    bounds = contorno_cdmx.total_bounds
    pad_x = (bounds[2] - bounds[0]) * 0.04
    pad_y = (bounds[3] - bounds[1]) * 0.04
    xlim = (bounds[0] - pad_x, bounds[2] + pad_x)
    ylim = (bounds[1] - pad_y, bounds[3] + pad_y)

    # 3. Configurar figura Matplotlib 4K con estética amate
    fig, ax = plt.subplots(figsize=(15, 17), dpi=200)
    fig.patch.set_facecolor('#FAF7F0')
    ax.set_facecolor('#FAF7F0')

    ax.set_xlim(xlim)
    ax.set_ylim(ylim)
    ax.set_aspect('equal')
    ax.axis('off')

    # 4. Capa base: Silueta urbana de la CDMX (área consolidada no agrícola)
    contorno_cdmx.plot(
        ax=ax,
        facecolor='#F4ECE1',
        edgecolor='#D3C5B4',
        linewidth=0.8,
        zorder=1
    )

    # 5. Capa principal: Suelo Agrícola de Temporal (AGEBs rurales de INEGI en verde milpa vivo)
    # 12,180 ha de las 13,300 ha totales son de temporal (91.6%)
    rur.dissolve().plot(
        ax=ax,
        facecolor='#558252',
        edgecolor='#345732',
        linewidth=1.2,
        alpha=0.85,
        zorder=2
    )

    # Identificar alcaldías agrícolas del sur
    alcaldias_agricolas = ['Milpa Alta', 'Tlalpan', 'Tláhuac', 'Xochimilco']
    alcaldias_conservacion = alcaldias_agricolas + ['Cuajimalpa de Morelos', 'La Magdalena Contreras', 'Álvaro Obregón']

    # 6. Capa de límites de alcaldías
    for _, row in alcaldias.iterrows():
        alc_nombre = row['alc']
        is_agricola = alc_nombre in alcaldias_agricolas
        is_sur = alc_nombre in alcaldias_conservacion

        gpd.GeoSeries([row['geometry']]).boundary.plot(
            ax=ax,
            color='#6E391F' if is_agricola else ('#8C4D2E' if is_sur else '#B8A890'),
            linewidth=1.5 if is_agricola else (1.1 if is_sur else 0.75),
            linestyle='-',
            alpha=0.85,
            zorder=3
        )

    # Contorno exterior firme de la CDMX
    contorno_cdmx.boundary.plot(
        ax=ax,
        color='#6E391F',
        linewidth=1.8,
        alpha=0.9,
        zorder=4
    )

    # 7. POLÍGONO DE LA ZONA DE ESTUDIO (Santiago Tulyehualco - 1,661 ha de temporal)
    zona_estudio.plot(
        ax=ax,
        facecolor='#E67E22',
        edgecolor='#78281F',
        linewidth=2.2,
        alpha=0.55,
        zorder=5
    )
    zona_estudio.boundary.plot(
        ax=ax,
        color='#78281F',
        linewidth=2.4,
        linestyle='-',
        zorder=5
    )

    # 8. Relieve topográfico: Curvas de nivel del Volcán Teuhtli
    tx, ty = -99.0270, 19.2450
    cotas = [
        (0.016, '#C97A3E', 1.0, ':'),   # 2,300 msnm (base)
        (0.011, '#C97A3E', 1.2, '--'),  # 2,450 msnm (ladera)
        (0.007, '#8C4D2E', 1.4, '-'),   # 2,600 msnm (cono)
        (0.003, '#2F241D', 1.8, '-'),   # 2,710 msnm (cráter)
    ]
    for r, col, lw, ls in cotas:
        c = MplCircle((tx, ty), r, fill=False, edgecolor=col, linewidth=lw, linestyle=ls, zorder=6)
        ax.add_patch(c)

    # Cráter
    ax.plot(tx, ty, marker='^', markersize=5, color='#78281F', zorder=7)

    # 9. Rotulación cartográfica de alcaldías con su porcentaje de temporal (Censo Agropecuario INEGI)
    DATOS_AGRICOLAS = {
        'Milpa Alta': {'pct': '98.4% Temporal', 'ha': '6,250 ha'},
        'Tlalpan': {'pct': '95.2% Temporal', 'ha': '3,180 ha'},
        'Tláhuac': {'pct': '74.7% Temporal', 'ha': '1,420 ha'},
        'Xochimilco': {'pct': '77.2% Temporal', 'ha': '1,150 ha'},
    }

    halo_agricola = [pe.withStroke(linewidth=4.5, foreground='#FAF7F0')]
    halo_urbano = [pe.withStroke(linewidth=3.0, foreground='#FAF7F0')]

    for _, r in alcaldias.iterrows():
        nombre = r['alc']
        pt = r.geometry.centroid

        if nombre in DATOS_AGRICOLAS:
            info = DATOS_AGRICOLAS[nombre]
            # Ajustes finos de centrado para no encimar Teuhtli ni Tulyehualco
            dx, dy = 0.0, 0.0
            if nombre == 'Tláhuac':
                dx, dy = 0.028, 0.040
            elif nombre == 'Xochimilco':
                dx, dy = -0.022, 0.034
            elif nombre == 'Milpa Alta':
                dx, dy = 0.000, -0.035
            elif nombre == 'Tlalpan':
                dx, dy = -0.050, -0.035

            x, y = pt.x + dx, pt.y + dy

            # Rótulo principal en mayúsculas (mismo tono del borde agrícola, grande y nítido)
            ax.text(
                x, y + 0.013, nombre.upper(),
                fontsize=26, fontweight='bold', color='#381E0F',
                ha='center', va='center', zorder=8,
                path_effects=halo_agricola
            )
            # Rótulo de datos de temporal (porcentaje y superficie)
            ax.text(
                x, y - 0.013, f"{info['pct']} ({info['ha']})",
                fontsize=20, fontweight='bold', color='#1B4D22',
                ha='center', va='center', zorder=8,
                path_effects=halo_agricola
            )
        else:
            # Alcaldías urbanas en tono discreto pero legible
            col = '#7A6248'
            fs = 17
            is_sur = nombre in alcaldias_conservacion
            # Ajustes mínimos urbanos para evitar solapamientos
            dx, dy = 0.0, 0.0
            if nombre == 'Gustavo A. Madero':
                dy = -0.015
            elif nombre == 'Cuajimalpa de Morelos':
                dx, dy = -0.020, 0.012
            elif nombre == 'Álvaro Obregón':
                dx, dy = 0.010, -0.005
            elif nombre == 'Miguel Hidalgo':
                dx = -0.012
            elif nombre == 'Cuauhtémoc':
                dx = -0.005
            elif nombre == 'Venustiano Carranza':
                dx = 0.018
            ax.text(
                pt.x + dx, pt.y + dy, nombre,
                fontsize=fs, fontweight='bold' if is_sur else 'normal',
                color='#5C381E' if is_sur else col,
                ha='center', va='center', zorder=8,
                path_effects=halo_urbano
            )

    # 10. Cartela Cartográfica editorial sobria (estilo editorial sin globos redondeados)
    ax.text(
        bounds[0] + 0.012, bounds[3] - 0.022,
        "MODALIDAD HÍDRICA AGRÍCOLA EN LA CDMX\n>90% de la Superficie Cultivada es de Temporal",
        fontsize=24, fontweight='bold', color='#2F241D', linespacing=1.3,
        bbox=dict(boxstyle='square,pad=0.6', facecolor='#FAF7F0', edgecolor='#6E391F', linewidth=1.8, alpha=0.96),
        zorder=9
    )

    # 11. Leyenda Cartográfica oficial legible a distancia
    leyenda_parches = [
        mpatches.Patch(facecolor='#558252', edgecolor='#345732', linewidth=1.5, label='Agricultura de Temporal (91.6% · 12,180 ha)'),
        mpatches.Patch(facecolor='#E67E22', edgecolor='#78281F', linewidth=2.0, label='Zona de Estudio: Tulyehualco (1,661 ha)'),
        mpatches.Patch(facecolor='#F4ECE1', edgecolor='#D3C5B4', linewidth=1.2, label='Zona Urbana Consolidada (CDMX)'),
        mpatches.Patch(facecolor='none', edgecolor='#C97A3E', linestyle='--', linewidth=1.5, label='Curvas de nivel: Volcán Teuhtli'),
    ]
    leg = ax.legend(
        handles=leyenda_parches, loc='lower left', frameon=True,
        facecolor='#FAF7F0', edgecolor='#6E391F', fontsize=18, framealpha=0.96
    )
    leg.get_frame().set_linewidth(1.6)
    leg.set_zorder(9)

    plt.tight_layout(pad=0)

    # Guardar mapa en texturas de motion
    out_png = "motion/assets/textures/cdmx-mapa-temporal.png"
    plt.savefig(out_png, dpi=200, bbox_inches='tight', pad_inches=0, facecolor='#FAF7F0')
    plt.close()
    print(f"Mapa de agricultura de temporal generado con éxito en: {out_png}")

if __name__ == "__main__":
    generar_mapa_temporal()
