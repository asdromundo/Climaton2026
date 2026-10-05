"""
Generador de mapa PICTOGRÁFICO y CONCEPTUAL de la Cuenca del Pacífico y El Niño.
- Siluetas continentales suavizadas y redondeadas (estilo infografía de diseño / pictograma).
- Sin ruido de islas diminutas ni líneas de polígonos angulares.
- Cinta de corriente cálida ESBELTA (muy delgada, ~3° a 4° máx), con ondas marinas pictográficas.
- Íconos gráficos: sol/calor estilizado en Niño 3.4, brisa de alisios debilitados, volcán Teuhtli icónico.
- Arco de teleconexión limpio y sin saturación.
"""
import os
os.environ["MPLCONFIGDIR"] = "/tmp/mpl"

import matplotlib.pyplot as plt
import matplotlib.patches as mpatches
from matplotlib.patches import Polygon as MplPolygon, Rectangle as MplRectangle, FancyArrowPatch, Circle as MplCircle
import matplotlib.patheffects as pe
import geopandas as gpd
import pandas as pd
from shapely.geometry import box, Polygon, MultiPolygon
import numpy as np

def smooth_gdf(gdf, tol=0.35, buf=0.35, min_area=3.0):
    """Suaviza geometrías preservando curvas orgánicas y filtrando ruido de islas menores."""
    processed = []
    for geom in gdf.geometry:
        if geom is None or geom.is_empty:
            continue
        simp = geom.simplify(tol, preserve_topology=True)
        try:
            smoothed = simp.buffer(buf, resolution=12, join_style=1).buffer(-buf, resolution=12, join_style=1)
        except Exception:
            smoothed = simp
        
        if isinstance(smoothed, Polygon):
            if smoothed.area >= min_area:
                processed.append(smoothed)
        elif isinstance(smoothed, MultiPolygon):
            big_parts = [p for p in smoothed.geoms if p.area >= min_area]
            if big_parts:
                processed.append(MultiPolygon(big_parts))
    return gpd.GeoDataFrame(geometry=processed, crs=gdf.crs)

def generar_mapa_pictografico():
    # 1. Cargar capas de Natural Earth
    land_path = "motion/data/ne_110m_land.geojson"
    countries_path = "motion/data/ne_110m_admin_0_countries.geojson"
    
    land = gpd.read_file(land_path)
    countries = gpd.read_file(countries_path)

    # 2. Centrado en el Pacífico (+360 lon oeste)
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

    xlim = (112, 292)
    ylim = (-36, 40)

    view_box = box(xlim[0] - 5, ylim[0] - 5, xlim[1] + 5, ylim[1] + 5)
    pacific_land_clipped = pacific_land.clip(view_box)
    pacific_countries_clipped = pacific_countries.clip(view_box)

    # Suavizado pictográfico de masas terrestres
    land_smooth = smooth_gdf(pacific_land_clipped, tol=0.9, buf=0.7, min_area=4.0)

    # México en silueta redondeada y destacada
    mexico_raw = pacific_countries_clipped[pacific_countries_clipped['NAME'] == 'Mexico']
    mexico_smooth = smooth_gdf(mexico_raw, tol=0.7, buf=0.5, min_area=2.0)

    # 3. Lienzo editorial panorámico
    fig, ax = plt.subplots(figsize=(18, 8.65), dpi=200)
    
    # Fondo amate editorial suave
    ocean_color = '#F5F0E6'  # Arena / marfil sutil de papel amate
    fig.patch.set_facecolor('#FAF7F0')
    ax.set_facecolor(ocean_color)

    ax.set_xlim(xlim)
    ax.set_ylim(ylim)
    ax.set_aspect(1.06)
    ax.axis('off')

    # Marco exterior minimalista
    border_rect = MplRectangle(
        (xlim[0] + 0.5, ylim[0] + 0.5), (xlim[1] - xlim[0] - 1), (ylim[1] - ylim[0] - 1),
        fill=False, edgecolor='#DACDBA', linewidth=1.2, linestyle='-'
    )
    ax.add_patch(border_rect)

    # Eje ecuatorial pictográfico (línea guía limpia)
    ax.plot([xlim[0] + 2, xlim[1] - 2], [0, 0], linestyle='--', color='#C8B9A6', linewidth=1.2, zorder=2)
    halo_ocean = [pe.withStroke(linewidth=2.5, foreground=ocean_color)]
    ax.text(142, 1.2, "LÍNEA ECUATORIAL  (0°)", fontsize=9, color='#94816D', fontweight='bold', zorder=3, path_effects=halo_ocean)

    # 4. Continentes pictográficos (siluetas suaves, limpias y orgánicas)
    land_smooth.plot(
        ax=ax,
        facecolor='#EAE2D5',
        edgecolor='#C9BCA9',
        linewidth=1.2,
        zorder=4
    )

    # México resaltado en terracota amate
    if not mexico_smooth.empty:
        mexico_smooth.plot(
            ax=ax,
            facecolor='#DECDB8',
            edgecolor='#78281F',
            linewidth=2.0,
            zorder=6
        )

    # Rótulos continentales mínimos
    halo_cont = [pe.withStroke(linewidth=3, foreground=ocean_color)]
    ax.text(268, 34, "AMÉRICA DEL NORTE", fontsize=11, fontweight='bold', color='#7D6E5D', ha='center', zorder=7, path_effects=halo_cont)
    ax.text(257, 26, "MÉXICO", fontsize=13, fontweight='bold', color='#78281F', ha='center', zorder=7, path_effects=halo_cont)
    ax.text(280, -14, "AMÉRICA DEL SUR", fontsize=11, fontweight='bold', color='#7D6E5D', ha='center', zorder=7, path_effects=halo_cont)
    ax.text(126, 26, "ASIA", fontsize=11, fontweight='bold', color='#7D6E5D', ha='center', zorder=7, path_effects=halo_cont)
    ax.text(136, -24, "AUSTRALIA", fontsize=11, fontweight='bold', color='#7D6E5D', ha='center', zorder=7, path_effects=halo_cont)

    # =========================================================================
    # 5. REPRESENTACIÓN PICTOGRÁFICA DE EL NIÑO (ESBELTA Y ESTILIZADA)
    # =========================================================================

    # A. CINTA ESBELTA DE AGUAS CÁLIDAS (NO ISOTERMAS ANCHAS)
    # Máximo semi-ancho de 2.2 grados de latitud (en total ~4.4° de altura, elegante y fina)
    x_cinta = np.linspace(158, 280, 150)
    w_cinta = 2.2 * np.sin(np.pi * (x_cinta - 150) / 138)**0.75

    poly_cinta = np.vstack([
        np.column_stack([x_cinta, w_cinta]),
        np.column_stack([x_cinta[::-1], -w_cinta[::-1]])
    ])
    ax.add_patch(MplPolygon(
        poly_cinta, closed=True,
        facecolor='#F5B041', edgecolor='#E67E22',
        linewidth=1.2, alpha=0.32, zorder=5
    ))

    # B. ONDAS MARINAS PICTOGRÁFICAS (Flujo estilizado con flechas)
    for y_base, col, alpha, lw in [
        (0.8, '#D35400', 0.85, 1.6),
        (0.0, '#922B21', 0.95, 2.2),
        (-0.8, '#D35400', 0.85, 1.6),
    ]:
        x_wave = np.linspace(162, 276, 300)
        y_wave = y_base + 0.35 * np.sin(2 * np.pi * (x_wave - 160) / 22)
        ax.plot(x_wave, y_wave, color=col, linewidth=lw, alpha=alpha, zorder=6)

    # Flechas pictográficas de flujo oceánico en serie (indicando dirección hacia el este)
    flow_points = [(192, 0), (222, 0), (252, 0), (275, -0.6)]
    for fx, fy in flow_points:
        arrow = FancyArrowPatch(
            (fx - 10, fy), (fx + 5, fy),
            arrowstyle='-|>,head_length=8,head_width=5.5',
            color='#78281F', linewidth=2.6, zorder=8
        )
        ax.add_patch(arrow)

    # Rótulo conciso del flujo cálido centrado dentro del recuadro
    ax.text(
        215, 3.2, "Flujo cálido hacia el este (Onda Kelvin)",
        fontsize=9.2, fontweight='bold', color='#78281F', ha='center', va='bottom',
        path_effects=[pe.withStroke(linewidth=3, foreground=ocean_color)],
        zorder=9
    )
    ax.text(
        260, 3.2, "Hacia costas de Sudamérica",
        fontsize=8.5, fontweight='bold', color='#8C4D2E', ha='center', va='bottom',
        path_effects=[pe.withStroke(linewidth=2.8, foreground=ocean_color)],
        zorder=9
    )

    # C. PICTOGRAMA DE ALISIOS ATENUADOS (Brisa suave debilitada hacia el oeste)
    arrow_alisios = FancyArrowPatch(
        (202, -5.5), (170, -5.5),
        arrowstyle='-|>,head_length=6,head_width=4',
        color='#3A6B88', linewidth=1.6, linestyle=':', zorder=7
    )
    ax.add_patch(arrow_alisios)
    ax.text(
        186, -7.2, "Debilitamiento de vientos alisios",
        fontsize=8.5, fontweight='bold', color='#3A6B88', ha='center',
        path_effects=[pe.withStroke(linewidth=2.5, foreground=ocean_color)],
        zorder=8
    )

    # D. RECUADRO TÉCNICO PICTOGRÁFICO: REGIÓN NIÑO 3.4 (NOAA)
    # Cuadrante oficial: 5°N a 5°S, 170°W a 120°W (x: 190 a 240, y: -4.5 a 4.5)
    rect_nino34 = MplRectangle(
        (190, -4.6), 50, 9.2,
        fill=False,
        edgecolor='#78281F',
        linewidth=1.8,
        linestyle='--',
        zorder=7
    )
    ax.add_patch(rect_nino34)

    # Ícono pictográfico de sol térmico en el centro de Niño 3.4
    sun_x, sun_y = 205, 0
    # Halo solar
    sun_circle = MplCircle((sun_x, sun_y), 2.2, facecolor='#F5B04144', edgecolor='#E67E22', linewidth=1.2, zorder=6)
    ax.add_patch(sun_circle)
    # Núcleo solar
    sun_core = MplCircle((sun_x, sun_y), 1.0, facecolor='#C0392B', edgecolor='#78281F', linewidth=1.0, zorder=7)
    ax.add_patch(sun_core)

    ax.text(
        205, 5.8, "ZONA DE MONITOREO NIÑO 3.4 (NOAA)",
        fontsize=9.8, fontweight='bold', color='#78281F', ha='center', va='bottom',
        path_effects=[pe.withStroke(linewidth=3, foreground=ocean_color)],
        zorder=9
    )
    ax.text(
        215, -5.8, "Cuadrante oficial · 170°W a 120°W",
        fontsize=8.5, fontweight='bold', color='#8C4D2E', ha='center', va='top',
        path_effects=[pe.withStroke(linewidth=2.5, foreground=ocean_color)],
        zorder=9
    )

    # E. ARCO DE TELECONEXIÓN ATMOSFÉRICA HACIA MÉXICO
    cdmx_x, cdmx_y = 260.97, 19.25
    tele_arrow = FancyArrowPatch(
        (225, 4.6), (cdmx_x - 2.0, cdmx_y - 1.2),
        connectionstyle="arc3,rad=-0.22",
        arrowstyle='-|>,head_length=8.5,head_width=5.5',
        color='#78281F', linewidth=2.4, linestyle='--',
        zorder=9
    )
    ax.add_patch(tele_arrow)

    # Rótulo de teleconexión ubicado en aguas abiertas al suroeste de México
    ax.text(
        250, 10.5, "TELECONEXIÓN ATMOSFÉRICA\nAlteración del temporal en el centro de México",
        fontsize=9.5, fontweight='bold', color='#78281F', ha='center', va='top',
        linespacing=1.2,
        path_effects=[pe.withStroke(linewidth=3.5, foreground=ocean_color)],
        zorder=10
    )

    # F. PICTOGRAMA DE DESTINO: VOLCÁN TEUHTLI / TULYEHUALCO
    # Glifo icónico de montaña / volcán
    volcan_poly = np.array([
        [cdmx_x - 1.8, cdmx_y - 1.2],
        [cdmx_x + 1.8, cdmx_y - 1.2],
        [cdmx_x, cdmx_y + 1.8]
    ])
    ax.add_patch(MplPolygon(volcan_poly, closed=True, facecolor='#78281F', edgecolor='#FAF7F0', linewidth=1.5, zorder=10))
    ax.plot(cdmx_x, cdmx_y + 1.8, marker='o', markersize=5, color='#F5B041', zorder=11)

    ax.annotate(
        "▲ Volcán Teuhtli · Santiago Tulyehualco\n   (Zona de Estudio Cehuamilli)",
        xy=(cdmx_x, cdmx_y + 1.5), xytext=(cdmx_x - 7, cdmx_y + 5.5),
        arrowprops=dict(arrowstyle="->", color='#78281F', lw=1.3, shrinkA=3, shrinkB=6),
        fontsize=10, fontweight='bold', color='#78281F', ha='right', va='center',
        path_effects=[pe.withStroke(linewidth=3.5, foreground=ocean_color)],
        zorder=11
    )

    # 6. CARTELA INFOGRÁFICA PICTÓRICA
    ax.text(
        210, 32.5,
        "INFOGRAFÍA CONCEPTUAL · DINÁMICA DE EL NIÑO (ENSO)\n"
        "Esquema ilustrativo de teleconexión global a local\n"
        "Fuente: Discusión Diagnóstica · NOAA CPC",
        fontsize=11, fontweight='bold', color='#2F241D', linespacing=1.35, ha='center',
        bbox=dict(boxstyle='round,pad=0.6,rounding_size=0.3', facecolor='#FAF7F0', edgecolor='#8C7A65', linewidth=1.5, alpha=0.96),
        zorder=10
    )

    # 7. LEYENDA PICTOGRÁFICA LIMPIA
    leyenda_parches = [
        mpatches.Patch(facecolor='#F5B04188', edgecolor='#E67E22', linewidth=1.2,
                       label='Cinta de aguas cálidas (Representación ilustrativa)'),
        FancyArrowPatch((0, 0), (1, 0), color='#78281F', linewidth=2.0, arrowstyle='-|>',
                        label='Flujo hacia el este (Onda Kelvin)'),
        mpatches.Patch(facecolor='none', edgecolor='#78281F', linestyle='--', linewidth=1.5,
                       label='Zona de Monitoreo Niño 3.4 (NOAA)'),
        FancyArrowPatch((0, 0), (1, 0), color='#78281F', linewidth=2.0, linestyle='--', arrowstyle='-|>',
                        label='Teleconexión hacia el centro de México'),
        mpatches.Patch(facecolor='#78281F', edgecolor='#FAF7F0', linewidth=1.0,
                       label='▲ Volcán Teuhtli (Punto de estudio)'),
    ]
    leg = ax.legend(
        handles=leyenda_parches, loc='lower center', bbox_to_anchor=(0.56, 0.04),
        frameon=True, facecolor='#FAF7F0', edgecolor='#8C7A65', fontsize=8.8, framealpha=0.96,
        ncol=2
    )
    leg.get_frame().set_linewidth(1.3)
    leg.set_zorder(10)

    plt.tight_layout(pad=0)

    # Guardar textura
    out_png = "motion/assets/textures/pacifico-el-nino.png"
    plt.savefig(out_png, dpi=200, bbox_inches='tight', pad_inches=0, facecolor='#FAF7F0')
    plt.close()
    print("Mapa pictográfico generado con éxito en:", out_png)

if __name__ == "__main__":
    generar_mapa_pictografico()
