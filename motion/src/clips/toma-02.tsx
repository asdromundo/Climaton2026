import { makeScene2D, Node, Audio, Rect, Txt, Img } from "@revideo/2d";
import {
  all,
  createRef,
  easeInOutCubic,
  easeOutBack,
  easeOutCubic,
  waitFor,
} from "@revideo/core";
import { THEME } from "../theme";
import { VideoPlaceholder } from "../components/VideoPlaceholder";

import audioParrafo2 from "../../audio/parrafo2.m4a";
import mapTemporalTexture from "../../assets/textures/cdmx-mapa-temporal.png";

/**
 * TOMA 2 MAESTRA · 20.24 s
 * Sincronización continua con parrafo2.m4a
 *
 * Estructura:
 * 1. [0.0s – 2.8s]:   TOMA REAL (Parcelas de temporal en la CDMX)
 * 2. [2.8s – 6.0s]:   INS-03 T1 (Mapa de Agricultura de Temporal + Cifra >90% INEGI)
 * 3. [6.0s – 12.2s]:  INS-03 T2 (Calendario de siembra tardía finales de junio)
 * 4. [12.2s – 20.24s]: TOMA REAL (Agricultores y testimonio sobre saber tradicional)
 */
export default makeScene2D("toma-02", function* (view) {
  view.fill(THEME.colors.paper.cream);

  const footage1Node = createRef<Node>();
  const ins03Node = createRef<Node>();
  const footage2Node = createRef<Node>();

  // Elementos internos de INS-03 (Tiempo 1: Mapa + Estadística)
  const gridNode = createRef<Node>();
  const statCard = createRef<Rect>();
  const mapTemporalNode = createRef<Node>();

  // Elementos internos de INS-03 (Tiempo 2: Calendario)
  const calendarNode = createRef<Node>();
  const calendarSlider = createRef<Node>();
  const delayBadge = createRef<Rect>();

  view.add(
    <Node>
      {/* 1. Audio maestro continuo de la Toma 2 */}
      <Audio src={audioParrafo2} play={true} />

      {/* 2. Capa Toma Real 1 */}
      {/* <Node ref={footage1Node} opacity={1}>
        <VideoPlaceholder
          title="Parcelas de temporal en la CDMX"
          cue="De acuerdo al INEGI, en la Ciudad de México..."
          suggestedFile="toma-02-parcelas-temporal.mp4"
          durationSeconds={2.8}
        />
      </Node> */}

      {/* 3. Capa INS-03 (La milpa depende de la lluvia) */}
      <Node ref={ins03Node} opacity={0}>
        {/* TIEMPO 1: Mapa de Agricultura de Temporal + Tarjeta Hero >90% INEGI */}
        <Node ref={gridNode} position={[0, 0]}>
          <Rect
            ref={statCard}
            position={[-575, 20]}
            width={610}
            height={540}
            fill={THEME.colors.paper.amateLight}
            stroke={THEME.colors.earth.ochre}
            lineWidth={2.5}
            radius={22}
            padding={[36, 40]}
            shadowColor={`${THEME.colors.earth.dark}22`}
            shadowBlur={30}
            shadowOffset={[0, 8]}
            opacity={0}
          >
            <Txt
              text=">90%"
              fill={THEME.colors.milpa.deepGreen}
              fontFamily={THEME.typography.serif}
              fontSize={120}
              fontWeight={700}
              position={[0, -120]}
            />
            <Txt
              text="de la tierra cultivada"
              fill={THEME.colors.earth.deep}
              fontFamily={THEME.typography.serif}
              fontSize={38}
              fontWeight={600}
              position={[0, 0]}
            />
            <Txt
              text="depende de la lluvia"
              fill={THEME.colors.climate.rainBlue}
              fontFamily={THEME.typography.serif}
              fontSize={38}
              fontWeight={600}
              position={[0, 52]}
            />
            <Txt
              text="12,180 ha de temporal (91.6%)"
              fill={THEME.colors.earth.terracotta}
              fontFamily={THEME.typography.sans}
              fontSize={26}
              fontWeight={700}
              position={[0, 120]}
            />
            <Txt
              text="Fuente: Censo Agropecuario · INEGI"
              fill={THEME.colors.earth.warmClay}
              fontFamily={THEME.typography.mono}
              fontSize={20}
              fontWeight={600}
              position={[0, 172]}
            />
          </Rect>

          {/* Mapa cartográfico de Modalidad Hídrica y Temporal a gran escala */}
          <Node
            ref={mapTemporalNode}
            position={[240, 0]}
            opacity={0}
            scale={0.96}
          >
            <Rect
              width={830}
              height={1006}
              fill={THEME.colors.paper.cream}
              stroke={THEME.colors.earth.ochre}
              lineWidth={2.5}
              radius={20}
              clip={true}
              shadowColor={`${THEME.colors.earth.dark}28`}
              shadowBlur={35}
              shadowOffset={[0, 8]}
            >
              <Img src={mapTemporalTexture} height={1006} />
            </Rect>
          </Node>
        </Node>

        {/* TIEMPO 2: Calendario y siembra tardía */}
        <Node ref={calendarNode} opacity={0} position={[0, 40]}>
          <Txt
            text="CALENDARIO AGRÍCOLA DE TEMPORAL"
            position={[0, -265]}
            fill={THEME.colors.earth.deep}
            fontFamily={THEME.typography.serif}
            fontSize={44}
            fontWeight={700}
            letterSpacing={3}
          />
          <Txt
            text="El clima impredecible retrasa la fecha de siembra"
            position={[0, -210]}
            fill={THEME.colors.climate.droughtOrange}
            fontFamily={THEME.typography.sans}
            fontSize={28}
            fontWeight={600}
          />

          <Rect
            width={1140}
            height={125}
            fill={THEME.colors.paper.amateLight}
            stroke={THEME.colors.earth.ochre}
            lineWidth={2.5}
            radius={18}
            position={[0, -40]}
          >
            <Rect
              width={2}
              height={125}
              position={[-190, 0]}
              fill={THEME.colors.earth.ochre}
            />
            <Rect
              width={2}
              height={125}
              position={[190, 0]}
              fill={THEME.colors.earth.ochre}
            />
            <Txt
              text="MAYO"
              position={[-380, -18]}
              fill={THEME.colors.earth.deep}
              fontFamily={THEME.typography.serif}
              fontSize={34}
              fontWeight={700}
            />
            <Txt
              text="Siembra habitual"
              position={[-380, 26]}
              fill={THEME.colors.milpa.deepGreen}
              fontFamily={THEME.typography.sans}
              fontSize={22}
              fontWeight={600}
            />

            <Txt
              text="JUNIO"
              position={[0, -18]}
              fill={THEME.colors.earth.deep}
              fontFamily={THEME.typography.serif}
              fontSize={34}
              fontWeight={700}
            />

            <Txt
              text="JULIO"
              position={[380, -18]}
              fill={THEME.colors.earth.deep}
              fontFamily={THEME.typography.serif}
              fontSize={34}
              fontWeight={700}
            />
            <Txt
              text="Lluvia retrasada"
              position={[380, 26]}
              fill={THEME.colors.climate.droughtOrange}
              fontFamily={THEME.typography.sans}
              fontSize={22}
              fontWeight={600}
            />
          </Rect>

          <Node ref={calendarSlider} position={[-380, -40]}>
            <Rect
              width={200}
              height={148}
              fill={`${THEME.colors.climate.droughtOrange}26`}
              stroke={THEME.colors.climate.droughtOrange}
              lineWidth={4}
              radius={16}
              shadowColor={`${THEME.colors.climate.droughtOrange}55`}
              shadowBlur={20}
            >
              <Txt
                text="SIEMBRA"
                position={[0, -42]}
                fill={THEME.colors.climate.droughtOrange}
                fontFamily={THEME.typography.sans}
                fontSize={18}
                fontWeight={700}
                letterSpacing={2}
              />
              <Txt
                text="Finales de"
                position={[0, 0]}
                fill={THEME.colors.earth.dark}
                fontFamily={THEME.typography.serif}
                fontSize={24}
              />
              <Txt
                text="JUNIO"
                position={[0, 36]}
                fill={THEME.colors.earth.dark}
                fontFamily={THEME.typography.serif}
                fontSize={32}
                fontWeight={700}
              />
            </Rect>
          </Node>

          <Rect
            ref={delayBadge}
            position={[0, 150]}
            width={1040}
            height={74}
            fill={THEME.colors.earth.deep}
            radius={14}
            padding={[16, 32]}
            shadowColor={`${THEME.colors.earth.dark}55`}
            shadowBlur={18}
            opacity={0}
          >
            <Txt
              text="⚠️ RETRASO CRÍTICO: La siembra se desplaza hasta finales de junio"
              fill={THEME.colors.paper.cream}
              fontFamily={THEME.typography.sans}
              fontSize={28}
              fontWeight={700}
            />
          </Rect>
        </Node>
      </Node>

      {/* 4. Capa Toma Real 2 */}
      <Node ref={footage2Node} opacity={0}>
        <VideoPlaceholder
          title="Agricultores y el saber tradicional"
          cue="Quienes siembran lo enfrentan solos... el saber tradicional se está perdiendo."
          suggestedFile="toma-02-saber-tradicional.mp4"
          durationSeconds={8.0}
        />
      </Node>
    </Node>,
  );

  // ==========================================
  // COREOGRAFÍA TEMPORAL EXACTA (20.288 s - parrafo2.m4a)
  // ==========================================

  // [0.0s – 2.8s]: Toma Real 1 («De acuerdo al INEGI, en la Ciudad de México...»)

  // Transición: Footage 1 sale, INS-03 entra (~10 frames antes de «más del 90%»)
  yield* all(
    // footage1Node().opacity(0, 0.35, easeInOutCubic),
    ins03Node().opacity(1, 0.35, easeInOutCubic),
  );

  // [2.8s – 6.0s]: «...más del 90% de la tierra cultivada depende de la lluvia.»
  // Entrada sincronizada de Tarjeta de Estadística y Mapa Cartográfico de Temporal
  yield* all(
    statCard().opacity(1, 3.5, easeInOutCubic),
    statCard().position.y(0, 4.0, easeInOutCubic),
    mapTemporalNode().opacity(1, 0.65, easeOutCubic),
    mapTemporalNode().scale(1, 0.65, easeOutBack),
  );

  yield* waitFor(2.45);

  // Pausa de lectura para apreciar el mapa y las cifras por alcaldía (>90%)
  yield* waitFor(2.55);

  // [6.0s – 12.2s]: «Y con un clima cada vez más impredecible... finales de junio.»
  // Transición de Tiempo 1 (Mapa) a Tiempo 2 (Calendario de siembra)
  yield* all(
    gridNode().opacity(0, 0.55, easeInOutCubic),
    gridNode().scale(0.92, 0.55, easeInOutCubic),
    calendarNode().opacity(1, 0.65, easeOutCubic),
  );

  yield* waitFor(0.35);

  // Desplazamiento del marcador hacia finales de junio con la alerta
  yield* all(
    calendarSlider().position.x(140, 1.8, easeInOutCubic),
    delayBadge().opacity(1, 1.0, easeOutCubic),
  );

  yield* waitFor(3.05);

  // Transición hacia Toma Real 2 (~10 frames después de «finales de junio»)
  yield* all(
    ins03Node().opacity(0, 0.35, easeInOutCubic),
    footage2Node().opacity(1, 0.35, easeInOutCubic),
  );

  // [12.2s – 20.288s]: Toma Real 2 («Quienes siembran lo enfrentan solos...»)
  yield* waitFor(8.088);
});
