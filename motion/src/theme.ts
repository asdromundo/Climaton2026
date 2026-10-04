/**
 * Cehuamilli Motion Design — Shared Theme & Aesthetics
 * 
 * Estética: Cálida y artesanal, tonos tierra volcánicos (Teuhtli),
 * verdes milpa y textura de papel amate.
 * Regla: Easings intencionales, nunca lineales; entradas escalonadas;
 * mucho aire y tipografía grande y legible sobre tomas reales.
 */

export const THEME = {
  // Dimensiones base
  dimensions: {
    width: 1920,
    height: 1080,
    fps: 30,
    safeArea: {
      top: 90,
      bottom: 90,
      left: 120,
      right: 120,
    },
  },

  // Paleta de color
  colors: {
    // Tonos Tierra y Volcán Teuhtli
    earth: {
      dark: '#1C1613',
      deep: '#2F241D',
      terracotta: '#8C4D2E',
      ochre: '#C97A3E',
      warmClay: '#A4603D',
    },
    // Verdes de Milpa y Agrosistema
    milpa: {
      deepGreen: '#1B3022',
      leaf: '#2E4C38',
      nopal: '#4F6D42',
      sprout: '#7D9D64',
      paleLeaf: '#C5D6B8',
    },
    // Texturas de Papel y Amate
    paper: {
      cream: '#FAF7F0',
      amateLight: '#F2EBD9',
      amateBase: '#E3D7BF',
      amateDark: '#C9BBA0',
    },
    // Acentos Climatológicos y Datos
    climate: {
      rainBlue: '#2D5B7A',
      skyMist: '#6B90A6',
      frost: '#A8C2D1',
      droughtOrange: '#D46A38',
    },
    // Estado y Placeholders
    status: {
      pending: '#C0392B', // Usado para banner o etiqueta "DATO PENDIENTE"
      verified: '#2E7D32',
    },
  },

  // Tipografías (solo licencias libres OFL / fuentes del sistema)
  typography: {
    // Títulos y narrativa: estilo editorial, cálido y formal
    serif: '"Libertinus Serif", "Georgia", serif',
    // Datos cuantitativos, infografías y etiquetas legibles a distancia
    sans: '"Fira Sans", "Inter", -apple-system, sans-serif',
    // Metadatos, coordenadas y valores técnicos
    mono: '"Fira Code", monospace',

    sizes: {
      hero: 84,
      title: 60,
      subtitle: 42,
      body: 32,
      caption: 24,
      dataDisplay: 96,
    },
  },

  // Curvas de animación (Easings intencionales, NUNCA lineal)
  easings: {
    // Entrada orgánica y suave
    smoothIn: (t: number) => t * t * (3 - 2 * t),
    // Desaceleración suave para datos que caen o se asientan
    easeOutCubic: (t: number) => 1 - Math.pow(1 - t, 3),
    // Énfasis con leve overshoot artesanal
    easeOutBack: (t: number) => {
      const c1 = 1.70158;
      const c3 = c1 + 1;
      return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2);
    },
    // Aceleración y frenado para movimientos de cámara y tarjetas
    easeInOutCubic: (t: number) =>
      t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2,
  },

  // Duraciones estándar (en segundos) para clips de 5 a 8 segundos
  durations: {
    clipMin: 5,
    clipMax: 8,
    staggerDelay: 0.15,
    entrance: 0.8,
    exit: 0.6,
    dwell: 3.5, // Tiempo de lectura en pantalla
  },
} as const;

export type Theme = typeof THEME;

