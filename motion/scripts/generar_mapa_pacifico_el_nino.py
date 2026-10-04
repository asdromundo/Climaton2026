"""
Generador cartográfico del Océano Pacífico Ecuatorial y el fenómeno de El Niño (NOAA).
Diseñado para la Toma 3 de Cehuamilli con estética de papel amate, geografía real de la cuenca
del Pacífico (América, Asia, Oceanía, México) y la anomalía térmica ecuatorial de El Niño.
"""
import matplotlib.pyplot as plt
import matplotlib.patches as mpatches
from matplotlib.patches import Polygon as MplPolygon, Rectangle as MplRectangle
import matplotlib.patheffects as pe
import geopandas as gpd
import pandas as pd
from shapely.geometry import box, Polygon, MultiPolygon
import numpy as np

def generar_mapa_pacifico():
    # 1. Cargar capas de Natural Earth
    land_path = "motion/data/ne_110m_land.geojson"
    countries_path = "motion/data/ne_110m_admin_0_countries.geojson"
    
    land = gpd.read_file(land_path)
    countries = gpd.read_file(countries_path)

    # 2. Transformación para centrar la cuenca del Pacífico:
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
    # Longitud: 110°E a 295° (65°W) -> 185 grados
    # Latitud: -38°S a +42°N -> 80 grados
    xlim = (112, 292)
    ylim = (-36, 40)

    view_box = box(xlim[0] - 5, ylim[0] - 5, xlim[1] + 5, ylim[1] + 5)
    pacific_land_clipped = pacific_land.clip(view_box)
    pacific_countries_clipped = pacific_countries.clip(view_box)

    # 3. Configurar figura Matplotlib 4K panorámica (1500 x 720 px en video)
    # Proporción aproximada 2.25:1
    fig, ax = plt.subplots(figsize=(18, 8.2), dpi=200)
    
    # Fondo oceánico con textura suave de papel amate oceánico
    ocean_color = '#E5EDF1'
    fig.patch.set_facecolor('#FAF7F0')
    ax.set_facecolor(ocean_color)

    ax.set_xlim(xlim)
    ax.set_ylim(ylim)
    ax.set_aspect(1.08) # Ligera compensación de latitud para proyección cilíndrica ecuatorial
    ax.axis('off')

    # 4. Red de coordenadas cartográficas (Graticule)
    # Líneas de latitud
    for lat, ls, col, lw, lbl in [
        (23.436, ':', '#8FA4B0', 1.0, '23.4° N · Trópico de Cáncer'),
        (0.0, '-', '#3A6B88', 1.6, 'ECUADOR  0°'),
        (-23.436, ':', '#8FA4B0', 1.0, '23.4° S · Trópico de Capricornio'),
    ]:
        ax.plot([xlim[0], xlim[1]], [lat, lat], linestyle=ls, color=col, linewidth=lw, zorder=2)
        if lbl:
            halo_grat = [pe.withStroke(linewidth=2.5, foreground=ocean_color)]
            ax.text(xlim[0] + 3, lat + 1.2, lbl, fontsize=9, color=col, fontweight='bold',
                    zorder=3, path_effects=halo_grat)

    # Líneas de longitud (Meridianos del Pacífico)
    meridianos = [
        (120, '120°E'), (140, '140°E'), (160, '160°E'),
        (180, '180° Antimeridiano'),
        (200, '160°W'), (220, '140°W'), (240, '120°W'),
        (260, '100°W'), (280, '80°W')
    ]
    for m, lbl in meridianos:
        ax.plot([m, m], [ylim[0], ylim[1]], linestyle=':', color='#AEC0CB', linewidth=0.75, zorder=2)
        ax.text(m, ylim[0] + 1.5, lbl, fontsize=8, color='#6C8594', ha='center', zorder=3,
                path_effects=[pe.withStroke(linewidth=2, foreground=ocean_color)])

    # 5. Capa de continentes (Suelo continental en papel amate claro)
    pacific_land_clipped.plot(
        ax=ax,
        facecolor='#F4EFE6',
        edgecolor='#B8A690',
        linewidth=0.9,
        zorder=4
    )

    # Límites de países con trazo fino
    pacific_countries_clipped.boundary.plot(
        ax=ax,
        color='#D0C0AA',
        linewidth=0.6,
        zorder=5
    )

    # Destacar a México con borde firme
    mexico = pacific_countries_clipped[pacific_countries_clipped['NAME'] == 'Mexico']
    if not mexico.empty:
        mexico.plot(
            ax=ax,
            facecolor='#EDE3D2',
            edgecolor='#6E391F',
            linewidth=1.6,
            zorder=6
        )

    # 6. ANOMALÍA TÉRMICA DE EL NIÑO (NOAA CPC)
    # Se modela la lengua cálida ecuatorial (SST Anomaly > +1.5°C a +3.0°C)
    # La mancha se extiende desde ~165°E (165) hasta la costa de Sudamérica (280) entre 7°S y 7°N
    x_grid = np.linspace(155, 285, 300)
    y_grid = np.linspace(-15, 15, 120)
    X, Y = np.meshgrid(x_grid, y_grid)

    # Función gaussiana alargada a lo largo del ecuador con núcleo centrado en Niño 3.4 / Niño 3 (lon ~225-245)
    # con elongación hacia el este (costa de Sudamérica)
    center_x = 230
    sigma_x = 38
    sigma_y = 5.2
    
    # Asimetría: se intensifica hacia el este
    asym = 1.0 + 0.35 * ((X - 160) / 120)
    anomaly = 2.8 * np.exp(-0.5 * (((X - center_x) / sigma_x)**2 + ((Y / sigma_y)**2))) * asym
    anomaly = np.clip(anomaly, 0, 3.5)

    # Contornos de anomalía térmica con gradiente amate (amarillo -> naranja -> terracota intenso)
    levels = [0.8, 1.4, 2.0, 2.6]
    contour_colors = ['#F9E79F', '#F39C12', '#E67E22', '#C0392B']
    
    # Rellenos translúcidos de la mancha cálida
    cf = ax.contourf(
        X, Y, anomaly,
        levels=[0.6, 1.2, 1.8, 2.4, 3.5],
        colors=['#FAD7A066', '#F5B04188', '#EB984EAA', '#E74C3CCC'],
        zorder=3
    )

    # Líneas de contorno térmico
    cs = ax.contour(
        X, Y, anomaly,
        levels=[1.0, 1.8, 2.5],
        colors=['#E67E22', '#D35400', '#922B21'],
        linewidths=[1.2, 1.6, 2.0],
        zorder=3
    )

    # 7. CAJA DE MONITOREO CLAVE: REGIÓN NIÑO 3.4 (NOAA)
    # Niño 3.4: 5°N a 5°S, 170°W a 120°W (en coordenadas: x de 190 a 240, y de -5 a +5)
    rect_nino34 = MplRectangle(
        (190, -5), 50, 10,
        fill=False,
        edgecolor='#78281F',
        linewidth=2.2,
        linestyle='--',
        zorder=7
    )
    ax.add_patch(rect_nino34)
    
    # Rótulo de la región Niño 3.4
    ax.text(
        215, 6.5, "REGIÓN NIÑO 3.4 (5°N–5°S, 170°W–120°W)",
        fontsize=10.5, fontweight='bold', color='#78281F', ha='center', va='bottom',
        path_effects=[pe.withStroke(linewidth=3, foreground='#FAF7F0')],
        zorder=8
    )
    ax.text(
        215, -6.5, "Índice de Monitoreo Clave · NOAA CPC",
        fontsize=9, fontweight='bold', color='#8C4D2E', ha='center', va='top',
        path_effects=[pe.withStroke(linewidth=2.5, foreground='#FAF7F0')],
        zorder=8
    )

    # Flechas indicadoras de la expansión hacia el este de las aguas cálidas
    ax.annotate(
        "", xy=(265, 0), xytext=(225, 0),
        arrowprops=dict(arrowstyle="->,head_width=0.6,head_length=0.8", color='#78281F', lw=2.5),
        zorder=8
    )
    ax.text(
        245, 1.8, "EXPANSIÓN CÁLIDA HACIA EL ESTE",
        fontsize=9.5, fontweight='bold', color='#78281F', ha='center',
        path_effects=[pe.withStroke(linewidth=3, foreground='#FAF7F0')],
        zorder=8
    )

    # 8. Rótulos de continentes y regiones geográficas
    halo_continente = [pe.withStroke(linewidth=3.5, foreground='#FAF7F0')]
    
    rotulos = [
        (272, 34, "AMÉRICA DEL NORTE", 13, '#4A3525'),
        (258, 26.5, "MÉXICO", 14, '#6E391F'),
        (282, -14, "AMÉRICA DEL SUR", 13, '#4A3525'),
        (283, -6, "Perú", 10, '#6E4828'),
        (126, 26, "ASIA", 14, '#4A3525'),
        (136, -24, "AUSTRALIA", 14, '#4A3525'),
        (122, -1, "INDONESIA", 10.5, '#5C432E'),
    ]
    for rx, ry, txt, fs, col in rotulos:
        ax.text(rx, ry, txt, fontsize=fs, fontweight='bold', color=col,
                ha='center', va='center', zorder=9, path_effects=halo_continente)

    # 9. PIN DE UBICACIÓN LOCAL: CDMX / SANTIAGO TULYEHUALCO
    # Lon: -99.03 -> 260.97, Lat: 19.25
    cdmx_x, cdmx_y = 260.97, 19.25
    ax.plot(cdmx_x, cdmx_y, marker='o', markersize=9, color='#C0392B',
            markeredgecolor='#FAF7F0', markeredgewidth=2, zorder=10)
    ax.plot(cdmx_x, cdmx_y, marker='o', markersize=16, color='#C0392B',
            fillstyle='none', markeredgewidth=1.8, linestyle=':', zorder=10)
    
    # Línea conector hacia el rótulo de CDMX
    ax.annotate(
        "● CDMX · Santiago Tulyehualco\n   (Zona de Estudio Cehuamilli)",
        xy=(cdmx_x, cdmx_y), xytext=(cdmx_x - 14, cdmx_y + 3.5),
        arrowprops=dict(arrowstyle="->", color='#78281F', lw=1.2, shrinkA=3, shrinkB=6),
        fontsize=10, fontweight='bold', color='#78281F', ha='right', va='center',
        path_effects=[pe.withStroke(linewidth=3.5, foreground='#FAF7F0')],
        zorder=10
    )

    # 10. Cartela Cartográfica Oficial (NOAA CPC) en la esquina superior izquierda
    ax.text(
        xlim[0] + 4, ylim[1] - 4,
        "MONITOREO DE EL NIÑO (ENSO) · PACÍFICO ECUATORIAL\n"
        "Anomalía de Temperatura Superficial del Mar (TSM) > +2.0 °C",
        fontsize=12.5, fontweight='bold', color='#2F241D', linespacing=1.35,
        bbox=dict(boxstyle='square,pad=0.6', facecolor='#FAF7F0', edgecolor='#6E391F', linewidth=1.8, alpha=0.96),
        zorder=10
    )

    # 11. Leyenda Cartográfica en la esquina inferior izquierda
    leyenda_parches = [
        mpatches.Patch(facecolor='#E74C3C', edgecolor='#922B21', linewidth=1.5, label='Lengua Cálida El Niño (TSM > +2.0 °C)'),
        mpatches.Patch(facecolor='none', edgecolor='#78281F', linestyle='--', linewidth=2.0, label='Región Niño 3.4 (Monitoreo NOAA)'),
        mpatches.Patch(facecolor='#EDE3D2', edgecolor='#6E391F', linewidth=1.5, label='México (Conexión climática ladera)'),
        mpatches.Patch(facecolor='#F4EFE6', edgecolor='#B8A690', linewidth=1.0, label='Cuenca Continental del Pacífico'),
    ]
    leg = ax.legend(
        handles=leyenda_parches, loc='lower left', frameon=True,
        facecolor='#FAF7F0', edgecolor='#6E391F', fontsize=10, framealpha=0.96
    )
    leg.get_frame().set_linewidth(1.6)
    leg.set_zorder(10)

    plt.tight_layout(pad=0)

    # Guardar en texturas de motion
    out_png = "motion/assets/textures/pacifico-el-nino.png"
    plt.savefig(out_png, dpi=200, bbox_inches='tight', pad_inches=0, facecolor='#FAF7F0')
    plt.close()
    print(f"Mapa del Pacífico y El Niño generado con éxito en: {out_png}")

if __name__ == "__main__":
    generar_mapa_pacifico()
