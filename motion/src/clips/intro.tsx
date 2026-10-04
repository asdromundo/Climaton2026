import {makeScene2D, Txt} from '@revideo/2d';
import {createRef, waitFor} from '@revideo/core';
import {THEME} from '../theme';

export default makeScene2D('intro', function* (view) {
  // Fondo oscuro color tierra volcánica del volcán Teuhtli
  view.fill(THEME.colors.earth.dark);

  const titleRef = createRef<Txt>();

  view.add(
    <Txt
      ref={titleRef}
      text="🌱 Cehuamilli"
      fill={THEME.colors.paper.cream}
      fontSize={THEME.typography.sizes.hero}
      opacity={0}
      y={30}
    />
  );

  // Animación de entrada suave
  yield* titleRef().opacity(1, 1.2);
  yield* titleRef().position.y(0, 1.2);

  yield* waitFor(3);
});

