# CEHUAMILLI · ALERTAS QUE NACEN DE LA TIERRA

**Guion estructurado para inserts animados** · Video de 3:30 · rev. 2

> Fuente de verdad del contenido para el agente. Las reglas generales del proyecto (estilo, stack, licencias, git) viven en `AGENTS.md`. Este archivo define **qué se produce, cuándo entra y qué falta**.

**Qué cambió respecto a la rev. 1**
- **La locución ya está grabada.** El texto no se toca y los inserts se sincronizan con el audio, no con tiempos estimados.
- **Sin tope de 5–8 s.** Cada insert dura lo que dura la frase que ilustra.
- **Datos congelados para la primera versión del video.** En pantalla aparece solo lo que dice la locución. Todo lo que implicaba cifras, fuentes o fechas nuevas pasó a la sección 6.
- Se fusionaron «cifra INEGI» y «siembra tardía» (ahora INS-03), y las dos mitades de la línea del tiempo son un solo clip (INS-10). Se agregó INS-08.

---

## 1. Cómo leer este documento

### Placeholders

Lo que falta se marca así: `{{TIPO: qué hay que poner aquí}}`

Tipos: `DATO` · `FECHA` · `FUENTE` · `TEXTO` · `LOGO` · `NOMBRE` · `TOMA REAL` · `DECISIÓN` · `ARCHIVO`

### Reglas para el agente

1. **La locución grabada es la fuente de verdad.** El texto en pantalla son **fragmentos textuales** de la locución: no parafrasees ni añadas cifras, fechas o nombres que ella no diga.
2. **Datos congelados en la primera versión del video.** Si una ficha necesita algo que la locución no dice, usa el *fallback* indicado en la ficha o una etiqueta visible «DATO PENDIENTE». Nunca inventes.
3. **Sincronía con el audio.** Con `audio/locucion.*` genera `data/locucion-timestamps.json` (palabra, inicio, fin) alineando el audio con el texto de este guion; por ejemplo, con Whisper (MIT) y timestamps por palabra (verifica la licencia antes de instalar). Si te paso timecodes a mano, usa esos. Cada insert **entra en su palabra de entrada** (arranca ~10 frames antes) y **sale en su palabra de salida** (termina ~10 frames después). La duración sale de ahí, sin tope.
4. Los tiempos de este documento son **estimados** por conteo de palabras (~148 palabras/min; `[pausa]` = 1 s). Se reemplazan con los reales.
5. Un clip a la vez, en el orden sugerido de la sección 3, y esperando mi aprobación del look. Primero los de prioridad **Alta**.
6. Datos reales → JSON en `data/` y fuente en pantalla. Gráficos sin datos reales → rotular «Ilustrativo».
7. Iconografía y texturas: propias (vectores generados) o con licencia abierta registrada en `LICENSES.md`. Sin logos de terceros sin autorización.
8. El audio no se versiona, por la misma razón que los videos: agrega `audio/` al `.gitignore`.
9. Si algo es ambiguo o contradice la locución, **pregunta antes de construir**.

---

## 2. Decisiones por defecto (no bloquean nada)

1. **Etapas:** la línea del tiempo usa solo las fechas que dice la locución: adaptación en el primer año, desde 2027; adopción de 2028 en adelante. La implementación va sin fecha.
2. **Teuhtli y Tulyehualco:** se sigue la locución. INS-01 pone el pin en el Teuhtli e INS-12 muestra a Tulyehualco como modelo de estudio. No se afirma que sean el mismo sitio.
3. **Alerta:** burbuja de chat genérica, sin logo de WhatsApp (por ser publicación institucional) y sin texto legible, porque la locución no da el mensaje.
4. Corrección menor al texto de lectura: «mas» → «más» (toma 2).

---

## 3. Resumen de inserts

| ID     | Toma | Entra (~) | Dur. est. | Prior. | Insert                                                      | Necesita para la primera versión |
| ------ | ---- | --------- | --------- | ------ | ----------------------------------------------------------- | -------------------------------- |
| INS-01 | 1    | 0:05      | 7 s       | Alta   | Ubicación: contornos del Teuhtli + pin                      | DEM (hay fallback)               |
| INS-02 | 1    | 0:19      | 5 s       | Media  | Cadena del amaranto en riesgo                               | —                                |
| INS-03 | 2    | 0:28      | 12 s      | Alta   | La milpa depende de la lluvia: cifra INEGI + siembra tardía | —                                |
| INS-04 | 3    | 0:55      | 9 s       | Alta   | El Niño (NOAA)                                              | —                                |
| INS-05 | 3    | 1:09      | 11 s      | Media  | De lo global a lo local → «hay que medir»                   | —                                |
| INS-06 | 4    | 1:23      | 8 s       | Alta   | Estaciones a distintas alturas                              | DEM (hay fallback)               |
| INS-07 | 4    | 1:34      | 12 s      | Alta   | La alerta baja por la ladera                                | —                                |
| INS-08 | 4    | 1:48      | 6 s       | Media  | Un vacío que se llena de datos                              | —                                |
| INS-09 | 5    | 2:08      | 12 s      | Alta   | Manual vivo                                                 | —                                |
| INS-10 | 6    | 2:29      | 23 s      | Alta   | Las tres etapas (línea del tiempo)                          | —                                |
| INS-11 | 7    | 2:55      | 6 s       | Alta   | Recarga del acuífero                                        | —                                |
| INS-12 | 7    | 3:11      | 9 s       | Media  | Escalabilidad: Tulyehualco → otras zonas                    | —                                |
| INS-13 | 8    | 3:20      | 10 s      | Alta   | Cierre: milpa + título + logos                              | LOGO                             |

**Totales estimados:** prioridad Alta ≈ 99 s (~47 % del video) · todos ≈ 130 s (~62 %). Los de prioridad Media son un menú: se suman o se quitan en el montaje.

**Orden de producción sugerido:** INS-01 (aprobar el look) → INS-03 → INS-04 → INS-06 → INS-07 → INS-10 → INS-09 → INS-11 → INS-13 → los de prioridad Media.

**Ritmo:** INS-11 queda precedido por ~3 s de toma real (la locución dice «El Suelo de Conservación aporta»). INS-12 e INS-13 quedan pegados: diseña la transición entre ambos para que las ondas del mapa se vuelvan la milpa del cierre.

---

## 4. Guion por toma

### TOMA 1 · ~0:00–0:24

> Seguro han comido una alegría. Lo que quizá no sabían es que empieza aquí, en la Ciudad de México, en una ladera del volcán Teuhtli, donde los agricultores cosechan el amaranto en invierno. [pausa] Después, las mujeres lo revientan en el comal y, con miel, lo vuelven alegría. Una cadena que el cambio climático ya pone en riesgo.

**Tomas reales que pide el texto:** cosecha de amaranto en la ladera; mujeres reventando el amaranto en el comal; alegría con miel. `{{TOMA REAL: nombres de archivo en footage/}}`

#### INS-01 · Ubicación: el Teuhtli en el mapa

- **Prioridad:** Alta · **Dur. est.:** ~7 s
- **Entra:** «empieza aquí, en la Ciudad de México» (~0:05) · **Sale:** «volcán Teuhtli» (~0:11)
- **Visual:** la silueta de la CDMX se dibuja sobre textura de papel; zoom hacia el sur; las curvas de nivel del Teuhtli se trazan línea por línea, de la base a la cima; al final cae un pin «Cehuamilli» en la ladera.
- **Texto en pantalla:** «Ciudad de México» → «Volcán Teuhtli» → «Cehuamilli»
- **Datos:** `{{DATO: archivo DEM de la zona (por ejemplo, el CEM de INEGI u otro con licencia abierta) y límite de la CDMX en GeoJSON}}`. Revisar términos de uso y dar crédito. **Fallback:** contornos y silueta procedurales rotulados «PLACEHOLDER». El pin va aproximado sobre la ladera, sin coordenadas en pantalla.
- **Estado:** producible con fallback.

#### INS-02 · La cadena del amaranto en riesgo

- **Prioridad:** Media · **Dur. est.:** ~5 s
- **Entra:** «Una cadena que el cambio climático» (~0:19) · **Sale:** «ya pone en riesgo» (~0:24)
- **Visual:** cuatro eslabones dibujados a mano se encadenan: amaranto → comal → miel → alegría. Al final, el primer eslabón se agrieta y se tiñe de ámbar.
- **Texto en pantalla:** «Amaranto» · «Comal» · «Miel» · «Alegría»
- **Datos:** ninguno.
- **Estado:** listo para producir.

---

### TOMA 2 · ~0:24–0:50

> De acuerdo al INEGI, en la Ciudad de México más del 90% de la tierra cultivada depende de la lluvia. Y con un clima cada vez más impredecible, hay años en que la siembra se retrasa hasta finales de junio. [pausa] Quienes siembran lo enfrentan solos, sin datos de su localidad, y el saber tradicional con el que leían el clima se está perdiendo.

**Tomas reales que pide el texto:** parcelas de temporal; agricultores sembrando; testimonio sobre el saber tradicional. `{{TOMA REAL: nombres de archivo en footage/}}`

#### INS-03 · La milpa depende de la lluvia

- **Prioridad:** Alta · **Dur. est.:** ~12 s
- **Entra:** «más del 90% de la tierra cultivada» (~0:28) · **Sale:** «finales de junio» (~0:40)
- **Visual:** en dos tiempos. (1) Una cuadrícula de 10 parcelas de milpa; empiezan a caer gotas y el relleno verde rebasa la marca del 90 %. (2) Con «un clima cada vez más impredecible» las gotas caen irregulares; sobre una franja de calendario (mayo–julio) un marcador de siembra se desliza hasta «finales de junio» y la lluvia llega tarde.
- **Texto en pantalla:** «Más del 90 %» · «de la tierra cultivada depende de la lluvia» · «Fuente: INEGI» · «finales de junio»
- **Datos:** ninguno nuevo; la cifra va tal como la dice la locución. Sin fecha «habitual» de siembra.
- **Estado:** listo para producir.

---

### TOMA 3 · ~0:50–1:20

> El próximo año puede ser más difícil. De acuerdo con la NOAA, El Niño se está fortaleciendo, con una probabilidad mayor al 90% de un evento muy fuerte durante el otoño y el invierno. [pausa] Pero un pronóstico global no nos dice exactamente qué pasará aquí, en estas laderas. ¿Lloverá menos? ¿Cuándo llegará la lluvia? ¿Cuánto cambiará la temporada? Eso todavía tiene incertidumbre. Por eso, hay que empezar a medir desde ahora.

**Tomas reales que pide el texto:** laderas del Teuhtli; cielo; agricultores mirando el campo. `{{TOMA REAL: nombres de archivo en footage/}}`

#### INS-04 · El Niño (NOAA)

- **Prioridad:** Alta · **Dur. est.:** ~9 s
- **Entra:** «El Niño se está fortaleciendo» (~0:55) · **Sale:** «el otoño y el invierno» (~1:04)
- **Visual:** esquema del Pacífico ecuatorial (costas simplificadas); una mancha cálida crece desde el centro hacia el este; al final un medidor sube hasta «>90 %». Rotular «Esquema ilustrativo» (no es el mapa real de la NOAA).
- **Texto en pantalla:** «El Niño se está fortaleciendo» · «Probabilidad mayor al 90 %» · «de un evento muy fuerte» · «otoño e invierno» · «Fuente: NOAA»
- **Datos:** ninguno nuevo. Sin años en pantalla, porque la locución no los dice.
- **Nota:** esta es la cifra más sensible al tiempo; ver sección 6.
- **Estado:** listo para producir.

#### INS-05 · De lo global a lo local → «hay que medir»

- **Prioridad:** Media · **Dur. est.:** ~11 s
- **Entra:** «aquí, en estas laderas» (~1:09) · **Sale:** «medir desde ahora» (~1:20)
- **Visual:** arranca con el esquema global de INS-04 y hace zoom hasta las laderas del Teuhtli (curvas de nivel de INS-01). Las tres preguntas entran escalonadas en tipografía grande. Detrás, un abanico de curvas de lluvia acumulada, una por año, que se abre = incertidumbre. En «hay que empezar a medir desde ahora» aparece un punto de estación y una sola curva se vuelve nítida.
- **Texto en pantalla:** las tres preguntas, tal cual · «hay que empezar a medir desde ahora»
- **Datos:** abanico **ilustrativo**, rotulado «Ilustrativo» (sin datos reales). Mejora posible en la sección 6.
- **Estado:** listo para producir.

---

### TOMA 4 · ~1:20–2:00

> Somos Cehuamilli, un equipo interdisciplinario, y proponemos un ecosistema: estaciones agrometeorológicas en distintas alturas del volcán Teuhtli, a un costo accesible, de mantenimiento viable para la comunidad. [pausa] Son una herramienta auxiliar, con alertas por WhatsApp ante eventos climáticos extremos, para toda la cadena productiva y para las familias que viven en la parte baja del cerro, donde ya llegan inundaciones que antes no había. Y, lo más importante, llenan un vacío de información: los datos climáticos locales, que darán frutos año con año, para tomar decisiones más acertadas y fortalecer la resiliencia comunitaria ante el cambio climático.

**Tomas reales que pide el texto:** el equipo; estaciones instaladas o prototipos; familias de la parte baja del cerro; inundaciones, si hay material. `{{TOMA REAL: nombres de archivo en footage/}}`

#### INS-06 · Estaciones a distintas alturas

- **Prioridad:** Alta · **Dur. est.:** ~8 s
- **Entra:** «proponemos un ecosistema» (~1:23) · **Sale:** «viable para la comunidad» (~1:31)
- **Visual:** perfil lateral del Teuhtli dibujado con una sola línea; las estaciones aparecen una a una, de abajo hacia arriba, con pequeñas lecturas que parpadean (temperatura, humedad, lluvia, viento).
- **Texto en pantalla:** «estaciones agrometeorológicas» · «distintas alturas» · «costo accesible» · «mantenimiento viable»
- **Datos:** **sin cifras**: no mostrar número de estaciones, altitudes ni costos (la locución no los da). La cantidad de estaciones dibujadas es ilustrativa. Perfil a partir del mismo DEM de INS-01; si no hay, fallback procedural.
- **Estado:** producible con fallback.

#### INS-07 · La alerta baja por la ladera

- **Prioridad:** Alta · **Dur. est.:** ~12 s
- **Entra:** «alertas por WhatsApp» (~1:34) · **Sale:** «que antes no había» (~1:46)
- **Visual:** una estación detecta un valor extremo (el medidor pasa a ámbar y luego a rojo); un pulso baja por la ladera hasta la parte baja del cerro; ahí un teléfono recibe un mensaje y las casitas se iluminan. Mientras suena «inundaciones que antes no había», un hilo de agua baja por la ladera.
- **Texto en pantalla:** «alertas» · «eventos climáticos extremos» · «parte baja del cerro»
- **Datos:** burbuja de chat **genérica**, con líneas abstractas y sin texto legible. Para una versión posterior: `{{TEXTO: mensaje de alerta real tal como lo recibiría una familia}}` y, solo con autorización de la institución, `{{DECISIÓN: logo oficial de WhatsApp}}`.
- **Estado:** listo para producir.

#### INS-08 · Un vacío que se llena de datos

- **Prioridad:** Media · **Dur. est.:** ~6 s
- **Entra:** «llenan un vacío de información» (~1:48) · **Sale:** «año con año» (~1:54)
- **Visual:** un espacio en blanco sobre el papel se va llenando con puntos y curvas, y de ellos brota una planta con una hoja por año («darán frutos»).
- **Texto en pantalla:** «un vacío de información» · «datos climáticos locales» · «año con año»
- **Datos:** ninguno (metáfora, sin cifras).
- **Estado:** listo para producir.

---

### TOMA 5 · ~2:00–2:24

> El corazón de Cehuamilli es un manual vivo y adaptable, que la comunidad escribe junto a nosotros: junta su saber tradicional con los datos de las estaciones y marca cómo actuar ante sequías, ventarrones, heladas y otras situaciones, para estar preparados. [pausa] Se actualiza cada año y en él queda plasmado su conocimiento, con ellos como autores.

**Tomas reales que pide el texto:** taller con la comunidad escribiendo el manual; personas leyendo, anotando o firmando. `{{TOMA REAL: nombres de archivo en footage/}}`

#### INS-09 · El manual vivo

- **Prioridad:** Alta · **Dur. est.:** ~12 s (cola opcional de +4 s)
- **Entra:** «junta su saber tradicional» (~2:08) · **Sale:** «Se actualiza cada año» (~2:20)
- **Visual:** dos hilos, uno de trazo a mano (saber tradicional) y otro de puntos y curvas (datos), se trenzan y forman las páginas de un manual. Las páginas pasan con los títulos «Sequía», «Ventarrón» y «Helada», cada una con un ícono. Al final, un anillo anual da una vuelta.
- **Cola opcional (hasta «con ellos como autores», ~2:24):** la portada del manual se llena de firmas y muestra «Autores: la comunidad».
- **Texto en pantalla:** «saber tradicional» · «datos de las estaciones» · «Sequía» · «Ventarrón» · «Helada» · «Se actualiza cada año»
- **Datos:** ninguno. Nombres propios de autores, para una versión posterior.
- **Estado:** listo para producir.

---

### TOMA 6 · ~2:24–2:52

> Hay familias dispuestas a colaborar, y desarrollaremos el proyecto en tres etapas. Primero, adaptación: durante el primer año, desde 2027, escuchamos a la comunidad y calibramos las estaciones. Luego, implementación: las estaciones miden y avisan, de la mano con habitantes monitores de la propia localidad, mujeres y hombres. Y de 2028 en adelante, adopción: la comunidad lo opera sola. [pausa] El financiamiento nos permitirá iniciar las dos primeras etapas.

**Tomas reales que pide el texto:** familias colaborando; calibración de estaciones; habitantes monitores (mujeres y hombres). `{{TOMA REAL: nombres de archivo en footage/}}`

#### INS-10 · Las tres etapas

- **Prioridad:** Alta · **Dur. est.:** ~23 s (un solo clip continuo)
- **Entra:** «Primero, adaptación» (~2:29) · **Sale:** «las dos primeras etapas» (~2:52)
- **Visual:** una sola línea del tiempo que se dibuja de izquierda a derecha, sincronizada con la locución. Etapa 1 «Adaptación» (escuchar y calibrar), etapa 2 «Implementación» (las estaciones miden y avisan, con habitantes monitores), etapa 3 «Adopción» (las estaciones pasan a manos de la comunidad). En la `[pausa]` un corchete resalta las etapas 1 y 2 como las que cubre el financiamiento.
- **Texto en pantalla:** «1 · Adaptación — primer año, desde 2027» · «2 · Implementación» (sin fecha) · «3 · Adopción — 2028 en adelante» · «Financiamiento: las dos primeras etapas»
- **Datos:** solo las fechas que da la locución. Sin logo de financiador.
- **Nota:** si el montaje quiere intercalar tomas de los monitores, se parte en dos cortes del mismo clip.
- **Estado:** listo para producir.

---

### TOMA 7 · ~2:52–3:20

> El Suelo de Conservación aporta cerca del 70 % de la recarga del acuífero: cuidar la milpa es cuidar el agua de la ciudad. Es adaptación con cobeneficios dentro del paradigma de Daños Netos Cero, y fortalece la resiliencia de la comunidad ante el cambio climático. Buscamos que sea escalable: Tulyehualco es nuestro modelo de estudio, para llevarlo después, a través de vínculos académicos e institucionales, a otras zonas que lo necesiten.

**Tomas reales que pide el texto:** Suelo de Conservación y milpa (cubre «El Suelo de Conservación aporta»); Tulyehualco. `{{TOMA REAL: nombres de archivo en footage/}}`

#### INS-11 · Recarga del acuífero

- **Prioridad:** Alta · **Dur. est.:** ~6 s
- **Entra:** «cerca del 70 %» (~2:55) · **Sale:** «el agua de la ciudad» (~3:01)
- **Visual:** corte transversal: la milpa y la ladera arriba; la lluvia se infiltra por capas hasta el acuífero; abajo, la mancha urbana toma agua; un medidor se llena hasta ~70 %.
- **Texto en pantalla:** «Cerca del 70 %» · «de la recarga del acuífero» · «Cuidar la milpa es cuidar el agua de la ciudad»
- **Datos:** ninguno nuevo. Sin línea de fuente, porque la locución no la nombra.
- **Estado:** listo para producir.

#### INS-12 · Escalabilidad

- **Prioridad:** Media · **Dur. est.:** ~9 s
- **Entra:** «Tulyehualco es nuestro modelo de estudio» (~3:11) · **Sale:** «que lo necesiten» (~3:20)
- **Visual:** mapa esquemático del sur de la CDMX con un pin en Tulyehualco; ondas que se expanden y encienden nodos en otras zonas; hilos finos entre nodos representan los vínculos académicos e institucionales. Al final, las ondas se transforman en la milpa de INS-13.
- **Texto en pantalla:** «Tulyehualco» · «modelo de estudio» · «vínculos académicos e institucionales»
- **Datos:** nodos **sin nombres** (la locución no nombra otras zonas).
- **Estado:** listo para producir.

---

### TOMA 8 · ~3:20–3:30

> Si la milpa sigue en pie, la alegría, el olivo y los quelites también. [pausa] Somos Cehuamilli: alertas que nacen de la tierra.

**Tomas reales que pide el texto:** milpa; amaranto, olivo y quelites; el equipo. `{{TOMA REAL: nombres de archivo en footage/}}`

#### INS-13 · Cierre

- **Prioridad:** Alta · **Dur. est.:** ~10 s (+2 s opcionales de cola para logos, si el video lo permite)
- **Entra:** «Si la milpa sigue en pie» (~3:20) · **Sale:** «nacen de la tierra» (~3:30)
- **Visual:** una milpa crece (maíz, frijol, calabaza) y, con cada nombre, aparecen la alegría (amaranto), el olivo y los quelites. Durante la `[pausa]` todo se aquieta. Con «Somos Cehuamilli» entra el título y, al final, los logos.
- **Texto en pantalla:** «Cehuamilli · Alertas que nacen de la tierra»
- **Logos:** `{{LOGO: Cehuamilli}}` · `{{LOGO: UNAM y entidades participantes, versiones oficiales en SVG o PNG con fondo transparente}}`. Mientras falten, dejar el espacio con la etiqueta «LOGO».
- **Estado:** DATO PENDIENTE (LOGO).

---

## 5. Para arrancar la primera versión

- [ ] `ARCHIVO` Locución final en `audio/locucion.*` (o timecodes por palabra) — **todos los inserts**
- [ ] `LOGO` Cehuamilli, UNAM y entidades participantes, en SVG o PNG transparente — INS-13
- [ ] `DATO` DEM de la zona y límite de la CDMX (opcional, hay fallback) — INS-01, INS-06
- [ ] `TOMA REAL` Nombres de archivo del footage — montaje
- [ ] `DECISIÓN` Solo si quieren cambiar un default de la sección 2

---

## 6. Para una versión posterior (no bloquean la primera)

La columna final indica si el cambio **obliga a regrabar la locución**.

| Tema                                            | Dónde           | Qué haría falta                                                                                                                                           | ¿Regrabar?               |
| ----------------------------------------------- | --------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------ |
| Probabilidad de la NOAA («mayor al 90 %»)       | Toma 3 · INS-04 | La discusión ENSO del CPC del 10-sep-2026 coincide con la locución. El siguiente comunicado sale el 8-oct-2026: si la cifra cambia, hay que actualizarla. | Sí, si cambia            |
| Cifra del INEGI («más del 90 %»)                | Toma 2 · INS-03 | Cifra exacta, publicación y año                                                                                                                           | Solo si cambia el número |
| «Cerca del 70 %» de la recarga                  | Toma 7 · INS-11 | Fuente y año                                                                                                                                              | Solo si cambia el número |
| «Daños Netos Cero»                              | Toma 7          | Confirmar la redacción oficial del término                                                                                                                | Solo si cambia           |
| Origen de «finales de junio»                    | Toma 2 · INS-03 | Testimonio o registro; fecha habitual de siembra                                                                                                          | No                       |
| «Inundaciones que antes no había»               | Toma 4 · INS-07 | Respaldo (testimonio, registro o nota)                                                                                                                    | No                       |
| Estaciones: número, altitudes, variables, costo | Toma 4 · INS-06 | Datos del proyecto                                                                                                                                        | No                       |
| Fechas de la implementación                     | Toma 6 · INS-10 | Periodo de la etapa 2                                                                                                                                     | No                       |
| Mensaje de alerta real y logo de WhatsApp       | Toma 4 · INS-07 | Texto real; autorización de marca                                                                                                                         | No                       |
| Abanico con años reales                         | Toma 3 · INS-05 | Open-Meteo (reanálisis) en las coordenadas del sitio; rotular «Reanálisis, no estación local»                                                             | No                       |
| Autores del manual                              | Toma 5 · INS-09 | Nombres, si se quieren mostrar                                                                                                                            | No                       |
| Zonas candidatas a replicar                     | Toma 7 · INS-12 | Nombres, si se quieren mostrar                                                                                                                            | No                       |
| Logo del financiador                            | Toma 6 · INS-10 | Solo si ya está definido                                                                                                                                  | No                       |