import {
  makeScene2D,
  Node,
  Audio,
  Video,
  Img,
  Rect,
  Txt,
  Gradient,
} from "@revideo/2d";
import {
  all,
  createRef,
  easeInOutCubic,
  easeOutCubic,
  waitFor,
} from "@revideo/core";
import { THEME } from "../theme";
import { CdmxMapAnimation } from "../components/CdmxMapAnimation";
import { AmarantoChainAnimation } from "../components/AmarantoChainAnimation";

import audioParrafo1 from "../../audio/parrafo1.m4a";
import videoCosechaLadera from "../../footage/toma-01-cosecha-ladera.mp4";
import alegriaImgTexture from "../../assets/textures/toma-01-mujeres-comal.jpg";

/**
 * TOMA 1 MAESTRA · 19.65 s
 * Sincronización continua con parrafo1.m4a
 *
 * Estructura y ritmos (respetando ~10 frames antes y después de cada frase):
 * 1. [0.0s – 3.0s]:   TOMA REAL (Cosecha de amaranto en la ladera)
 * 2. [3.0s – 7.8s]:   INS-01 (Mapa CDMX -> Zoom Teuhtli -> Pin Cehuamilli)
 * 3. [7.8s – 15.2s]:  IMAGEN REAL ANIMADA (Alegrías tradicionales + miel, con crédito de autor)
 * 4. [15.2s – 19.65s]: INS-02 (Cadena del amaranto en riesgo)
 */
export default makeScene2D("toma-01", function* (view) {
  view.fill(THEME.colors.paper.cream);

  const footage1Node = createRef<Node>();
  const video1Ref = createRef<Video>();
  const ins01Node = createRef<Node>();
  const ins01Anim = createRef<CdmxMapAnimation>();

  const footage2Node = createRef<Node>();
  const alegriaCameraNode = createRef<Node>();
  const alegriaCreditNode = createRef<Node>();
  const ins02Node = createRef<Node>();
  const ins02Anim = createRef<AmarantoChainAnimation>();

  view.add(
    <Node>
      {/* 1. Audio maestro continuo de la Toma 1 */}
      <Audio src={audioParrafo1} play={true} />

      {/* 2. Capa Toma Real 1 (Cosecha en la ladera) */}
      <Node ref={footage1Node} opacity={1}>
        <Video
          ref={video1Ref}
          src={videoCosechaLadera}
          play={true}
          volume={0}
          width={1920}
          height={1080}
        />
      </Node>

      {/* 3. Capa INS-01 (Ubicación Teuhtli) */}
      <Node ref={ins01Node} opacity={0}>
        <CdmxMapAnimation ref={ins01Anim} />
      </Node>

      {/* 4. Capa Imagen Real 2 (Alegría tradicional y miel) */}
      <Node ref={footage2Node} opacity={0}>
        <Node ref={alegriaCameraNode} position={[0, 40]} scale={1.05}>
          <Img
            src={alegriaImgTexture}
            width={1920}
            height={1280}
            position={[0, 0]}
          />
        </Node>
        {/* Sombra degradada inferior para legibilidad del crédito */}
        <Rect
          position={[0, 440]}
          width={1920}
          height={200}
          fill={
            new Gradient({
              type: "linear",
              from: [0, -100],
              to: [0, 100],
              stops: [
                { offset: 0, color: "rgba(0,0,0,0)" },
                { offset: 1, color: "rgba(20,24,20,0.75)" },
              ],
            })
          }
        />
        {/* Cintillo de acreditación oficial de origen (Wikimedia Commons / CC BY-SA 3.0) */}
        <Node ref={alegriaCreditNode} position={[0, 490]} opacity={0}>
          <Rect
            width={670}
            height={34}
            fill={`${THEME.colors.earth.dark}E6`}
            radius={17}
            stroke={`${THEME.colors.earth.ochre}88`}
            lineWidth={1.2}
            padding={[4, 16]}
            shadowColor={"rgba(0,0,0,0.3)"}
            shadowBlur={10}
          >
            <Txt
              text="Foto: SADER"
              fill={THEME.colors.paper.cream}
              fontFamily={THEME.typography.mono}
              fontSize={32}
              fontWeight={600}
              letterSpacing={0.4}
            />
          </Rect>
        </Node>
      </Node>

      {/* 5. Capa INS-02 (Cadena del amaranto en riesgo) */}
      <Node ref={ins02Node} opacity={0}>
        <AmarantoChainAnimation ref={ins02Anim} />
      </Node>
    </Node>,
  );

  // ==========================================
  // COREOGRAFÍA TEMPORAL EXACTA (19.65 s · parrafo1.m4a: 19.69 s)
  // ==========================================

  // [0.0s – 3.0s]: Toma Real 1 (Cosecha en la ladera)
  // «Seguro han comido una alegría. Lo que quizá no sabían es que...»
  yield* waitFor(2.7);

  // Transición suave: Footage 1 sale, INS-01 entra (~10 frames antes de «empieza aquí...»)
  yield* all(
    footage1Node().opacity(0, 0.35, easeInOutCubic),
    ins01Node().opacity(1, 0.35, easeInOutCubic),
  );
  video1Ref().pause();

  // [3.05s – 5.15s]: «...empieza aquí, en la Ciudad de México...»
  yield* ins01Anim().introCdmx(0.6);
  yield* waitFor(1.5);

  // [5.15s – 7.35s]: «...en una ladera del volcán Teuhtli...»
  // Zoom hacia el Teuhtli y revelado del pin
  yield* ins01Anim().zoomToTeuhtli(2.2);

  // [7.35s – 10.25s]: «...donde los agricultores cosechan el amaranto en invierno. [pausa]»
  // Se extiende la escena del mapa en la ladera con pulso dinámico en Cehuamilli
  yield* ins01Anim().holdTeuhtli(2.9);

  // Salida de INS-01 hacia Toma Real 2 exactamente en la pausa previa a «Después, las mujeres...»
  yield* all(
    ins01Node().opacity(0, 0.35, easeInOutCubic),
    footage2Node().opacity(1, 0.35, easeInOutCubic),
  );

  // [10.60s – 15.30s]: Imagen Real 2 (Alegría tradicional y miel en comal)
  // «Después, las mujeres lo revientan en el comal y, con miel, lo vuelven alegría.»
  // Animación de cámara Ken Burns: suave desplazamiento vertical sobre la textura + zoom progresivo
  yield* all(
    alegriaCameraNode().position.y(-30, 4.7, easeInOutCubic),
    alegriaCameraNode().scale(1.12, 4.7, easeInOutCubic),
    (function* () {
      yield* waitFor(0.35);
      yield* alegriaCreditNode().opacity(1, 0.45, easeOutCubic);
    })(),
  );

  // Transición hacia INS-02 en la pausa previa a «Una cadena...»
  yield* all(
    footage2Node().opacity(0, 0.35, easeInOutCubic),
    ins02Node().opacity(1, 0.35, easeInOutCubic),
  );

  // [15.65s – 17.35s]: Entran los 4 eslabones
  yield* ins02Anim().revealLinks();
  yield* waitFor(0.3);

  // [17.35s – 17.85s]: «...que el cambio climático ya pone en riesgo.»
  // El eslabón del amaranto se tiñe de ámbar y se agrieta
  yield* ins02Anim().triggerRisk();

  // [17.85s – 19.65s]: Colchón final sereno sincronizado al cierre de parrafo1.m4a
  yield* waitFor(1.8);
});
