import {makeScene2D, Node, Audio, Rect, Txt, Circle, Path} from '@revideo/2d';
import {all, createRef, easeInOutCubic, easeOutBack, easeOutCubic, waitFor} from '@revideo/core';
import {THEME} from '../theme';
import {VideoPlaceholder} from '../components/VideoPlaceholder';

import audioParrafo3 from '../../audio/parrafo3.m4a';

/**
 * TOMA 3 MAESTRA · 23.06 s
 * Sincronización continua con parrafo3.m4a
 * 
 * Estructura:
 * 1. [0.0s – 2.5s]:   TOMA REAL 1 (Agricultores mirando el cielo / laderas)
 * 2. [2.5s – 10.2s]:  INS-04 (El Niño NOAA: Pacífico, mancha cálida, medidor >90%)
 * 3. [10.2s – 12.8s]: TOMA REAL 2 (Incertidumbre en las laderas)
 * 4. [12.8s – 22.8s]: INS-05 (De lo global a lo local: 3 preguntas + estación agrometeorológica)
 */
export default makeScene2D('toma-03', function* (view) {
  view.fill(THEME.colors.paper.cream);

  const footage1Node = createRef<Node>();
  const ins04Node = createRef<Node>();
  const footage2Node = createRef<Node>();
  const ins05Node = createRef<Node>();

  // Elementos INS-04 (El Niño)
  const ins04Card = createRef<Rect>();
  const warmBlob = createRef<Circle>();
  const warmBlobInner = createRef<Circle>();
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

      {/* 2. Capa Toma Real 1 */}
      <Node ref={footage1Node} opacity={1}>
        <VideoPlaceholder
          title="Laderas del Teuhtli y agricultores mirando el campo"
          cue="El próximo año puede ser más difícil."
          suggestedFile="toma-03-agricultores-cielo.mp4"
          durationSeconds={2.5}
        />
      </Node>

      {/* 3. Capa INS-04 (El Niño - NOAA) */}
      <Node ref={ins04Node} opacity={0}>
        {/* Mapa esquemático del Pacífico ecuatorial */}
        <Rect
          width={1500}
          height={720}
          fill={THEME.colors.paper.amateLight}
          stroke={THEME.colors.earth.ochre}
          lineWidth={2.5}
          radius={20}
          position={[0, -20]}
          shadowColor={`${THEME.colors.earth.dark}20`}
          shadowBlur={30}
          clip={true}
        >
          {/* Océano Pacífico base */}
          <Rect width={1500} height={720} fill="#E8EFF2" />

          {/* Costa Asia / Oceanía (Oeste) */}
          <Path
            data="M -750,-360 L -550,-360 C -520,-200 -580,0 -500,100 C -480,200 -540,360 -560,360 L -750,360 Z"
            fill={THEME.colors.milpa.paleLeaf}
            opacity={0.8}
          />
          <Txt
            text="ASIA / OCEANÍA"
            position={[-620, -310]}
            fill={THEME.colors.earth.warmClay}
            fontFamily={THEME.typography.mono}
            fontSize={14}
            fontWeight={600}
            letterSpacing={2}
          />

          {/* Costa América (Este) */}
          <Path
            data="M 750,-360 L 520,-360 C 490,-150 560,0 480,180 C 460,260 510,360 530,360 L 750,360 Z"
            fill={THEME.colors.milpa.paleLeaf}
            opacity={0.8}
          />
          <Txt
            text="AMÉRICA"
            position={[620, -310]}
            fill={THEME.colors.earth.warmClay}
            fontFamily={THEME.typography.mono}
            fontSize={14}
            fontWeight={600}
            letterSpacing={2}
          />

          {/* Línea del Ecuador */}
          <Rect width={1100} height={2} position={[0, 0]} fill={`${THEME.colors.climate.rainBlue}33`} />
          <Txt
            text="ECUADOR 0°"
            position={[0, -14]}
            fill={THEME.colors.climate.skyMist}
            fontFamily={THEME.typography.mono}
            fontSize={14}
            letterSpacing={3}
          />

          {/* Mancha térmica de El Niño que se expande hacia el este */}
          <Circle
            ref={warmBlob}
            position={[40, 0]}
            size={0}
            fill={`${THEME.colors.climate.droughtOrange}44`}
          />
          <Circle
            ref={warmBlobInner}
            position={[120, 0]}
            size={0}
            fill={`${THEME.colors.earth.terracotta}88`}
          />

          {/* Tarjeta de datos NOAA */}
          <Rect
            ref={ins04Card}
            width={580}
            height={360}
            fill={THEME.colors.paper.cream}
            stroke={THEME.colors.earth.ochre}
            lineWidth={2}
            radius={16}
            position={[-180, 0]}
            padding={[28, 32]}
            shadowColor={`${THEME.colors.earth.dark}25`}
            shadowBlur={20}
            opacity={0}
          >
            <Txt
              text="EL NIÑO SE ESTÁ FORTALECIENDO"
              position={[0, -120]}
              fill={THEME.colors.climate.droughtOrange}
              fontFamily={THEME.typography.sans}
              fontSize={18}
              fontWeight={700}
              letterSpacing={2}
            />

            <Txt
              text="Probabilidad mayor al 90%"
              position={[0, -60]}
              fill={THEME.colors.earth.deep}
              fontFamily={THEME.typography.serif}
              fontSize={36}
              fontWeight={700}
            />

            <Txt
              text="de un evento muy fuerte durante el otoño y el invierno"
              position={[0, -10]}
              fill={THEME.colors.earth.warmClay}
              fontFamily={THEME.typography.sans}
              fontSize={20}
              textAlign="center"
            />

            {/* Medidor de probabilidad */}
            <Rect
              width={480}
              height={20}
              radius={10}
              fill={`${THEME.colors.earth.ochre}33`}
              position={[0, 50]}
            >
              <Rect
                ref={meterBar}
                width={0}
                height={20}
                radius={10}
                fill={THEME.colors.climate.droughtOrange}
                position={[-240, 0]}
                offset={[-1, 0]}
              />
            </Rect>
            <Txt
              ref={meterVal}
              text=">90%"
              position={[200, 85]}
              fill={THEME.colors.climate.droughtOrange}
              fontFamily={THEME.typography.mono}
              fontSize={18}
              fontWeight={700}
              opacity={0}
            />

            <Node position={[0, 130]}>
              <Txt
                text="Esquema ilustrativo · Fuente: NOAA"
                fill={THEME.colors.earth.warmClay}
                fontFamily={THEME.typography.mono}
                fontSize={16}
              />
            </Node>
          </Rect>
        </Rect>
      </Node>

      {/* 4. Capa Toma Real 2 */}
      <Node ref={footage2Node} opacity={0}>
        <VideoPlaceholder
          title="Cielo nublado e incertidumbre en las faldas del volcán"
          cue="Pero un pronóstico global no nos dice exactamente qué pasará aquí..."
          suggestedFile="toma-03-cielo-laderas.mp4"
          durationSeconds={2.6}
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
            position={[0, -310]}
            fill={THEME.colors.earth.terracotta}
            fontFamily={THEME.typography.serif}
            fontSize={36}
            fontWeight={700}
            letterSpacing={3}
          />
          <Txt
            text="Un pronóstico general no resuelve la incertidumbre en la ladera"
            position={[0, -265]}
            fill={THEME.colors.earth.warmClay}
            fontFamily={THEME.typography.sans}
            fontSize={22}
          />

          {/* Tres preguntas tipográficas escalonadas */}
          <Node position={[-380, 0]}>
            <Node ref={q1Node} position={[0, -80]} opacity={0} x={-40}>
              <Rect
                width={620}
                height={70}
                fill={THEME.colors.paper.cream}
                stroke={THEME.colors.earth.ochre}
                lineWidth={1.5}
                radius={12}
                padding={[10, 20]}
              >
                <Txt
                  text="¿Lloverá menos?"
                  fill={THEME.colors.earth.deep}
                  fontFamily={THEME.typography.serif}
                  fontSize={32}
                  fontWeight={600}
                />
              </Rect>
            </Node>

            <Node ref={q2Node} position={[0, 10]} opacity={0} x={-40}>
              <Rect
                width={620}
                height={70}
                fill={THEME.colors.paper.cream}
                stroke={THEME.colors.earth.ochre}
                lineWidth={1.5}
                radius={12}
                padding={[10, 20]}
              >
                <Txt
                  text="¿Cuándo llegará la lluvia?"
                  fill={THEME.colors.earth.deep}
                  fontFamily={THEME.typography.serif}
                  fontSize={32}
                  fontWeight={600}
                />
              </Rect>
            </Node>

            <Node ref={q3Node} position={[0, 100]} opacity={0} x={-40}>
              <Rect
                width={620}
                height={70}
                fill={THEME.colors.paper.cream}
                stroke={THEME.colors.earth.ochre}
                lineWidth={1.5}
                radius={12}
                padding={[10, 20]}
              >
                <Txt
                  text="¿Cuánto cambiará la temporada?"
                  fill={THEME.colors.earth.deep}
                  fontFamily={THEME.typography.serif}
                  fontSize={32}
                  fontWeight={600}
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
              <Rect width={560} height={2} position={[0, 130]} fill={THEME.colors.earth.ochre} />
              <Rect width={2} height={260} position={[-250, 0]} fill={THEME.colors.earth.ochre} />

              <Txt
                text="Acumulado de lluvia (mm)"
                position={[-120, -140]}
                fill={THEME.colors.earth.warmClay}
                fontFamily={THEME.typography.mono}
                fontSize={15}
              />
              <Txt
                text="Meses (Mayo - Octubre)"
                position={[140, 150]}
                fill={THEME.colors.earth.warmClay}
                fontFamily={THEME.typography.mono}
                fontSize={15}
              />

              {/* Abanico ilustrativo de curvas históricas dispersas */}
              <Path data="M -250,130 Q -100,80 50,30 T 250,-70" stroke={`${THEME.colors.climate.rainBlue}33`} lineWidth={2.5} />
              <Path data="M -250,130 Q -80,110 80,60 T 250,0" stroke={`${THEME.colors.climate.rainBlue}33`} lineWidth={2.5} />
              <Path data="M -250,130 Q -120,60 20,-20 T 250,-110" stroke={`${THEME.colors.climate.rainBlue}33`} lineWidth={2.5} />
              <Path data="M -250,130 Q -60,120 100,90 T 250,30" stroke={`${THEME.colors.climate.rainBlue}33`} lineWidth={2.5} />

              <Txt
                text="Incertidumbre climática · Ilustrativo"
                position={[110, -110]}
                fill={THEME.colors.climate.skyMist}
                fontFamily={THEME.typography.mono}
                fontSize={13}
              />

              {/* Curva de medición local que se solidifica */}
              <Rect
                ref={localMeasureLine}
                width={0}
                height={5}
                position={[-250, 40]}
                fill={THEME.colors.milpa.deepGreen}
                offset={[-1, 0]}
              />

              {/* Punto de estación agrometeorológica */}
              <Node ref={stationPin} position={[150, 40]} opacity={0} scale={0}>
                <Circle size={28} fill={THEME.colors.milpa.leaf} />
                <Circle size={14} fill={THEME.colors.paper.cream} />
                <Rect
                  position={[0, -45]}
                  fill={THEME.colors.milpa.deepGreen}
                  radius={8}
                  padding={[6, 12]}
                >
                  <Txt
                    text="Estación local"
                    fill={THEME.colors.paper.cream}
                    fontFamily={THEME.typography.sans}
                    fontSize={14}
                    fontWeight={600}
                  />
                </Rect>
              </Node>
            </Rect>

            <Txt
              text="Por eso, hay que empezar a medir desde ahora"
              position={[0, 220]}
              fill={THEME.colors.earth.deep}
              fontFamily={THEME.typography.serif}
              fontSize={24}
              fontWeight={700}
            />
          </Node>
        </Rect>
      </Node>
    </Node>
  );

  // ==========================================
  // COREOGRAFÍA TEMPORAL EXACTA (23.06 s)
  // ==========================================

  // [0.0s – 2.5s]: Toma Real 1 («El próximo año puede ser más difícil.»)
  yield* waitFor(2.2);

  // Transición hacia INS-04 (~10 frames antes de «De acuerdo con la NOAA...»)
  yield* all(
    footage1Node().opacity(0, 0.35, easeInOutCubic),
    ins04Node().opacity(1, 0.35, easeInOutCubic),
  );

  // [2.5s – 10.2s]: INS-04 (El Niño)
  yield* all(
    ins04Card().opacity(1, 0.6, easeOutCubic),
    warmBlob().size(580, 2.8, easeInOutCubic),
    warmBlobInner().size(340, 2.8, easeInOutCubic),
  );

  yield* all(
    meterBar().width(450, 1.4, easeOutCubic),
    meterVal().opacity(1, 0.5, easeOutCubic),
  );

  yield* waitFor(2.3);

  // Transición hacia Toma Real 2 (~10 frames después de «otoño y el invierno»)
  yield* all(
    ins04Node().opacity(0, 0.35, easeInOutCubic),
    footage2Node().opacity(1, 0.35, easeInOutCubic),
  );

  // [10.2s – 12.8s]: Toma Real 2 («Pero un pronóstico global no nos dice...»)
  yield* waitFor(2.25);

  // Transición hacia INS-05 (~10 frames antes de «aquí, en estas laderas»)
  yield* all(
    footage2Node().opacity(0, 0.35, easeInOutCubic),
    ins05Node().opacity(1, 0.35, easeInOutCubic),
  );

  // [12.8s – 22.8s]: INS-05 (Preguntas escalonadas + incertidumbre)
  // ¿Lloverá menos? (~14.0s)
  yield* all(
    q1Node().opacity(1, 0.5, easeOutCubic),
    q1Node().position.x(0, 0.5, easeOutBack),
  );
  yield* waitFor(1.1);

  // ¿Cuándo llegará la lluvia? (~15.5s)
  yield* all(
    q2Node().opacity(1, 0.5, easeOutCubic),
    q2Node().position.x(0, 0.5, easeOutBack),
  );
  yield* waitFor(1.1);

  // ¿Cuánto cambiará la temporada? (~17.0s)
  yield* all(
    q3Node().opacity(1, 0.5, easeOutCubic),
    q3Node().position.x(0, 0.5, easeOutBack),
  );
  yield* waitFor(2.0);

  // «Por eso, hay que empezar a medir desde ahora» (~20.4s)
  yield* all(
    localMeasureLine().width(460, 1.2, easeInOutCubic),
    stationPin().opacity(1, 0.6, easeOutBack),
    stationPin().scale(1, 0.6, easeOutBack),
  );

  yield* waitFor(1.6);
});
