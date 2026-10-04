import {makeScene2D, Node, Audio, Rect, Txt, Circle, Path} from '@revideo/2d';
import {all, createRef, easeInOutCubic, easeOutBack, easeOutCubic, waitFor} from '@revideo/core';
import {THEME} from '../theme';
import {VideoPlaceholder} from '../components/VideoPlaceholder';

import audioParrafo5 from '../../audio/parrafo5.m4a';

/**
 * TOMA 5 MAESTRA · 21.61 s
 * Sincronización continua con parrafo5.m4a
 * 
 * Estructura:
 * 1. [0.0s – 5.4s]:   TOMA REAL 1 (Taller comunitario / redacción)
 * 2. [5.4s – 16.5s]:  INS-09 (El manual vivo: saber + datos, fichas sequía/ventarrón/helada)
 * 3. [16.5s – 21.61s]: TOMA REAL 2 (Comunidad firmando y como autores)
 */
export default makeScene2D('toma-05', function* (view) {
  view.fill(THEME.colors.paper.cream);

  const footage1Node = createRef<Node>();
  const ins09Node = createRef<Node>();
  const footage2Node = createRef<Node>();

  // Elementos INS-09 (Manual Vivo)
  const threadTradition = createRef<Path>();
  const threadData = createRef<Path>();
  const manualCard = createRef<Rect>();
  const cardSequia = createRef<Node>();
  const cardVentarron = createRef<Node>();
  const cardHelada = createRef<Node>();
  const annualRing = createRef<Circle>();

  view.add(
    <Node>
      {/* Audio maestro continuo de la Toma 5 */}
      <Audio src={audioParrafo5} play={true} />

      {/* 1. Capa Toma Real 1 */}
      <Node ref={footage1Node} opacity={1}>
        <VideoPlaceholder
          title="Taller comunitario y diálogo con productores"
          cue="El corazón de Cehuamilli es un manual vivo y adaptable, que la comunidad escribe junto a nosotros:"
          suggestedFile="toma-05-taller-comunitario.mp4"
          durationSeconds={5.4}
        />
      </Node>

      {/* 2. Capa INS-09 (Manual Vivo) */}
      <Node ref={ins09Node} opacity={0}>
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
            text="MANUAL VIVO Y ADAPTABLE"
            position={[0, -310]}
            fill={THEME.colors.earth.deep}
            fontFamily={THEME.typography.serif}
            fontSize={38}
            fontWeight={700}
            letterSpacing={3}
          />
          <Txt
            text="Saber tradicional + Datos de las estaciones"
            position={[0, -265]}
            fill={THEME.colors.earth.warmClay}
            fontFamily={THEME.typography.sans}
            fontSize={22}
          />

          {/* Dos hilos que se aproximan y trenzan */}
          <Node position={[0, -180]}>
            <Path
              ref={threadTradition}
              data="M -400,0 C -200,0 -100,20 0,0"
              stroke={THEME.colors.earth.terracotta}
              lineWidth={4}
              opacity={0.8}
            />
            <Txt text="Saber tradicional" position={[-250, -25]} fill={THEME.colors.earth.terracotta} fontFamily={THEME.typography.sans} fontSize={18} fontWeight={700} />

            <Path
              ref={threadData}
              data="M 400,0 C 200,0 100,-20 0,0"
              stroke={THEME.colors.climate.rainBlue}
              lineWidth={4}
              opacity={0.8}
            />
            <Txt text="Datos de estaciones" position={[250, -25]} fill={THEME.colors.climate.rainBlue} fontFamily={THEME.typography.sans} fontSize={18} fontWeight={700} />
          </Node>

          {/* Carpeta / Manual con fichas de acción */}
          <Rect
            ref={manualCard}
            width={1100}
            height={360}
            position={[0, 40]}
            fill={THEME.colors.paper.cream}
            stroke={THEME.colors.earth.ochre}
            lineWidth={2}
            radius={18}
            padding={[24, 30]}
            shadowColor={`${THEME.colors.earth.dark}20`}
            shadowBlur={20}
          >
            {/* 3 fichas de contingencia */}
            {/* 1. Sequía */}
            <Node ref={cardSequia} position={[-340, -10]} opacity={0} y={30}>
              <Rect width={300} height={260} fill={THEME.colors.paper.amateLight} stroke={THEME.colors.earth.ochre} lineWidth={1.5} radius={14} padding={[18, 16]}>
                <Txt text="☀️" fontSize={48} position={[0, -65]} />
                <Txt text="SEQUÍA" position={[0, 0]} fill={THEME.colors.climate.droughtOrange} fontFamily={THEME.typography.serif} fontSize={28} fontWeight={700} />
                <Txt text="Manejo de suelo y humedad" position={[0, 42]} fill={THEME.colors.earth.deep} fontFamily={THEME.typography.sans} fontSize={18} fontWeight={600} />
                <Txt text="Acción preventiva" position={[0, 78]} fill={THEME.colors.earth.warmClay} fontFamily={THEME.typography.sans} fontSize={16} />
              </Rect>
            </Node>

            {/* 2. Ventarrón */}
            <Node ref={cardVentarron} position={[0, -10]} opacity={0} y={30}>
              <Rect width={300} height={260} fill={THEME.colors.paper.amateLight} stroke={THEME.colors.earth.ochre} lineWidth={1.5} radius={14} padding={[18, 16]}>
                <Txt text="💨" fontSize={48} position={[0, -65]} />
                <Txt text="VENTARRÓN" position={[0, 0]} fill={THEME.colors.climate.skyMist} fontFamily={THEME.typography.serif} fontSize={28} fontWeight={700} />
                <Txt text="Protección de espigas y corte" position={[0, 42]} fill={THEME.colors.earth.deep} fontFamily={THEME.typography.sans} fontSize={18} fontWeight={600} />
                <Txt text="Aviso de ráfagas" position={[0, 78]} fill={THEME.colors.earth.warmClay} fontFamily={THEME.typography.sans} fontSize={16} />
              </Rect>
            </Node>

            {/* 3. Helada */}
            <Node ref={cardHelada} position={[340, -10]} opacity={0} y={30}>
              <Rect width={300} height={260} fill={THEME.colors.paper.amateLight} stroke={THEME.colors.earth.ochre} lineWidth={1.5} radius={14} padding={[18, 16]}>
                <Txt text="❄️" fontSize={48} position={[0, -65]} />
                <Txt text="HELADA" position={[0, 0]} fill={THEME.colors.climate.frost} fontFamily={THEME.typography.serif} fontSize={28} fontWeight={700} />
                <Txt text="Temperatura crítica en cumbre" position={[0, 42]} fill={THEME.colors.earth.deep} fontFamily={THEME.typography.sans} fontSize={18} fontWeight={600} />
                <Txt text="Alerta anticipada" position={[0, 78]} fill={THEME.colors.earth.warmClay} fontFamily={THEME.typography.sans} fontSize={16} />
              </Rect>
            </Node>
          </Rect>

          {/* Anillo de actualización anual */}
          <Node position={[0, 275]}>
            <Circle
              ref={annualRing}
              size={40}
              stroke={THEME.colors.milpa.deepGreen}
              lineWidth={3}
              opacity={0.8}
            />
            <Txt
              text="↺ Se actualiza cada año con la comunidad"
              position={[0, 0]}
              fill={THEME.colors.milpa.deepGreen}
              fontFamily={THEME.typography.sans}
              fontSize={22}
              fontWeight={700}
            />
          </Node>
        </Rect>
      </Node>

      {/* 3. Capa Toma Real 2 */}
      <Node ref={footage2Node} opacity={0}>
        <VideoPlaceholder
          title="Comunidad como autora del conocimiento"
          cue="...y en él queda plasmado su conocimiento, con ellos como autores."
          suggestedFile="toma-05-comunidad-autores.mp4"
          durationSeconds={5.11}
        />
      </Node>
    </Node>
  );

  // ==========================================
  // COREOGRAFÍA TEMPORAL EXACTA (21.61 s)
  // ==========================================

  // [0.0s – 5.4s]: Toma Real 1
  yield* waitFor(5.05);

  // Transición hacia INS-09 (~10 frames antes de «junta su saber tradicional...»)
  yield* all(
    footage1Node().opacity(0, 0.35, easeInOutCubic),
    ins09Node().opacity(1, 0.35, easeInOutCubic),
  );

  // [5.4s – 16.5s]: INS-09 (Fichas del manual y ciclo anual)
  // Entrada ficha 1: Sequía
  yield* all(
    cardSequia().opacity(1, 0.6, easeOutBack),
    cardSequia().position.y(-10, 0.6, easeOutBack),
  );
  yield* waitFor(1.5);

  // Entrada ficha 2: Ventarrón
  yield* all(
    cardVentarron().opacity(1, 0.6, easeOutBack),
    cardVentarron().position.y(-10, 0.6, easeOutBack),
  );
  yield* waitFor(1.5);

  // Entrada ficha 3: Helada
  yield* all(
    cardHelada().opacity(1, 0.6, easeOutBack),
    cardHelada().position.y(-10, 0.6, easeOutBack),
  );
  yield* waitFor(2.0);

  // Rotación del ciclo anual («Se actualiza cada año»)
  yield* annualRing().rotation(360, 2.0, easeInOutCubic);
  yield* waitFor(2.15);

  // Transición hacia Toma Real 2 (~10 frames después de «Se actualiza cada año»)
  yield* all(
    ins09Node().opacity(0, 0.35, easeInOutCubic),
    footage2Node().opacity(1, 0.35, easeInOutCubic),
  );

  // [16.5s – 21.61s]: Toma Real 2
  yield* waitFor(5.6);
});
