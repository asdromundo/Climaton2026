import {
  makeScene2D,
  Node,
  Audio,
  Rect,
  Txt,
  Circle,
  Img,
  Gradient,
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

import audioParrafo6 from "../../audio/parrafo6.m4a";
import familiaAsambleaTexture from "../../assets/textures/toma-06-familia-asamblea.png";

/**
 * TOMA 6 MAESTRA · 28.22 s
 * Sincronización continua con parrafo6.m4a
 *
 * Estructura:
 * 1. [0.0s – 4.5s]:   IMAGEN REAL ANIMADA 1 (Familias colaborando y asamblea)
 * 2. [4.5s – 27.5s]:  INS-10 (Línea del tiempo continua: 3 etapas + corchete financiamiento)
 * 3. [27.5s – 28.22s]: Transición a Toma 7
 */
export default makeScene2D("toma-06", function* (view) {
  view.fill(THEME.colors.paper.cream);

  const footage1Node = createRef<Node>();
  const footage1CameraNode = createRef<Node>();
  const ins10Node = createRef<Node>();

  // Elementos INS-10 (Línea del tiempo)
  const timelineBar = createRef<Rect>();
  const step1Node = createRef<Node>();
  const step2Node = createRef<Node>();
  const step3Node = createRef<Node>();
  const fundingBracket = createRef<Node>();

  view.add(
    <Node>
      {/* Audio maestro continuo de la Toma 6 */}
      <Audio src={audioParrafo6} play={true} />

      {/* 1. Capa Toma Real 1 (Familias colaborando y asamblea comunitaria) */}
      <Node ref={footage1Node} opacity={1}>
        <Rect width={1920} height={1080} clip={true}>
          <Node ref={footage1CameraNode} position={[0, 0]} scale={1.01}>
            <Img src={familiaAsambleaTexture} width={1920} height={1080} />
          </Node>

          {/* Sombra de viñeta inferior cinematográfica */}
          <Rect
            width={1920}
            height={160}
            position={[0, 460]}
            fill={
              new Gradient({
                type: "linear",
                from: [0, -80],
                to: [0, 80],
                stops: [
                  { offset: 0, color: "rgba(26,18,16,0)" },
                  { offset: 1, color: "rgba(26,18,16,0.75)" },
                ],
              })
            }
          />

          {/* Cartela contextual elegante */}
          <Rect
            position={[-470, 470]}
            fill={`${THEME.colors.earth.dark}E6`}
            stroke={THEME.colors.earth.ochre}
            lineWidth={1.5}
            radius={8}
            padding={[8, 22]}
          ></Rect>
        </Rect>
      </Node>

      {/* 2. Capa INS-10 (Las tres etapas · Maquetación perfectamente centrada y alineada) */}
      <Node ref={ins10Node} opacity={0}>
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

          {/* Encabezado */}
          <Txt
            text="DESARROLLO EN TRES ETAPAS"
            position={[0, -325]}
            fill={THEME.colors.earth.deep}
            fontFamily={THEME.typography.serif}
            fontSize={46}
            fontWeight={700}
            letterSpacing={3}
          />
          <Txt
            text="Ruta comunitaria de adaptación, implementación y adopción"
            position={[0, -275]}
            fill={THEME.colors.earth.warmClay}
            fontFamily={THEME.typography.sans}
            fontSize={26}
            fontWeight={600}
          />

          {/* Línea horizontal continua de tiempo (centrada de -560 a +560, Y=-170) */}
          <Rect
            ref={timelineBar}
            width={0}
            height={5}
            position={[-560, -170]}
            fill={THEME.colors.earth.ochre}
            offset={[-1, 0]}
            radius={2.5}
          />

          {/* Etapa 1: Adaptación (x: -460) */}
          <Node ref={step1Node} position={[-460, 30]} opacity={0}>
            {/* Círculo indicador sobre la línea del tiempo */}
            <Circle
              size={44}
              fill={THEME.colors.milpa.deepGreen}
              position={[0, -170]}
              stroke={THEME.colors.paper.cream}
              lineWidth={3}
            />
            <Txt
              text="1"
              position={[0, -170]}
              fill={THEME.colors.paper.cream}
              fontFamily={THEME.typography.sans}
              fontSize={22}
              fontWeight={700}
            />

            {/* Conector del círculo hacia la tarjeta */}
            <Rect
              width={4}
              height={26}
              position={[0, -137]}
              fill={THEME.colors.milpa.deepGreen}
              radius={2}
            />

            {/* Tarjeta de contenido */}
            <Rect
              width={440}
              height={280}
              position={[0, 15]}
              fill={THEME.colors.paper.cream}
              stroke={THEME.colors.milpa.leaf}
              lineWidth={2}
              radius={18}
              padding={[22, 26]}
              shadowColor={`${THEME.colors.earth.dark}12`}
              shadowBlur={16}
            >
              <Txt
                text="1 · ADAPTACIÓN"
                position={[0, -85]}
                fill={THEME.colors.milpa.deepGreen}
                fontFamily={THEME.typography.serif}
                fontSize={28}
                fontWeight={700}
              />
              <Txt
                text="Primer año, desde 2027"
                position={[0, -48]}
                fill={THEME.colors.earth.terracotta}
                fontFamily={THEME.typography.sans}
                fontSize={20}
                fontWeight={600}
              />

              <Rect
                width={380}
                height={1.5}
                position={[0, -20]}
                fill={`${THEME.colors.earth.ochre}44`}
              />

              <Txt
                text="• Escuchamos a la comunidad"
                position={[-175, 18]}
                fill={THEME.colors.earth.deep}
                fontFamily={THEME.typography.sans}
                fontSize={21}
                fontWeight={600}
                offset={[-1, 0]}
              />
              <Txt
                text="• Calibramos las estaciones"
                position={[-175, 58]}
                fill={THEME.colors.earth.deep}
                fontFamily={THEME.typography.sans}
                fontSize={21}
                fontWeight={600}
                offset={[-1, 0]}
              />
            </Rect>
          </Node>

          {/* Etapa 2: Implementación (x: 0) */}
          <Node ref={step2Node} position={[0, 30]} opacity={0}>
            {/* Círculo indicador sobre la línea del tiempo */}
            <Circle
              size={44}
              fill={THEME.colors.milpa.leaf}
              position={[0, -170]}
              stroke={THEME.colors.paper.cream}
              lineWidth={3}
            />
            <Txt
              text="2"
              position={[0, -170]}
              fill={THEME.colors.paper.cream}
              fontFamily={THEME.typography.sans}
              fontSize={22}
              fontWeight={700}
            />

            {/* Conector del círculo hacia la tarjeta */}
            <Rect
              width={4}
              height={26}
              position={[0, -137]}
              fill={THEME.colors.milpa.leaf}
              radius={2}
            />

            {/* Tarjeta de contenido */}
            <Rect
              width={440}
              height={280}
              position={[0, 15]}
              fill={THEME.colors.paper.cream}
              stroke={THEME.colors.milpa.leaf}
              lineWidth={2}
              radius={18}
              padding={[22, 26]}
              shadowColor={`${THEME.colors.earth.dark}12`}
              shadowBlur={16}
            >
              <Txt
                text="2 · IMPLEMENTACIÓN"
                position={[0, -85]}
                fill={THEME.colors.milpa.deepGreen}
                fontFamily={THEME.typography.serif}
                fontSize={28}
                fontWeight={700}
              />
              <Txt
                text="Medición y aviso comunitario"
                position={[0, -48]}
                fill={THEME.colors.earth.warmClay}
                fontFamily={THEME.typography.sans}
                fontSize={20}
                fontWeight={600}
              />

              <Rect
                width={380}
                height={1.5}
                position={[0, -20]}
                fill={`${THEME.colors.earth.ochre}44`}
              />

              <Txt
                text="• Las estaciones miden y avisan"
                position={[-175, 18]}
                fill={THEME.colors.earth.deep}
                fontFamily={THEME.typography.sans}
                fontSize={21}
                fontWeight={600}
                offset={[-1, 0]}
              />
              <Txt
                text="• Habitantes monitores locales"
                position={[-175, 58]}
                fill={THEME.colors.earth.deep}
                fontFamily={THEME.typography.sans}
                fontSize={21}
                fontWeight={600}
                offset={[-1, 0]}
              />
            </Rect>
          </Node>

          {/* Etapa 3: Adopción (x: 460) */}
          <Node ref={step3Node} position={[460, 30]} opacity={0}>
            {/* Círculo indicador sobre la línea del tiempo */}
            <Circle
              size={44}
              fill={THEME.colors.earth.ochre}
              position={[0, -170]}
              stroke={THEME.colors.paper.cream}
              lineWidth={3}
            />
            <Txt
              text="3"
              position={[0, -170]}
              fill={THEME.colors.paper.cream}
              fontFamily={THEME.typography.sans}
              fontSize={22}
              fontWeight={700}
            />

            {/* Conector del círculo hacia la tarjeta */}
            <Rect
              width={4}
              height={26}
              position={[0, -137]}
              fill={THEME.colors.earth.ochre}
              radius={2}
            />

            {/* Tarjeta de contenido */}
            <Rect
              width={440}
              height={280}
              position={[0, 15]}
              fill={THEME.colors.paper.cream}
              stroke={THEME.colors.earth.ochre}
              lineWidth={2}
              radius={18}
              padding={[22, 26]}
              shadowColor={`${THEME.colors.earth.dark}12`}
              shadowBlur={16}
            >
              <Txt
                text="3 · ADOPCIÓN"
                position={[0, -85]}
                fill={THEME.colors.earth.deep}
                fontFamily={THEME.typography.serif}
                fontSize={28}
                fontWeight={700}
              />
              <Txt
                text="2028 en adelante"
                position={[0, -48]}
                fill={THEME.colors.earth.terracotta}
                fontFamily={THEME.typography.sans}
                fontSize={20}
                fontWeight={600}
              />

              <Rect
                width={380}
                height={1.5}
                position={[0, -20]}
                fill={`${THEME.colors.earth.ochre}44`}
              />

              <Txt
                text="• La comunidad lo opera sola"
                position={[-175, 18]}
                fill={THEME.colors.earth.deep}
                fontFamily={THEME.typography.sans}
                fontSize={21}
                fontWeight={600}
                offset={[-1, 0]}
              />
              <Txt
                text="• Autonomía y sostenibilidad"
                position={[-175, 58]}
                fill={THEME.colors.earth.deep}
                fontFamily={THEME.typography.sans}
                fontSize={21}
                fontWeight={600}
                offset={[-1, 0]}
              />
            </Rect>
          </Node>

          {/* Resalte / Corchete de Financiamiento (Exactamente debajo de Etapas 1 y 2, ancho 900px, centrado en -230) */}
          <Node
            ref={fundingBracket}
            position={[-230, 245]}
            opacity={0}
            scale={0.92}
          >
            <Rect
              width={900}
              height={76}
              fill={THEME.colors.milpa.deepGreen}
              stroke={THEME.colors.earth.ochre}
              lineWidth={2}
              radius={16}
              padding={[16, 26]}
              shadowColor={`${THEME.colors.milpa.deepGreen}40`}
              shadowBlur={18}
            >
              <Txt
                text="✦ Financiamiento: cubre las dos primeras etapas (Adaptación + Implementación)"
                fill={THEME.colors.paper.cream}
                fontFamily={THEME.typography.sans}
                fontSize={22}
                fontWeight={700}
                letterSpacing={0.5}
              />
            </Rect>
          </Node>
        </Rect>
      </Node>
    </Node>,
  );

  // ==========================================
  // COREOGRAFÍA TEMPORAL EXACTA (28.22 s)
  // ==========================================

  // [0.0s – 4.5s]: Imagen Real Animada 1 (Familias colaborando - cámara Ken Burns)
  yield* all(
    footage1CameraNode().scale(1.05, 4.15, easeInOutCubic),
    footage1CameraNode().position.x(20, 4.15, easeInOutCubic),
    waitFor(4.15),
  );

  // Transición hacia INS-10 (~10 frames antes de «Primero, adaptación...»)
  yield* all(
    footage1Node().opacity(0, 0.35, easeInOutCubic),
    ins10Node().opacity(1, 0.35, easeInOutCubic),
  );

  // [4.5s – 11.5s]: Etapa 1 «Primero, adaptación: durante el primer año, desde 2027...»
  yield* timelineBar().width(1120, 1.8, easeOutCubic);
  yield* all(
    step1Node().opacity(1, 0.6, easeOutBack),
    step1Node().position.y(0, 0.6, easeOutBack),
  );
  yield* waitFor(4.7);

  // [11.5s – 18.5s]: Etapa 2 «Luego, implementación: las estaciones miden y avisan...»
  yield* all(
    step2Node().opacity(1, 0.6, easeOutBack),
    step2Node().position.y(0, 0.6, easeOutBack),
  );
  yield* waitFor(5.2);

  // [18.5s – 22.0s]: Etapa 3 «Y de 2028 en adelante, adopción: la comunidad lo opera sola.»
  yield* all(
    step3Node().opacity(1, 0.6, easeOutBack),
    step3Node().position.y(0, 0.6, easeOutBack),
  );
  yield* waitFor(2.8);

  // [22.0s – 27.5s]: «El financiamiento nos permitirá iniciar las dos primeras etapas.»
  yield* all(
    fundingBracket().opacity(1, 0.75, easeOutBack),
    fundingBracket().scale(1.0, 0.75, easeOutBack),
  );
  yield* waitFor(4.5);

  // [27.5s – 28.22s]: Cierre
  yield* waitFor(1.5);
});
