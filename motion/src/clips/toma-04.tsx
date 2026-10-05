import {
  makeScene2D,
  Node,
  Audio,
  Rect,
  Txt,
  Circle,
  Path,
  Img,
} from "@revideo/2d";
import {
  all,
  createRef,
  easeInOutCubic,
  easeOutBack,
  easeOutCubic,
  waitFor,
} from "@revideo/core";
import { THEME } from "../theme";
import { VideoPlaceholder } from "../components/VideoPlaceholder";

import audioParrafo4 from "../../audio/parrafo4.m4a";
import equipoCehuamilliTexture from "../../assets/textures/toma-04-equipo-cehuamilli.jpeg";

/**
 * TOMA 4 MAESTRA · 38.76 s
 * Sincronización continua con parrafo4.m4a
 *
 * Estructura:
 * 1. [0.0s – 4.5s]:   IMAGEN REAL ANIMADA 1 (Equipo Cehuamilli interdisciplinario)
 * 2. [4.5s – 12.5s]:  INS-06 (Perfil del Teuhtli + estaciones a distintas alturas)
 * 3. [12.5s – 14.2s]: TOMA REAL 2 (Prototipos y herramientas auxiliares)
 * 4. [14.2s – 25.5s]: INS-07 (Alerta que baja por la ladera + celular genérico + inundación)
 * 5. [25.5s – 27.0s]: TOMA REAL 3 (Familias y campos)
 * 6. [27.0s – 34.0s]: INS-08 (Vacío que se llena de datos + planta brotando)
 * 7. [34.0s – 38.76s]: TOMA REAL 4 (Toma de decisiones y resiliencia comunitaria)
 */
export default makeScene2D("toma-04", function* (view) {
  view.fill(THEME.colors.paper.cream);

  const footage1Node = createRef<Node>();
  const equipoCameraNode = createRef<Node>();
  const pinPulseRef = createRef<Circle>();
  const ins06Node = createRef<Node>();
  const footage2Node = createRef<Node>();
  const ins07Node = createRef<Node>();
  const footage3Node = createRef<Node>();
  const ins08Node = createRef<Node>();
  const footage4Node = createRef<Node>();

  // Elementos INS-06 (Estaciones a distintas alturas)
  const mountainProfile = createRef<Path>();
  const station1 = createRef<Node>();
  const station2 = createRef<Node>();
  const station3 = createRef<Node>();
  const badgesNode = createRef<Node>();

  // Elementos INS-07 (Alerta baja por la ladera)
  const alertStation = createRef<Circle>();
  const alertPulse = createRef<Circle>();
  const phoneMockup = createRef<Rect>();
  const floodWater = createRef<Path>();

  // Elementos INS-08 (Datos climáticos locales + frutos de decisión)
  const dataReveal = createRef<Rect>();
  const metricCardsNode = createRef<Node>();
  const plantStem = createRef<Rect>();
  const plantLeaf1 = createRef<Path>();
  const plantLeaf2 = createRef<Path>();
  const plantLeaf3 = createRef<Path>();
  const plantFlower = createRef<Node>();
  const decisionCard1 = createRef<Node>();
  const decisionCard2 = createRef<Node>();
  const decisionCard3 = createRef<Node>();

  view.add(
    <Node>
      {/* Audio maestro continuo de la Toma 4 */}
      <Audio src={audioParrafo4} play={true} />

      {/* 1. Capa Imagen Real 1 (Equipo Cehuamilli interdisciplinario) */}
      <Node ref={footage1Node} opacity={1}>
        <Node ref={equipoCameraNode} position={[0, 10]} scale={1.02}>
          <Img
            src={equipoCehuamilliTexture}
            width={1920}
            height={1080}
            position={[0, 0]}
          />
          {/* Pulsar / halo vivo sobre el pin del volcán Teuhtli */}
          <Circle
            ref={pinPulseRef}
            position={[706, 132]}
            size={36}
            stroke={THEME.colors.earth.terracotta}
            lineWidth={2.5}
            opacity={0.85}
            scale={1}
          />
        </Node>
      </Node>

      {/* 2. Capa INS-06 (Estaciones a distintas alturas) */}
      <Node ref={ins06Node} opacity={0}>
        <Rect
          width={1600}
          height={760}
          fill={THEME.colors.paper.amateLight}
          stroke={THEME.colors.earth.ochre}
          lineWidth={2.5}
          radius={20}
          position={[0, -20]}
          padding={[40, 50]}
          clip={true}
        >
          <Txt
            text="ECOSISTEMA DE MONITOREO AGROMETEOROLÓGICO"
            position={[0, -320]}
            fill={THEME.colors.earth.terracotta}
            fontFamily={THEME.typography.serif}
            fontSize={42}
            fontWeight={700}
            letterSpacing={3}
          />
          <Txt
            text="Estaciones en distintas alturas del volcán Teuhtli"
            position={[0, -275]}
            fill={THEME.colors.earth.warmClay}
            fontFamily={THEME.typography.sans}
            fontSize={28}
            fontWeight={600}
          />

          {/* Perfil lateral del Volcán Teuhtli */}
          <Path
            ref={mountainProfile}
            data="M -750,260 C -450,260 -300,180 -100,-40 C -40,-110 40,-110 100,-40 C 300,180 450,260 750,260"
            stroke={THEME.colors.earth.deep}
            lineWidth={4}
          />

          {/* Sombra de la ladera */}
          <Path
            data="M -750,260 C -450,260 -300,180 -100,-40 C -40,-110 40,-110 100,-40 C 300,180 450,260 750,260 L 750,380 L -750,380 Z"
            fill={`${THEME.colors.earth.terracotta}14`}
          />

          {/* Estación 1: Base / Tulyehualco */}
          <Node ref={station1} position={[-420, 220]} opacity={0} scale={0}>
            <Circle size={28} fill={THEME.colors.milpa.deepGreen} />
            <Rect
              position={[0, -70]}
              width={360}
              height={86}
              fill={THEME.colors.paper.cream}
              stroke={THEME.colors.milpa.leaf}
              lineWidth={2}
              radius={14}
              padding={[10, 16]}
            >
              <Txt
                text="Base"
                position={[0, -16]}
                fill={THEME.colors.earth.deep}
                fontFamily={THEME.typography.mono}
                fontSize={22}
                fontWeight={700}
              />
              <Txt
                text="Temp: 22°C · Hum: 65%"
                position={[0, 16]}
                fill={THEME.colors.earth.warmClay}
                fontFamily={THEME.typography.mono}
                fontSize={18}
                fontWeight={600}
              />
            </Rect>
          </Node>

          {/* Estación 2: Ladera Media / Parcelas de Temporal */}
          <Node ref={station2} position={[-200, 120]} opacity={0} scale={0}>
            <Circle size={28} fill={THEME.colors.milpa.deepGreen} />
            <Rect
              position={[0, -70]}
              width={360}
              height={86}
              fill={THEME.colors.paper.cream}
              stroke={THEME.colors.milpa.leaf}
              lineWidth={2}
              radius={14}
              padding={[10, 16]}
            >
              <Txt
                text="Ladera Media"
                position={[0, -16]}
                fill={THEME.colors.earth.deep}
                fontFamily={THEME.typography.mono}
                fontSize={22}
                fontWeight={700}
              />
              <Txt
                text="Lluvia: 12 mm · Viento: 18 km/h"
                position={[0, 16]}
                fill={THEME.colors.climate.rainBlue}
                fontFamily={THEME.typography.mono}
                fontSize={18}
                fontWeight={600}
              />
            </Rect>
          </Node>

          {/* Estación 3: Ladera alta del Teuhtli */}
          <Node ref={station3} position={[-100, 0]} opacity={0} scale={0}>
            <Circle
              size={32}
              fill={THEME.colors.earth.terracotta}
              stroke={THEME.colors.paper.cream}
              lineWidth={2.5}
            />
            <Rect
              position={[0, -74]}
              width={360}
              height={86}
              fill={THEME.colors.paper.cream}
              stroke={THEME.colors.earth.terracotta}
              lineWidth={2}
              radius={14}
              padding={[10, 16]}
            >
              <Txt
                text="Ladera alta"
                position={[0, -16]}
                fill={THEME.colors.earth.deep}
                fontFamily={THEME.typography.mono}
                fontSize={22}
                fontWeight={700}
              />
              <Txt
                text="Ráfagas: 38 km/h · Presión: 740 hPa"
                position={[0, 16]}
                fill={THEME.colors.earth.terracotta}
                fontFamily={THEME.typography.mono}
                fontSize={18}
                fontWeight={600}
              />
            </Rect>
          </Node>

          {/* Rótulos clave: Costo accesible + Mantenimiento viable */}
          <Node ref={badgesNode} position={[420, -160]} opacity={0}>
            <Rect
              width={460}
              height={136}
              fill={THEME.colors.paper.cream}
              stroke={THEME.colors.earth.ochre}
              lineWidth={2}
              radius={16}
              padding={[20, 24]}
            >
              <Txt
                text="✓ Costo accesible"
                position={[-190, -24]}
                fill={THEME.colors.milpa.deepGreen}
                fontFamily={THEME.typography.sans}
                fontSize={26}
                fontWeight={700}
                offset={[-1, 0]}
              />
              <Txt
                text="✓ Mantenimiento viable para la comunidad"
                position={[-190, 24]}
                fill={THEME.colors.earth.deep}
                fontFamily={THEME.typography.sans}
                fontSize={22}
                fontWeight={600}
                offset={[-1, 0]}
              />
            </Rect>
          </Node>
        </Rect>
      </Node>

      {/* 3. Capa Toma Real 2 */}
      <Node ref={footage2Node} opacity={0}>
        <VideoPlaceholder
          title="Prototipos y herramientas auxiliares"
          cue="Son una herramienta auxiliar..."
          suggestedFile="toma-04-prototipo-sensores.mp4"
          durationSeconds={1.7}
        />
      </Node>

      {/* 4. Capa INS-07 (La alerta baja por la ladera) */}
      <Node ref={ins07Node} opacity={0}>
        <Rect
          width={1600}
          height={760}
          fill={THEME.colors.paper.amateLight}
          stroke={THEME.colors.earth.ochre}
          lineWidth={2.5}
          radius={20}
          position={[0, -20]}
          padding={[40, 50]}
          clip={true}
        >
          <Txt
            text="RED DE ALERTA COMUNITARIA ANTE EXTREMOS"
            position={[0, -320]}
            fill={THEME.colors.climate.droughtOrange}
            fontFamily={THEME.typography.serif}
            fontSize={42}
            fontWeight={700}
            letterSpacing={3}
          />

          {/* Perfil Teuhtli */}
          <Path
            data="M -750,260 C -450,260 -300,180 -100,-40 C -40,-110 40,-110 100,-40 C 300,180 450,260 750,260"
            stroke={THEME.colors.earth.deep}
            lineWidth={3.5}
          />

          {/* Estación detectando evento extremo en la ladera alta */}
          <Circle
            ref={alertStation}
            position={[-100, -40]}
            size={34}
            fill={THEME.colors.status.pending}
          />
          <Circle
            ref={alertPulse}
            position={[-100, -40]}
            size={34}
            stroke={THEME.colors.status.pending}
            lineWidth={3.5}
            opacity={0}
          />

          {/* Flujo de escorrentía / inundación ladera abajo */}
          <Path
            ref={floodWater}
            data="M -100,-20 Q -240,120 -500,260"
            stroke={THEME.colors.climate.rainBlue}
            lineWidth={0}
            opacity={0.8}
          />

          {/* Casitas iluminadas en la parte baja */}
          <Node position={[-520, 240]}>
            <Rect
              width={40}
              height={35}
              fill={THEME.colors.earth.warmClay}
              radius={4}
              position={[-50, 0]}
            />
            <Path
              data="M -75,-17 L -50,-40 L -25,-17 Z"
              fill={THEME.colors.earth.terracotta}
            />
            <Circle size={10} position={[-50, 0]} fill="#FFE57F" />

            <Rect
              width={40}
              height={35}
              fill={THEME.colors.earth.warmClay}
              radius={4}
              position={[20, 0]}
            />
            <Path
              data="M -5,-17 L 20,-40 L 45,-17 Z"
              fill={THEME.colors.earth.terracotta}
            />
            <Circle size={10} position={[20, 0]} fill="#FFE57F" />

            <Txt
              text="Parte baja del cerro · Zonas inundables"
              position={[-15, 45]}
              fill={THEME.colors.earth.deep}
              fontFamily={THEME.typography.sans}
              fontSize={22}
              fontWeight={700}
            />
          </Node>

          {/* Mockup de teléfono móvil con burbuja de chat genérica */}
          <Rect
            ref={phoneMockup}
            position={[400, 30]}
            width={360}
            height={540}
            fill={THEME.colors.paper.cream}
            stroke={THEME.colors.earth.deep}
            lineWidth={4}
            radius={32}
            padding={[24, 20]}
            shadowColor={`${THEME.colors.earth.dark}25`}
            shadowBlur={25}
            opacity={0}
            y={80}
          >
            {/* Cabecera del teléfono */}
            <Rect
              width={120}
              height={18}
              fill={THEME.colors.earth.deep}
              radius={9}
              position={[0, -240]}
            />
            <Txt
              text="AVISO CLIMÁTICO"
              position={[0, -190]}
              fill={THEME.colors.earth.deep}
              fontFamily={THEME.typography.sans}
              fontSize={22}
              fontWeight={700}
            />

            {/* Burbuja de alerta genérica */}
            <Rect
              position={[0, -70]}
              width={310}
              height={150}
              fill={`${THEME.colors.climate.droughtOrange}22`}
              stroke={THEME.colors.climate.droughtOrange}
              lineWidth={2.5}
              radius={16}
              padding={[16, 18]}
            >
              <Txt
                text="⚠️ ALERTA METEOROLÓGICA"
                position={[-135, -48]}
                fill={THEME.colors.climate.droughtOrange}
                fontFamily={THEME.typography.sans}
                fontSize={18}
                fontWeight={700}
                offset={[-1, 0]}
              />
              <Rect
                width={260}
                height={12}
                fill={THEME.colors.earth.deep}
                radius={6}
                position={[-135, -10]}
                offset={[-1, 0]}
              />
              <Rect
                width={210}
                height={12}
                fill={THEME.colors.earth.warmClay}
                radius={6}
                position={[-135, 18]}
                offset={[-1, 0]}
              />
              <Rect
                width={150}
                height={12}
                fill={THEME.colors.earth.ochre}
                radius={6}
                position={[-135, 46]}
                offset={[-1, 0]}
              />
            </Rect>

            <Txt
              text="Para familias y productores"
              position={[0, 165]}
              fill={THEME.colors.earth.warmClay}
              fontFamily={THEME.typography.sans}
              fontSize={26}
              fontWeight={700}
            />
          </Rect>
        </Rect>
      </Node>

      {/* 5. Capa Toma Real 3 */}
      <Node ref={footage3Node} opacity={0}>
        <VideoPlaceholder
          title="Familias y campos de cultivo"
          cue="Y, lo más importante..."
          suggestedFile="toma-04-familias-cultivo.mp4"
          durationSeconds={1.5}
        />
      </Node>

      {/* 6. Capa INS-08 (Datos climáticos locales · Llenan un vacío de información) */}
      <Node ref={ins08Node} opacity={0}>
        <Rect
          width={1600}
          height={760}
          fill={THEME.colors.paper.amateLight}
          stroke={THEME.colors.earth.ochre}
          lineWidth={2.5}
          radius={20}
          position={[0, -20]}
          padding={[40, 50]}
          shadowColor={`${THEME.colors.earth.dark}20`}
          shadowBlur={30}
          clip={true}
        >
          {/* Cabecera Principal */}
          <Txt
            text="DATOS CLIMÁTICOS LOCALES"
            position={[0, -320]}
            fill={THEME.colors.milpa.deepGreen}
            fontFamily={THEME.typography.serif}
            fontSize={46}
            fontWeight={700}
            letterSpacing={3}
          />
          <Txt
            text="Llenan un vacío de información · Darán frutos año con año"
            position={[0, -270]}
            fill={THEME.colors.earth.warmClay}
            fontFamily={THEME.typography.sans}
            fontSize={26}
            fontWeight={600}
          />

          {/* Panel Izquierdo: Registro Agrometeorológico Hiperlocal */}
          <Rect
            position={[-380, 45]}
            width={720}
            height={510}
            fill={THEME.colors.paper.cream}
            stroke={THEME.colors.earth.ochre}
            lineWidth={2}
            radius={18}
            padding={[24, 28]}
            shadowColor={`${THEME.colors.earth.dark}15`}
            shadowBlur={18}
          >
            <Txt
              text="REGISTRO LOCAL · LADERA DEL TEUHTLI"
              position={[0, -215]}
              fill={THEME.colors.earth.warmClay}
              fontFamily={THEME.typography.mono}
              fontSize={18}
              fontWeight={700}
              letterSpacing={1.5}
            />
            <Txt
              text="De la ausencia de datos a la continuidad"
              position={[0, -182]}
              fill={THEME.colors.earth.deep}
              fontFamily={THEME.typography.serif}
              fontSize={24}
              fontWeight={700}
            />

            {/* Gráfico de serie de tiempo / acumulación de lluvia */}
            <Rect
              position={[0, -60]}
              width={650}
              height={175}
              fill={`${THEME.colors.paper.amateLight}80`}
              stroke={THEME.colors.earth.ochre}
              lineWidth={1.5}
              radius={12}
              clip={true}
            >
              {/* Ejes y cuadrícula */}
              <Rect
                width={590}
                height={1.5}
                position={[0, 52]}
                fill={`${THEME.colors.earth.ochre}55`}
              />
              <Rect
                width={590}
                height={1}
                position={[0, 0]}
                fill={`${THEME.colors.earth.ochre}33`}
              />
              <Rect
                width={590}
                height={1}
                position={[0, -52]}
                fill={`${THEME.colors.earth.ochre}33`}
              />

              {/* Rótulo de vacío histórico previo */}
              <Txt
                text="Vacío histórico de estaciones en la zona"
                position={[-110, -58]}
                fill={`${THEME.colors.earth.warmClay}99`}
                fontFamily={THEME.typography.mono}
                fontSize={16}
                fontWeight={600}
              />

              {/* Meses en eje X */}
              {["May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov"].map(
                (m, idx) => (
                  <Txt
                    text={m}
                    position={[-250 + idx * 83, 68]}
                    fill={THEME.colors.earth.warmClay}
                    fontFamily={THEME.typography.mono}
                    fontSize={15}
                    fontWeight={600}
                  />
                ),
              )}

              {/* Área y Curva continua Cehuamilli de precipitación acumulada */}
              <Node>
                <Path
                  data="M -260,50 C -180,48 -110,35 -40,5 C 30,-30 100,-68 180,-95 C 220,-108 250,-115 270,-118 L 270,52 L -260,52 Z"
                  fill={`${THEME.colors.climate.rainBlue}22`}
                />
                <Path
                  data="M -260,50 C -180,48 -110,35 -40,5 C 30,-30 100,-68 180,-95 C 220,-108 250,-115 270,-118"
                  stroke={THEME.colors.climate.rainBlue}
                  lineWidth={3.5}
                />
                {/* Hitos de medición a lo largo de la curva */}
                <Circle
                  position={[-260, 50]}
                  size={10}
                  fill={THEME.colors.milpa.deepGreen}
                />
                <Circle
                  position={[-110, 35]}
                  size={10}
                  fill={THEME.colors.climate.rainBlue}
                />
                <Circle
                  position={[-40, 5]}
                  size={10}
                  fill={THEME.colors.climate.rainBlue}
                />
                <Circle
                  position={[100, -68]}
                  size={10}
                  fill={THEME.colors.climate.rainBlue}
                />
                <Circle
                  position={[270, -118]}
                  size={12}
                  fill={THEME.colors.milpa.leaf}
                  stroke={THEME.colors.paper.cream}
                  lineWidth={2}
                />
              </Node>

              {/* Cortina / máscara reveladora que descubre la curva hacia la derecha */}
              <Rect
                ref={dataReveal}
                position={[-325, 0]}
                width={650}
                height={175}
                fill={`${THEME.colors.paper.cream}`}
                offset={[-1, 0]}
              />

              {/* Rótulo de acumulado final */}
              <Txt
                text="749 mm · Ciclo completo"
                position={[170, -65]}
                fill={THEME.colors.climate.rainBlue}
                fontFamily={THEME.typography.mono}
                fontSize={16}
                fontWeight={700}
              />
            </Rect>

            {/* 4 Micro-Tarjetas de Variables Clave (Grid 2x2) */}
            <Node ref={metricCardsNode} opacity={0} position={[0, 0]}>
              {/* Variable 1: Lluvia */}
              <Rect
                position={[-165, 95]}
                width={310}
                height={76}
                fill={`${THEME.colors.paper.amateLight}90`}
                stroke={THEME.colors.climate.rainBlue}
                lineWidth={1.5}
                radius={12}
                padding={[10, 14]}
              >
                <Txt
                  text="🌧️ Precipitación pluvial"
                  position={[-135, -16]}
                  fill={THEME.colors.climate.rainBlue}
                  fontFamily={THEME.typography.sans}
                  fontSize={18}
                  fontWeight={700}
                  offset={[-1, 0]}
                />
                <Txt
                  text="749 mm · Medición en ladera"
                  position={[-135, 14]}
                  fill={THEME.colors.earth.deep}
                  fontFamily={THEME.typography.mono}
                  fontSize={16}
                  fontWeight={600}
                  offset={[-1, 0]}
                />
              </Rect>

              {/* Variable 2: Temperatura / Heladas */}
              <Rect
                position={[165, 95]}
                width={310}
                height={76}
                fill={`${THEME.colors.paper.amateLight}90`}
                stroke={THEME.colors.earth.terracotta}
                lineWidth={1.5}
                radius={12}
                padding={[10, 14]}
              >
                <Txt
                  text="🌡️ Gradiente térmico"
                  position={[-135, -16]}
                  fill={THEME.colors.earth.terracotta}
                  fontFamily={THEME.typography.sans}
                  fontSize={18}
                  fontWeight={700}
                  offset={[-1, 0]}
                />
                <Txt
                  text="14.1 °C · Riesgo de heladas"
                  position={[-135, 14]}
                  fill={THEME.colors.earth.deep}
                  fontFamily={THEME.typography.mono}
                  fontSize={16}
                  fontWeight={600}
                  offset={[-1, 0]}
                />
              </Rect>

              {/* Variable 3: Viento / Rachas */}
              <Rect
                position={[-165, 185]}
                width={310}
                height={76}
                fill={`${THEME.colors.paper.amateLight}90`}
                stroke={THEME.colors.earth.ochre}
                lineWidth={1.5}
                radius={12}
                padding={[10, 14]}
              >
                <Txt
                  text="💨 Rachas de viento"
                  position={[-135, -16]}
                  fill={THEME.colors.earth.warmClay}
                  fontFamily={THEME.typography.sans}
                  fontSize={18}
                  fontWeight={700}
                  offset={[-1, 0]}
                />
                <Txt
                  text="Monitoreo para amaranto"
                  position={[-135, 14]}
                  fill={THEME.colors.earth.deep}
                  fontFamily={THEME.typography.mono}
                  fontSize={16}
                  fontWeight={600}
                  offset={[-1, 0]}
                />
              </Rect>

              {/* Variable 4: Humedad de Suelo */}
              <Rect
                position={[165, 185]}
                width={310}
                height={76}
                fill={`${THEME.colors.paper.amateLight}90`}
                stroke={THEME.colors.milpa.leaf}
                lineWidth={1.5}
                radius={12}
                padding={[10, 14]}
              >
                <Txt
                  text="💧 Humedad relativa"
                  position={[-135, -16]}
                  fill={THEME.colors.milpa.deepGreen}
                  fontFamily={THEME.typography.sans}
                  fontSize={18}
                  fontWeight={700}
                  offset={[-1, 0]}
                />
                <Txt
                  text="Seguimiento para siembra"
                  position={[-135, 14]}
                  fill={THEME.colors.earth.deep}
                  fontFamily={THEME.typography.mono}
                  fontSize={16}
                  fontWeight={600}
                  offset={[-1, 0]}
                />
              </Rect>
            </Node>
          </Rect>

          {/* Panel Derecho: Decisiones Comunitarias y Frutos Año con Año */}
          <Rect
            position={[380, 45]}
            width={720}
            height={510}
            fill={THEME.colors.paper.cream}
            stroke={THEME.colors.milpa.leaf}
            lineWidth={2}
            radius={18}
            padding={[24, 28]}
            shadowColor={`${THEME.colors.earth.dark}15`}
            shadowBlur={18}
          >
            <Txt
              text="FRUTOS AGRÍCOLAS · AÑO CON AÑO"
              position={[0, -215]}
              fill={THEME.colors.milpa.deepGreen}
              fontFamily={THEME.typography.mono}
              fontSize={18}
              fontWeight={700}
              letterSpacing={1.5}
            />
            <Txt
              text="Decisiones respaldadas con memoria local"
              position={[0, -182]}
              fill={THEME.colors.earth.deep}
              fontFamily={THEME.typography.serif}
              fontSize={24}
              fontWeight={700}
            />

            {/* Ilustración Botánica Viva del Amaranto (lado izquierdo del panel derecho) */}
            <Node position={[-230, 20]}>
              {/* Suelo fértil */}
              <Rect
                width={180}
                height={14}
                position={[0, 195]}
                radius={7}
                fill={THEME.colors.earth.warmClay}
              />

              {/* Tallo que crece */}
              <Rect
                ref={plantStem}
                width={12}
                height={0}
                position={[0, 190]}
                offset={[0, 1]}
                fill={THEME.colors.milpa.deepGreen}
                radius={6}
              />

              {/* Hojas alternas estilizadas */}
              <Path
                ref={plantLeaf1}
                data="M 0,110 C 45,95 70,60 60,25 C 35,40 10,75 0,110 Z"
                fill={THEME.colors.milpa.leaf}
                opacity={0}
                scale={0}
              />
              <Path
                ref={plantLeaf2}
                data="M 0,40 C -45,25 -70,-10 -60,-45 C -35,-30 -10,5 0,40 Z"
                fill={THEME.colors.milpa.sprout}
                opacity={0}
                scale={0}
              />
              <Path
                ref={plantLeaf3}
                data="M 0,-30 C 40,-45 65,-80 55,-115 C 30,-100 10,-65 0,-30 Z"
                fill={THEME.colors.milpa.leaf}
                opacity={0}
                scale={0}
              />

              {/* Panoja / Floración emblemática de amaranto en la cima */}
              <Node ref={plantFlower} position={[0, -85]} opacity={0} scale={0}>
                <Path
                  data="M -15,-15 C -30,-45 0,-85 0,-100 C 0,-85 30,-45 15,-15 Z"
                  fill={THEME.colors.earth.terracotta}
                />
                <Path
                  data="M -25,-5 C -45,-30 -20,-60 -10,-75 C -5,-55 -10,-25 -25,-5 Z"
                  fill={THEME.colors.status.pending}
                />
                <Path
                  data="M 25,-5 C 45,-30 20,-60 10,-75 C 5,-55 10,-25 25,-5 Z"
                  fill={THEME.colors.status.pending}
                />
                <Circle position={[0, -95]} size={16} fill="#F5B041" />
              </Node>

              <Txt
                text="Amaranto en floración"
                position={[0, 218]}
                fill={THEME.colors.milpa.deepGreen}
                fontFamily={THEME.typography.sans}
                fontSize={15}
                fontWeight={700}
              />
            </Node>

            {/* 3 Fichas de Impacto Agrícola Escalonadas (lado derecho del panel derecho) */}
            {/* Ficha 1: Año 1 */}
            <Node ref={decisionCard1} position={[120, -90]} opacity={0} x={160}>
              <Rect
                width={380}
                height={88}
                fill={`${THEME.colors.paper.amateLight}90`}
                stroke={THEME.colors.earth.ochre}
                lineWidth={1.8}
                radius={14}
                padding={[12, 18]}
              >
                <Txt
                  text="🌱 AÑO 1 · Alerta Temprana"
                  position={[-165, -18]}
                  fill={THEME.colors.milpa.deepGreen}
                  fontFamily={THEME.typography.sans}
                  fontSize={20}
                  fontWeight={700}
                  offset={[-1, 0]}
                />
                <Txt
                  text="Prevención de heladas y rachas en floración"
                  position={[-165, 16]}
                  fill={THEME.colors.earth.deep}
                  fontFamily={THEME.typography.sans}
                  fontSize={16}
                  fontWeight={600}
                  offset={[-1, 0]}
                />
              </Rect>
            </Node>

            {/* Ficha 2: Año 2 */}
            <Node ref={decisionCard2} position={[120, 15]} opacity={0} x={160}>
              <Rect
                width={380}
                height={88}
                fill={`${THEME.colors.paper.amateLight}90`}
                stroke={THEME.colors.climate.droughtOrange}
                lineWidth={1.8}
                radius={14}
                padding={[12, 18]}
              >
                <Txt
                  text="🌾 AÑO 2 · Ventana Óptima de Siembra"
                  position={[-165, -18]}
                  fill={THEME.colors.climate.droughtOrange}
                  fontFamily={THEME.typography.sans}
                  fontSize={20}
                  fontWeight={700}
                  offset={[-1, 0]}
                />
                <Txt
                  text="Identificar temporal real; evitar pérdidas de semilla"
                  position={[-165, 16]}
                  fill={THEME.colors.earth.deep}
                  fontFamily={THEME.typography.sans}
                  fontSize={16}
                  fontWeight={600}
                  offset={[-1, 0]}
                />
              </Rect>
            </Node>

            {/* Ficha 3: Año 3+ */}
            <Node ref={decisionCard3} position={[120, 120]} opacity={0} x={160}>
              <Rect
                width={380}
                height={88}
                fill={`${THEME.colors.paper.amateLight}90`}
                stroke={THEME.colors.milpa.leaf}
                lineWidth={1.8}
                radius={14}
                padding={[12, 18]}
              >
                <Txt
                  text="🛡️ AÑO 3+ · Memoria Climática Local"
                  position={[-165, -18]}
                  fill={THEME.colors.milpa.deepGreen}
                  fontFamily={THEME.typography.sans}
                  fontSize={20}
                  fontWeight={700}
                  offset={[-1, 0]}
                />
                <Txt
                  text="Soberanía de datos para manejo localx|"
                  position={[-165, 16]}
                  fill={THEME.colors.earth.deep}
                  fontFamily={THEME.typography.sans}
                  fontSize={16}
                  fontWeight={600}
                  offset={[-1, 0]}
                />
              </Rect>
            </Node>
          </Rect>
        </Rect>
      </Node>

      {/* 7. Capa Toma Real 4 */}
      <Node ref={footage4Node} opacity={0}>
        <VideoPlaceholder
          title="Comunidad y resiliencia climática"
          cue="...para tomar decisiones más acertadas y fortalecer la resiliencia comunitaria."
          suggestedFile="toma-04-resiliencia-comunitaria.mp4"
          durationSeconds={4.76}
        />
      </Node>
    </Node>,
  );

  // ==========================================
  // COREOGRAFÍA TEMPORAL EXACTA (38.76 s)
  // ==========================================

  // [0.0s – 4.5s]: Presentación del Equipo Cehuamilli
  // Animación viva de cámara Ken Burns + pulso georreferenciado en el pin del Teuhtli
  yield* all(
    equipoCameraNode().position.y(-10, 4.5, easeInOutCubic),
    equipoCameraNode().scale(1.06, 4.5, easeInOutCubic),
    (function* () {
      // Primer pulso de radar en el pin
      yield* all(
        pinPulseRef().scale(2.4, 1.8, easeOutCubic),
        pinPulseRef().opacity(0, 1.8, easeOutCubic),
      );
      pinPulseRef().scale(1);
      pinPulseRef().opacity(0.85);
      // Segundo pulso de radar en el pin
      yield* all(
        pinPulseRef().scale(2.6, 1.8, easeOutCubic),
        pinPulseRef().opacity(0, 1.8, easeOutCubic),
      );
    })(),
    (function* () {
      yield* waitFor(4.15);
      // Transición hacia INS-06 (~10 frames antes de «estaciones agrometeorológicas...»)
      yield* all(
        footage1Node().opacity(0, 0.35, easeInOutCubic),
        ins06Node().opacity(1, 0.35, easeInOutCubic),
      );
    })(),
  );

  // [4.5s – 12.5s]: INS-06 (Perfil + estaciones)
  yield* all(
    station1().opacity(1, 0.6, easeOutBack),
    station1().scale(1, 0.6, easeOutBack),
  );
  yield* waitFor(0.8);

  yield* all(
    station2().opacity(1, 0.6, easeOutBack),
    station2().scale(1, 0.6, easeOutBack),
  );
  yield* waitFor(0.8);

  yield* all(
    station3().opacity(1, 0.6, easeOutBack),
    station3().scale(1, 0.6, easeOutBack),
  );
  yield* waitFor(0.6);

  yield* badgesNode().opacity(1, 0.8, easeOutCubic);
  yield* waitFor(3.6);

  // Transición hacia Toma Real 2 (~10 frames después de «viable para la comunidad»)
  yield* all(
    ins06Node().opacity(0, 0.35, easeInOutCubic),
    footage2Node().opacity(1, 0.35, easeInOutCubic),
  );

  // [12.5s – 14.2s]: Toma Real 2
  yield* waitFor(1.35);

  // Transición hacia INS-07 (~10 frames antes de «alertas por WhatsApp...»)
  yield* all(
    footage2Node().opacity(0, 0.35, easeInOutCubic),
    ins07Node().opacity(1, 0.35, easeInOutCubic),
  );

  // [14.2s – 25.5s]: INS-07 (Alerta ladera + celular)
  yield* all(
    alertPulse().opacity(1, 0.4, easeOutCubic),
    alertPulse().size(160, 1.2, easeOutCubic),
  );

  yield* all(
    phoneMockup().opacity(1, 0.8, easeOutCubic),
    phoneMockup().position.y(0, 0.8, easeOutCubic),
  );
  yield* waitFor(1.5);

  // Hilo de agua bajando por la ladera («inundaciones que antes no había»)
  yield* floodWater().lineWidth(8, 2.0, easeInOutCubic);
  yield* waitFor(4.5);

  // Transición hacia Toma Real 3
  yield* all(
    ins07Node().opacity(0, 0.35, easeInOutCubic),
    footage3Node().opacity(1, 0.35, easeInOutCubic),
  );

  // [25.5s – 27.0s]: Toma Real 3
  yield* waitFor(1.15);

  // Transición hacia INS-08 (~10 frames antes de «llenan un vacío de información»)
  yield* all(
    footage3Node().opacity(0, 0.35, easeInOutCubic),
    ins08Node().opacity(1, 0.35, easeInOutCubic),
  );

  // [27.0s – 34.0s]: INS-08 (Datos climáticos locales + frutos de decisión)
  // 1. Se revela la curva de precipitación y aparecen las métricas (27.0s – 29.2s)
  yield* all(
    dataReveal().position.x(325, 1.8, easeInOutCubic),
    dataReveal().width(0, 1.8, easeInOutCubic),
    metricCardsNode().opacity(1, 1.4, easeOutCubic),
  );

  // 2. Brota la planta de amaranto y florece su panoja (29.2s – 31.0s)
  yield* all(
    plantStem().height(265, 1.2, easeOutCubic),
    plantLeaf1().opacity(1, 0.6, easeOutBack),
    plantLeaf1().scale(1, 0.6, easeOutBack),
    plantLeaf2().opacity(1, 0.6, easeOutBack),
    plantLeaf2().scale(1, 0.6, easeOutBack),
    plantLeaf3().opacity(1, 0.6, easeOutBack),
    plantLeaf3().scale(1, 0.6, easeOutBack),
  );

  yield* all(
    plantFlower().opacity(1, 0.6, easeOutBack),
    plantFlower().scale(1, 0.6, easeOutBack),
  );

  // 3. Entran las tarjetas de decisión agrícola en cascada (31.0s – 32.5s)
  yield* all(
    decisionCard1().opacity(1, 0.45, easeOutCubic),
    decisionCard1().position.x(120, 0.45, easeOutBack),
  );
  yield* waitFor(0.2);

  yield* all(
    decisionCard2().opacity(1, 0.45, easeOutCubic),
    decisionCard2().position.x(120, 0.45, easeOutBack),
  );
  yield* waitFor(0.2);

  yield* all(
    decisionCard3().opacity(1, 0.45, easeOutCubic),
    decisionCard3().position.x(120, 0.45, easeOutBack),
  );

  // 4. Pausa de lectura antes del corte a toma real (32.9s – 34.0s)
  yield* waitFor(1.1);

  // Transición hacia Toma Real 4
  yield* all(
    ins08Node().opacity(0, 0.35, easeInOutCubic),
    footage4Node().opacity(1, 0.35, easeInOutCubic),
  );

  // [34.0s – 38.76s]: Toma Real 4
  yield* waitFor(8.8);
});
