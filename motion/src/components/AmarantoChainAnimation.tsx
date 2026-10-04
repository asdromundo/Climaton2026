import {Node, Rect, Txt, Circle, Path, NodeProps} from '@revideo/2d';
import {all, createRef, easeInOutCubic, easeOutBack, easeOutCubic, waitFor} from '@revideo/core';
import {THEME} from '../theme';

export interface AmarantoChainAnimationProps extends NodeProps {
  position?: [number, number];
}

/**
 * Gráfico animado de la cadena del amaranto en riesgo (INS-02)
 */
export class AmarantoChainAnimation extends Node {
  public readonly linkAmaranto = createRef<Node>();
  public readonly linkComal = createRef<Node>();
  public readonly linkMiel = createRef<Node>();
  public readonly linkAlegria = createRef<Node>();

  public readonly amarantoCard = createRef<Rect>();
  public readonly crackPath = createRef<Path>();
  public readonly alertBadge = createRef<Rect>();

  public constructor(props: AmarantoChainAnimationProps = {}) {
    super(props);

    const links = [
      {ref: this.linkAmaranto, label: 'Amaranto', icon: '🌾', x: -450},
      {ref: this.linkComal, label: 'Comal', icon: '🔥', x: -150},
      {ref: this.linkMiel, label: 'Miel', icon: '🍯', x: 150},
      {ref: this.linkAlegria, label: 'Alegría', icon: '✨', x: 450},
    ];

    this.add(
      <Node>
        <Txt
          text="CADENA PRODUCTIVA TRADICIONAL"
          position={[0, -290]}
          fill={THEME.colors.earth.deep}
          fontFamily={THEME.typography.serif}
          fontSize={44}
          fontWeight={700}
          letterSpacing={4}
        />

        <Rect
          width={920}
          height={6}
          position={[0, 0]}
          fill={`${THEME.colors.earth.terracotta}44`}
        />

        {links.map((item, idx) => (
          <Node ref={item.ref} position={[item.x, 0]} scale={0} opacity={0}>
            <Rect
              ref={idx === 0 ? this.amarantoCard : undefined}
              width={220}
              height={240}
              fill={THEME.colors.paper.amateLight}
              stroke={THEME.colors.earth.ochre}
              lineWidth={2.5}
              radius={18}
              shadowColor={`${THEME.colors.earth.dark}22`}
              shadowBlur={22}
              shadowOffset={[0, 6]}
            >
              <Txt text={item.icon} fontSize={70} position={[0, -45]} />
              <Txt
                text={item.label}
                position={[0, 48]}
                fill={THEME.colors.earth.deep}
                fontFamily={THEME.typography.serif}
                fontSize={34}
                fontWeight={700}
              />
              <Circle
                size={38}
                position={[0, -120]}
                fill={THEME.colors.earth.terracotta}
              >
                <Txt
                  text={`${idx + 1}`}
                  fill={THEME.colors.paper.cream}
                  fontFamily={THEME.typography.sans}
                  fontSize={22}
                  fontWeight={700}
                />
              </Circle>
            </Rect>

            {idx === 0 && (
              <Path
                ref={this.crackPath}
                data="M -40,-20 L -10,10 L 15,-5 L 35,30 L 45,55"
                stroke={THEME.colors.climate.droughtOrange}
                lineWidth={5}
                end={0}
                opacity={0}
              />
            )}
          </Node>
        ))}

        <Rect
          ref={this.alertBadge}
          position={[-450, 195]}
          width={380}
          height={64}
          fill={THEME.colors.earth.dark}
          radius={12}
          padding={[12, 22]}
          shadowColor={`${THEME.colors.earth.dark}55`}
          shadowBlur={16}
          opacity={0}
          scale={0.8}
        >
          <Txt
            text="🚨 EN RIESGO CLIMÁTICO"
            fill={THEME.colors.climate.droughtOrange}
            fontFamily={THEME.typography.sans}
            fontSize={26}
            fontWeight={700}
            letterSpacing={2}
          />
        </Rect>
      </Node>
    );
  }

  public *revealLinks() {
    yield* all(
      this.linkAmaranto().scale(1, 0.45, easeOutBack),
      this.linkAmaranto().opacity(1, 0.4, easeOutCubic),
    );
    yield* waitFor(0.1);
    yield* all(
      this.linkComal().scale(1, 0.45, easeOutBack),
      this.linkComal().opacity(1, 0.4, easeOutCubic),
    );
    yield* waitFor(0.1);
    yield* all(
      this.linkMiel().scale(1, 0.45, easeOutBack),
      this.linkMiel().opacity(1, 0.4, easeOutCubic),
    );
    yield* waitFor(0.1);
    yield* all(
      this.linkAlegria().scale(1, 0.45, easeOutBack),
      this.linkAlegria().opacity(1, 0.4, easeOutCubic),
    );
  }

  public *triggerRisk() {
    yield* all(
      this.amarantoCard().stroke(THEME.colors.climate.droughtOrange, 0.6),
      this.amarantoCard().lineWidth(3.5, 0.6),
      this.amarantoCard().fill(`${THEME.colors.climate.droughtOrange}1A`, 0.6),

      this.crackPath().opacity(1, 0.2),
      this.crackPath().end(1, 0.6, easeInOutCubic),

      this.alertBadge().opacity(1, 0.5, easeOutCubic),
      this.alertBadge().scale(1, 0.5, easeOutBack),
    );
  }
}
