"""
Generador cartográfico definitivo para Cehuamilli Motion Design.
Produce un lienzo limpio en papel amate con los nombres de las delegaciones/alcaldías,
el Suelo de Conservación en verde milpa, y el polígono de Tulyehualco sin encimamientos,
permitiendo que Revideo maneje la tipografía animada, tarjetas y pines vectoriales.
"""
import json
import matplotlib.pyplot as plt
from matplotlib.patches import Circle as MplCircle
import geopandas as gpd
import pandas as pd

def generar_mapa_definitivo():
    # 1. Cargar capas de INEGI Marco Geoestadístico
    urb = gpd.read_file("data/ageb_urbano/ageb_urbano.shp").to_crs(epsg=4326)
    rur = gpd.read_file("data/ageb_rural/ageb_rural.shp").to_crs(epsg=4326)
    zona_estudio = gpd.read_file("motion/data/processed/tulyehualco_zona_estudio.geojson").to_crs(epsg=4326)

    # 2. Alcaldías oficiales consolidadas y contorno continuo de CDMX
    combined = pd.concat([urb[['CVE_MUN', 'geometry']], rur[['CVE_MUN', 'geometry']]])
    alcaldias = gpd.GeoDataFrame(combined, crs='EPSG:4326').dissolve(by='CVE_MUN').reset_index()
    contorno_cdmx = alcaldias.dissolve()

    # Bounding box con margen proporcional
    bounds = contorno_cdmx.total_bounds  # [minx, miny, maxx, maxy]
    pad_x = (bounds[2] - bounds[0]) * 0.05
    pad_y = (bounds[3] - bounds[1]) * 0.05
    xlim = (bounds[0] - pad_x, bounds[2] + pad_x)
    ylim = (bounds[1] - pad_y, bounds[3] + pad_y)

    # 3. Configurar figura Matplotlib con fondo de papel amate puro
    fig, ax = plt.subplots(figsize=(14, 16), dpi=200)
    fig.patch.set_facecolor('#FAF7F0')
    ax.set_facecolor('#FAF7F0')

    ax.set_xlim(xlim)
    ax.set_ylim(ylim)
    ax.set_aspect('equal')
    ax.axis('off')

    # 4. Capa 1: Toda la silueta de la CDMX (base urbana en amate claro)
    contorno_cdmx.plot(
        ax=ax,
        facecolor='#F7EFE2',
        edgecolor='#D8CABA',
        linewidth=0.8,
        zorder=1
    )

    # 5. Capa 2: Suelo de Conservación (AGEBs rurales de INEGI en verde milpa suave)
    rur.dissolve().plot(
        ax=ax,
        facecolor='#E2EBDC',
        edgecolor='#96B485',
        linewidth=0.7,
        alpha=0.85,
        zorder=2
    )

    # 6. Capa 3: Límites de Alcaldías
    for _, row in alcaldias.iterrows():
        gpd.GeoSeries([row['geometry']]).boundary.plot(
            ax=ax,
            color='#B5A48B',
            linewidth=0.7,
            linestyle='-',
            alpha=0.75,
            zorder=3
        )

    # Capa 4: Contorno exterior oficial de CDMX más firme
    contorno_cdmx.boundary.plot(
        ax=ax,
        color='#8C4D2E',
        linewidth=1.6,
        alpha=0.85,
        zorder=4
    )

    # 7. POLÍGONO DE LA ZONA DE ESTUDIO (Santiago Tulyehualco - 1,661 ha)
    # Dibujado con nitidez: relleno ámbar/terracota y perímetro marcado sin agujeros
    zona_estudio.plot(
        ax=ax,
        facecolor='#E67E22',
        edgecolor='#8C4D2E',
        linewidth=2.0,
        alpha=0.45,
        zorder=5
    )
    zona_estudio.boundary.plot(
        ax=ax,
        color='#8C4D2E',
        linewidth=2.2,
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

    # Marcador sutil del cráter
    ax.plot(tx, ty, marker='^', markersize=5, color='#8C4D2E', zorder=7)

    # 9. Nombres oficiales de las Alcaldías / Delegaciones
    NOMBRES = {
        '002': 'Azcapotzalco',
        '003': 'Coyoacán',
        '004': 'Cuajimalpa',
        '005': 'Gustavo A. Madero',
        '006': 'Iztacalco',
        '007': 'Iztapalapa',
        '008': 'M. Contreras',
        '009': 'Milpa Alta',
        '010': 'Álvaro Obregón',
        '011': 'Tláhuac',
        '012': 'Tlalpan',
        '013': 'Xochimilco',
        '014': 'Benito Juárez',
        '015': 'Cuauhtémoc',
        '016': 'Miguel Hidalgo',
        '017': 'V. Carranza'
    }
    alcaldias['NOM_ALC'] = alcaldias['CVE_MUN'].map(NOMBRES)

    # Offsets para balance óptico y evitar tocar la zona de estudio ni el volcán
    OFFSETS = {
        '011': (0.022, 0.008),   # Tláhuac: hacia el noreste para despejar Tulyehualco
        '013': (-0.018, 0.005),  # Xochimilco: hacia su zona urbana/lacustre
        '009': (0.000, -0.012),  # Milpa Alta: centrado en su amplio valle agrícola
        '012': (-0.008, 0.000),  # Tlalpan: centrado en su zona montañosa
        '007': (0.006, 0.002),   # Iztapalapa: centrado
        '005': (0.000, -0.025),  # GAM: bajar para no tocar la punta norte
        '002': (0.000, -0.006),  # Azcapotzalco
        '010': (-0.006, 0.000),  # Álvaro Obregón
        '004': (-0.005, 0.000),  # Cuajimalpa
        '008': (-0.004, -0.005), # Magdalena Contreras
    }

    for _, r in alcaldias.iterrows():
        cve = r['CVE_MUN']
        nombre = r['NOM_ALC']
        pt = r.geometry.representative_point()
        dx, dy = OFFSETS.get(cve, (0.0, 0.0))
        x, y = pt.x + dx, pt.y + dy

        is_sur = cve in ['009', '011', '012', '013', '007']
        # Tipografía a escala real para que sea nítida en proyección 1080p
        fs = 20 if is_sur else 15
        weight = 'bold'
        col = '#241710' if is_sur else '#4A3728'
        edge = '#8C4D2E' if is_sur else '#B8A890'
        lw = 1.2 if is_sur else 0.8

        ax.text(
            x, y, nombre.upper() if is_sur else nombre,
            fontsize=fs, fontweight=weight, color=col,
            ha='center', va='center', zorder=8,
            bbox=dict(
                boxstyle='round,pad=0.32',
                facecolor='#FAF7F0',
                edgecolor=edge,
                linewidth=lw,
                alpha=0.92
            )
        )

    plt.tight_layout(pad=0)

    # Obtener el bbox recortado real de la imagen guardada
    fig.canvas.draw()
    bbox = ax.get_tightbbox(fig.canvas.get_renderer())

    out_png = "motion/assets/textures/cdmx-mapa-referencia.png"
    plt.savefig(out_png, dpi=200, bbox_inches='tight', pad_inches=0, facecolor='#FAF7F0')
    plt.close()
    print(f"Mapa con delegaciones generado exitosamente en: {out_png}")

    # 10. Calcular coordenadas relativas exactas respecto al PNG guardado
    px, py = ax.transData.transform((tx, ty))
    rel_x = (px - bbox.x0) / bbox.width
    rel_y = (py - bbox.y0) / bbox.height
    teuhtli_norm_x = rel_x - 0.5
    teuhtli_norm_y = -(rel_y - 0.5)

    z_centroid = zona_estudio.geometry.iloc[0].centroid
    zx, zy = ax.transData.transform((z_centroid.x, z_centroid.y))
    z_rel_x = (zx - bbox.x0) / bbox.width
    z_rel_y = (zy - bbox.y0) / bbox.height
    tulye_norm_x = z_rel_x - 0.5
    tulye_norm_y = -(z_rel_y - 0.5)

    aspect_ratio = bbox.width / bbox.height

    coords_data = {
        "width_px": round(bbox.width),
        "height_px": round(bbox.height),
        "aspect_ratio": aspect_ratio,
        "teuhtli_norm": {"x": teuhtli_norm_x, "y": teuhtli_norm_y},
        "tulye_norm": {"x": tulye_norm_x, "y": tulye_norm_y},
        "area_hectareas": 1661.48
    }

    with open("motion/data/processed/cdmx-outline.json", "w", encoding="utf-8") as f:
        json.dump(coords_data, f, indent=2)

    print("Coordenadas normalizadas exactas:")
    print(f"  Dimensiones:  {coords_data['width_px']} x {coords_data['height_px']}")
    print(f"  Aspect ratio: {aspect_ratio:.4f}")
    print(f"  Teuhtli norm: x={teuhtli_norm_x:.4f}, y={teuhtli_norm_y:.4f}")
    print(f"  Tulye norm:   x={tulye_norm_x:.4f}, y={tulye_norm_y:.4f}")

if __name__ == "__main__":
    generar_mapa_definitivo()
