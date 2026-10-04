"""
Generador cartográfico ILUSTRATIVO del Océano Pacífico Ecuatorial y el fenómeno de El Niño.
Diseñado para la Toma 3 de Cehuamilli:
- Mapa base de alta calidad cartográfica (Natural Earth, estética papel amate).
- Representación conceptual e ilustrativa (sin mapas de calor simulados ni pseudoisotermas numéricas).
- Corredor ecuatorial cálido estilizado y flechas de flujo oceánico hacia el este (Onda Kelvin).
- Debilitamiento ilustrativo de los vientos alisios.
- Región de monitoreo oficial Niño 3.4 (5°N–5°S, 170°W–120°W) NOAA.
- Arco de teleconexión hacia el Altiplano Central de México (CDMX / Tulyehualco).
"""
import os
os.environ["MPLCONFIGDIR"] = "/tmp/mpl"

import matplotlib.pyplot as plt
import matplotlib.patches as mpatches
from matplotlib.patches import Polygon as MplPolygon, Rectangle as MplRectangle, FancyArrowPatch
import matplotlib.patheffects as pe
import geopandas as gpd
import pandas as pd
from shapely.geometry import box
import numpy as np

def generar_mapa_ilustrativo():
    # 1. Cargar capas de Natural Earth
    land_path = "motion/data/ne_110m_land.geojson"
    countries_path = "motion/data/ne_110m_admin_0_countries.geojson"
    
    land = gpd.read_file(land_path)
    countries = gpd.read_file(countries_path)

    # 2. Centrado en la Cuenca del Pacífico:
    # Dividir y desplazar longitudes negativas (-180 a 0) sumando +360 (se vuelven 180 a 360).
    bbox_east = box(0, -90, 180, 90)
    bbox_west = box(-180, -90, 0, 90)

    def shift_to_pacific(gdf):
        east = gdf.clip(bbox_east)
        west = gdf.clip(bbox_west)
        west_shifted = west.copy()
        west_shifted['geometry'] = west_shifted['geometry'].translate(xoff=360)
        combined = pd.concat([east, west_shifted], ignore_index=True)
        return gpd.GeoDataFrame(combined, crs=gdf.crs)

    pacific_land = shift_to_pacific(land)
    pacific_countries = shift_to_pacific(countries)

    # Ventana de visualización de la Cuenca del Pacífico:
    # Longitud: 112°E a 292° (68°W) -> 180 grados
    # Latitud: -36°S a +40°N -> 76 grados
    xlim = (112, 292)
    ylim = (-36, 40)

    view_box = box(xlim[0] - 5, ylim[0] - 5, xlim[1] + 5, ylim[1] + 5)
    pacific_land_clipped = pacific_land.clip(view_box)
    pacific_countries_clipped = pacific_countries.clip(view_box)

    # 3. Configurar figura Matplotlib 4K panorámica (proporción ~1540 x 740)
    fig, ax = plt.subplots(figsize=(18, 8.65), dpi=200)
    
    # Fondo oceánico amate
    ocean_color = '#E7EDF2'
    fig.patch.set_facecolor('#FAF7F0')
    ax.set_facecolor(ocean_color)

    ax.set_xlim(xlim)
    ax.set_ylim(ylim)
    ax.set_aspect(1.06)
    ax.axis('off')

    # 4. Graticule cartográfica
    for lat, ls, col, lw in [
        (23.436, ':', '#8FA4B0', 1.0),
        (0.0, '-', '#3A6B88', 1.8),
        (-23.436, ':', '#8FA4B0', 1.0),
    ]:
        ax.plot([xlim[0], xlim[1]], [lat, lat], linestyle=ls, color=col, linewidth=lw, zorder=2)

    halo_grat = [pe.withStroke(linewidth=2.8, foreground=ocean_color)]
    ax.text(175, 23.436 + 1.2, "23.4° N · Trópico de Cáncer", fontsize=9, color='#708998', fontweight='bold', zorder=3, path_effects=halo_grat)
    ax.text(175, 0.0 + 1.2, "ECUADOR · 0°", fontsize=9.5, color='#2C5B77', fontweight='bold', zorder=3, path_effects=halo_grat)
    ax.text(175, -23.436 + 1.2, "23.4° S · Trópico de Capricornio", fontsize=9, color='#708998', fontweight='bold', zorder=3, path_effects=halo_grat)

    # Meridianos
    meridianos = [
        (120, '120°E'), (140, '140°E'), (160, '160°E'),
        (180, '180° Antimeridiano'),
        (200, '160°W'), (220, '140°W'), (240, '120°W'),
        (260, '100°W'), (280, '80°W')
    ]
    for m, lbl in meridianos:
        ax.plot([m, m], [ylim[0], ylim[1]], linestyle=':', color='#BDCEDB', linewidth=0.75, zorder=2)
        ax.text(m, ylim[0] + 2.5, lbl, fontsize=8.5, color='#6C8594', ha='center', zorder=3,
                path_effects=[pe.withStroke(linewidth=2.2, foreground=ocean_color)])

    # 5. Capa de continentes
    pacific_land_clipped.plot(
        ax=ax,
        facecolor='#F4EFE6',
        edgecolor='#B8A690',
        linewidth=0.9,
        zorder=4
    )

    pacific_countries_clipped.boundary.plot(
        ax=ax,
        color='#D4C5B0',
        linewidth=0.6,
        zorder=5
    )

    # México resaltado en terracota y tono arena
    mexico = pacific_countries_clipped[pacific_countries_clipped['NAME'] == 'Mexico']
    if not mexico.empty:
        mexico.plot(
            ax=ax,
            facecolor='#EDE2D0',
            edgecolor='#6E391F',
            linewidth=1.8,
            zorder=6
        )

    # Rótulos continentales
    halo_continente = [pe.withStroke(linewidth=3.5, foreground='#FAF7F0')]
    rotulos = [
        (273, 34, "AMÉRICA DEL NORTE", 12.5, '#4A3525'),
        (257, 26, "MÉXICO", 14, '#6E391F'),
        (282, -14, "AMÉRICA DEL SUR", 12.5, '#4A3525'),
        (282.5, -5.5, "Perú", 9.5, '#6E4828'),
        (126, 26, "ASIA", 13, '#4A3525'),
        (136, -24, "AUSTRALIA", 13, '#4A3525'),
        (122, -1, "INDONESIA", 10, '#5C432E'),
    ]
    for rx, ry, txt, fs, col in rotulos:
        ax.text(rx, ry, txt, fontsize=fs, fontweight='bold', color=col,
                ha='center', va='center', zorder=7, path_effects=halo_continente)

    # =========================================================================
    # 6. REPRESENTACIÓN ILUSTRATIVA Y CONCEPTUAL DE EL NIÑO (ENSO)
    # (Completamente honesta, sin falsas isotermas ni mapas de calor simulados)
    # =========================================================================

    # A. Corredor conceptual de acumulación de aguas cálidas (Franja Ecuatorial)
    x_curve = np.linspace(155, 281, 100)
    half_width_outer = 6.6 * np.sin(np.pi * (x_curve - 150) / 135)**0.65
    half_width_inner = 4.0 * np.sin(np.pi * (x_curve - 150) / 135)**0.65

    # Franja exterior cálida (halo suave ámbar)
    poly_outer = np.vstack([
        np.column_stack([x_curve, half_width_outer]),
        np.column_stack([x_curve[::-1], -half_width_outer[::-1]])
    ])
    ax.add_patch(MplPolygon(
        poly_outer, closed=True,
        facecolor='#F5B041', edgecolor='#E67E22',
        linewidth=1.2, linestyle='--', alpha=0.30, zorder=3
    ))

    # Franja interior núcleo cálido
    poly_inner = np.vstack([
        np.column_stack([x_curve, half_width_inner]),
        np.column_stack([x_curve[::-1], -half_width_inner[::-1]])
    ])
    ax.add_patch(MplPolygon(
        poly_inner, closed=True,
        facecolor='#EB984E', edgecolor='#C0392B',
        linewidth=1.3, alpha=0.40, zorder=3
    ))

    # B. Flechas de corriente oceánica anómala hacia el este (Onda Kelvin / Flujo cálido)
    flow_arrows = [
        (170, 0.0, 192, 0.0),
        (200, 0.0, 230, 0.0),
        (242, 0.0, 268, 0.0),
        (272, -1.5, 281, -1.5),
    ]
    for x1, y1, x2, y2 in flow_arrows:
        arrow = FancyArrowPatch(
            (x1, y1), (x2, y2),
            arrowstyle='-|>,head_length=8,head_width=5.5',
            color='#922B21', linewidth=2.6, zorder=8
        )
        ax.add_patch(arrow)

    # Rótulo del flujo cálido centrado dentro de la región de monitoreo
    ax.text(
        215, 2.3, "FLUJO ANÓMALO DE AGUAS CÁLIDAS HACIA EL ESTE",
        fontsize=9, fontweight='bold', color='#78281F', ha='center', va='bottom',
        path_effects=[pe.withStroke(linewidth=3, foreground='#FAF7F0')],
        zorder=9
    )
    # Rótulo de continuación hacia Sudamérica
    ax.text(
        260, 2.3, "Onda Kelvin hacia Sudamérica",
        fontsize=8.5, fontweight='bold', color='#8C4D2E', ha='center', va='bottom',
        path_effects=[pe.withStroke(linewidth=2.8, foreground='#FAF7F0')],
        zorder=9
    )

    # C. Indicador ilustrativo de debilitamiento de los vientos alisios
    arrow_alisios = FancyArrowPatch(
        (204, -8.5), (170, -8.5),
        arrowstyle='-|>,head_length=6,head_width=4',
        color='#3A6B88', linewidth=1.8, linestyle=':', zorder=8
    )
    ax.add_patch(arrow_alisios)
    ax.text(
        187, -10.3, "Debilitamiento de Vientos Alisios del Este",
        fontsize=8.5, fontweight='bold', color='#3A6B88', ha='center',
        path_effects=[pe.withStroke(linewidth=2.5, foreground=ocean_color)],
        zorder=8
    )

    # D. RECUADRO OFICIAL DE MONITOREO: REGIÓN NIÑO 3.4 (NOAA CPC)
    # Coordenadas exactas estándar internacional: 5°N a 5°S, 170°W a 120°W
    rect_nino34 = MplRectangle(
        (190, -5), 50, 10,
        fill=True,
        facecolor='#C0392B12',
        edgecolor='#78281F',
        linewidth=2.2,
        linestyle='--',
        zorder=7
    )
    ax.add_patch(rect_nino34)
    
    # Rótulo de Niño 3.4 situado hacia la izquierda para despejar el punto de teleconexión
    ax.text(
        205, 6.4, "REGIÓN NIÑO 3.4 (NOAA CPC)",
        fontsize=10, fontweight='bold', color='#78281F', ha='center', va='bottom',
        path_effects=[pe.withStroke(linewidth=3, foreground='#FAF7F0')],
        zorder=9
    )
    # Rótulo de coordenadas POR DEBAJO del recuadro
    ax.text(
        215, -6.4, "Zona oficial de referencia climática · 5°N–5°S, 170°W–120°W",
        fontsize=8.5, fontweight='bold', color='#8C4D2E', ha='center', va='top',
        path_effects=[pe.withStroke(linewidth=2.5, foreground='#FAF7F0')],
        zorder=9
    )

    # E. ARCO DE TELECONEXIÓN ATMOSFÉRICA HACIA MÉXICO (Altiplano Central)
    cdmx_x, cdmx_y = 260.97, 19.25
    tele_arrow = FancyArrowPatch(
        (226, 5.0), (cdmx_x - 1.8, cdmx_y - 1.2),
        connectionstyle="arc3,rad=-0.22",
        arrowstyle='-|>,head_length=8.5,head_width=5.5',
        color='#78281F', linewidth=2.5, linestyle='--',
        zorder=9
    )
    ax.add_patch(tele_arrow)

    # Rótulo de teleconexión ubicado en aguas abiertas al suroeste de México
    ax.text(
        250, 10.2, "TELECONEXIÓN ATMOSFÉRICA\nAlteración del temporal en el centro de México",
        fontsize=9.5, fontweight='bold', color='#78281F', ha='center', va='top',
        linespacing=1.2,
        path_effects=[pe.withStroke(linewidth=3.5, foreground='#FAF7F0')],
        zorder=10
    )

    # F. PIN LOCAL: CDMX / SANTIAGO TULYEHUALCO (ZONA DE ESTUDIO)
    ax.plot(cdmx_x, cdmx_y, marker='o', markersize=9, color='#C0392B',
            markeredgecolor='#FAF7F0', markeredgewidth=2, zorder=10)
    ax.plot(cdmx_x, cdmx_y, marker='o', markersize=16, color='#C0392B',
            fillstyle='none', markeredgewidth=1.8, linestyle=':', zorder=10)

    ax.annotate(
        "● CDMX · Santiago Tulyehualco\n   (Zona de Estudio Cehuamilli · Faldas del Teuhtli)",
        xy=(cdmx_x, cdmx_y), xytext=(cdmx_x - 7, cdmx_y + 4.2),
        arrowprops=dict(arrowstyle="->", color='#78281F', lw=1.4, shrinkA=3, shrinkB=6),
        fontsize=10, fontweight='bold', color='#78281F', ha='right', va='center',
        path_effects=[pe.withStroke(linewidth=3.5, foreground='#FAF7F0')],
        zorder=10
    )

    # 7. CARTELA OFICIAL (En el Pacífico Norte Central, despejada y visible)
    cartela_x = 212
    cartela_y = 33
    ax.text(
        cartela_x, cartela_y,
        "ESQUEMA CONCEPTUAL · DINÁMICA DE EL NIÑO (ENSO)\n"
        "Representación ilustrativa de teleconexión océano-atmósfera\n"
        "Fuente: Discusión Diagnóstica ENSO · NOAA CPC",
        fontsize=11.5, fontweight='bold', color='#2F241D', linespacing=1.35, ha='center',
        bbox=dict(boxstyle='square,pad=0.7', facecolor='#FAF7F0', edgecolor='#6E391F', linewidth=1.8, alpha=0.96),
        zorder=10
    )

    # 8. LEYENDA CARTOGRÁFICA ILUSTRATIVA (En el Pacífico Sur Central, libre de obstrucciones)
    leyenda_parches = [
        mpatches.Patch(facecolor='#F5B04188', edgecolor='#C0392B', linewidth=1.5, linestyle='--',
                       label='Franja cálida ecuatorial (Esquema ilustrativo)'),
        FancyArrowPatch((0, 0), (1, 0), color='#922B21', linewidth=2.0, arrowstyle='-|>',
                        label='Flujo de aguas cálidas hacia el este'),
        mpatches.Patch(facecolor='#C0392B14', edgecolor='#78281F', linestyle='--', linewidth=1.8,
                       label='Región Niño 3.4 (Monitoreo oficial NOAA)'),
        FancyArrowPatch((0, 0), (1, 0), color='#78281F', linewidth=2.0, linestyle='--', arrowstyle='-|>',
                        label='Teleconexión hacia el centro de México'),
        mpatches.Patch(facecolor='#EDE2D0', edgecolor='#6E391F', linewidth=1.5,
                       label='México (Zona receptora de impacto)'),
    ]
    leg = ax.legend(
        handles=leyenda_parches, loc='lower center', bbox_to_anchor=(0.56, 0.05),
        frameon=True, facecolor='#FAF7F0', edgecolor='#6E391F', fontsize=9.2, framealpha=0.96,
        ncol=2
    )
    leg.get_frame().set_linewidth(1.5)
    leg.set_zorder(10)

    plt.tight_layout(pad=0)

    # Guardar en textura oficial
    out_png = "motion/assets/textures/pacifico-el-nino.png"
    plt.savefig(out_png, dpi=200, bbox_inches='tight', pad_inches=0, facecolor='#FAF7F0')
    plt.close()
    print(f"Mapa ilustrativo generado con éxito en: {out_png}")

if __name__ == "__main__":
    generar_mapa_ilustrativo()
