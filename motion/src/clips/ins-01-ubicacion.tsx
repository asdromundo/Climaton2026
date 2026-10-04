import {makeScene2D, Img, Audio, Txt, Rect, Circle, Node} from '@revideo/2d';
import {all, createRef, createSignal, easeInOutCubic, easeOutBack, easeOutCubic, waitFor} from '@revideo/core';
import {THEME} from '../theme';

import audioParrafo1 from '../../audio/parrafo1.m4a';
import mapTexture from '../../assets/textures/cdmx-mapa-referencia.png';

/**
 * INS-01 · Ubicación: el Teuhtli en el mapa
 * Toma 1 · Sincronizado exactamente con parrafo1.m4a
 * 
 * Timeline de audio real:
 * - 0.0s – 2.8s:  «Seguro han comido una alegría. Lo que quizá no sabían es que...»
 * - 2.8s – 5.5s:  «...empieza aquí, en la Ciudad de México...» -> Rótulo y foco en CDMX
 * - 5.5s – 8.2s:  «...en una ladera del volcán Teuhtli...» -> Zoom cinematográfico al Teuhtli, curvas topográficas y pin
 * - 8.2s – 10.8s: «...donde los agricultores cosechan el amaranto en invierno. [Pausa]»
 */
export default makeScene2D('ins-01-ubicacion', function* (view) {
  // Fondo de papel amate cálido
  view.fill(THEME.colors.paper.cream);

  // Referencias a los elementos
  const camera = createRef<Node>();
  const mapImg = createRef<Img>();
  const teuhtliTarget = createRef<Node>();
  const pinNode = createRef<Node>();
  const pinPulse = createRef<Circle>();

  // Rótulos
  const infoCard = createRef<Rect>();
  const cdmxTitle = createRef<Txt>();
  const cdmxSubtitle = createRef<Txt>();
  const teuhtliTitle = createRef<Txt>();
  const teuhtliSubtitle = createRef<Txt>();

  // Dimensiones base del mapa (2356 x 3200 escalado a altura 1000)
  const mapHeight = 1000;
  const mapWidth = mapHeight * (2356 / 3200); // 736.25 px

  // Posición relativa del Teuhtli sobre el mapa (medida con precisión: +26.89% X, +12.60% Y)
  const teuhtliPosX = mapWidth * 0.2689;
  const teuhtliPosY = mapHeight * 0.1260;

  // Escala para el zoom hacia el volcán
  const zoomScale = 3.2;
  const zoomTargetX = -teuhtliPosX * zoomScale + 120; // Leve offset para dejar aire a la izquierda
  const zoomTargetY = -teuhtliPosY * zoomScale;

  view.add(
    <Node>
      {/* 1. Locución original sincronizada */}
      <Audio src={audioParrafo1} play={true} />

      {/* 2. Escena del mapa (Cámara con zoom y paneo) */}
      <Node ref={camera} position={[140, 0]} scale={1}>
        {/* Mapa cartográfico de referencia en alta resolución */}
        <Img
          ref={mapImg}
          src={mapTexture}
          height={mapHeight}
          radius={12}
          shadowColor={`${THEME.colors.earth.dark}22`}
          shadowBlur={35}
          shadowOffset={[0, 8]}
        />

        {/* Punto ancla del Teuhtli y sus anillos topográficos dinámicos */}
        <Node ref={teuhtliTarget} position={[teuhtliPosX, teuhtliPosY]}>
          {/* Ondas topográficas animadas */}
          <Circle
            size={70}
            stroke={THEME.colors.climate.droughtOrange}
            lineWidth={2}
            opacity={0}
          />
          <Circle
            size={45}
            stroke={THEME.colors.earth.ochre}
            lineWidth={2.5}
            opacity={0.4}
          />
          <Circle
            size={22}
            fill={`${THEME.colors.earth.terracotta}55`}
            stroke={THEME.colors.earth.terracotta}
            lineWidth={2}
          />

          {/* Pin y tarjeta Cehuamilli en la ladera norte */}
          <Node ref={pinNode} position={[24, -22]} scale={0} opacity={0}>
            {/* Pulso del pin */}
            <Circle
              ref={pinPulse}
              size={36}
              stroke={THEME.colors.climate.droughtOrange}
              lineWidth={3}
              opacity={0}
            />

            {/* Cabeza del pin */}
            <Circle
              size={18}
              fill={THEME.colors.earth.terracotta}
              stroke={THEME.colors.paper.cream}
              lineWidth={3.5}
              shadowColor={`${THEME.colors.earth.dark}66`}
              shadowBlur={10}
            />
            <Circle size={6} fill={THEME.colors.paper.cream} />

            {/* Etiqueta institucional Cehuamilli */}
            <Rect
              position={[90, -22]}
              fill={THEME.colors.earth.deep}
              radius={8}
              padding={[8, 16]}
              shadowColor={`${THEME.colors.earth.dark}55`}
              shadowBlur={14}
              shadowOffset={[0, 4]}
            >
              <Txt
                text="📍 Cehuamilli"
                fill={THEME.colors.paper.cream}
                fontFamily={THEME.typography.serif}
                fontSize={28}
                fontWeight={700}
              />
            </Rect>
          </Node>
        </Node>
      </Node>

      {/* 3. Panel informativo fijo (Safe Area superior izquierda) */}
      <Rect
        ref={infoCard}
        position={[-580, -380]}
        fill={`${THEME.colors.paper.cream}F2`}
        stroke={THEME.colors.earth.ochre}
        lineWidth={1.5}
        radius={12}
        padding={[20, 32]}
        shadowColor={`${THEME.colors.earth.dark}22`}
        shadowBlur={20}
        shadowOffset={[0, 6]}
        opacity={0}
        y={-360}
      >
        <Node>
          {/* Título inicial: Ciudad de México */}
          <Txt
            ref={cdmxTitle}
            text="Ciudad de México"
            fill={THEME.colors.earth.deep}
            fontFamily={THEME.typography.serif}
            fontSize={48}
            fontWeight={700}
            opacity={1}
          />
          <Txt
            ref={cdmxSubtitle}
            text="Suelo de Conservación y Zona Metropolitana"
            position={[0, 42]}
            fill={THEME.colors.milpa.nopal}
            fontFamily={THEME.typography.sans}
            fontSize={22}
            opacity={0.9}
          />

          {/* Título focal: Volcán Teuhtli */}
          <Txt
            ref={teuhtliTitle}
            text="Volcán Teuhtli"
            fill={THEME.colors.earth.terracotta}
            fontFamily={THEME.typography.serif}
            fontSize={48}
            fontWeight={700}
            opacity={0}
          />
          <Txt
            ref={teuhtliSubtitle}
            text="2,710 msnm · Milpa Alta / Tláhuac"
            position={[0, 42]}
            fill={THEME.colors.earth.warmClay}
            fontFamily={THEME.typography.sans}
            fontSize={22}
            opacity={0}
          />
        </Node>
      </Rect>
    </Node>
  );

  // ==========================================
  // COREOGRAFÍA TEMPORAL EXACTA CON EL AUDIO
  // ==========================================

  // [0.0s – 2.8s]: Intro de la locución («Seguro han comido una alegría...»)
  // El mapa de la CDMX aparece centrado y nítido
  yield* all(
    mapImg().opacity(1, 1.2, easeOutCubic),
  );
  yield* waitFor(1.6);

  // [2.8s – 5.5s]: «...empieza aquí, en la Ciudad de México...»
  // Entra el rótulo de la CDMX
  yield* all(
    infoCard().opacity(1, 0.8, easeOutCubic),
    infoCard().position.y(-380, 0.8, easeOutCubic),
  );
  yield* waitFor(1.9);

  // [5.5s – 8.2s]: «...en una ladera del volcán Teuhtli...»
  // Zoom hacia el Teuhtli en Milpa Alta / Tláhuac
  yield* all(
    // Paneo y zoom cinematográfico al cráter
    camera().scale(zoomScale, 2.2, easeInOutCubic),
    camera().position([zoomTargetX, zoomTargetY], 2.2, easeInOutCubic),

    // Transición de rótulo: CDMX -> Volcán Teuhtli
    cdmxTitle().opacity(0, 0.6, easeOutCubic),
    cdmxSubtitle().opacity(0, 0.6, easeOutCubic),
    teuhtliTitle().opacity(1, 1.2, easeOutCubic),
    teuhtliSubtitle().opacity(1, 1.2, easeOutCubic),
  );

  // Cae el pin Cehuamilli con rebote en la ladera
  yield* all(
    pinNode().opacity(1, 0.5, easeOutCubic),
    pinNode().scale(1, 0.7, easeOutBack),
    pinPulse().opacity(0.9, 0.3, easeOutCubic),
    pinPulse().size(80, 1.0, easeOutCubic),
    pinPulse().opacity(0, 1.0, easeInOutCubic),
  );

  // [8.2s – 10.8s]: «...donde los agricultores cosechan el amaranto en invierno.»
  // El pin y la topografía se contemplan con estabilidad
  yield* waitFor(2.6);

  // [10.8s – 11.5s]: Pausa de respiración del guion -> Salida suave hacia la toma real
  yield* all(
    view.opacity(0, 0.7, easeInOutCubic),
  );
});
