import {
  makeScene2D,
  Node,
  Audio,
  Rect,
  Txt,
  Circle,
  Path,
  Img,
  Video,
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

import audioParrafo3 from "../../audio/parrafo3.m4a";
import pacificoElNinoTexture from "../../assets/textures/pacifico-el-nino.png";
import agricultoresCieloTexture from "../../assets/textures/toma-03-agricultores-mirando-cielo.jpg";
import videoCieloLaderas from "../../footage/toma-03-cielo-laderas.mp4";

/**
 * TOMA 3 MAESTRA · 23.104 s
 * Sincronización continua con parrafo3.m4a
 *
 * Estructura:
 * 1. [0.0s – 2.5s]:   IMAGEN REAL ANIMADA 1 (Agricultores mirando el cielo / laderas)
 * 2. [2.5s – 10.2s]:  INS-04 (El Niño NOAA: Mapa estilizado Pacífico, anomalía térmica TSM, medidor >90%)
 * 3. [10.2s – 12.8s]: TOMA REAL 2 (Incertidumbre en las laderas)
 * 4. [12.8s – 23.1s]: INS-05 (De lo global a lo local: 3 preguntas + estación agrometeorológica)
 */
export default makeScene2D("toma-03", function* (view) {
  view.fill(THEME.colors.paper.cream);

  const footage1Node = createRef<Node>();
  const cieloCameraNode = createRef<Node>();
  const ins04Node = createRef<Node>();
  const footage2Node = createRef<Node>();
  const videoCieloLaderasRef = createRef<Video>();
  const ins05Node = createRef<Node>();

  // Elementos INS-04 (El Niño)
  const ins04Card = createRef<Rect>();
  const meterBar = createRef<Rect>();
  const meterVal = createRef<Txt>();

  // Elementos INS-05 (Global a local)
  const q1Node = createRef<Node>();
  const q2Node = createRef<Node>();
  const q3Node = createRef<Node>();
  const stationPin = createRef<Node>();
  const localMeasureLine = createRef<Rect>();

  view.add(
    <Node>
      {/* 1. Audio maestro continuo de la Toma 3 */}
      <Audio src={audioParrafo3} play={true} />

      {/* 2. Capa Imagen Real 1 (Agricultores mirando al cielo) */}
      <Node ref={footage1Node} opacity={1}>
        <Node ref={cieloCameraNode} position={[0, 0]} scale={1.02}>
          <Img
            src={agricultoresCieloTexture}
            width={1920}
            height={1080}
            position={[0, 0]}
          />
        </Node>
      </Node>

      {/* 3. Capa INS-04 (El Niño - NOAA) */}
      <Node ref={ins04Node} opacity={0}>
        {/* Marco y Mapa cartográfico del Pacífico ecuatorial */}
        <Rect
          width={1540}
          height={740}
          fill={THEME.colors.paper.amateLight}
          stroke={THEME.colors.earth.ochre}
          lineWidth={2.5}
          radius={20}
          position={[0, -20]}
          shadowColor={`${THEME.colors.earth.dark}20`}
          shadowBlur={30}
          clip={true}
        >
          {/* Mapa cartográfico estilizado de la Cuenca del Pacífico y El Niño */}
          <Img src={pacificoElNinoTexture} width={1540} height={740} />

          {/* Tarjeta de datos NOAA con escala de proyección en flanco oeste */}
          <Rect
            ref={ins04Card}
            width={580}
            height={430}
            fill={`${THEME.colors.paper.cream}F7`}
            stroke={THEME.colors.earth.ochre}
            lineWidth={2.5}
            radius={18}
            position={[-465, 0]}
            padding={[30, 36]}
            shadowColor={`${THEME.colors.earth.dark}25`}
            shadowBlur={22}
            opacity={0}
          >
            <Txt
              text="EL NIÑO SE ESTÁ FORTALECIENDO"
              position={[0, -145]}
              fill={THEME.colors.climate.droughtOrange}
              fontFamily={THEME.typography.sans}
              fontSize={24}
              fontWeight={700}
              letterSpacing={2}
            />

            <Txt
              text="Probabilidad > 90%"
              position={[0, -78]}
              fill={THEME.colors.earth.deep}
              fontFamily={THEME.typography.serif}
              fontSize={44}
              fontWeight={700}
            />

            <Txt
              text="evento muy fuerte durante otoño/invierno"
              position={[0, -18]}
              fill={THEME.colors.earth.warmClay}
              fontFamily={THEME.typography.sans}
              fontSize={24}
              fontWeight={600}
              textAlign="center"
            />

            {/* Medidor de probabilidad */}
            <Rect
              width={480}
              height={26}
              radius={13}
              fill={`${THEME.colors.earth.ochre}33`}
              position={[0, 52]}
            >
              <Rect
                ref={meterBar}
                width={0}
                height={26}
                radius={13}
                fill={THEME.colors.climate.droughtOrange}
                position={[-240, 0]}
                offset={[-1, 0]}
              />
            </Rect>
            <Txt
              ref={meterVal}
              text=">90%"
              position={[205, 92]}
              fill={THEME.colors.climate.droughtOrange}
              fontFamily={THEME.typography.mono}
              fontSize={28}
              fontWeight={700}
              opacity={0}
            />

            <Node position={[0, 142]}>
              <Txt
                text="Fuente: Discusión Diagnóstica ENSO · NOAA CPC"
                fill={THEME.colors.earth.warmClay}
                fontFamily={THEME.typography.mono}
                fontSize={20}
                fontWeight={600}
              />
            </Node>
          </Rect>
        </Rect>
      </Node>

      {/* 4. Capa Toma Real 2 (Cielo nublado e incertidumbre en las faldas del volcán) */}
      <Node ref={footage2Node} opacity={0}>
        <Video
          ref={videoCieloLaderasRef}
          src={videoCieloLaderas}
          volume={0}
          width={1920}
          height={1080}
        />
      </Node>

      {/* 5. Capa INS-05 (De lo global a lo local → «hay que medir») */}
      <Node ref={ins05Node} opacity={0}>
        <Rect
          width={1600}
          height={760}
          fill={THEME.colors.paper.amateLight}
          stroke={THEME.colors.earth.ochre}
          lineWidth={2.5}
          radius={20}
          position={[0, -20]}
          padding={[40, 60]}
        >
          <Txt
            text="DE LO GLOBAL A LO LOCAL"
            position={[0, -315]}
            fill={THEME.colors.earth.terracotta}
            fontFamily={THEME.typography.serif}
            fontSize={44}
            fontWeight={700}
            letterSpacing={3}
          />
          <Txt
            text="Un pronóstico general no resuelve la incertidumbre en la ladera"
            position={[0, -265]}
            fill={THEME.colors.earth.warmClay}
            fontFamily={THEME.typography.sans}
            fontSize={26}
            fontWeight={600}
          />

          {/* Tres preguntas tipográficas escalonadas */}
          <Node position={[-380, 0]}>
            <Node ref={q1Node} position={[0, -85]} opacity={0} x={-40}>
              <Rect
                width={640}
                height={80}
                fill={THEME.colors.paper.cream}
                stroke={THEME.colors.earth.ochre}
                lineWidth={2}
                radius={14}
                padding={[12, 24]}
              >
                <Txt
                  text="¿Lloverá menos?"
                  fill={THEME.colors.earth.deep}
                  fontFamily={THEME.typography.serif}
                  fontSize={36}
                  fontWeight={700}
                />
              </Rect>
            </Node>

            <Node ref={q2Node} position={[0, 10]} opacity={0} x={-40}>
              <Rect
                width={640}
                height={80}
                fill={THEME.colors.paper.cream}
                stroke={THEME.colors.earth.ochre}
                lineWidth={2}
                radius={14}
                padding={[12, 24]}
              >
                <Txt
                  text="¿Cuándo llegará la lluvia?"
                  fill={THEME.colors.earth.deep}
                  fontFamily={THEME.typography.serif}
                  fontSize={36}
                  fontWeight={700}
                />
              </Rect>
            </Node>

            <Node ref={q3Node} position={[0, 105]} opacity={0} x={-40}>
              <Rect
                width={640}
                height={80}
                fill={THEME.colors.paper.cream}
                stroke={THEME.colors.earth.ochre}
                lineWidth={2}
                radius={14}
                padding={[12, 24]}
              >
                <Txt
                  text="¿Cuánto cambiará la temporada?"
                  fill={THEME.colors.earth.deep}
                  fontFamily={THEME.typography.serif}
                  fontSize={36}
                  fontWeight={700}
                />
              </Rect>
            </Node>
          </Node>

          {/* Abanico de incertidumbre y resolución con medición local */}
          <Node position={[380, 10]}>
            <Rect
              width={640}
              height={360}
              fill={THEME.colors.paper.cream}
              stroke={THEME.colors.earth.ochre}
              lineWidth={2}
              radius={16}
              clip={true}
            >
              {/* Ejes ilustrativos */}
              <Rect
                width={560}
                height={2}
                position={[0, 130]}
                fill={THEME.colors.earth.ochre}
              />
              <Rect
                width={2}
                height={260}
                position={[-250, 0]}
                fill={THEME.colors.earth.ochre}
              />

              <Txt
                text="Acumulado de lluvia (mm)"
                position={[-120, -140]}
                fill={THEME.colors.earth.warmClay}
                fontFamily={THEME.typography.mono}
                fontSize={22}
                fontWeight={600}
              />
              <Txt
                text="Meses (Mayo - Octubre)"
                position={[140, 150]}
                fill={THEME.colors.earth.warmClay}
                fontFamily={THEME.typography.mono}
                fontSize={22}
                fontWeight={600}
              />

              {/* Abanico ilustrativo de curvas históricas dispersas */}
              <Path
                data="M -250,130 Q -100,80 50,30 T 250,-70"
                stroke={`${THEME.colors.climate.rainBlue}33`}
                lineWidth={2.5}
              />
              <Path
                data="M -250,130 Q -80,110 80,60 T 250,0"
                stroke={`${THEME.colors.climate.rainBlue}33`}
                lineWidth={2.5}
              />
              <Path
                data="M -250,130 Q -120,60 20,-20 T 250,-110"
                stroke={`${THEME.colors.climate.rainBlue}33`}
                lineWidth={2.5}
              />
              <Path
                data="M -250,130 Q -60,120 100,90 T 250,30"
                stroke={`${THEME.colors.climate.rainBlue}33`}
                lineWidth={2.5}
              />

              <Txt
                text="Incertidumbre climática · Ilustrativo"
                position={[110, -110]}
                fill={THEME.colors.climate.skyMist}
                fontFamily={THEME.typography.mono}
                fontSize={20}
                fontWeight={600}
              />

              {/* Curva de medición local que se solidifica */}
              <Rect
                ref={localMeasureLine}
                width={0}
                height={6}
                position={[-250, 40]}
                fill={THEME.colors.milpa.deepGreen}
                offset={[-1, 0]}
              />

              {/* Punto de estación agrometeorológica con dimensiones explícitas */}
              <Node ref={stationPin} position={[150, 40]} opacity={0} scale={0}>
                <Circle size={32} fill={THEME.colors.milpa.leaf} />
                <Circle size={16} fill={THEME.colors.paper.cream} />
                <Rect
                  position={[0, -48]}
                  width={210}
                  height={48}
                  fill={THEME.colors.milpa.deepGreen}
                  radius={10}
                  padding={[6, 14]}
                >
                  <Txt
                    text="Estación local"
                    fill={THEME.colors.paper.cream}
                    fontFamily={THEME.typography.sans}
                    fontSize={22}
                    fontWeight={700}
                  />
                </Rect>
              </Node>
            </Rect>

            <Txt
              text="Por eso, hay que empezar a medir desde ahora"
              position={[0, 220]}
              fill={THEME.colors.earth.deep}
              fontFamily={THEME.typography.serif}
              fontSize={30}
              fontWeight={700}
            />
          </Node>
        </Rect>
      </Node>
    </Node>,
  );

  // ==========================================
  // COREOGRAFÍA TEMPORAL EXACTA (23.06 s)
  // ==========================================

  // [0.0s – 2.5s]: Imagen Real 1 («El próximo año puede ser más difícil.»)
  // Animación de cámara Ken Burns: sutil avance y paneo hacia el horizonte señalado
  yield* all(
    cieloCameraNode().position.x(18, 2.55, easeInOutCubic),
    cieloCameraNode().scale(1.06, 2.55, easeInOutCubic),
    (function* () {
      yield* waitFor(2.2);
      // Transición hacia INS-04 (~10 frames antes de «De acuerdo con la NOAA...»)
      yield* all(
        footage1Node().opacity(0, 0.35, easeInOutCubic),
        ins04Node().opacity(1, 0.35, easeInOutCubic),
      );
    })(),
  );

  // [2.5s – 10.2s]: INS-04 (El Niño)
  yield* all(
    ins04Card().opacity(1, 0.6, easeOutCubic),
    ins04Card().position.x(-440, 0.6, easeOutCubic),
  );

  yield* all(
    meterBar().width(435, 1.4, easeOutCubic),
    meterVal().opacity(1, 0.5, easeOutCubic),
  );

  yield* waitFor(4.5);

  // Transición hacia Toma Real 2 (~10 frames después de «otoño y el invierno»)
  videoCieloLaderasRef().play();
  yield* all(
    ins04Node().opacity(0, 0.35, easeInOutCubic),
    footage2Node().opacity(1, 0.35, easeInOutCubic),
  );

  // [10.2s – 12.8s]: Toma Real 2 («Pero un pronóstico global no nos dice...»)
  yield* waitFor(4.25);

  // Transición hacia INS-05 (~10 frames antes de «aquí, en estas laderas»)
  yield* all(
    footage2Node().opacity(0, 0.35, easeInOutCubic),
    ins05Node().opacity(1, 0.35, easeInOutCubic),
  );
  videoCieloLaderasRef().pause();

  // [12.8s – 22.8s]: INS-05 (Preguntas escalonadas + incertidumbre)
  // ¿Lloverá menos? (~14.0s)
  yield* all(
    q1Node().opacity(1, 0.5, easeOutCubic),
    q1Node().position.x(0, 0.5, easeOutBack),
  );
  yield* waitFor(0.6);

  // ¿Cuándo llegará la lluvia? (~15.5s)
  yield* all(
    q2Node().opacity(1, 0.5, easeOutCubic),
    q2Node().position.x(0, 0.5, easeOutBack),
  );
  yield* waitFor(0.6);

  // ¿Cuánto cambiará la temporada? (~17.0s)
  yield* all(
    q3Node().opacity(1, 0.5, easeOutCubic),
    q3Node().position.x(0, 0.5, easeOutBack),
  );
  yield* waitFor(0.5);

  // «Por eso, hay que empezar a medir desde ahora» (~20.4s)
  yield* all(
    localMeasureLine().width(460, 1.2, easeInOutCubic),
    stationPin().opacity(1, 0.6, easeOutBack),
    stationPin().scale(1, 0.6, easeOutBack),
  );

  // Extensión final para cubrir con holgura natural hasta el final del audio (23.104 s)
  yield* waitFor(4.704);
});
