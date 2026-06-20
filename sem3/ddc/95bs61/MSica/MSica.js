/* eslint-disable require-yield, eqeqeq */

import {
  Sprite,
  Trigger,
  Watcher,
  Costume,
  Color,
  Sound
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class MSica extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("disfraz1", "./MSica/costumes/disfraz1.svg", { x: 0, y: 0 })
    ];

    this.sounds = [
      new Sound("smb_stage_clear", "./MSica/sounds/smb_stage_clear.wav"),
      new Sound(
        "Super Mario Bros - Theme Song",
        "./MSica/sounds/Super Mario Bros - Theme Song.mp3"
      )
    ];

    this.triggers = [
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked),
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked2)
    ];

    this.audioEffects.volume = 20;
  }

  *whenGreenFlagClicked() {
    this.audioEffects.volume = 20;
    yield* this.playSoundUntilDone("Super Mario Bros - Theme Song");
  }

  *whenGreenFlagClicked2() {
    while (!(this.stage.vars.posiciNGlobalX > 4800)) {
      yield;
    }
    this.stopAllSounds();
    yield* this.playSoundUntilDone("smb_stage_clear");
  }
}
