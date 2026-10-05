import { makeScene2D, Node, Audio, Rect, Txt, Circle, Path, Img } from "@revideo/2d";
import {
  all,
  createRef,
  easeInOutCubic,
  easeOutBack,
  easeOutCubic,
  waitFor,
} from "@revideo/core";
import { THEME } from "../theme";

import audioParrafo5 from "../../audio/parrafo5.m4a";
import tallerComunitarioTexture from "../../assets/textures/toma-05-taller-comunitario.jpg";

/**
 * TOMA 5 MAESTRA · 21.653 s (Duración exacta de parrafo5.m4a)
 * Sincronización continua de audio sin cortes prematuros
 *
 * Estructura:
 * 1. [0.0s – 5.4s]:   IMAGEN REAL ANIMADA 1 (Taller comunitario / diálogo con productores)
 * 2. [5.4s – 15.58s]: INS-09 (El manual vivo por dentro: saber + datos, fichas contingencia, anillo anual)
 * 3. [15.58s – 21.653s]: INS-09b (Portada del Manual Vivo: firmas comunitarias a tinta viva y Gran Sello «Autores: La comunidad»)
 */
export default makeScene2D("toma-05", function* (view) {
  view.fill(THEME.colors.paper.cream);

  const footage1Node = createRef<Node>();
  const tallerCameraNode = createRef<Node>();
  const ins09Node = createRef<Node>();
  const coverAuthorshipNode = createRef<Node>();

  // Elementos INS-09 (Manual Vivo Interior)
  const threadTradition = createRef<Path>();
  const threadData = createRef<Path>();
  const manualCard = createRef<Rect>();
  const cardSequia = createRef<Node>();
  const cardVentarron = createRef<Node>();
  const cardHelada = createRef<Node>();
  const annualRing = createRef<Circle>();

  // Elementos INS-09b (Portada del Manual y Coautoría Comunitaria)
  const coverCard = createRef<Rect>();
  const sig1Path = createRef<Path>();
  const sig2Path = createRef<Path>();
  const sig3Path = createRef<Path>();
  const sig1TextNode = createRef<Node>();
  const sig2TextNode = createRef<Node>();
  const sig3TextNode = createRef<Node>();
  const sealNode = createRef<Node>();
  const sealThreadTradition = createRef<Path>();
  const sealThreadData = createRef<Path>();

  view.add(
    <Node>
      {/* Audio maestro continuo de la Toma 5 (21.653 s) */}
      <Audio src={audioParrafo5} play={true} />

      {/* 1. Capa Imagen Real 1 (Taller comunitario y diálogo con productores) */}
      <Node ref={footage1Node} opacity={1}>
        <Node ref={tallerCameraNode} position={[0, 0]} scale={1.03}>
          <Img
            src={tallerComunitarioTexture}
            width={1920}
            height={1100}
            position={[0, 0]}
          />
        </Node>
      </Node>

      {/* 2. Capa INS-09 (Manual Vivo Interior: Fichas y Anillo Anual) */}
      <Node ref={ins09Node} opacity={0}>
        <Rect
          width={1600}
          height={780}
          fill={THEME.colors.paper.amateLight}
          stroke={THEME.colors.earth.ochre}
          lineWidth={2.5}
          radius={22}
          position={[0, 0]}
          padding={[40, 50]}
          shadowColor={`${THEME.colors.earth.dark}18`}
          shadowBlur={20}
        >
          {/* Filete decorativo interior */}
          <Rect
            width={1540}
            height={720}
            stroke={`${THEME.colors.earth.ochre}60`}
            lineWidth={1.5}
            radius={16}
          />

          <Txt
            text="MANUAL VIVO Y ADAPTABLE"
            position={[0, -310]}
            fill={THEME.colors.earth.deep}
            fontFamily={THEME.typography.serif}
            fontSize={46}
            fontWeight={700}
            letterSpacing={3}
          />
          <Txt
            text="Saber tradicional + Datos de las estaciones"
            position={[0, -260]}
            fill={THEME.colors.earth.warmClay}
            fontFamily={THEME.typography.sans}
            fontSize={28}
            fontWeight={600}
          />

          {/* Dos hilos que se aproximan y trenzan */}
          <Node position={[0, -180]}>
            <Path
              ref={threadTradition}
              data="M -420,0 C -220,0 -110,24 0,0"
              stroke={THEME.colors.earth.terracotta}
              lineWidth={4.5}
              opacity={0.85}
            />
            <Txt
              text="Saber tradicional"
              position={[-260, -28]}
              fill={THEME.colors.earth.terracotta}
              fontFamily={THEME.typography.sans}
              fontSize={22}
              fontWeight={700}
            />

            <Path
              ref={threadData}
              data="M 420,0 C 220,0 110,-24 0,0"
              stroke={THEME.colors.climate.rainBlue}
              lineWidth={4.5}
              opacity={0.85}
            />
            <Txt
              text="Datos de estaciones"
              position={[260, -28]}
              fill={THEME.colors.climate.rainBlue}
              fontFamily={THEME.typography.sans}
              fontSize={22}
              fontWeight={700}
            />
          </Node>

          {/* Carpeta / Manual con 3 fichas de contingencia */}
          <Rect
            ref={manualCard}
            width={1160}
            height={370}
            position={[0, 40]}
            fill={THEME.colors.paper.cream}
            stroke={THEME.colors.earth.ochre}
            lineWidth={2}
            radius={18}
            padding={[24, 30]}
            shadowColor={`${THEME.colors.earth.dark}20`}
            shadowBlur={20}
          >
            {/* 1. Sequía */}
            <Node ref={cardSequia} position={[-360, -10]} opacity={0} y={30}>
              <Rect
                width={340}
                height={270}
                fill={THEME.colors.paper.amateLight}
                stroke={THEME.colors.earth.ochre}
                lineWidth={1.5}
                radius={14}
                padding={[18, 16]}
              >
                <Txt text="☀️" fontSize={52} position={[0, -68]} />
                <Txt
                  text="SEQUÍA"
                  position={[0, -3]}
                  fill={THEME.colors.climate.droughtOrange}
                  fontFamily={THEME.typography.serif}
                  fontSize={32}
                  fontWeight={700}
                />
                <Txt
                  text="Manejo de suelo y humedad"
                  position={[0, 42]}
                  fill={THEME.colors.earth.deep}
                  fontFamily={THEME.typography.sans}
                  fontSize={20}
                  fontWeight={600}
                />
                <Txt
                  text="Acción preventiva"
                  position={[0, 80]}
                  fill={THEME.colors.earth.warmClay}
                  fontFamily={THEME.typography.sans}
                  fontSize={18}
                />
              </Rect>
            </Node>

            {/* 2. Ventarrón */}
            <Node ref={cardVentarron} position={[0, -10]} opacity={0} y={30}>
              <Rect
                width={340}
                height={270}
                fill={THEME.colors.paper.amateLight}
                stroke={THEME.colors.earth.ochre}
                lineWidth={1.5}
                radius={14}
                padding={[18, 16]}
              >
                <Txt text="💨" fontSize={52} position={[0, -68]} />
                <Txt
                  text="VENTARRÓN"
                  position={[0, -3]}
                  fill={THEME.colors.climate.skyMist}
                  fontFamily={THEME.typography.serif}
                  fontSize={32}
                  fontWeight={700}
                />
                <Txt
                  text="Protección de espigas y corte"
                  position={[0, 42]}
                  fill={THEME.colors.earth.deep}
                  fontFamily={THEME.typography.sans}
                  fontSize={20}
                  fontWeight={600}
                />
                <Txt
                  text="Aviso de ráfagas"
                  position={[0, 80]}
                  fill={THEME.colors.earth.warmClay}
                  fontFamily={THEME.typography.sans}
                  fontSize={18}
                />
              </Rect>
            </Node>

            {/* 3. Helada */}
            <Node ref={cardHelada} position={[360, -10]} opacity={0} y={30}>
              <Rect
                width={340}
                height={270}
                fill={THEME.colors.paper.amateLight}
                stroke={THEME.colors.earth.ochre}
                lineWidth={1.5}
                radius={14}
                padding={[18, 16]}
              >
                <Txt text="❄️" fontSize={52} position={[0, -68]} />
                <Txt
                  text="HELADA"
                  position={[0, -3]}
                  fill={THEME.colors.climate.frost}
                  fontFamily={THEME.typography.serif}
                  fontSize={32}
                  fontWeight={700}
                />
                <Txt
                  text="Temperatura crítica en cumbre"
                  position={[0, 42]}
                  fill={THEME.colors.earth.deep}
                  fontFamily={THEME.typography.sans}
                  fontSize={20}
                  fontWeight={600}
                />
                <Txt
                  text="Alerta anticipada"
                  position={[0, 80]}
                  fill={THEME.colors.earth.warmClay}
                  fontFamily={THEME.typography.sans}
                  fontSize={18}
                />
              </Rect>
            </Node>
          </Rect>

          {/* Anillo de actualización anual */}
          <Node position={[0, 280]}>
            <Circle
              ref={annualRing}
              size={44}
              stroke={THEME.colors.milpa.deepGreen}
              lineWidth={3.5}
              opacity={0.85}
              scale={1}
            />
            <Txt
              text="↺ Se actualiza cada año con la comunidad"
              position={[0, 0]}
              fill={THEME.colors.milpa.deepGreen}
              fontFamily={THEME.typography.sans}
              fontSize={26}
              fontWeight={700}
            />
          </Node>
        </Rect>
      </Node>

      {/* 3. Capa INS-09b (Portada del Manual Vivo · Coautoría Comunitaria con Firmas y Gran Sello) */}
      <Node ref={coverAuthorshipNode} opacity={0}>
        <Rect
          ref={coverCard}
          width={1600}
          height={800}
          fill={THEME.colors.paper.amateLight}
          stroke={THEME.colors.earth.terracotta}
          lineWidth={3}
          radius={24}
          position={[0, 0]}
          padding={[35, 45]}
          shadowColor={`${THEME.colors.earth.dark}20`}
          shadowBlur={22}
        >
          {/* Lomo encuadernado artesanal en el costado izquierdo */}
          <Rect
            position={[-755, 0]}
            width={70}
            height={800}
            fill={`${THEME.colors.earth.warmClay}25`}
            stroke={THEME.colors.earth.ochre}
            lineWidth={1.5}
          />
          {/* Puntadas de ixtle/cordel en el lomo */}
          {[-300, -200, -100, 0, 100, 200, 300].map((yPos, i) => (
            <Node key={`stitch-${i}`} position={[-755, yPos]}>
              <Circle size={10} fill={THEME.colors.earth.deep} />
              <Rect width={24} height={3.5} position={[0, 0]} fill={THEME.colors.earth.terracotta} />
            </Node>
          ))}

          {/* Cintillo superior: Metadatos y Soberanía Local */}
          <Rect
            position={[25, -330]}
            width={620}
            height={36}
            fill={`${THEME.colors.milpa.deepGreen}15`}
            stroke={THEME.colors.milpa.deepGreen}
            lineWidth={1.5}
            radius={18}
          >
            <Txt
              text="DOCUMENTO VIVO Y SOBERANO · SANTIAGO TULYEHUALCO"
              fill={THEME.colors.milpa.deepGreen}
              fontFamily={THEME.typography.mono}
              fontSize={16}
              fontWeight={700}
              letterSpacing={1}
            />
          </Rect>

          {/* Título de la Portada del Manual */}
          <Txt
            text="MANUAL BIOCLIMÁTICO COMUNITARIO"
            position={[25, -270]}
            fill={THEME.colors.earth.deep}
            fontFamily={THEME.typography.serif}
            fontSize={46}
            fontWeight={700}
            letterSpacing={3}
          />
          <Txt
            text="Saber tradicional de la milpa entrelazado con datos meteorológicos locales"
            position={[25, -220]}
            fill={THEME.colors.earth.warmClay}
            fontFamily={THEME.typography.sans}
            fontSize={24}
            fontWeight={600}
          />

          {/* Gran Placa Interior: Registro de Firmas y Gran Sello de Coautoría */}
          <Rect
            position={[25, 75]}
            width={1460}
            height={490}
            fill={THEME.colors.paper.cream}
            stroke={THEME.colors.earth.ochre}
            lineWidth={2}
            radius={18}
            padding={[24, 30]}
            shadowColor={`${THEME.colors.earth.dark}12`}
            shadowBlur={15}
          >
            {/* LADO IZQUIERDO: Encabezado de firmas */}
            <Txt
              text="REGISTRO DE COAUTORÍA Y SABERES LOCALES"
              position={[-670, -190]}
              fill={THEME.colors.milpa.deepGreen}
              fontFamily={THEME.typography.mono}
              fontSize={17}
              fontWeight={700}
              offset={[-1, 0]}
            />
            <Txt
              text="«En él queda plasmado su conocimiento, con ellos como autores»"
              position={[-670, -160]}
              fill={THEME.colors.earth.deep}
              fontFamily={THEME.typography.sans}
              fontSize={19}
              fontStyle="italic"
              offset={[-1, 0]}
            />

            {/* Fila 1: Agricultores */}
            <Node ref={sig1TextNode} position={[0, -75]} opacity={0}>
              {/* Texto a la izquierda */}
              <Txt
                text="Agricultores"
                position={[-670, 0]}
                fill={THEME.colors.earth.deep}
                fontFamily={THEME.typography.serif}
                fontSize={26}
                fontWeight={700}
                offset={[-1, 0]}
              />
              {/* Rúbrica caligráfica viva en columna dedicada a la derecha */}
              <Node position={[-110, 0]}>
                <Rect width={250} height={1.5} position={[0, 18]} fill={`${THEME.colors.earth.ochre}80`} />
                <Path
                  ref={sig1Path}
                  data="M -100,12 C -75,-28 -55,22 -35,-18 C -15,-45 5,18 30,-8 C 55,-28 75,18 95,-5 C 110,-22 120,8 130,-12"
                  stroke={THEME.colors.earth.deep}
                  lineWidth={3.5}
                  lineCap="round"
                  lineJoin="round"
                  end={0}
                />
              </Node>
            </Node>

            {/* Fila 2: Productores */}
            <Node ref={sig2TextNode} position={[0, 20]} opacity={0}>
              {/* Texto a la izquierda */}
              <Txt
                text="Productores"
                position={[-670, 0]}
                fill={THEME.colors.earth.deep}
                fontFamily={THEME.typography.serif}
                fontSize={26}
                fontWeight={700}
                offset={[-1, 0]}
              />
              {/* Rúbrica caligráfica viva en columna dedicada a la derecha */}
              <Node position={[-110, 0]}>
                <Rect width={250} height={1.5} position={[0, 18]} fill={`${THEME.colors.earth.ochre}80`} />
                <Path
                  ref={sig2Path}
                  data="M -100,-10 C -82,25 -60,-32 -38,12 C -18,32 2,-22 25,16 C 48,35 68,-16 88,6 C 105,22 115,-24 125,-6"
                  stroke={THEME.colors.earth.deep}
                  lineWidth={3.5}
                  lineCap="round"
                  lineJoin="round"
                  end={0}
                />
              </Node>
            </Node>

            {/* Fila 3: Miembros de la comunidad */}
            <Node ref={sig3TextNode} position={[0, 115]} opacity={0}>
              {/* Texto a la izquierda */}
              <Txt
                text="Miembros de la comunidad"
                position={[-670, 0]}
                fill={THEME.colors.earth.deep}
                fontFamily={THEME.typography.serif}
                fontSize={26}
                fontWeight={700}
                offset={[-1, 0]}
              />
              {/* Rúbrica caligráfica viva en columna dedicada a la derecha */}
              <Node position={[-110, 0]}>
                <Rect width={250} height={1.5} position={[0, 18]} fill={`${THEME.colors.earth.ochre}80`} />
                <Path
                  ref={sig3Path}
                  data="M -100,2 C -70,-35 -40,32 -15,-18 C 10,-38 35,24 60,-10 C 85,-30 105,20 120,-14 C 126,5 130,-10 134,-2"
                  stroke={THEME.colors.earth.deep}
                  lineWidth={3.5}
                  lineCap="round"
                  lineJoin="round"
                  end={0}
                />
              </Node>
            </Node>

            {/* Pie de firmas */}
            <Txt
              text="✦ Coautoría comunitaria, memoria bioclimática y soberanía territorial"
              position={[-670, 195]}
              fill={THEME.colors.milpa.deepGreen}
              fontFamily={THEME.typography.mono}
              fontSize={15}
              fontWeight={700}
              offset={[-1, 0]}
            />

            {/* LADO DERECHO: El Gran Sello de Coautoría («AUTORES: LA COMUNIDAD») */}
            <Node ref={sealNode} position={[450, 0]} opacity={0} scale={1.4} rotation={8}>
              {/* Sello circular artesanal */}
              <Circle
                size={330}
                fill={THEME.colors.paper.amateLight}
                stroke={THEME.colors.earth.terracotta}
                lineWidth={4.5}
                shadowColor={`${THEME.colors.earth.dark}25`}
                shadowBlur={20}
              />
              <Circle
                size={295}
                stroke={THEME.colors.milpa.deepGreen}
                lineWidth={2}
                lineDash={[8, 6]}
              />
              <Circle
                size={260}
                stroke={THEME.colors.earth.ochre}
                lineWidth={1.5}
              />

              {/* Textos del Sello */}
              <Txt
                text="DOCUMENTO APROBADO"
                position={[0, -92]}
                fill={THEME.colors.earth.warmClay}
                fontFamily={THEME.typography.mono}
                fontSize={15}
                fontWeight={700}
                letterSpacing={1.5}
              />
              <Txt
                text="AUTORES:"
                position={[0, -52]}
                fill={THEME.colors.earth.terracotta}
                fontFamily={THEME.typography.serif}
                fontSize={28}
                fontWeight={700}
                letterSpacing={2}
              />
              <Txt
                text="LA COMUNIDAD"
                position={[0, -8]}
                fill={THEME.colors.earth.dark}
                fontFamily={THEME.typography.serif}
                fontSize={38}
                fontWeight={800}
                letterSpacing={2.5}
              />
              <Rect
                position={[0, 26]}
                width={190}
                height={2.5}
                fill={THEME.colors.milpa.deepGreen}
              />
              <Txt
                text="🌾 ☀️ 💧"
                position={[0, 54]}
                fontSize={26}
              />
              <Txt
                text="SANTIAGO TULYEHUALCO"
                position={[0, 90]}
                fill={THEME.colors.milpa.deepGreen}
                fontFamily={THEME.typography.mono}
                fontSize={16}
                fontWeight={700}
                letterSpacing={1}
              />
              <Txt
                text="CIENCIA COMUNITARIA · 2026"
                position={[0, 114]}
                fill={THEME.colors.earth.warmClay}
                fontFamily={THEME.typography.mono}
                fontSize={13}
                fontWeight={600}
              />

              {/* Hilos que se anudan en el sello */}
              <Path
                ref={sealThreadTradition}
                data="M -220,-115 C -145,-95 -75,-135 -15,-110"
                stroke={THEME.colors.earth.terracotta}
                lineWidth={3.5}
                opacity={0.85}
              />
              <Path
                ref={sealThreadData}
                data="M 220,-115 C 145,-95 75,-135 15,-110"
                stroke={THEME.colors.climate.rainBlue}
                lineWidth={3.5}
                opacity={0.85}
              />
            </Node>
          </Rect>
        </Rect>
      </Node>
    </Node>,
  );

  // ==========================================
  // COREOGRAFÍA TEMPORAL EXACTA (21.653 s)
  // Sincronización continua de muestra con parrafo5.m4a
  // ==========================================

  // [0.0s – 5.40s]: Imagen Real 1 (Taller comunitario y diálogo con productores)
  // Animación Ken Burns: paneo horizontal recorriendo la mesa de diálogo + zoom sutil
  yield* all(
    tallerCameraNode().position.x(-15, 5.4, easeInOutCubic),
    tallerCameraNode().scale(1.06, 5.4, easeInOutCubic),
    (function* () {
      yield* waitFor(5.05);
      // Transición hacia INS-09 (~10 frames antes de «junta su saber tradicional...»)
      yield* all(
        footage1Node().opacity(0, 0.35, easeInOutCubic),
        ins09Node().opacity(1, 0.35, easeInOutCubic),
      );
    })(),
  ); // 5.40s exacto

  // [5.40s – 14.18s]: INS-09 (Fichas del manual y ciclo anual)
  // Entrada ficha 1: Sequía (al compás de «sequías...»)
  yield* all(
    cardSequia().opacity(1, 0.6, easeOutBack),
    cardSequia().position.y(-10, 0.6, easeOutBack),
  ); // 6.00s
  yield* waitFor(1.6); // 7.60s

  // Entrada ficha 2: Ventarrón (al compás de «ventarrones...»)
  yield* all(
    cardVentarron().opacity(1, 0.6, easeOutBack),
    cardVentarron().position.y(-10, 0.6, easeOutBack),
  ); // 8.20s
  yield* waitFor(1.6); // 9.80s

  // Entrada ficha 3: Helada (al compás de «heladas...»)
  yield* all(
    cardHelada().opacity(1, 0.6, easeOutBack),
    cardHelada().position.y(-10, 0.6, easeOutBack),
  ); // 10.40s
  yield* waitFor(3.78); // 14.18s («...para estar preparados. [pausa]»)

  // [14.18s – 15.58s]: «Se actualiza cada año...»
  yield* all(
    annualRing().rotation(360, 1.1, easeInOutCubic),
    annualRing().scale(1.2, 0.55, easeOutBack),
  ); // 15.28s
  yield* annualRing().scale(1.0, 0.3, easeInOutCubic); // 15.58s

  // [15.58s – 19.50s]: «...y en él queda plasmado su conocimiento,»
  // Transición hacia INS-09b (Portada del Manual de Amate)
  yield* all(
    ins09Node().opacity(0, 0.35, easeInOutCubic),
    coverAuthorshipNode().opacity(1, 0.35, easeInOutCubic),
  ); // 15.93s

  // Firmas caligráficas a tinta viva que se trazan mientras se enuncia el conocimiento plasmado
  // 1. Firma Agricultores
  yield* all(
    sig1TextNode().opacity(1, 0.4, easeOutCubic),
    sig1Path().end(1, 0.85, easeInOutCubic),
  ); // 16.93s
  yield* waitFor(0.15); // 17.08s

  // 2. Firma Productores
  yield* all(
    sig2TextNode().opacity(1, 0.4, easeOutCubic),
    sig2Path().end(1, 0.85, easeInOutCubic),
  ); // 18.08s
  yield* waitFor(0.15); // 18.23s

  // 3. Firma Miembros de la comunidad
  yield* all(
    sig3TextNode().opacity(1, 0.4, easeOutCubic),
    sig3Path().end(1, 0.85, easeInOutCubic),
  ); // 18.78s
  yield* waitFor(0.72); // 19.50s («...con ellos como autores.»)

  // [19.50s – 20.00s]: «...con ellos como autores.»
  // El Gran Sello de Coautoría se estampa con impacto artesanal justo en la frase de remate
  yield* all(
    sealNode().opacity(1, 0.15, easeOutCubic),
    sealNode().scale(1.0, 0.5, easeOutBack),
    sealNode().rotation(-5, 0.5, easeOutBack),
  ); // 20.00s

  // Pausa serena final que cubre exactamente hasta el final de parrafo5.m4a (21.653 s)
  yield* waitFor(1.653); // 21.653s total exacto
});
