import {makeScene2D, Node, Rect, Txt, Circle, Audio} from '@revideo/2d';
import {all, createRef, createSignal, easeInOutCubic, easeOutBack, easeOutCubic, waitFor} from '@revideo/core';
import {THEME} from '../theme';

import audioParrafo2 from '../../audio/parrafo2.m4a';

/**
 * INS-03 · La milpa depende de la lluvia
 * Toma 2 · Duración ~12 s (sincronizado con parrafo2.m4a)
 * 
 * Guion:
 * - Tiempo 1: Cuadrícula de 10 parcelas de milpa; caen gotas y el relleno verde rebasa el 90 %.
 *   Texto: «Más del 90 % de la tierra cultivada depende de la lluvia · Fuente: INEGI»
 * - Tiempo 2: Clima impredecible; franja de calendario (mayo–julio);
 *   el marcador de siembra se desliza hasta «finales de junio» y la lluvia llega tarde.
 */
export default makeScene2D('ins-03-milpa-lluvia', function* (view) {
  view.fill(THEME.colors.paper.cream);

  const audio = createRef<Audio>();
  const container = createRef<Node>();

  // Parte 1: Grilla del 90%
  const gridNode = createRef<Node>();
  const statCard = createRef<Rect>();
  const statNumber = createRef<Txt>();
  const rainDrops = Array.from({length: 10}, () => createRef<Circle>());
  const parcelFills = Array.from({length: 10}, () => createRef<Rect>());

  // Parte 2: Calendario de siembra tardía
  const calendarNode = createRef<Node>();
  const calendarSlider = createRef<Node>();
  const dateMarker = createRef<Rect>();
  const delayBadge = createRef<Rect>();

  view.add(
    <Node ref={container}>
      {/* Audio sincronizado de la Toma 2 */}
      <Audio ref={audio} src={audioParrafo2} play={true} />

      {/* ========================================================= */}
      {/* TIEMPO 1: Cuadrícula de 10 parcelas y dato INEGI >90%     */}
      {/* ========================================================= */}
      <Node ref={gridNode} position={[0, -20]}>
        {/* Tarjeta de estadística */}
        <Rect
          ref={statCard}
          position={[-380, -20]}
          width={480}
          height={380}
          fill={THEME.colors.paper.amateLight}
          stroke={THEME.colors.earth.ochre}
          lineWidth={2}
          radius={16}
          padding={[30, 36]}
          shadowColor={`${THEME.colors.earth.dark}22`}
          shadowBlur={25}
          shadowOffset={[0, 6]}
          opacity={0}
          y={0}
        >
          <Txt
            ref={statNumber}
            text=">90%"
            fill={THEME.colors.milpa.deepGreen}
            fontFamily={THEME.typography.serif}
            fontSize={84}
            fontWeight={700}
            position={[0, -70]}
          />
          <Txt
            text="de la tierra cultivada"
            fill={THEME.colors.earth.deep}
            fontFamily={THEME.typography.serif}
            fontSize={30}
            fontWeight={600}
            position={[0, 10]}
          />
          <Txt
            text="depende de la lluvia"
            fill={THEME.colors.climate.rainBlue}
            fontFamily={THEME.typography.serif}
            fontSize={30}
            fontWeight={600}
            position={[0, 50]}
          />
          <Txt
            text="Fuente: INEGI"
            fill={THEME.colors.earth.warmClay}
            fontFamily={THEME.typography.mono}
            fontSize={18}
            position={[0, 120]}
          />
        </Rect>

        {/* Cuadrícula de 10 parcelas (2 filas de 5) */}
        <Node position={[220, -20]}>
          {Array.from({length: 10}).map((_, idx) => {
            const col = idx % 5;
            const row = Math.floor(idx / 5);
            const x = (col - 2) * 110;
            const y = (row - 0.5) * 130;
            const isRainFed = idx < 9; // 9 de 10 parcelas (>90%)

            return (
              <Node position={[x, y]}>
                {/* Gotas de lluvia */}
                <Circle
                  ref={rainDrops[idx]}
                  size={14}
                  fill={THEME.colors.climate.rainBlue}
                  position={[0, -80]}
                  opacity={0}
                />

                {/* Base de la parcela */}
                <Rect
                  width={96}
                  height={106}
                  fill={THEME.colors.paper.cream}
                  stroke={THEME.colors.earth.ochre}
                  lineWidth={2}
                  radius={10}
                >
                  {/* Relleno verde milpa */}
                  <Rect
                    ref={parcelFills[idx]}
                    width={96}
                    height={0}
                    position={[0, 53]}
                    offset={[0, 1]}
                    fill={isRainFed ? THEME.colors.milpa.leaf : '#D8D0C5'}
                    radius={10}
                  />

                  {/* Ícono de maíz/milpa */}
                  <Txt
                    text={isRainFed ? '🌽' : '💧'}
                    fontSize={28}
                    position={[0, 0]}
                    opacity={0.8}
                  />
                </Rect>
              </Node>
            );
          })}
        </Node>
      </Node>

      {/* ========================================================= */}
      {/* TIEMPO 2: Calendario y siembra tardía («finales de junio») */}
      {/* ========================================================= */}
      <Node ref={calendarNode} opacity={0} position={[0, 40]}>
        <Txt
          text="CALENDARIO AGRÍCOLA DE TEMPORAL"
          position={[0, -260]}
          fill={THEME.colors.earth.deep}
          fontFamily={THEME.typography.serif}
          fontSize={38}
          fontWeight={700}
          letterSpacing={3}
        />

        <Txt
          text="El clima impredecible retrasa la fecha de siembra"
          position={[0, -210]}
          fill={THEME.colors.climate.droughtOrange}
          fontFamily={THEME.typography.sans}
          fontSize={24}
        />

        {/* Barra de meses: Mayo, Junio, Julio */}
        <Rect
          width={1100}
          height={110}
          fill={THEME.colors.paper.amateLight}
          stroke={THEME.colors.earth.ochre}
          lineWidth={2.5}
          radius={16}
          position={[0, -40]}
        >
          {/* Divisores de mes */}
          <Rect width={2} height={110} position={[-183, 0]} fill={THEME.colors.earth.ochre} />
          <Rect width={2} height={110} position={[183, 0]} fill={THEME.colors.earth.ochre} />

          {/* Rótulos de meses */}
          <Txt text="MAYO" position={[-366, -15]} fill={THEME.colors.earth.deep} fontFamily={THEME.typography.serif} fontSize={28} fontWeight={700} />
          <Txt text="Siembra histórica" position={[-366, 25]} fill={THEME.colors.milpa.nopal} fontFamily={THEME.typography.sans} fontSize={16} />

          <Txt text="JUNIO" position={[0, -15]} fill={THEME.colors.earth.deep} fontFamily={THEME.typography.serif} fontSize={28} fontWeight={700} />

          <Txt text="JULIO" position={[366, -15]} fill={THEME.colors.earth.deep} fontFamily={THEME.typography.serif} fontSize={28} fontWeight={700} />
          <Txt text="Lluvia retrasada" position={[366, 25]} fill={THEME.colors.climate.droughtOrange} fontFamily={THEME.typography.sans} fontSize={16} />
        </Rect>

        {/* Marcador deslizante de fecha de siembra */}
        <Node ref={calendarSlider} position={[-366, -40]}>
          <Rect
            ref={dateMarker}
            width={170}
            height={130}
            fill={`${THEME.colors.climate.droughtOrange}26`}
            stroke={THEME.colors.climate.droughtOrange}
            lineWidth={3.5}
            radius={14}
            shadowColor={`${THEME.colors.climate.droughtOrange}55`}
            shadowBlur={18}
          >
            <Txt
              text="SIEMBRA"
              position={[0, -35]}
              fill={THEME.colors.climate.droughtOrange}
              fontFamily={THEME.typography.sans}
              fontSize={14}
              fontWeight={700}
              letterSpacing={2}
            />
            <Txt
              text="Finales de"
              position={[0, 0]}
              fill={THEME.colors.earth.dark}
              fontFamily={THEME.typography.serif}
              fontSize={20}
            />
            <Txt
              text="JUNIO"
              position={[0, 30]}
              fill={THEME.colors.earth.dark}
              fontFamily={THEME.typography.serif}
              fontSize={26}
              fontWeight={700}
            />
          </Rect>
        </Node>

        {/* Placa informativa de retraso */}
        <Rect
          ref={delayBadge}
          position={[140, 140]}
          fill={THEME.colors.earth.deep}
          radius={10}
          padding={[14, 28]}
          shadowColor={`${THEME.colors.earth.dark}44`}
          shadowBlur={16}
          opacity={0}
        >
          <Txt
            text="⚠️ RETRASO CRÍTICO: La siembra se desplaza hasta finales de junio"
            fill={THEME.colors.paper.cream}
            fontFamily={THEME.typography.sans}
            fontSize={22}
            fontWeight={600}
          />
        </Rect>
      </Node>
    </Node>
  );

  // ==========================================
  // COREOGRAFÍA TEMPORAL EXACTA CON PARRAFO 2
  // ==========================================

  // [0.0s – 2.8s]: «De acuerdo al INEGI, en la Ciudad de México...»
  yield* waitFor(2.8);

  // [2.8s – 6.0s]: «...más del 90% de la tierra cultivada depende de la lluvia.»
  yield* all(
    statCard().opacity(1, 0.8, easeOutCubic),
    statCard().position.y(-20, 0.8, easeOutCubic),
  );

  // Caen gotas y se llenan las parcelas (>90%)
  for (let i = 0; i < 10; i++) {
    const isRainFed = i < 9;
    rainDrops[i]().opacity(1, 0.1);
    rainDrops[i]().position.y(-30, 0.25, easeInOutCubic);
    if (isRainFed) {
      parcelFills[i]().height(106, 0.35, easeOutCubic);
    }
    yield* waitFor(0.08);
  }

  yield* waitFor(0.8);

  // [6.0s – 12.0s]: «Y con un clima cada vez más impredecible, hay años en que la siembra se retrasa hasta finales de junio.»
  // Transición: Salida de la cuadrícula y entrada del calendario
  yield* all(
    gridNode().opacity(0, 0.7, easeInOutCubic),
    gridNode().scale(0.9, 0.7, easeInOutCubic),
    calendarNode().opacity(1, 0.9, easeOutCubic),
  );

  yield* waitFor(0.5);

  // El marcador de siembra se desliza desde Mayo hasta «finales de junio»
  yield* all(
    // Posición final de "finales de junio" (+140 px en la barra)
    calendarSlider().position.x(140, 2.0, easeInOutCubic),
    delayBadge().opacity(1, 1.2, easeOutCubic),
  );

  // [12.0s – 13.0s]: Pausa del guion
  yield* waitFor(2.0);

  // Salida hacia la toma real
  yield* all(
    container().opacity(0, 0.7, easeInOutCubic),
  );
});
