import {Node, Img, Rect, Txt, Circle, NodeProps} from '@revideo/2d';
import {all, createRef, easeInOutCubic, easeOutBack, easeOutCubic} from '@revideo/core';
import {THEME} from '../theme';
import mapTexture from '../../assets/textures/cdmx-mapa-referencia.png';

export interface CdmxMapAnimationProps extends NodeProps {
  position?: [number, number];
  scale?: number;
}

/**
 * Gráfico animado de ubicación cartográfica (INS-01)
 * Muestra el mapa de referencia de la CDMX, realiza zoom al volcán Teuhtli
 * y despliega el pin de Cehuamilli en la ladera.
 */
export class CdmxMapAnimation extends Node {
  public readonly camera = createRef<Node>();
  public readonly mapImg = createRef<Img>();
  public readonly teuhtliTarget = createRef<Node>();
  public readonly pinNode = createRef<Node>();
  public readonly pinPulse = createRef<Circle>();

  public readonly infoCard = createRef<Rect>();
  public readonly cdmxTitle = createRef<Txt>();
  public readonly cdmxSubtitle = createRef<Txt>();
  public readonly teuhtliTitle = createRef<Txt>();
  public readonly teuhtliSubtitle = createRef<Txt>();

  public constructor(props: CdmxMapAnimationProps = {}) {
    super(props);

    const mapHeight = 1000;
    const mapWidth = mapHeight * (1860 / 2180); // ~853 px
    const teuhtliPosX = mapWidth * 0.355;
    const teuhtliPosY = mapHeight * 0.255;

    this.add(
      <Node>
        {/* Cámara con zoom y paneo */}
        <Node ref={this.camera} position={[140, 0]} scale={1}>
          <Img
            ref={this.mapImg}
            src={mapTexture}
            height={mapHeight}
            radius={12}
            shadowColor={`${THEME.colors.earth.dark}22`}
            shadowBlur={35}
            shadowOffset={[0, 8]}
          />

          {/* Ancla del Volcán Teuhtli */}
          <Node ref={this.teuhtliTarget} position={[teuhtliPosX, teuhtliPosY]}>
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

            {/* Pin de Cehuamilli */}
            <Node ref={this.pinNode} position={[24, -22]} scale={0} opacity={0}>
              <Circle
                ref={this.pinPulse}
                size={36}
                stroke={THEME.colors.climate.droughtOrange}
                lineWidth={3}
                opacity={0}
              />
              <Circle
                size={18}
                fill={THEME.colors.earth.terracotta}
                stroke={THEME.colors.paper.cream}
                lineWidth={3.5}
                shadowColor={`${THEME.colors.earth.dark}66`}
                shadowBlur={10}
              />
              <Circle size={6} fill={THEME.colors.paper.cream} />

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

        {/* Tarjeta de rótulo superior izquierda */}
        <Rect
          ref={this.infoCard}
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
            <Txt
              ref={this.cdmxTitle}
              text="Ciudad de México"
              fill={THEME.colors.earth.deep}
              fontFamily={THEME.typography.serif}
              fontSize={48}
              fontWeight={700}
              opacity={1}
            />
            <Txt
              ref={this.cdmxSubtitle}
              text="Suelo de Conservación y Zona Metropolitana"
              position={[0, 42]}
              fill={THEME.colors.milpa.nopal}
              fontFamily={THEME.typography.sans}
              fontSize={22}
              opacity={0.9}
            />

            <Txt
              ref={this.teuhtliTitle}
              text="Volcán Teuhtli"
              fill={THEME.colors.earth.terracotta}
              fontFamily={THEME.typography.serif}
              fontSize={48}
              fontWeight={700}
              opacity={0}
            />
            <Txt
              ref={this.teuhtliSubtitle}
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
  }

  /**
   * Animación de entrada inicial de la CDMX (alrededor de ~3.0s)
   */
  public *introCdmx(duration: number = 0.8) {
    yield* all(
      this.infoCard().opacity(1, duration, easeOutCubic),
      this.infoCard().position.y(-380, duration, easeOutCubic),
    );
  }

  /**
   * Zoom cinematográfico hacia el volcán Teuhtli y revelado del pin (~5.5s a 7.5s)
   */
  public *zoomToTeuhtli(duration: number = 2.0) {
    const mapHeight = 1000;
    const mapWidth = mapHeight * (1860 / 2180);
    const teuhtliPosX = mapWidth * 0.355;
    const teuhtliPosY = mapHeight * 0.255;
    const zoomScale = 3.2;
    const zoomTargetX = -teuhtliPosX * zoomScale + 120;
    const zoomTargetY = -teuhtliPosY * zoomScale;

    yield* all(
      this.camera().scale(zoomScale, duration, easeInOutCubic),
      this.camera().position([zoomTargetX, zoomTargetY], duration, easeInOutCubic),

      this.cdmxTitle().opacity(0, duration * 0.4, easeOutCubic),
      this.cdmxSubtitle().opacity(0, duration * 0.4, easeOutCubic),
      this.teuhtliTitle().opacity(1, duration * 0.6, easeOutCubic),
      this.teuhtliSubtitle().opacity(1, duration * 0.6, easeOutCubic),
    );

    // Cae el pin en la ladera
    yield* all(
      this.pinNode().opacity(1, 0.4, easeOutCubic),
      this.pinNode().scale(1, 0.6, easeOutBack),
      this.pinPulse().opacity(0.9, 0.3, easeOutCubic),
      this.pinPulse().size(80, 0.8, easeOutCubic),
      this.pinPulse().opacity(0, 0.8, easeInOutCubic),
    );
  }
}
