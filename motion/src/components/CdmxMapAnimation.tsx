import {Node, Img, Rect, Txt, Circle, NodeProps} from '@revideo/2d';
import {all, createRef, easeInOutCubic, easeOutBack, easeOutCubic, waitFor} from '@revideo/core';
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
    const mapWidth = mapHeight * (2356 / 3200); // 736.25 px
    const teuhtliPosX = mapWidth * 0.2689; // Coordenada normalizada exacta
    const teuhtliPosY = mapHeight * 0.1260;

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
              size={76}
              stroke={THEME.colors.climate.droughtOrange}
              lineWidth={3}
              opacity={0}
            />
            <Circle
              size={50}
              stroke={THEME.colors.earth.ochre}
              lineWidth={3}
              opacity={0.5}
            />
            <Circle
              size={26}
              fill={`${THEME.colors.earth.terracotta}55`}
              stroke={THEME.colors.earth.terracotta}
              lineWidth={2.5}
            />

            {/* Pin de Cehuamilli con escala para proyección */}
            <Node ref={this.pinNode} position={[24, -22]} scale={0} opacity={0}>
              <Circle
                ref={this.pinPulse}
                size={42}
                stroke={THEME.colors.climate.droughtOrange}
                lineWidth={3.5}
                opacity={0}
              />
              <Circle
                size={24}
                fill={THEME.colors.earth.terracotta}
                stroke={THEME.colors.paper.cream}
                lineWidth={4}
                shadowColor={`${THEME.colors.earth.dark}66`}
                shadowBlur={12}
              />
              <Circle size={8} fill={THEME.colors.paper.cream} />

              <Rect
                position={[160, -24]}
                width={280}
                height={64}
                fill={THEME.colors.earth.deep}
                radius={12}
                shadowColor={`${THEME.colors.earth.dark}55`}
                shadowBlur={16}
                shadowOffset={[0, 4]}
              >
                <Txt
                  text="📍 Cehuamilli"
                  fill={THEME.colors.paper.cream}
                  fontFamily={THEME.typography.serif}
                  fontSize={32}
                  fontWeight={700}
                />
              </Rect>
            </Node>
          </Node>
        </Node>

        {/* Tarjeta flotante en la diapositiva (gran tamaño para proyección en auditorio) */}
        <Rect
          ref={this.infoCard}
          position={[-560, -360]}
          width={760}
          height={165}
          fill={`${THEME.colors.paper.cream}F5`}
          stroke={THEME.colors.earth.ochre}
          lineWidth={2.5}
          radius={16}
          padding={[24, 36]}
          shadowColor={`${THEME.colors.earth.dark}25`}
          shadowBlur={25}
          shadowOffset={[0, 6]}
          opacity={0}
          y={-340}
        >
          <Node>
            <Txt
              ref={this.cdmxTitle}
              text="Ciudad de México"
              fill={THEME.colors.earth.deep}
              fontFamily={THEME.typography.serif}
              fontSize={54}
              fontWeight={700}
              position={[0, -22]}
              opacity={1}
            />
            <Txt
              ref={this.cdmxSubtitle}
              text="Suelo de Conservación y Zona Metropolitana"
              position={[0, 36]}
              fill={THEME.colors.milpa.deepGreen}
              fontFamily={THEME.typography.sans}
              fontSize={28}
              fontWeight={600}
              opacity={1}
            />

            <Txt
              ref={this.teuhtliTitle}
              text="Volcán Teuhtli"
              fill={THEME.colors.earth.deep}
              fontFamily={THEME.typography.serif}
              fontSize={54}
              fontWeight={700}
              position={[0, -22]}
              opacity={0}
            />
            <Txt
              ref={this.teuhtliSubtitle}
              text="2,710 msnm · Santiago Tulyehualco (1,661 ha)"
              position={[0, 36]}
              fill={THEME.colors.earth.terracotta}
              fontFamily={THEME.typography.sans}
              fontSize={28}
              fontWeight={600}
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
      this.infoCard().position.y(-360, duration, easeOutCubic),
    );
  }

  /**
   * Zoom cinematográfico hacia el volcán Teuhtli y revelado del pin (~5.5s a 7.5s)
   */
  public *zoomToTeuhtli(duration: number = 2.0) {
    const mapHeight = 1000;
    const mapWidth = mapHeight * (2356 / 3200);
    const teuhtliPosX = mapWidth * 0.2689;
    const teuhtliPosY = mapHeight * 0.1260;
    const zoomScale = 3.2;
    const zoomTargetX = -teuhtliPosX * zoomScale + 120;
    const zoomTargetY = -teuhtliPosY * zoomScale;

    const self = this;
    yield* all(
      this.camera().scale(zoomScale, duration, easeInOutCubic),
      this.camera().position([zoomTargetX, zoomTargetY], duration, easeInOutCubic),

      // Transición fluida del texto de la tarjeta
      this.cdmxTitle().opacity(0, duration * 0.35, easeOutCubic),
      this.cdmxSubtitle().opacity(0, duration * 0.35, easeOutCubic),
      this.teuhtliTitle().opacity(1, duration * 0.6, easeOutCubic),
      this.teuhtliSubtitle().opacity(1, duration * 0.6, easeOutCubic),

      // Cae el pin en la ladera hacia el final del zoom dentro del tiempo exacto
      (function* () {
        yield* waitFor(duration * 0.5);
        yield* all(
          self.pinNode().opacity(1, duration * 0.25, easeOutCubic),
          self.pinNode().scale(1, duration * 0.25, easeOutBack),
        );
        yield* all(
          self.pinPulse().size(95, duration * 0.25, easeOutCubic),
          self.pinPulse().opacity(0, duration * 0.25, easeInOutCubic),
        );
      })(),
    );
  }

  /**
   * Sostenido dinámico con pulsos sobre el volcán mientras se habla de la ladera e invierno
   */
  public *holdTeuhtli(duration: number = 2.9) {
    const pulseTime = duration / 2;
    for (let i = 0; i < 2; i++) {
      this.pinPulse().size(42);
      this.pinPulse().opacity(0.8);
      yield* all(
        this.pinPulse().size(110, pulseTime, easeOutCubic),
        this.pinPulse().opacity(0, pulseTime, easeInOutCubic),
      );
    }
  }
}
