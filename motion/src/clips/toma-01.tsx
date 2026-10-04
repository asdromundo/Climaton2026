import {makeScene2D, Node, Audio} from '@revideo/2d';
import {all, createRef, easeInOutCubic, easeOutCubic, waitFor} from '@revideo/core';
import {THEME} from '../theme';
import {VideoPlaceholder} from '../components/VideoPlaceholder';
import {CdmxMapAnimation} from '../components/CdmxMapAnimation';
import {AmarantoChainAnimation} from '../components/AmarantoChainAnimation';

import audioParrafo1 from '../../audio/parrafo1.m4a';

/**
 * TOMA 1 MAESTRA · 19.65 s
 * Sincronización continua con parrafo1.m4a
 * 
 * Estructura y ritmos (respetando ~10 frames antes y después de cada frase):
 * 1. [0.0s – 3.0s]:   TOMA REAL (Cosecha de amaranto en la ladera)
 * 2. [3.0s – 7.8s]:   INS-01 (Mapa CDMX -> Zoom Teuhtli -> Pin Cehuamilli)
 * 3. [7.8s – 15.2s]:  TOMA REAL (Cosecha en invierno + Mujeres en comal y miel)
 * 4. [15.2s – 19.65s]: INS-02 (Cadena del amaranto en riesgo)
 */
export default makeScene2D('toma-01', function* (view) {
  view.fill(THEME.colors.paper.cream);

  const footage1Node = createRef<Node>();
  const ins01Node = createRef<Node>();
  const ins01Anim = createRef<CdmxMapAnimation>();

  const footage2Node = createRef<Node>();
  const ins02Node = createRef<Node>();
  const ins02Anim = createRef<AmarantoChainAnimation>();

  view.add(
    <Node>
      {/* 1. Audio maestro continuo de la Toma 1 */}
      <Audio src={audioParrafo1} play={true} />

      {/* 2. Capa Toma Real 1 (Cosecha en la ladera) */}
      <Node ref={footage1Node} opacity={1}>
        <VideoPlaceholder
          title="Cosecha de amaranto en la ladera"
          cue="Seguro han comido una alegría. Lo que quizá no sabían es que..."
          suggestedFile="toma-01-cosecha-ladera.mp4"
          durationSeconds={3.0}
        />
      </Node>

      {/* 3. Capa INS-01 (Ubicación Teuhtli) */}
      <Node ref={ins01Node} opacity={0}>
        <CdmxMapAnimation ref={ins01Anim} />
      </Node>

      {/* 4. Capa Toma Real 2 (Mujeres en el comal) */}
      <Node ref={footage2Node} opacity={0}>
        <VideoPlaceholder
          title="Mujeres en el comal y alegría con miel"
          cue="Después, las mujeres lo revientan en el comal y, con miel, lo vuelven alegría."
          suggestedFile="toma-01-mujeres-comal.mp4"
          durationSeconds={7.4}
        />
      </Node>

      {/* 5. Capa INS-02 (Cadena del amaranto en riesgo) */}
      <Node ref={ins02Node} opacity={0}>
        <AmarantoChainAnimation ref={ins02Anim} />
      </Node>
    </Node>
  );

  // ==========================================
  // COREOGRAFÍA TEMPORAL EXACTA (19.65 s)
  // ==========================================

  // [0.0s – 3.0s]: Toma Real 1
  yield* waitFor(2.7);

  // Transición suave: Footage 1 sale, INS-01 entra (~10 frames antes de «empieza aquí...»)
  yield* all(
    footage1Node().opacity(0, 0.35, easeInOutCubic),
    ins01Node().opacity(1, 0.35, easeInOutCubic),
  );

  // [3.0s – 5.5s]: «...empieza aquí, en la Ciudad de México...»
  yield* ins01Anim().introCdmx(0.7);
  yield* waitFor(1.8);

  // [5.5s – 7.8s]: «...en una ladera del volcán Teuhtli...»
  // Zoom hacia el Teuhtli y revelado del pin
  yield* ins01Anim().zoomToTeuhtli(1.9);

  // Salida de INS-01 (~10 frames después de «volcán Teuhtli») hacia Toma Real 2
  yield* all(
    ins01Node().opacity(0, 0.35, easeInOutCubic),
    footage2Node().opacity(1, 0.35, easeInOutCubic),
  );

  // [7.8s – 15.2s]: Toma Real 2 (Cosecha invierno + Comal y Miel)
  // «...donde los agricultores cosechan el amaranto en invierno. [pausa] Después, las mujeres lo revientan en el comal...»
  yield* waitFor(7.05);

  // Transición hacia INS-02 (~10 frames antes de «Una cadena...»)
  yield* all(
    footage2Node().opacity(0, 0.35, easeInOutCubic),
    ins02Node().opacity(1, 0.35, easeInOutCubic),
  );

  // [15.2s – 17.0s]: Entran los 4 eslabones
  yield* ins02Anim().revealLinks();
  yield* waitFor(0.6);

  // [17.0s – 19.65s]: «...que el cambio climático ya pone en riesgo.»
  // El eslabón del amaranto se tiñe de ámbar y se agrieta
  yield* ins02Anim().triggerRisk();

  yield* waitFor(2.2);
});
