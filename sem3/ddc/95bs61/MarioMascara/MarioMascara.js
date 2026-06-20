/* eslint-disable require-yield, eqeqeq */

import {
  Sprite,
  Trigger,
  Watcher,
  Costume,
  Color,
  Sound
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class MarioMascara extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("01", "./MarioMascara/costumes/01.png", { x: 26, y: 32 }),
      new Costume("14", "./MarioMascara/costumes/14.png", { x: 32, y: 64 })
    ];

    this.sounds = [
      new Sound("pop", "./MarioMascara/sounds/pop.wav"),
      new Sound("smb_jump-small", "./MarioMascara/sounds/smb_jump-small.wav")
    ];

    this.triggers = [
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked),
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked2),
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked3)
    ];

    this.vars.sobreLaPlataforma = "no";
  }

  *movimientoVertical() {
    this.y += this.stage.vars.vy;
    this.warp(this.colisiNVertical)();
    this.warp(this.gravedad)();
  }

  *movimientoHorizontal() {
    this.x += this.stage.vars.vx;
    this.warp(this.colisiNHorizontal)();
    this.warp(this.fricciN)();
  }

  *gravedad() {
    this.stage.vars.vy += -1;
  }

  *colisiNVertical() {
    if (this.touching(this.sprites["EscenarioMascara"].andClones())) {
      if (0 > this.stage.vars.vy) {
        while (!!this.touching(this.sprites["EscenarioMascara"].andClones())) {
          this.y += 1;
          yield;
        }
        this.vars.sobreLaPlataforma = "si";
        this.stage.vars.vy = 0;
      }
      if (this.stage.vars.vy > 0) {
        while (!!this.touching(this.sprites["EscenarioMascara"].andClones())) {
          this.y += -1;
          yield;
        }
        this.stage.vars.vy = 0;
      }
    }
  }

  *fricciN() {
    this.stage.vars.vx = this.stage.vars.vx * 0.8;
  }

  *colisiNHorizontal() {
    if (this.touching(this.sprites["EscenarioMascara"].andClones())) {
      if (0 > this.stage.vars.vx) {
        while (!!this.touching(this.sprites["EscenarioMascara"].andClones())) {
          this.x += 1;
          yield;
        }
        this.stage.vars.vx = 0;
      }
      if (this.stage.vars.vx > 0) {
        while (!!this.touching(this.sprites["EscenarioMascara"].andClones())) {
          this.x += -1;
          yield;
        }
        this.stage.vars.vx = 0;
      }
    }
  }

  *whenGreenFlagClicked() {
    this.x = 50;
    this.y = 0;
    this.stage.vars.vx = 0;
    this.stage.vars.vy = 0;
    this.stage.vars.posiciNGlobalX = 0;
    while (true) {
      yield* this.movimientoVertical();
      yield* this.movimientoHorizontal();
      this.stage.vars.posiciNGlobalX += this.x;
      this.x = 0;
      this.broadcast("Actualizar posición");
      yield;
    }
  }

  *whenGreenFlagClicked2() {
    this.effects.ghost = 100;
    while (true) {
      if (this.stage.vars.posiciNGlobalX > 4800) {
        this.stage.vars.vx = 0;
      } else {
        if (this.keyPressed("a")) {
          this.stage.vars.vx += -1;
        }
        if (this.keyPressed("d")) {
          this.stage.vars.vx += 1;
        }
        if (this.keyPressed("w") && this.vars.sobreLaPlataforma == "si") {
          yield* this.startSound("smb_jump-small");
          this.vars.sobreLaPlataforma = "no";
          this.stage.vars.vy += 15;
        }
      }
      yield;
    }
  }

  *whenGreenFlagClicked3() {
    while (true) {
      if (-182 > this.y) {
        this.broadcast("Perder");
      }
      yield;
    }
  }
}
