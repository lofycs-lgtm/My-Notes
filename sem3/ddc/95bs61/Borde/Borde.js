/* eslint-disable require-yield, eqeqeq */

import {
  Sprite,
  Trigger,
  Watcher,
  Costume,
  Color,
  Sound
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class Borde extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("borde", "./Borde/costumes/borde.png", { x: 480, y: 360 })
    ];

    this.sounds = [new Sound("pop", "./Borde/sounds/pop.wav")];

    this.triggers = [];
  }
}
