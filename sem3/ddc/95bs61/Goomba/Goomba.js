/* eslint-disable require-yield, eqeqeq */

import {
  Sprite,
  Trigger,
  Watcher,
  Costume,
  Color,
  Sound
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class Goomba extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("Goomba", "./Goomba/costumes/Goomba.png", { x: 54, y: 54 }),
      new Costume("Goomba2", "./Goomba/costumes/Goomba2.png", { x: 54, y: 54 }),
      new Costume(
        "Goomba Aplastado",
        "./Goomba/costumes/Goomba Aplastado.png",
        { x: 54, y: 26 }
      )
    ];

    this.sounds = [
      new Sound("pop", "./Goomba/sounds/pop.wav"),
      new Sound(
        "Goomba Stomp Sound ",
        "./Goomba/sounds/Goomba Stomp Sound .wav"
      )
    ];

    this.triggers = [
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked),
      new Trigger(
        Trigger.BROADCAST,
        { name: "Actualizar posición" },
        this.whenIReceiveActualizarPosiciN
      ),
      new Trigger(Trigger.CLONE_START, this.startAsClone),
      new Trigger(Trigger.CLONE_START, this.startAsClone2),
      new Trigger(Trigger.CLONE_START, this.startAsClone3),
      new Trigger(Trigger.CLONE_START, this.startAsClone4),
      new Trigger(
        Trigger.BROADCAST,
        { name: "Perder" },
        this.whenIReceivePerder
      )
    ];

    this.vars.sobreLaPlataforma2 = "si";
    this.vars.vxGoomba = 0;
    this.vars.vyGoomba = 0;
    this.vars.posiciNXGoomba = 500;
    this.vars.dentroDeLaPantalla = "no";
    this.vars.goombaVivo = "si";
  }

  *movimientoVertical() {
    this.y += this.vars.vyGoomba;
    this.warp(this.colisiNVertical)();
    this.warp(this.gravedad)();
  }

  *gravedad() {
    this.vars.vyGoomba += -1;
  }

  *colisiNVertical() {
    if (this.touching(this.sprites["EscenarioMascara"].andClones())) {
      if (0 > this.vars.vyGoomba) {
        while (!!this.touching(this.sprites["EscenarioMascara"].andClones())) {
          this.y += 1;
          yield;
        }
        this.vars.sobreLaPlataforma2 = "si";
        this.vars.vyGoomba = 0;
      }
      if (this.vars.vyGoomba > 0) {
        while (!!this.touching(this.sprites["EscenarioMascara"].andClones())) {
          this.y += -1;
          yield;
        }
        this.vars.vyGoomba = 0;
      }
    }
  }

  *movimientoHorizontal() {
    this.vars.posiciNXGoomba += this.vars.vxGoomba;
    this.x = this.vars.posiciNXGoomba - this.stage.vars.posiciNGlobalX;
    this.warp(this.colisiNHorizontal)();
    this.warp(this.fricciN)();
  }

  *fricciN() {
    this.vars.vxGoomba = this.vars.vxGoomba * 0.8;
  }

  *colisiNHorizontal() {
    if (this.touching(this.sprites["EscenarioMascara"].andClones())) {
      if (0 > this.vars.vxGoomba) {
        while (!!this.touching(this.sprites["EscenarioMascara"].andClones())) {
          this.vars.posiciNXGoomba += 1;
          this.x = this.vars.posiciNXGoomba - this.stage.vars.posiciNGlobalX;
          yield;
        }
        this.vars.vxGoomba = 0;
      }
      if (this.vars.vxGoomba > 0) {
        while (!!this.touching(this.sprites["EscenarioMascara"].andClones())) {
          this.vars.posiciNXGoomba += -1;
          this.x = this.vars.posiciNXGoomba - this.stage.vars.posiciNGlobalX;
          yield;
        }
        this.vars.vxGoomba = 0;
      }
    }
  }

  *whenGreenFlagClicked() {
    this.visible = false;
    this.size = 50;
    this.y = 100;
    this.vars.goombaVivo = "si";
    this.vars.posiciNXGoomba = 200;
    this.vars.vxGoomba = 0;
    this.vars.vyGoomba = 0;
    yield* this.crearGoombaXY(200, 0);
    yield* this.crearGoombaXY(500, 0);
  }

  *whenIReceiveActualizarPosiciN() {
    if (this.vars.dentroDeLaPantalla == "si") {
      this.vars.vxGoomba += 0.5;
      yield* this.movimientoHorizontal();
      yield* this.movimientoVertical();
    }
  }

  *crearGoombaXY(x, y) {
    this.y = y;
    this.vars.posiciNXGoomba = x;
    this.createClone();
  }

  *startAsClone() {
    while (true) {
      if (
        this.vars.posiciNXGoomba - this.stage.vars.posiciNGlobalX < 235 &&
        this.vars.posiciNXGoomba - this.stage.vars.posiciNGlobalX > -235
      ) {
        this.visible = true;
        this.vars.dentroDeLaPantalla = "si";
      } else {
        this.visible = false;
        this.vars.dentroDeLaPantalla = "no";
      }
      yield;
    }
  }

  *startAsClone2() {
    while (true) {
      if (this.vars.goombaVivo == "si") {
        this.costumeNumber += 1;
        if (this.costumeNumber == 3) {
          this.costume = "Goomba";
        }
        yield* this.wait(0.1);
      } else {
        this.costume = "Goomba Aplastado";
      }
      yield;
    }
  }

  *startAsClone3() {
    this.effects.ghost = 0;
    while (true) {
      if (
        this.stage.vars.vy < -1 &&
        this.touching(this.sprites["MarioMascara"].andClones())
      ) {
        this.vars.goombaVivo = "no";
        this.stage.vars.vy = 10;
        yield* this.startSound("Goomba Stomp Sound ");
        for (let i = 0; i < 10; i++) {
          this.effects.ghost += 10;
          yield;
        }
        this.deleteThisClone();
      }
      if (
        -2 < this.stage.vars.vy &&
        this.touching(this.sprites["MarioMascara"].andClones())
      ) {
        this.broadcast("Perder");
      }
      yield;
    }
  }

  *startAsClone4() {
    this.visible = true;
  }

  *whenIReceivePerder() {
    /* TODO: Implement stop all */ null;
  }
}
