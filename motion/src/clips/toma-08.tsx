import { makeScene2D, Node, Audio, Rect, Img } from "@revideo/2d";
import {
  all,
  createRef,
  easeInOutCubic,
  easeOutBack,
  easeOutCubic,
  waitFor,
} from "@revideo/core";
import { THEME } from "../theme";

import audioParrafo8 from "../../audio/parrafo8.m4a";
import logoCehuamilli from "../../assets/textures/logo_cehuamilli.jpg";
import logoUnam from "../../assets/textures/logo_unam.jpeg";
import logoClimaton from "../../assets/textures/logo_climaton.jpg";

/**
 * TOMA 8 MAESTRA · 8.70 s
 * Sincronización continua con parrafo8.m4a
 *
 * Estructura:
 * 1. [0.0s – 4.7s]:   Entrada de la tríada institucional (UNAM, Cehuamilli, Climatón 2026)
 * 2. [4.7s – 8.70s]:  A la mitad de la toma («Somos Cehuamilli»), Cehuamilli crece hasta
 *                     ocupar la mitad de la toma (~520px de altura) como héroe central.
 */
export default makeScene2D("toma-08", function* (view) {
  view.fill(THEME.colors.paper.cream);

  const cehuamilliNode = createRef<Node>();
  const unamNode = createRef<Node>();
  const climatonNode = createRef<Node>();

  view.add(
    <Node>
      {/* Audio maestro continuo de la Toma 8 */}
      <Audio src={audioParrafo8} play={true} />

      {/* Contenedor central de cierre editorial */}
      <Rect
        width={1600}
        height={820}
        fill={THEME.colors.paper.amateLight}
        stroke={THEME.colors.earth.ochre}
        lineWidth={2.5}
        radius={24}
        position={[0, 0]}
        padding={[40, 50]}
        shadowColor={`${THEME.colors.earth.dark}20`}
        shadowBlur={22}
      >
        {/* Filete decorativo interior */}
        <Rect
          width={1540}
          height={760}
          stroke={`${THEME.colors.earth.ochre}70`}
          lineWidth={1.5}
          radius={18}
        />

        {/* 1. Logo UNAM (Izquierda) */}
        <Node ref={unamNode} position={[-530, 0]} opacity={0}>
          <Rect
            width={340}
            height={180}
            fill="#FFFFFF"
            stroke={THEME.colors.earth.ochre}
            lineWidth={2}
            radius={20}
            clip={true}
            shadowColor={`${THEME.colors.earth.dark}16`}
            shadowBlur={16}
          >
            <Img src={logoUnam} width={300} height={145} radius={12} />
          </Rect>
        </Node>

        {/* 2. Logo Cehuamilli (Centro, que crece a escala hero hasta ~520px) */}
        <Node ref={cehuamilliNode} position={[0, 0]} opacity={0} scale={0.85}>
          <Rect
            width={360}
            height={360}
            fill={THEME.colors.paper.cream}
            stroke={THEME.colors.earth.terracotta}
            lineWidth={3.5}
            radius={28}
            clip={true}
            shadowColor={`${THEME.colors.earth.dark}28`}
            shadowBlur={26}
          >
            <Img src={logoCehuamilli} width={360} height={360} radius={28} />
          </Rect>
        </Node>

        {/* 3. Logo Climatón 2026 (Derecha) */}
        <Node ref={climatonNode} position={[530, 0]} opacity={0}>
          <Rect
            width={280}
            height={280}
            fill={THEME.colors.paper.cream}
            stroke={THEME.colors.earth.ochre}
            lineWidth={2}
            radius={22}
            clip={true}
            shadowColor={`${THEME.colors.earth.dark}16`}
            shadowBlur={16}
          >
            <Img src={logoClimaton} width={250} height={250} radius={16} />
          </Rect>
        </Node>
      </Rect>
    </Node>,
  );

  // ==========================================
  // COREOGRAFÍA TEMPORAL EXACTA (8.70 s)
  // ==========================================

  // [0.0s – 0.5s]: Breve entrada inicial
  yield* waitFor(0.5);

  // [0.5s – 1.6s]: Entrada armónica de los tres logotipos
  yield* all(
    cehuamilliNode().opacity(1, 0.75, easeOutCubic),
    cehuamilliNode().scale(1.0, 0.75, easeOutBack),
    unamNode().opacity(1, 0.7, easeOutCubic),
    unamNode().position.x(-490, 0.7, easeOutCubic),
    climatonNode().opacity(1, 0.7, easeOutCubic),
    climatonNode().position.x(490, 0.7, easeOutCubic),
  );

  // [1.6s – 4.7s]: «Si la milpa sigue en pie, la alegría, el olivo y los quelites también.»
  yield* waitFor(3.1);

  // [4.7s – 5.8s]: A la mitad de la toma («Somos Cehuamilli: alertas que nacen de la tierra»)
  // El logo de Cehuamilli crece hasta ocupar la mitad de la toma (~520px de altura)
  // y los logos laterales se ajustan hacia afuera con suavidad
  yield* all(
    cehuamilliNode().scale(1.42, 0.95, easeOutBack),
    unamNode().position.x(-560, 0.95, easeInOutCubic),
    climatonNode().position.x(560, 0.95, easeInOutCubic),
  );

  // [5.8s – 8.70s]: Presencia monumental de cierre del video máster
  yield* waitFor(2.9);
});
