import {makeScene2D, Node, Rect, Txt, Circle, Path} from '@revideo/2d';
import {all, createRef, easeInOutCubic, easeOutBack, easeOutCubic, waitFor} from '@revideo/core';
import {THEME} from '../theme';

/**
 * INS-02 · La cadena del amaranto en riesgo
 * Toma 1 · Duración ~5.5 s
 * 
 * Guion:
 * - Entra: «Una cadena que el cambio climático»
 * - Sale: «ya pone en riesgo»
 * - Visual: Cuatro eslabones dibujados a mano se encadenan:
 *   Amaranto → Comal → Miel → Alegría.
 *   Al final, el primer eslabón se agrieta y se tiñe de ámbar.
 */
export default makeScene2D('ins-02-cadena-amaranto', function* (view) {
  // Fondo de papel crema / amate
  view.fill(THEME.colors.paper.cream);

  const container = createRef<Node>();
  const linkAmaranto = createRef<Node>();
  const linkComal = createRef<Node>();
  const linkMiel = createRef<Node>();
  const linkAlegria = createRef<Node>();

  const amarantoCard = createRef<Rect>();
  const crackPath = createRef<Path>();
  const alertBadge = createRef<Rect>();

  // Datos de los 4 eslabones
  const links = [
    {ref: linkAmaranto, label: 'Amaranto', icon: '🌾', x: -450},
    {ref: linkComal, label: 'Comal', icon: '🔥', x: -150},
    {ref: linkMiel, label: 'Miel', icon: '🍯', x: 150},
    {ref: linkAlegria, label: 'Alegría', icon: '✨', x: 450},
  ];

  view.add(
    <Node ref={container}>
      {/* Título de la sección */}
      <Txt
        text="CADENA PRODUCTIVA TRADICIONAL"
        position={[0, -280]}
        fill={THEME.colors.earth.deep}
        fontFamily={THEME.typography.serif}
        fontSize={36}
        fontWeight={700}
        letterSpacing={4}
      />

      {/* Línea conectora entre eslabones */}
      <Rect
        width={900}
        height={4}
        position={[0, 0]}
        fill={`${THEME.colors.earth.terracotta}44`}
      />

      {/* Eslabones */}
      {links.map((item, idx) => (
        <Node ref={item.ref} position={[item.x, 0]} scale={0} opacity={0}>
          {/* Tarjeta del eslabón */}
          <Rect
            ref={idx === 0 ? amarantoCard : undefined}
            width={200}
            height={220}
            fill={THEME.colors.paper.amateLight}
            stroke={THEME.colors.earth.ochre}
            lineWidth={2}
            radius={16}
            shadowColor={`${THEME.colors.earth.dark}22`}
            shadowBlur={20}
            shadowOffset={[0, 6]}
          >
            {/* Ícono representativo */}
            <Txt text={item.icon} fontSize={60} position={[0, -40]} />

            {/* Texto de la fase */}
            <Txt
              text={item.label}
              position={[0, 45]}
              fill={THEME.colors.earth.deep}
              fontFamily={THEME.typography.serif}
              fontSize={28}
              fontWeight={700}
            />

            {/* Número de paso */}
            <Circle
              size={28}
              position={[0, -110]}
              fill={THEME.colors.earth.terracotta}
            >
              <Txt
                text={`${idx + 1}`}
                fill={THEME.colors.paper.cream}
                fontFamily={THEME.typography.sans}
                fontSize={16}
                fontWeight={700}
              />
            </Circle>
          </Rect>

          {/* Grieta estilizada sobre el primer eslabón (Amaranto) */}
          {idx === 0 && (
            <Path
              ref={crackPath}
              data="M -40,-20 L -10,10 L 15,-5 L 35,30 L 45,55"
              stroke={THEME.colors.climate.droughtOrange}
              lineWidth={4}
              end={0}
              opacity={0}
            />
          )}
        </Node>
      ))}

      {/* Rótulo de alerta climática al agrietarse */}
      <Rect
        ref={alertBadge}
        position={[-450, 180]}
        fill={THEME.colors.earth.dark}
        radius={8}
        padding={[10, 20]}
        opacity={0}
        scale={0.8}
      >
        <Txt
          text="EN RIESGO CLIMÁTICO"
          fill={THEME.colors.climate.droughtOrange}
          fontFamily={THEME.typography.sans}
          fontSize={18}
          fontWeight={700}
          letterSpacing={2}
        />
      </Rect>
    </Node>
  );

  // ==========================================
  // SECUENCIA DE ANIMACIÓN
  // ==========================================

  // 1. Entran los 4 eslabones de forma escalonada (stagger)
  yield* all(
    linkAmaranto().scale(1, 0.6, easeOutBack),
    linkAmaranto().opacity(1, 0.5, easeOutCubic),
  );
  yield* waitFor(0.15);

  yield* all(
    linkComal().scale(1, 0.6, easeOutBack),
    linkComal().opacity(1, 0.5, easeOutCubic),
  );
  yield* waitFor(0.15);

  yield* all(
    linkMiel().scale(1, 0.6, easeOutBack),
    linkMiel().opacity(1, 0.5, easeOutCubic),
  );
  yield* waitFor(0.15);

  yield* all(
    linkAlegria().scale(1, 0.6, easeOutBack),
    linkAlegria().opacity(1, 0.5, easeOutCubic),
  );

  yield* waitFor(0.8);

  // 2. «...Una cadena que el cambio climático ya pone en riesgo.»
  // El primer eslabón se tiñe de ámbar y se agrieta
  yield* all(
    // Cambio a color ámbar de sequía / alerta
    amarantoCard().stroke(THEME.colors.climate.droughtOrange, 0.8),
    amarantoCard().lineWidth(3.5, 0.8),
    amarantoCard().fill(`${THEME.colors.climate.droughtOrange}1A`, 0.8),

    // Trazo de la grieta
    crackPath().opacity(1, 0.2),
    crackPath().end(1, 0.8, easeInOutCubic),

    // Alerta inferior
    alertBadge().opacity(1, 0.6, easeOutCubic),
    alertBadge().scale(1, 0.6, easeOutBack),
  );

  // Pausa de lectura
  yield* waitFor(2.0);

  // Salida suave
  yield* all(
    container().opacity(0, 0.6, easeInOutCubic),
  );
});
