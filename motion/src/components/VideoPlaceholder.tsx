import {Node, Rect, Txt, Circle} from '@revideo/2d';
import {THEME} from '../theme';

export interface VideoPlaceholderProps {
  title: string;
  cue: string;
  suggestedFile: string;
  durationSeconds: number;
  width?: number;
  height?: number;
  position?: [number, number];
}

/**
 * Componente para representar una toma real de video (Footage)
 * mientras se realiza el montaje final.
 */
export function VideoPlaceholder({
  title,
  cue,
  suggestedFile,
  durationSeconds,
  width = 1920,
  height = 1080,
  position = [0, 0],
}: VideoPlaceholderProps) {
  return (
    <Node position={position}>
      {/* Fondo de claqueta / pantalla cinematográfica */}
      <Rect
        width={width}
        height={height}
        fill={THEME.colors.earth.dark}
      />

      {/* Guías de encuadre 16:9 y bordes de visor de cámara */}
      <Rect
        width={width - 120}
        height={height - 120}
        stroke={`${THEME.colors.paper.amateLight}33`}
        lineWidth={2}
        radius={8}
      />

      {/* Indicador de grabación en vivo / Footage */}
      <Node position={[-width / 2 + 120, -height / 2 + 120]}>
        <Circle size={18} fill="#D9534F" />
        <Txt
          text="TOMA REAL (FOOTAGE)"
          position={[140, 0]}
          fill="#FAF7F0"
          fontFamily={THEME.typography.mono}
          fontSize={20}
          fontWeight={700}
        />
      </Node>

      {/* Duración estimada */}
      <Txt
        text={`DURACIÓN: ~${durationSeconds.toFixed(1)}s`}
        position={[width / 2 - 180, -height / 2 + 120]}
        fill={`${THEME.colors.paper.amateLight}99`}
        fontFamily={THEME.typography.mono}
        fontSize={18}
      />

      {/* Contenido central: Título y texto de locución */}
      <Node position={[0, -20]}>
        {/* Ícono claqueta / cámara */}
        <Rect
          width={80}
          height={60}
          stroke={THEME.colors.earth.terracotta}
          lineWidth={3}
          radius={6}
          position={[0, -70]}
        >
          <Txt text="🎬" fontSize={32} />
        </Rect>

        {/* Título de la escena real requerida */}
        <Txt
          text={title}
          fill={THEME.colors.paper.cream}
          fontFamily={THEME.typography.serif}
          fontSize={44}
          fontWeight={700}
        />

        {/* Cita del guion que acompaña la toma */}
        <Txt
          text={`« ${cue} »`}
          position={[0, 60]}
          fill={THEME.colors.earth.ochre}
          fontFamily={THEME.typography.serif}
          fontSize={26}
          fontStyle="italic"
        />

        {/* Archivo esperado en footage/ */}
        <Rect
          position={[0, 130]}
          fill={`${THEME.colors.earth.deep}CC`}
          stroke={`${THEME.colors.earth.warmClay}66`}
          lineWidth={1.5}
          radius={8}
          padding={[8, 20]}
        >
          <Txt
            text={`Colocar en: motion/footage/${suggestedFile}`}
            fill={THEME.colors.paper.amateLight}
            fontFamily={THEME.typography.mono}
            fontSize={18}
          />
        </Rect>
      </Node>
    </Node>
  );
}
