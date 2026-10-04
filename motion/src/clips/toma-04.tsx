import {makeScene2D, Node, Audio, Rect, Txt, Circle, Path} from '@revideo/2d';
import {all, createRef, easeInOutCubic, easeOutBack, easeOutCubic, waitFor} from '@revideo/core';
import {THEME} from '../theme';
import {VideoPlaceholder} from '../components/VideoPlaceholder';

import audioParrafo4 from '../../audio/parrafo4.m4a';

/**
 * TOMA 4 MAESTRA · 38.76 s
 * Sincronización continua con parrafo4.m4a
 * 
 * Estructura:
 * 1. [0.0s – 4.5s]:   TOMA REAL 1 (Equipo Cehuamilli)
 * 2. [4.5s – 12.5s]:  INS-06 (Perfil del Teuhtli + estaciones a distintas alturas)
 * 3. [12.5s – 14.2s]: TOMA REAL 2 (Prototipos y herramientas auxiliares)
 * 4. [14.2s – 25.5s]: INS-07 (Alerta que baja por la ladera + celular genérico + inundación)
 * 5. [25.5s – 27.0s]: TOMA REAL 3 (Familias y campos)
 * 6. [27.0s – 34.0s]: INS-08 (Vacío que se llena de datos + planta brotando)
 * 7. [34.0s – 38.76s]: TOMA REAL 4 (Toma de decisiones y resiliencia comunitaria)
 */
export default makeScene2D('toma-04', function* (view) {
  view.fill(THEME.colors.paper.cream);

  const footage1Node = createRef<Node>();
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

  // Elementos INS-08 (Vacío que se llena de datos)
  const dataPoints = Array.from({length: 8}, () => createRef<Circle>());
  const plantStem = createRef<Rect>();
  const plantLeaf1 = createRef<Path>();
  const plantLeaf2 = createRef<Path>();

  view.add(
    <Node>
      {/* Audio maestro continuo de la Toma 4 */}
      <Audio src={audioParrafo4} play={true} />

      {/* 1. Capa Toma Real 1 */}
      <Node ref={footage1Node} opacity={1}>
        <VideoPlaceholder
          title="Equipo Cehuamilli interdisciplinario"
          cue="Somos Cehuamilli, un equipo interdisciplinario, y proponemos un ecosistema:"
          suggestedFile="toma-04-equipo-cehuamilli.mp4"
          durationSeconds={4.5}
        />
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
            fontSize={34}
            fontWeight={700}
            letterSpacing={3}
          />
          <Txt
            text="Estaciones en distintas alturas del volcán Teuhtli"
            position={[0, -275]}
            fill={THEME.colors.earth.warmClay}
            fontFamily={THEME.typography.sans}
            fontSize={22}
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
            <Circle size={24} fill={THEME.colors.milpa.deepGreen} />
            <Rect position={[0, -60]} fill={THEME.colors.paper.cream} stroke={THEME.colors.milpa.leaf} lineWidth={1.5} radius={10} padding={[8, 14]}>
              <Txt text="Base · 2,260 msnm" fill={THEME.colors.earth.deep} fontFamily={THEME.typography.mono} fontSize={14} fontWeight={600} />
              <Txt text="Temp: 22°C · Hum: 65%" position={[0, 20]} fill={THEME.colors.earth.warmClay} fontFamily={THEME.typography.mono} fontSize={12} />
            </Rect>
          </Node>

          {/* Estación 2: Ladera Media / Parcelas de Temporal */}
          <Node ref={station2} position={[-200, 90]} opacity={0} scale={0}>
            <Circle size={24} fill={THEME.colors.milpa.deepGreen} />
            <Rect position={[0, -60]} fill={THEME.colors.paper.cream} stroke={THEME.colors.milpa.leaf} lineWidth={1.5} radius={10} padding={[8, 14]}>
              <Txt text="Ladera Media · 2,450 msnm" fill={THEME.colors.earth.deep} fontFamily={THEME.typography.mono} fontSize={14} fontWeight={600} />
              <Txt text="Lluvia: 12 mm · Viento: 18 km/h" position={[0, 20]} fill={THEME.colors.climate.rainBlue} fontFamily={THEME.typography.mono} fontSize={12} />
            </Rect>
          </Node>

          {/* Estación 3: Cumbre del Teuhtli */}
          <Node ref={station3} position={[0, -110]} opacity={0} scale={0}>
            <Circle size={28} fill={THEME.colors.earth.terracotta} stroke={THEME.colors.paper.cream} lineWidth={2} />
            <Rect position={[0, -65]} fill={THEME.colors.paper.cream} stroke={THEME.colors.earth.terracotta} lineWidth={1.5} radius={10} padding={[8, 14]}>
              <Txt text="Cumbre · 2,710 msnm" fill={THEME.colors.earth.deep} fontFamily={THEME.typography.mono} fontSize={14} fontWeight={600} />
              <Txt text="Ráfagas: 38 km/h · Presión: 740 hPa" position={[0, 20]} fill={THEME.colors.earth.terracotta} fontFamily={THEME.typography.mono} fontSize={12} />
            </Rect>
          </Node>

          {/* Rótulos clave: Costo accesible + Mantenimiento viable */}
          <Node ref={badgesNode} position={[420, -160]} opacity={0}>
            <Rect width={400} height={120} fill={THEME.colors.paper.cream} stroke={THEME.colors.earth.ochre} lineWidth={1.5} radius={14} padding={[18, 22]}>
              <Txt text="✓ Costo accesible" position={[-160, -22]} fill={THEME.colors.milpa.deepGreen} fontFamily={THEME.typography.sans} fontSize={22} fontWeight={700} offset={[-1, 0]} />
              <Txt text="✓ Mantenimiento viable para la comunidad" position={[-160, 22]} fill={THEME.colors.earth.deep} fontFamily={THEME.typography.sans} fontSize={18} offset={[-1, 0]} />
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
            fontSize={34}
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
            size={32}
            fill={THEME.colors.status.pending}
          />
          <Circle
            ref={alertPulse}
            position={[-100, -40]}
            size={32}
            stroke={THEME.colors.status.pending}
            lineWidth={3}
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
            <Rect width={40} height={35} fill={THEME.colors.earth.warmClay} radius={4} position={[-50, 0]} />
            <Path data="M -75,-17 L -50,-40 L -25,-17 Z" fill={THEME.colors.earth.terracotta} />
            <Circle size={10} position={[-50, 0]} fill="#FFE57F" />

            <Rect width={40} height={35} fill={THEME.colors.earth.warmClay} radius={4} position={[20, 0]} />
            <Path data="M -5,-17 L 20,-40 L 45,-17 Z" fill={THEME.colors.earth.terracotta} />
            <Circle size={10} position={[20, 0]} fill="#FFE57F" />

            <Txt text="Parte baja del cerro · Zonas inundables" position={[-15, 45]} fill={THEME.colors.earth.deep} fontFamily={THEME.typography.sans} fontSize={16} fontWeight={600} />
          </Node>

          {/* Mockup de teléfono móvil con burbuja de chat genérica */}
          <Rect
            ref={phoneMockup}
            position={[400, 30]}
            width={340}
            height={520}
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
            <Rect width={120} height={18} fill={THEME.colors.earth.deep} radius={9} position={[0, -230]} />
            <Txt text="AVISO CLIMÁTICO" position={[0, -180]} fill={THEME.colors.earth.deep} fontFamily={THEME.typography.sans} fontSize={16} fontWeight={700} />

            {/* Burbuja de alerta genérica */}
            <Rect
              position={[0, -70]}
              width={290}
              height={140}
              fill={`${THEME.colors.climate.droughtOrange}22`}
              stroke={THEME.colors.climate.droughtOrange}
              lineWidth={2}
              radius={16}
              padding={[16, 18]}
            >
              <Txt text="⚠️ ALERTA HIDROMETEOROLÓGICA" position={[-125, -45]} fill={THEME.colors.climate.droughtOrange} fontFamily={THEME.typography.sans} fontSize={14} fontWeight={700} offset={[-1, 0]} />
              <Rect width={240} height={10} fill={THEME.colors.earth.deep} radius={5} position={[-125, -10]} offset={[-1, 0]} />
              <Rect width={190} height={10} fill={THEME.colors.earth.warmClay} radius={5} position={[-125, 15]} offset={[-1, 0]} />
              <Rect width={140} height={10} fill={THEME.colors.earth.ochre} radius={5} position={[-125, 40]} offset={[-1, 0]} />
            </Rect>

            <Txt
              text="Para familias y productores"
              position={[0, 160]}
              fill={THEME.colors.earth.warmClay}
              fontFamily={THEME.typography.sans}
              fontSize={18}
              fontWeight={600}
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

      {/* 6. Capa INS-08 (Un vacío que se llena de datos) */}
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
        >
          <Txt
            text="DATOS CLIMÁTICOS LOCALES"
            position={[0, -310]}
            fill={THEME.colors.milpa.deepGreen}
            fontFamily={THEME.typography.serif}
            fontSize={36}
            fontWeight={700}
            letterSpacing={3}
          />
          <Txt
            text="Llenan un vacío de información · Darán frutos año con año"
            position={[0, -265]}
            fill={THEME.colors.earth.warmClay}
            fontFamily={THEME.typography.sans}
            fontSize={22}
          />

          {/* Lienzo blanco que se llena de puntos de datos */}
          <Rect
            width={600}
            height={440}
            position={[-340, 30]}
            fill={THEME.colors.paper.cream}
            stroke={THEME.colors.earth.ochre}
            lineWidth={2}
            radius={16}
            clip={true}
          >
            <Txt text="Vacío de datos inicial" position={[0, -170]} fill={THEME.colors.earth.warmClay} fontFamily={THEME.typography.mono} fontSize={16} />

            {/* Puntos de datos climáticos que van apareciendo */}
            {dataPoints.map((ref, idx) => {
              const x = -200 + (idx % 4) * 120 + (idx > 3 ? 30 : 0);
              const y = -60 + Math.floor(idx / 4) * 110 + (idx % 2 === 0 ? -20 : 20);
              return (
                <Circle
                  ref={ref}
                  position={[x, y]}
                  size={14}
                  fill={THEME.colors.climate.rainBlue}
                  opacity={0}
                />
              );
            })}
          </Rect>

          {/* Planta que brota de la base de los datos */}
          <Node position={[340, 30]}>
            <Rect
              width={540}
              height={440}
              fill={THEME.colors.paper.cream}
              stroke={THEME.colors.milpa.leaf}
              lineWidth={2}
              radius={16}
            >
              {/* Tallo */}
              <Rect
                ref={plantStem}
                width={10}
                height={0}
                position={[0, 160]}
                offset={[0, 1]}
                fill={THEME.colors.milpa.deepGreen}
                radius={5}
              />

              {/* Hojas */}
              <Path
                ref={plantLeaf1}
                data="M 0,60 C 50,40 80,0 70,-40 C 40,-20 10,20 0,60 Z"
                fill={THEME.colors.milpa.leaf}
                opacity={0}
                scale={0}
              />
              <Path
                ref={plantLeaf2}
                data="M 0,10 C -50,-10 -80,-50 -70,-90 C -40,-70 -10,-30 0,10 Z"
                fill={THEME.colors.milpa.sprout}
                opacity={0}
                scale={0}
              />

              <Txt
                text="Toma de decisiones con respaldo local"
                position={[0, 185]}
                fill={THEME.colors.earth.deep}
                fontFamily={THEME.typography.sans}
                fontSize={20}
                fontWeight={600}
              />
            </Rect>
          </Node>
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
    </Node>
  );

  // ==========================================
  // COREOGRAFÍA TEMPORAL EXACTA (38.76 s)
  // ==========================================

  // [0.0s – 4.5s]: Toma Real 1
  yield* waitFor(4.15);

  // Transición hacia INS-06 (~10 frames antes de «estaciones agrometeorológicas...»)
  yield* all(
    footage1Node().opacity(0, 0.35, easeInOutCubic),
    ins06Node().opacity(1, 0.35, easeInOutCubic),
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

  // [27.0s – 34.0s]: INS-08 (Vacío de datos + brote de planta)
  for (let i = 0; i < dataPoints.length; i++) {
    dataPoints[i]().opacity(1, 0.25);
    yield* waitFor(0.12);
  }

  yield* plantStem().height(220, 1.2, easeOutCubic);
  yield* all(
    plantLeaf1().opacity(1, 0.6, easeOutBack),
    plantLeaf1().scale(1, 0.6, easeOutBack),
    plantLeaf2().opacity(1, 0.6, easeOutBack),
    plantLeaf2().scale(1, 0.6, easeOutBack),
  );

  yield* waitFor(2.8);

  // Transición hacia Toma Real 4
  yield* all(
    ins08Node().opacity(0, 0.35, easeInOutCubic),
    footage4Node().opacity(1, 0.35, easeInOutCubic),
  );

  // [34.0s – 38.76s]: Toma Real 4
  yield* waitFor(4.4);
});
