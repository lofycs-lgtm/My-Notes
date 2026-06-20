/* eslint-disable require-yield, eqeqeq */

import {
  Sprite,
  Trigger,
  Watcher,
  Costume,
  Color,
  Sound
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class Mario extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("01", "./Mario/costumes/01.png", { x: 26, y: 32 }),
      new Costume("02", "./Mario/costumes/02.png", { x: 64, y: 64 }),
      new Costume("03", "./Mario/costumes/03.png", { x: 64, y: 64 }),
      new Costume("04", "./Mario/costumes/04.png", { x: 64, y: 64 }),
      new Costume("05", "./Mario/costumes/05.png", { x: 64, y: 64 }),
      new Costume("06", "./Mario/costumes/06.png", { x: 64, y: 64 }),
      new Costume("07", "./Mario/costumes/07.png", { x: 28, y: 32 }),
      new Costume("08", "./Mario/costumes/08.png", { x: 64, y: 64 }),
      new Costume("09", "./Mario/costumes/09.png", { x: 64, y: 64 }),
      new Costume("10", "./Mario/costumes/10.png", { x: 64, y: 64 }),
      new Costume("11", "./Mario/costumes/11.png", { x: 64, y: 64 }),
      new Costume("12", "./Mario/costumes/12.png", { x: 64, y: 64 }),
      new Costume("13", "./Mario/costumes/13.png", { x: 64, y: 64 }),
      new Costume("14", "./Mario/costumes/14.png", { x: 32, y: 64 }),
      new Costume("15", "./Mario/costumes/15.png", { x: 64, y: 64 }),
      new Costume("16", "./Mario/costumes/16.png", { x: 64, y: 64 }),
      new Costume("17", "./Mario/costumes/17.png", { x: 64, y: 64 }),
      new Costume("18", "./Mario/costumes/18.png", { x: 64, y: 64 }),
      new Costume("19", "./Mario/costumes/19.png", { x: 64, y: 64 })
    ];

    this.sounds = [new Sound("pop", "./Mario/sounds/pop.wav")];

    this.triggers = [
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked),
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked2)
    ];
  }

  *whenGreenFlagClicked() {
    this.moveAhead();
    this.rotationStyle = Sprite.RotationStyle.LEFT_RIGHT;
    while (true) {
      this.goto(this.sprites["MarioMascara"].x, this.sprites["MarioMascara"].y);
      if (this.keyPressed("a")) {
        this.direction = -90;
      }
      if (this.keyPressed("d")) {
        this.direction = 90;
      }
      yield;
    }
  }

  *whenGreenFlagClicked2() {
    while (true) {
      if (this.sprites["MarioMascara"].vars["sobreLaPlataforma"] == "no") {
        this.costume = 5;
      } else {
        if (Math.abs(this.stage.vars.vx) > 1) {
          this.costumeNumber += 1;
          if (this.costumeNumber > 3) {
            this.costume = 2;
          }
          yield* this.wait(0.05);
        } else {
          this.costume = 1;
        }
      }
      yield;
    }
  }
}
