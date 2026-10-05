import { makeScene2D, Node, Audio, Rect, Txt, Circle, Path } from "@revideo/2d";
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

import audioParrafo5 from "../../audio/parrafo5.m4a";

/**
 * TOMA 5 MAESTRA · 21.65 s
 * Sincronización continua con parrafo5.m4a
 *
 * Estructura:
 * 1. [0.0s – 5.4s]:   TOMA REAL 1 (Taller comunitario / diálogo con productores)
 * 2. [5.4s – 15.2s]:  INS-09 (El manual vivo por dentro: saber + datos, fichas contingencia)
 * 3. [15.2s – 21.65s]: INS-09b (Portada del Manual Vivo: firmas a tinta viva y Gran Sello «Autores: La comunidad»)
 */
export default makeScene2D("toma-05", function* (view) {
  view.fill(THEME.colors.paper.cream);

  const footage1Node = createRef<Node>();
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
      {/* Audio maestro continuo de la Toma 5 (21.65 s) */}
      <Audio src={audioParrafo5} play={true} />

      {/* 1. Capa Toma Real 1 */}
      <Node ref={footage1Node} opacity={1}>
        <VideoPlaceholder
          title="Taller comunitario y diálogo con productores"
          cue="El corazón de Cehuamilli es un manual vivo y adaptable, que la comunidad escribe junto a nosotros:"
          suggestedFile="toma-05-taller-comunitario.mp4"
          durationSeconds={5.4}
        />
      </Node>

      {/* 2. Capa INS-09 (Manual Vivo Interior: Fichas y Anillo Anual) */}
      <Node ref={ins09Node} opacity={0}>
        <Rect
          width={1600}
          height={760}
          fill={THEME.colors.paper.amateLight}
          stroke={THEME.colors.earth.ochre}
          lineWidth={2.5}
          radius={20}
          position={[0, -20]}
          padding={[40, 50]}
          shadowColor={`${THEME.colors.earth.dark}18`}
          shadowBlur={20}
        >
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
          height={780}
          fill={THEME.colors.paper.amateLight}
          stroke={THEME.colors.earth.terracotta}
          lineWidth={3}
          radius={22}
          position={[0, -10]}
          padding={[35, 45]}
          shadowColor={`${THEME.colors.earth.dark}20`}
          shadowBlur={22}
          clip={true}
        >
          {/* Lomo encuadernado artesanal en el costado izquierdo */}
          <Rect
            position={[-755, 0]}
            width={70}
            height={780}
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
            position={[25, -325]}
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
            position={[25, -265]}
            fill={THEME.colors.earth.deep}
            fontFamily={THEME.typography.serif}
            fontSize={46}
            fontWeight={700}
            letterSpacing={3}
          />
          <Txt
            text="Saber tradicional de la milpa entrelazado con datos meteorológicos locales"
            position={[25, -215]}
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
            {/* LADO IZQUIERDO: Registro de Firmas Comunitarias */}
            <Node position={[-250, 0]}>
              <Txt
                text="REGISTRO DE COAUTORÍA Y SABERES LOCALES"
                position={[-420, -195]}
                fill={THEME.colors.milpa.deepGreen}
                fontFamily={THEME.typography.mono}
                fontSize={17}
                fontWeight={700}
                offset={[-1, 0]}
              />
              <Txt
                text="«En él queda plasmado su conocimiento, con ellos como autores»"
                position={[-420, -165]}
                fill={THEME.colors.earth.deep}
                fontFamily={THEME.typography.sans}
                fontSize={19}
                fontStyle="italic"
                offset={[-1, 0]}
              />

              {/* Fila 1: Don Francisco Chavira */}
              <Node ref={sig1TextNode} position={[-420, -80]} opacity={0}>
                <Txt
                  text="Don Francisco Chavira Morales"
                  position={[0, -16]}
                  fill={THEME.colors.earth.deep}
                  fontFamily={THEME.typography.serif}
                  fontSize={24}
                  fontWeight={700}
                  offset={[-1, 0]}
                />
                <Txt
                  text="Agricultor de temporal · Paraje El Teuhtli"
                  position={[0, 16]}
                  fill={THEME.colors.earth.warmClay}
                  fontFamily={THEME.typography.sans}
                  fontSize={17}
                  fontWeight={600}
                  offset={[-1, 0]}
                />
                {/* Rúbrica caligráfica viva */}
                <Node position={[490, 0]}>
                  <Rect width={270} height={1.5} position={[0, 18]} fill={`${THEME.colors.earth.ochre}80`} />
                  <Path
                    ref={sig1Path}
                    data="M -110,12 C -85,-28 -65,22 -45,-18 C -25,-45 -5,18 20,-8 C 45,-28 65,18 85,-5 C 105,-22 120,8 135,-12"
                    stroke={THEME.colors.earth.deep}
                    lineWidth={3.5}
                    lineCap="round"
                    lineJoin="round"
                    end={0}
                  />
                </Node>
              </Node>

              {/* Fila 2: Doña Martha Valencia */}
              <Node ref={sig2TextNode} position={[-420, 20]} opacity={0}>
                <Txt
                  text="Doña Martha Valencia Medina"
                  position={[0, -16]}
                  fill={THEME.colors.earth.deep}
                  fontFamily={THEME.typography.serif}
                  fontSize={24}
                  fontWeight={700}
                  offset={[-1, 0]}
                />
                <Txt
                  text="Transformadora tradicional de amaranto · San Juan"
                  position={[0, 16]}
                  fill={THEME.colors.earth.warmClay}
                  fontFamily={THEME.typography.sans}
                  fontSize={17}
                  fontWeight={600}
                  offset={[-1, 0]}
                />
                {/* Rúbrica caligráfica viva */}
                <Node position={[490, 0]}>
                  <Rect width={270} height={1.5} position={[0, 18]} fill={`${THEME.colors.earth.ochre}80`} />
                  <Path
                    ref={sig2Path}
                    data="M -110,-10 C -92,25 -70,-32 -48,12 C -28,32 -8,-22 15,16 C 38,35 58,-16 78,6 C 98,22 118,-24 135,-6"
                    stroke={THEME.colors.earth.deep}
                    lineWidth={3.5}
                    lineCap="round"
                    lineJoin="round"
                    end={0}
                  />
                </Node>
              </Node>

              {/* Fila 3: Comité de Productores */}
              <Node ref={sig3TextNode} position={[-420, 120]} opacity={0}>
                <Txt
                  text="Comité de Productores y Aguas Ejidales"
                  position={[0, -16]}
                  fill={THEME.colors.earth.deep}
                  fontFamily={THEME.typography.serif}
                  fontSize={24}
                  fontWeight={700}
                  offset={[-1, 0]}
                />
                <Txt
                  text="Asamblea Agraria de Santiago Tulyehualco"
                  position={[0, 16]}
                  fill={THEME.colors.earth.warmClay}
                  fontFamily={THEME.typography.sans}
                  fontSize={17}
                  fontWeight={600}
                  offset={[-1, 0]}
                />
                {/* Rúbrica caligráfica viva */}
                <Node position={[490, 0]}>
                  <Rect width={270} height={1.5} position={[0, 18]} fill={`${THEME.colors.earth.ochre}80`} />
                  <Path
                    ref={sig3Path}
                    data="M -110,2 C -80,-35 -50,32 -25,-18 C 0,-38 25,24 50,-10 C 75,-30 100,20 120,-14 C 130,5 138,-10 142,-2"
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
                position={[-420, 205]}
                fill={THEME.colors.milpa.deepGreen}
                fontFamily={THEME.typography.mono}
                fontSize={15}
                fontWeight={700}
                offset={[-1, 0]}
              />
            </Node>

            {/* LADO DERECHO: El Gran Sello de Coautoría («AUTORES: LA COMUNIDAD») */}
            <Node ref={sealNode} position={[480, 0]} opacity={0} scale={1.4} rotation={8}>
              {/* Sello circular artesanal */}
              <Circle
                size={340}
                fill={THEME.colors.paper.amateLight}
                stroke={THEME.colors.earth.terracotta}
                lineWidth={4.5}
                shadowColor={`${THEME.colors.earth.dark}25`}
                shadowBlur={20}
              />
              <Circle
                size={305}
                stroke={THEME.colors.milpa.deepGreen}
                lineWidth={2}
                lineDash={[8, 6]}
              />
              <Circle
                size={270}
                stroke={THEME.colors.earth.ochre}
                lineWidth={1.5}
              />

              {/* Textos del Sello */}
              <Txt
                text="DOCUMENTO APROBADO"
                position={[0, -98]}
                fill={THEME.colors.earth.warmClay}
                fontFamily={THEME.typography.mono}
                fontSize={15}
                fontWeight={700}
                letterSpacing={1.5}
              />
              <Txt
                text="AUTORES:"
                position={[0, -56]}
                fill={THEME.colors.earth.terracotta}
                fontFamily={THEME.typography.serif}
                fontSize={28}
                fontWeight={700}
                letterSpacing={2}
              />
              <Txt
                text="LA COMUNIDAD"
                position={[0, -10]}
                fill={THEME.colors.earth.dark}
                fontFamily={THEME.typography.serif}
                fontSize={38}
                fontWeight={800}
                letterSpacing={2.5}
              />
              <Rect
                position={[0, 26]}
                width={200}
                height={2.5}
                fill={THEME.colors.milpa.deepGreen}
              />
              <Txt
                text="🌾 ☀️ 💧"
                position={[0, 56]}
                fontSize={26}
              />
              <Txt
                text="SANTIAGO TULYEHUALCO"
                position={[0, 94]}
                fill={THEME.colors.milpa.deepGreen}
                fontFamily={THEME.typography.mono}
                fontSize={16}
                fontWeight={700}
                letterSpacing={1}
              />
              <Txt
                text="CIENCIA COMUNITARIA · 2026"
                position={[0, 118]}
                fill={THEME.colors.earth.warmClay}
                fontFamily={THEME.typography.mono}
                fontSize={13}
                fontWeight={600}
              />

              {/* Hilos que se anudan en el sello */}
              <Path
                ref={sealThreadTradition}
                data="M -230,-120 C -150,-100 -80,-140 -20,-115"
                stroke={THEME.colors.earth.terracotta}
                lineWidth={3.5}
                opacity={0.85}
              />
              <Path
                ref={sealThreadData}
                data="M 230,-120 C 150,-100 80,-140 20,-115"
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
  // COREOGRAFÍA TEMPORAL EXACTA (21.65 s)
  // ==========================================

  // [0.0s – 5.4s]: Toma Real 1 (Taller comunitario)
  yield* waitFor(5.05);

  // Transición hacia INS-09 (~10 frames antes de «junta su saber tradicional...»)
  yield* all(
    footage1Node().opacity(0, 0.35, easeInOutCubic),
    ins09Node().opacity(1, 0.35, easeInOutCubic),
  );

  // [5.4s – 15.2s]: INS-09 (Fichas del manual y ciclo anual)
  // Entrada ficha 1: Sequía
  yield* all(
    cardSequia().opacity(1, 0.6, easeOutBack),
    cardSequia().position.y(-10, 0.6, easeOutBack),
  );
  yield* waitFor(1.5);

  // Entrada ficha 2: Ventarrón
  yield* all(
    cardVentarron().opacity(1, 0.6, easeOutBack),
    cardVentarron().position.y(-10, 0.6, easeOutBack),
  );
  yield* waitFor(1.5);

  // Entrada ficha 3: Helada
  yield* all(
    cardHelada().opacity(1, 0.6, easeOutBack),
    cardHelada().position.y(-10, 0.6, easeOutBack),
  );
  yield* waitFor(2.8);

  // [14.1s – 15.2s]: Rotación del ciclo anual («Se actualiza cada año...»)
  yield* all(
    annualRing().rotation(360, 1.1, easeInOutCubic),
    annualRing().scale(1.2, 0.55, easeOutBack),
  );
  yield* annualRing().scale(1.0, 0.45, easeInOutCubic);

  // [15.2s – 15.55s]: Transición hacia INS-09b («...y en él queda plasmado su conocimiento...»)
  yield* all(
    ins09Node().opacity(0, 0.35, easeInOutCubic),
    coverAuthorshipNode().opacity(1, 0.35, easeInOutCubic),
  );

  // [15.55s – 19.34s]: Firmas caligráficas a tinta viva
  // 1. Firma Don Francisco Chavira
  yield* all(
    sig1TextNode().opacity(1, 0.35, easeOutCubic),
    sig1Path().end(1, 0.75, easeInOutCubic),
  );
  yield* waitFor(0.2);

  // 2. Firma Doña Martha Valencia
  yield* all(
    sig2TextNode().opacity(1, 0.35, easeOutCubic),
    sig2Path().end(1, 0.75, easeInOutCubic),
  );
  yield* waitFor(0.2);

  // 3. Firma Comité Ejidal
  yield* all(
    sig3TextNode().opacity(1, 0.35, easeOutCubic),
    sig3Path().end(1, 0.75, easeInOutCubic),
  );
  yield* waitFor(0.4);

  // [19.34s – 21.65s]: Remate «...con ellos como autores.»
  // El Gran Sello de Coautoría se estampa con impacto artesanal
  yield* all(
    sealNode().opacity(1, 0.15, easeOutCubic),
    sealNode().scale(1.0, 0.45, easeOutBack),
    sealNode().rotation(-5, 0.45, easeOutBack),
  );

  // Pausa final de asimilación hasta completar 21.65 s de parrafo5.m4a
  yield* waitFor(1.85);
});
