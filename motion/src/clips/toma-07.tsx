import {
  makeScene2D,
  Node,
  Audio,
  Rect,
  Txt,
  Circle,
  Path,
  Video,
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

import audioParrafo7 from "../../audio/parrafo7.m4a";
import videoDanosNetos from "../../footage/toma-07-danos-netos-cero.mp4";
import sueloConservacionTexture from "../../assets/textures/toma-07-suelo-conservacion.png";

/**
 * TOMA 7 MAESTRA · 26.90 s
 * Sincronización continua con parrafo7.m4a
 *
 * Estructura:
 * 1. [0.0s – 2.5s]:   IMAGEN REAL ANIMADA 1 (Suelo de Conservación)
 * 2. [2.5s – 10.5s]:  INS-11 (Recarga del acuífero ~70%)
 * 3. [10.5s – 16.0s]: TOMA REAL 2 (Cobeneficios y Daños Netos Cero)
 * 4. [16.0s – 26.5s]: INS-12 (Escalabilidad: Tulyehualco -> Red institucional)
 * 5. [26.5s – 26.90s]: Breve colchón antes de Toma 8
 */
export default makeScene2D("toma-07", function* (view) {
  view.fill(THEME.colors.paper.cream);

  const footage1Node = createRef<Node>();
  const footage1CameraNode = createRef<Node>();
  const ins11Node = createRef<Node>();
  const footage2Node = createRef<Node>();
  const videoDanosNetosRef = createRef<Video>();
  const ins12Node = createRef<Node>();

  // Elementos INS-11 (Recarga del acuífero)
  const rainInfiltration = Array.from({ length: 6 }, () => createRef<Circle>());
  const aquiferLevel = createRef<Rect>();
  const statCard70 = createRef<Rect>();

  // Elementos INS-12 (Escalabilidad)
  const pinTulyehualco = createRef<Node>();
  const ripple1 = createRef<Circle>();
  const ripple2 = createRef<Circle>();
  const nodeA = createRef<Node>();
  const nodeB = createRef<Node>();
  const nodeC = createRef<Node>();
  const linkLines = createRef<Path>();

  view.add(
    <Node>
      {/* Audio maestro continuo de la Toma 7 */}
      <Audio src={audioParrafo7} play={true} />

      {/* 1. Capa Toma Real 1 (Suelo de Conservación y parcelas de milpa) */}
      <Node ref={footage1Node} opacity={1}>
        <Rect width={1920} height={1080} clip={true}>
          <Node ref={footage1CameraNode} position={[0, 0]} scale={1.01}>
            <Img src={sueloConservacionTexture} width={1920} height={1080} />
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
            position={[-450, 470]}
            fill={`${THEME.colors.earth.dark}E6`}
            stroke={THEME.colors.earth.ochre}
            lineWidth={1.5}
            radius={8}
            padding={[8, 22]}
          >
            <Txt
              text="Suelo de Conservación y parcelas de milpa · Laderas del Teuhtli"
              fill={THEME.colors.paper.cream}
              fontFamily={THEME.typography.sans}
              fontSize={18}
              fontWeight={600}
            />
          </Rect>
        </Rect>
      </Node>

      {/* 2. Capa INS-11 (Recarga del acuífero ~70%) */}
      <Node ref={ins11Node} opacity={0}>
        <Rect
          width={1600}
          height={760}
          fill={THEME.colors.paper.amateLight}
          stroke={THEME.colors.earth.ochre}
          lineWidth={2.5}
          radius={20}
          position={[0, -20]}
          padding={[40, 50]}
          clip={true}
        >
          <Txt
            text="RECARGA DEL ACUÍFERO Y SUELO DE CONSERVACIÓN"
            position={[0, -320]}
            fill={THEME.colors.climate.rainBlue}
            fontFamily={THEME.typography.serif}
            fontSize={42}
            fontWeight={700}
            letterSpacing={3}
          />
          <Txt
            text="Cuidar la milpa es cuidar el agua de la ciudad"
            position={[0, -270]}
            fill={THEME.colors.earth.deep}
            fontFamily={THEME.typography.sans}
            fontSize={26}
            fontWeight={600}
          />

          {/* Corte transversal estratigráfico */}
          <Node position={[-250, 40]}>
            {/* Superficie: Capa vegetal y milpa */}
            <Rect
              width={700}
              height={44}
              position={[0, -140]}
              fill={THEME.colors.milpa.leaf}
              radius={8}
            />
            <Txt
              text="🌱 🌱 🌱  Milpa y suelo de infiltración"
              position={[0, -140]}
              fill={THEME.colors.paper.cream}
              fontFamily={THEME.typography.sans}
              fontSize={22}
              fontWeight={700}
            />

            {/* Capa porosa volcánica */}
            <Rect
              width={700}
              height={120}
              position={[0, -50]}
              fill={`${THEME.colors.earth.terracotta}33`}
              stroke={THEME.colors.earth.ochre}
              lineWidth={1.5}
              radius={6}
            />
            <Txt
              text="Estratos volcánicos porosos del Teuhtli"
              position={[0, -50]}
              fill={THEME.colors.earth.warmClay}
              fontFamily={THEME.typography.mono}
              fontSize={20}
              fontWeight={600}
            />

            {/* Gotas de lluvia infiltrándose */}
            {rainInfiltration.map((ref, idx) => (
              <Circle
                ref={ref}
                size={14}
                fill={THEME.colors.climate.rainBlue}
                position={[-250 + idx * 100, -110]}
                opacity={0}
              />
            ))}

            {/* Manto Acuífero profundo */}
            <Rect
              width={700}
              height={140}
              position={[0, 90]}
              fill="#D0E3ED"
              stroke={THEME.colors.climate.rainBlue}
              lineWidth={2}
              radius={10}
              clip={true}
            >
              <Rect
                ref={aquiferLevel}
                width={700}
                height={0}
                position={[0, 70]}
                offset={[0, 1]}
                fill={THEME.colors.climate.rainBlue}
                opacity={0.7}
              />
              <Txt
                text="Manto Acuífero de la Cuenca de México"
                position={[0, -10]}
                fill={THEME.colors.climate.rainBlue}
                fontFamily={THEME.typography.sans}
                fontSize={24}
                fontWeight={700}
              />
            </Rect>
          </Node>

          {/* Tarjeta de la Cifra Clave: Cerca del 70% */}
          <Rect
            ref={statCard70}
            position={[400, 40]}
            width={520}
            height={390}
            fill={THEME.colors.paper.cream}
            stroke={THEME.colors.climate.rainBlue}
            lineWidth={2.5}
            radius={20}
            padding={[30, 36]}
            shadowColor={`${THEME.colors.earth.dark}20`}
            shadowBlur={20}
            opacity={0}
            scale={0.9}
          >
            <Txt
              text="~70%"
              position={[0, -75]}
              fill={THEME.colors.climate.rainBlue}
              fontFamily={THEME.typography.serif}
              fontSize={100}
              fontWeight={700}
            />
            <Txt
              text="de la recarga del acuífero"
              position={[0, 20]}
              fill={THEME.colors.earth.deep}
              fontFamily={THEME.typography.serif}
              fontSize={30}
              fontWeight={700}
            />
            <Txt
              text="proviene del Suelo de Conservación"
              position={[0, 68]}
              fill={THEME.colors.earth.warmClay}
              fontFamily={THEME.typography.sans}
              fontSize={24}
              fontWeight={600}
            />
          </Rect>
        </Rect>
      </Node>

      {/* 3. Capa Toma Real 2 (Daños Netos Cero y cobeneficios) */}
      <Node ref={footage2Node} opacity={0}>
        <Video
          ref={videoDanosNetosRef}
          src={videoDanosNetos}
          volume={0}
          width={1920}
          height={1080}
        />
      </Node>

      {/* 4. Capa INS-12 (Escalabilidad: Tulyehualco -> Otras zonas) */}
      <Node ref={ins12Node} opacity={0}>
        <Rect
          width={1600}
          height={760}
          fill={THEME.colors.paper.amateLight}
          stroke={THEME.colors.earth.ochre}
          lineWidth={2.5}
          radius={20}
          position={[0, -20]}
          padding={[40, 50]}
        >
          <Txt
            text="ESCALABILIDAD Y ALIANZAS"
            position={[0, -310]}
            fill={THEME.colors.earth.terracotta}
            fontFamily={THEME.typography.serif}
            fontSize={44}
            fontWeight={700}
            letterSpacing={3}
          />
          <Txt
            text="Tulyehualco como modelo de estudio · Vínculos académicos e institucionales"
            position={[0, -260]}
            fill={THEME.colors.earth.warmClay}
            fontFamily={THEME.typography.sans}
            fontSize={26}
            fontWeight={600}
          />

          {/* Ondas concéntricas de escalabilidad */}
          <Circle
            ref={ripple1}
            position={[-200, 30]}
            size={0}
            stroke={THEME.colors.milpa.leaf}
            lineWidth={3}
            opacity={0}
          />
          <Circle
            ref={ripple2}
            position={[-200, 30]}
            size={0}
            stroke={THEME.colors.earth.ochre}
            lineWidth={2}
            opacity={0}
          />

          {/* Vínculos / Conexiones entre nodos */}
          <Path
            ref={linkLines}
            data="M -200,30 L 150,-80 M -200,30 L 250,90 M -200,30 L 120,200"
            stroke={`${THEME.colors.earth.terracotta}88`}
            lineWidth={0}
            lineDash={[8, 8]}
          />

          {/* Pin central: Tulyehualco con dimensiones explícitas */}
          <Node
            ref={pinTulyehualco}
            position={[-200, 30]}
            opacity={0}
            scale={0}
          >
            <Circle
              size={44}
              fill={THEME.colors.earth.terracotta}
              stroke={THEME.colors.paper.cream}
              lineWidth={3.5}
            />
            <Circle size={18} fill={THEME.colors.paper.cream} />
            <Rect
              position={[0, -72]}
              width={310}
              height={78}
              fill={THEME.colors.paper.cream}
              stroke={THEME.colors.earth.terracotta}
              lineWidth={2}
              radius={14}
              padding={[10, 18]}
            >
              <Txt
                text="📍 TULYEHUALCO"
                position={[0, -14]}
                fill={THEME.colors.earth.deep}
                fontFamily={THEME.typography.sans}
                fontSize={24}
                fontWeight={700}
              />
              <Txt
                text="Modelo de estudio inicial"
                position={[0, 16]}
                fill={THEME.colors.earth.warmClay}
                fontFamily={THEME.typography.sans}
                fontSize={18}
                fontWeight={600}
              />
            </Rect>
          </Node>

          {/* Nodos réplica con dimensiones explícitas */}
          <Node ref={nodeA} position={[150, -80]} opacity={0} scale={0}>
            <Circle size={26} fill={THEME.colors.milpa.deepGreen} />
            <Rect
              position={[0, -48]}
              width={290}
              height={48}
              fill={THEME.colors.paper.cream}
              radius={10}
              padding={[8, 14]}
            >
              <Txt
                text="Zona agrícola de réplica"
                fill={THEME.colors.milpa.deepGreen}
                fontFamily={THEME.typography.sans}
                fontSize={20}
                fontWeight={600}
              />
            </Rect>
          </Node>

          <Node ref={nodeB} position={[250, 90]} opacity={0} scale={0}>
            <Circle size={26} fill={THEME.colors.milpa.deepGreen} />
            <Rect
              position={[0, -48]}
              width={300}
              height={48}
              fill={THEME.colors.paper.cream}
              radius={10}
              padding={[8, 14]}
            >
              <Txt
                text="Comunidad colaboradora"
                fill={THEME.colors.milpa.deepGreen}
                fontFamily={THEME.typography.sans}
                fontSize={20}
                fontWeight={600}
              />
            </Rect>
          </Node>

          <Node ref={nodeC} position={[120, 200]} opacity={0} scale={0}>
            <Circle size={26} fill={THEME.colors.milpa.deepGreen} />
            <Rect
              position={[0, -48]}
              width={320}
              height={48}
              fill={THEME.colors.paper.cream}
              radius={10}
              padding={[8, 14]}
            >
              <Txt
                text="Red de monitoreo expandida"
                fill={THEME.colors.milpa.deepGreen}
                fontFamily={THEME.typography.sans}
                fontSize={20}
                fontWeight={600}
              />
            </Rect>
          </Node>
        </Rect>
      </Node>
    </Node>,
  );

  // ==========================================
  // COREOGRAFÍA TEMPORAL EXACTA (26.90 s)
  // ==========================================

  // [0.0s – 2.5s]: Imagen Real Animada 1 (Suelo de Conservación - cámara Ken Burns)
  yield* all(
    footage1CameraNode().scale(1.05, 2.15, easeInOutCubic),
    footage1CameraNode().position.y(-10, 2.15, easeInOutCubic),
    waitFor(2.15),
  );

  // Transición hacia INS-11 (~10 frames antes de «cerca del 70 %...»)
  yield* all(
    footage1Node().opacity(0, 0.35, easeInOutCubic),
    ins11Node().opacity(1, 0.35, easeInOutCubic),
  );

  // [2.5s – 10.5s]: INS-11 (Recarga del acuífero)
  for (let i = 0; i < rainInfiltration.length; i++) {
    rainInfiltration[i]().opacity(1, 0.2);
    rainInfiltration[i]().position.y(20, 0.4, easeInOutCubic);
  }

  yield* all(
    aquiferLevel().height(140, 1.8, easeOutCubic),
    statCard70().opacity(1, 0.8, easeOutBack),
    statCard70().scale(1, 0.8, easeOutBack),
  );
  yield* waitFor(5.4);

  // Transición hacia Toma Real 2 (~10 frames después de «el agua de la ciudad»)
  videoDanosNetosRef().play();
  yield* all(
    ins11Node().opacity(0, 0.35, easeInOutCubic),
    footage2Node().opacity(1, 0.35, easeInOutCubic),
  );

  // [10.5s – 16.0s]: Toma Real 2 (Daños Netos Cero)
  yield* waitFor(5.15);

  // Transición hacia INS-12 (~10 frames antes de «Tulyehualco es nuestro modelo...»)
  yield* all(
    footage2Node().opacity(0, 0.35, easeInOutCubic),
    ins12Node().opacity(1, 0.35, easeInOutCubic),
  );
  videoDanosNetosRef().pause();

  // [16.0s – 26.5s]: INS-12 (Escalabilidad y réplica)
  yield* all(
    pinTulyehualco().opacity(1, 0.6, easeOutBack),
    pinTulyehualco().scale(1, 0.6, easeOutBack),
  );
  yield* waitFor(0.8);

  // Ondas concéntricas
  yield* all(
    ripple1().size(450, 1.8, easeOutCubic),
    ripple1().opacity(0.8, 0.4, easeOutCubic),
  );
  yield* all(
    ripple2().size(700, 2.0, easeOutCubic),
    ripple2().opacity(0.6, 0.5, easeOutCubic),
    linkLines().lineWidth(3, 1.2, easeInOutCubic),
  );

  // Encendido de nodos réplica
  yield* all(
    nodeA().opacity(1, 0.5, easeOutBack),
    nodeA().scale(1, 0.5, easeOutBack),
    nodeB().opacity(1, 0.5, easeOutBack),
    nodeB().scale(1, 0.5, easeOutBack),
    nodeC().opacity(1, 0.5, easeOutBack),
    nodeC().scale(1, 0.5, easeOutBack),
  );

  yield* waitFor(3.8);

  // [26.5s – 26.90s]: Colchón final
  yield* waitFor(2.0);
});
