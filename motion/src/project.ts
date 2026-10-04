import {makeProject} from '@revideo/core';
import intro from './clips/intro';

export default makeProject({
  scenes: [intro],
  settings: {
    shared: {
      size: {x: 1920, y: 1080},
    },
    rendering: {
      fps: 30,
    },
    preview: {
      fps: 30,
    },
  },
});
