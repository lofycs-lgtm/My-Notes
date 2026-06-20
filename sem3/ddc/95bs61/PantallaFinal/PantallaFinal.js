/* eslint-disable require-yield, eqeqeq */

import {
  Sprite,
  Trigger,
  Watcher,
  Costume,
  Color,
  Sound
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class PantallaFinal extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("disfraz1", "./PantallaFinal/costumes/disfraz1.svg", {
        x: 257.40740740740733,
        y: 186.08466254340274
      })
    ];

    this.sounds = [new Sound("pop", "./PantallaFinal/sounds/pop.wav")];

    this.triggers = [
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked),
      new Trigger(
        Trigger.BROADCAST,
        { name: "Perder" },
        this.whenIReceivePerder
      )
    ];
  }

  *whenGreenFlagClicked() {
    this.visible = false;
  }

  *whenIReceivePerder() {
    this.visible = true;
    this.moveAhead();
  }
}
