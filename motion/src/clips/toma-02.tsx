import {makeScene2D, Node, Audio, Rect, Txt, Circle} from '@revideo/2d';
import {all, createRef, easeInOutCubic, easeOutBack, easeOutCubic, waitFor} from '@revideo/core';
import {THEME} from '../theme';
import {VideoPlaceholder} from '../components/VideoPlaceholder';

import audioParrafo2 from '../../audio/parrafo2.m4a';

/**
 * TOMA 2 MAESTRA · 20.24 s
 * Sincronización continua con parrafo2.m4a
 * 
 * Estructura:
 * 1. [0.0s – 2.8s]:   TOMA REAL (Parcelas de temporal en la CDMX)
 * 2. [2.8s – 12.2s]:  INS-03 (Grilla >90% INEGI + Calendario siembra tardía finales de junio)
 * 3. [12.2s – 20.24s]: TOMA REAL (Agricultores y testimonio sobre saber tradicional)
 */
export default makeScene2D('toma-02', function* (view) {
  view.fill(THEME.colors.paper.cream);

  const footage1Node = createRef<Node>();
  const ins03Node = createRef<Node>();
  const footage2Node = createRef<Node>();

  // Elementos internos de INS-03
  const gridNode = createRef<Node>();
  const statCard = createRef<Rect>();
  const rainDrops = Array.from({length: 10}, () => createRef<Circle>());
  const parcelFills = Array.from({length: 10}, () => createRef<Rect>());

  const calendarNode = createRef<Node>();
  const calendarSlider = createRef<Node>();
  const delayBadge = createRef<Rect>();

  view.add(
    <Node>
      {/* 1. Audio maestro continuo de la Toma 2 */}
      <Audio src={audioParrafo2} play={true} />

      {/* 2. Capa Toma Real 1 */}
      <Node ref={footage1Node} opacity={1}>
        <VideoPlaceholder
          title="Parcelas de temporal en la CDMX"
          cue="De acuerdo al INEGI, en la Ciudad de México..."
          suggestedFile="toma-02-parcelas-temporal.mp4"
          durationSeconds={2.8}
        />
      </Node>

      {/* 3. Capa INS-03 (La milpa depende de la lluvia) */}
      <Node ref={ins03Node} opacity={0}>
        {/* TIEMPO 1: Cuadrícula de 10 parcelas (>90% INEGI) */}
        <Node ref={gridNode} position={[0, -20]}>
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

          <Node position={[220, -20]}>
            {Array.from({length: 10}).map((_, idx) => {
              const col = idx % 5;
              const row = Math.floor(idx / 5);
              const x = (col - 2) * 110;
              const y = (row - 0.5) * 130;
              const isRainFed = idx < 9;

              return (
                <Node position={[x, y]}>
                  <Circle
                    ref={rainDrops[idx]}
                    size={14}
                    fill={THEME.colors.climate.rainBlue}
                    position={[0, -80]}
                    opacity={0}
                  />
                  <Rect
                    width={96}
                    height={106}
                    fill={THEME.colors.paper.cream}
                    stroke={THEME.colors.earth.ochre}
                    lineWidth={2}
                    radius={10}
                  >
                    <Rect
                      ref={parcelFills[idx]}
                      width={96}
                      height={0}
                      position={[0, 53]}
                      offset={[0, 1]}
                      fill={isRainFed ? THEME.colors.milpa.leaf : '#D8D0C5'}
                      radius={10}
                    />
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

        {/* TIEMPO 2: Calendario y siembra tardía */}
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

          <Rect
            width={1100}
            height={110}
            fill={THEME.colors.paper.amateLight}
            stroke={THEME.colors.earth.ochre}
            lineWidth={2.5}
            radius={16}
            position={[0, -40]}
          >
            <Rect width={2} height={110} position={[-183, 0]} fill={THEME.colors.earth.ochre} />
            <Rect width={2} height={110} position={[183, 0]} fill={THEME.colors.earth.ochre} />
            <Txt text="MAYO" position={[-366, -15]} fill={THEME.colors.earth.deep} fontFamily={THEME.typography.serif} fontSize={28} fontWeight={700} />
            <Txt text="Siembra habitual" position={[-366, 25]} fill={THEME.colors.milpa.nopal} fontFamily={THEME.typography.sans} fontSize={16} />

            <Txt text="JUNIO" position={[0, -15]} fill={THEME.colors.earth.deep} fontFamily={THEME.typography.serif} fontSize={28} fontWeight={700} />

            <Txt text="JULIO" position={[366, -15]} fill={THEME.colors.earth.deep} fontFamily={THEME.typography.serif} fontSize={28} fontWeight={700} />
            <Txt text="Lluvia retrasada" position={[366, 25]} fill={THEME.colors.climate.droughtOrange} fontFamily={THEME.typography.sans} fontSize={16} />
          </Rect>

          <Node ref={calendarSlider} position={[-366, -40]}>
            <Rect
              width={170}
              height={130}
              fill={`${THEME.colors.climate.droughtOrange}26`}
              stroke={THEME.colors.climate.droughtOrange}
              lineWidth={3.5}
              radius={14}
              shadowColor={`${THEME.colors.climate.droughtOrange}55`}
              shadowBlur={18}
            >
              <Txt text="SIEMBRA" position={[0, -35]} fill={THEME.colors.climate.droughtOrange} fontFamily={THEME.typography.sans} fontSize={14} fontWeight={700} letterSpacing={2} />
              <Txt text="Finales de" position={[0, 0]} fill={THEME.colors.earth.dark} fontFamily={THEME.typography.serif} fontSize={20} />
              <Txt text="JUNIO" position={[0, 30]} fill={THEME.colors.earth.dark} fontFamily={THEME.typography.serif} fontSize={26} fontWeight={700} />
            </Rect>
          </Node>

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

      {/* 4. Capa Toma Real 2 */}
      <Node ref={footage2Node} opacity={0}>
        <VideoPlaceholder
          title="Agricultores y el saber tradicional"
          cue="Quienes siembran lo enfrentan solos... el saber tradicional se está perdiendo."
          suggestedFile="toma-02-saber-tradicional.mp4"
          durationSeconds={8.0}
        />
      </Node>
    </Node>
  );

  // ==========================================
  // COREOGRAFÍA TEMPORAL EXACTA (20.24 s)
  // ==========================================

  // [0.0s – 2.8s]: Toma Real 1 («De acuerdo al INEGI, en la Ciudad de México...»)
  yield* waitFor(2.5);

  // Transición: Footage 1 sale, INS-03 entra (~10 frames antes de «más del 90%»)
  yield* all(
    footage1Node().opacity(0, 0.35, easeInOutCubic),
    ins03Node().opacity(1, 0.35, easeInOutCubic),
  );

  // [2.8s – 6.0s]: «...más del 90% de la tierra cultivada depende de la lluvia.»
  yield* all(
    statCard().opacity(1, 0.7, easeOutCubic),
    statCard().position.y(-20, 0.7, easeOutCubic),
  );

  for (let i = 0; i < 10; i++) {
    const isRainFed = i < 9;
    rainDrops[i]().opacity(1, 0.1);
    rainDrops[i]().position.y(-30, 0.22, easeInOutCubic);
    if (isRainFed) {
      parcelFills[i]().height(106, 0.3, easeOutCubic);
    }
    yield* waitFor(0.06);
  }
  yield* waitFor(0.6);

  // [6.0s – 12.2s]: «Y con un clima cada vez más impredecible... finales de junio.»
  yield* all(
    gridNode().opacity(0, 0.6, easeInOutCubic),
    gridNode().scale(0.9, 0.6, easeInOutCubic),
    calendarNode().opacity(1, 0.8, easeOutCubic),
  );

  yield* waitFor(0.4);

  // Desplazamiento del marcador a finales de junio
  yield* all(
    calendarSlider().position.x(140, 1.8, easeInOutCubic),
    delayBadge().opacity(1, 1.0, easeOutCubic),
  );

  yield* waitFor(2.2);

  // Transición hacia Toma Real 2 (~10 frames después de «finales de junio»)
  yield* all(
    ins03Node().opacity(0, 0.35, easeInOutCubic),
    footage2Node().opacity(1, 0.35, easeInOutCubic),
  );

  // [12.2s – 20.24s]: Toma Real 2 («Quienes siembran lo enfrentan solos...»)
  yield* waitFor(10.2);
});
