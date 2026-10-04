import {makeScene2D, Node, Audio, Rect, Txt, Circle, Path} from '@revideo/2d';
import {all, createRef, easeInOutCubic, easeOutBack, easeOutCubic, waitFor} from '@revideo/core';
import {THEME} from '../theme';

import audioParrafo8 from '../../audio/parrafo8.m4a';

/**
 * TOMA 8 MAESTRA · 8.70 s
 * Sincronización continua con parrafo8.m4a
 * 
 * Estructura:
 * 1. [0.0s – 4.5s]:   INS-13 (Crecimiento de la milpa: alegría, olivo y quelites)
 * 2. [4.5s – 5.5s]:   Pausa serena
 * 3. [5.5s – 8.70s]:  Título Cehuamilli + Alertas que nacen de la tierra + Logos oficiales
 */
export default makeScene2D('toma-08', function* (view) {
  view.fill(THEME.colors.paper.cream);

  const milpaNode = createRef<Node>();
  const stalkCorn = createRef<Rect>();
  const earAmaranto = createRef<Path>();
  const branchOlivo = createRef<Path>();
  const leafQuelites = createRef<Path>();

  const titleNode = createRef<Node>();
  const logosArea = createRef<Node>();

  view.add(
    <Node>
      {/* Audio maestro continuo de la Toma 8 */}
      <Audio src={audioParrafo8} play={true} />

      {/* Contenedor central de cierre */}
      <Rect
        width={1600}
        height={800}
        fill={THEME.colors.paper.amateLight}
        stroke={THEME.colors.earth.ochre}
        lineWidth={2.5}
        radius={24}
        position={[0, 0]}
        padding={[40, 50]}
        clip={true}
      >
        {/* Gráfica botánica: Milpa + Alegría + Olivo + Quelites */}
        <Node ref={milpaNode} position={[0, 120]}>
          {/* Suelo fértil */}
          <Rect width={1000} height={6} position={[0, 160]} fill={THEME.colors.earth.terracotta} radius={3} />

          {/* Tallo de maíz central */}
          <Rect
            ref={stalkCorn}
            width={12}
            height={0}
            position={[0, 160]}
            offset={[0, 1]}
            fill={THEME.colors.milpa.deepGreen}
            radius={6}
          />

          {/* Espiga de amaranto / alegría */}
          <Path
            ref={earAmaranto}
            data="M -40,40 C -80,-10 -90,-80 -40,-130 C -20,-80 -10,-10 -40,40 Z"
            fill={THEME.colors.earth.terracotta}
            opacity={0}
            scale={0}
          />
          <Txt text="🌾 Alegría" position={[-110, -50]} fill={THEME.colors.earth.terracotta} fontFamily={THEME.typography.sans} fontSize={20} fontWeight={700} opacity={0.95} />

          {/* Rama de olivo */}
          <Path
            ref={branchOlivo}
            data="M 40,60 C 80,10 90,-50 50,-100 C 30,-50 20,-10 40,60 Z"
            fill={THEME.colors.milpa.nopal}
            opacity={0}
            scale={0}
          />
          <Txt text="🌿 Olivo" position={[110, -30]} fill={THEME.colors.milpa.nopal} fontFamily={THEME.typography.sans} fontSize={20} fontWeight={700} opacity={0.95} />

          {/* Quelites al ras del suelo */}
          <Path
            ref={leafQuelites}
            data="M -150,160 C -190,130 -160,100 -120,120 C -130,140 -140,150 -150,160 Z"
            fill={THEME.colors.milpa.leaf}
            opacity={0}
            scale={0}
          />
          <Txt text="🌱 Quelites" position={[-170, 95]} fill={THEME.colors.milpa.leaf} fontFamily={THEME.typography.sans} fontSize={20} fontWeight={700} opacity={0.95} />
        </Node>

        {/* Título de cierre y lema */}
        <Node ref={titleNode} position={[0, -180]} opacity={0} y={-140}>
          <Txt
            text="CEHUAMILLI"
            fill={THEME.colors.earth.deep}
            fontFamily={THEME.typography.serif}
            fontSize={72}
            fontWeight={700}
            letterSpacing={6}
          />
          <Txt
            text="Alertas que nacen de la tierra"
            position={[0, 65]}
            fill={THEME.colors.milpa.deepGreen}
            fontFamily={THEME.typography.serif}
            fontSize={32}
            fontStyle="italic"
          />
        </Node>

        {/* Área de Logotipos Institucionales */}
        <Node ref={logosArea} position={[0, 310]} opacity={0}>
          <Rect width={1100} height={80} fill={THEME.colors.paper.cream} stroke={THEME.colors.earth.ochre} lineWidth={1.5} radius={14} padding={[10, 30]}>
            <Node position={[-360, 0]}>
              <Rect width={220} height={46} fill={THEME.colors.paper.amateLight} radius={8}>
                <Txt text="[LOGO: CEHUAMILLI]" fill={THEME.colors.earth.deep} fontFamily={THEME.typography.mono} fontSize={17} fontWeight={600} />
              </Rect>
            </Node>
            <Node position={[0, 0]}>
              <Rect width={220} height={46} fill={THEME.colors.paper.amateLight} radius={8}>
                <Txt text="[LOGO: UNAM]" fill={THEME.colors.earth.deep} fontFamily={THEME.typography.mono} fontSize={17} fontWeight={600} />
              </Rect>
            </Node>
            <Node position={[360, 0]}>
              <Rect width={240} height={46} fill={THEME.colors.paper.amateLight} radius={8}>
                <Txt text="[LOGO: CLIMATÓN 2026]" fill={THEME.colors.earth.deep} fontFamily={THEME.typography.mono} fontSize={17} fontWeight={600} />
              </Rect>
            </Node>
          </Rect>
        </Node>
      </Rect>
    </Node>
  );

  // ==========================================
  // COREOGRAFÍA TEMPORAL EXACTA (8.70 s)
  // ==========================================

  // [0.0s – 4.5s]: «Si la milpa sigue en pie, la alegría, el olivo y los quelites también.»
  yield* stalkCorn().height(260, 1.4, easeOutCubic);

  yield* all(
    earAmaranto().opacity(1, 0.6, easeOutBack),
    earAmaranto().scale(1, 0.6, easeOutBack),
    branchOlivo().opacity(1, 0.6, easeOutBack),
    branchOlivo().scale(1, 0.6, easeOutBack),
    leafQuelites().opacity(1, 0.6, easeOutBack),
    leafQuelites().scale(1, 0.6, easeOutBack),
  );

  // [4.5s – 5.5s]: Pausa serena
  yield* waitFor(1.5);

  // [5.5s – 8.70s]: «Somos Cehuamilli: alertas que nacen de la tierra.»
  yield* all(
    titleNode().opacity(1, 0.8, easeOutBack),
    titleNode().position.y(-180, 0.8, easeOutBack),
    logosArea().opacity(1, 0.8, easeOutCubic),
  );

  yield* waitFor(4.5);
});
