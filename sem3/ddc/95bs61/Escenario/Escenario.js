/* eslint-disable require-yield, eqeqeq */

import {
  Sprite,
  Trigger,
  Watcher,
  Costume,
  Color,
  Sound
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class Escenario extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("escenario 1-1", "./Escenario/costumes/escenario 1-1.png", {
        x: 480,
        y: 360
      }),
      new Costume("escenario 1-2", "./Escenario/costumes/escenario 1-2.png", {
        x: 480,
        y: 360
      }),
      new Costume("escenario 1-3", "./Escenario/costumes/escenario 1-3.png", {
        x: 480,
        y: 360
      }),
      new Costume("escenario 1-4", "./Escenario/costumes/escenario 1-4.png", {
        x: 480,
        y: 360
      }),
      new Costume("escenario 1-5", "./Escenario/costumes/escenario 1-5.png", {
        x: 480,
        y: 360
      }),
      new Costume("escenario 1-6", "./Escenario/costumes/escenario 1-6.png", {
        x: 480,
        y: 360
      }),
      new Costume("escenario 1-7", "./Escenario/costumes/escenario 1-7.png", {
        x: 480,
        y: 360
      }),
      new Costume("escenario 1-8", "./Escenario/costumes/escenario 1-8.png", {
        x: 480,
        y: 360
      }),
      new Costume("escenario 1-9", "./Escenario/costumes/escenario 1-9.png", {
        x: 480,
        y: 360
      }),
      new Costume("escenario 1-10", "./Escenario/costumes/escenario 1-10.png", {
        x: 480,
        y: 360
      }),
      new Costume("escenario 1-11", "./Escenario/costumes/escenario 1-11.png", {
        x: 480,
        y: 360
      })
    ];

    this.sounds = [new Sound("pop", "./Escenario/sounds/pop.wav")];

    this.triggers = [
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked),
      new Trigger(
        Trigger.BROADCAST,
        { name: "Actualizar posición" },
        this.whenIReceiveActualizarPosiciN
      ),
      new Trigger(Trigger.CLONE_START, this.startAsClone)
    ];

    this.vars.posiciNX = 4750;
    this.vars.contador = 11;
  }

  *whenGreenFlagClicked() {
    this.visible = false;
    this.goto(0, 0);
    this.costume = "escenario 1-1";
    yield* this.crearEscenarios();
  }

  *whenIReceiveActualizarPosiciN() {
    this.size = 400;
    this.x = this.vars.posiciNX - this.stage.vars.posiciNGlobalX;
    this.size = 100;
  }

  *startAsClone() {
    this.moveBehind();
    this.visible = true;
  }

  *crearEscenarios() {
    this.vars.contador = 0;
    for (let i = 0; i < 11; i++) {
      this.vars.contador += 1;
      this.costume = this.vars.contador;
      this.vars.posiciNX = (this.vars.contador - 1) * 475;
      this.createClone();
    }
  }
}
