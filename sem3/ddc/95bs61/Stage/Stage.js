/* eslint-disable require-yield, eqeqeq */

import {
  Stage as StageBase,
  Trigger,
  Watcher,
  Costume,
  Color,
  Sound
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class Stage extends StageBase {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("fondo1", "./Stage/costumes/fondo1.png", { x: 480, y: 360 })
    ];

    this.sounds = [new Sound("pop", "./Stage/sounds/pop.wav")];

    this.triggers = [];

    this.vars.vy = 3;
    this.vars.vx = 4.999888496274008;
    this.vars.posiciNGlobalX = 265.00055751863005;
  }
}
