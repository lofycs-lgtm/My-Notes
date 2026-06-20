/* eslint-disable require-yield, eqeqeq */

import {
  Sprite,
  Trigger,
  Watcher,
  Costume,
  Color,
  Sound
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class EscenarioMascara extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume(
        "mascara 1-1",
        "./EscenarioMascara/costumes/mascara 1-1.png",
        { x: 480, y: -265 }
      ),
      new Costume(
        "mascara 1-2",
        "./EscenarioMascara/costumes/mascara 1-2.png",
        { x: 480, y: -168 }
      ),
      new Costume(
        "mascara 1-3",
        "./EscenarioMascara/costumes/mascara 1-3.png",
        { x: 480, y: -120 }
      ),
      new Costume(
        "mascara 1-4",
        "./EscenarioMascara/costumes/mascara 1-4.png",
        { x: 480, y: -120 }
      ),
      new Costume(
        "mascara 1-5",
        "./EscenarioMascara/costumes/mascara 1-5.png",
        { x: 472, y: -266 }
      ),
      new Costume(
        "mascara 1-6",
        "./EscenarioMascara/costumes/mascara 1-6.png",
        { x: 478, y: -266 }
      ),
      new Costume(
        "mascara 1-7",
        "./EscenarioMascara/costumes/mascara 1-7.png",
        { x: 480, y: -264 }
      ),
      new Costume(
        "mascara 1-8",
        "./EscenarioMascara/costumes/mascara 1-8.png",
        { x: 480, y: -72 }
      ),
      new Costume(
        "mascara 1-9",
        "./EscenarioMascara/costumes/mascara 1-9.png",
        { x: 480, y: -72 }
      ),
      new Costume(
        "mascara 1-10 ",
        "./EscenarioMascara/costumes/mascara 1-10 .png",
        { x: 480, y: -24 }
      ),
      new Costume(
        "mascara 1-11",
        "./EscenarioMascara/costumes/mascara 1-11.png",
        { x: 480, y: 120 }
      )
    ];

    this.sounds = [new Sound("pop", "./EscenarioMascara/sounds/pop.wav")];

    this.triggers = [
      new Trigger(
        Trigger.BROADCAST,
        { name: "Actualizar posición" },
        this.whenIReceiveActualizarPosiciN
      ),
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked),
      new Trigger(Trigger.CLONE_START, this.startAsClone),
      new Trigger(Trigger.CLONE_START, this.startAsClone2),
      new Trigger(Trigger.CLONE_START, this.startAsClone3)
    ];

    this.vars.posiciNX2 = 4750;
    this.vars.contador2 = 11;
  }

  *whenIReceiveActualizarPosiciN() {
    this.moveAhead();
    this.x = this.vars.posiciNX2 - this.stage.vars.posiciNGlobalX;
  }

  *crearEscenarios() {
    this.vars.contador2 = 0;
    for (let i = 0; i < 11; i++) {
      this.vars.contador2 += 1;
      this.costume = this.vars.contador2;
      this.vars.posiciNX2 = (this.vars.contador2 - 1) * 475;
      this.createClone();
    }
  }

  *whenGreenFlagClicked() {
    this.visible = false;
    this.goto(0, 0);
    this.costume = "escenario 1-1";
    yield* this.crearEscenarios();
  }

  *startAsClone() {
    this.visible = true;
  }

  *startAsClone2() {
    this.size = 100;
    this.effects.ghost = 100;
  }

  *startAsClone3() {
    while (true) {
      if (
        this.vars.posiciNX2 - this.stage.vars.posiciNGlobalX < 475 &&
        this.vars.posiciNX2 - this.stage.vars.posiciNGlobalX > -475
      ) {
        this.visible = true;
      } else {
        this.visible = false;
      }
      yield;
    }
  }
}
