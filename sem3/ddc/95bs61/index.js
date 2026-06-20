import { Project } from "https://unpkg.com/leopard@^1/dist/index.esm.js";

import Stage from "./Stage/Stage.js";
import Escenario from "./Escenario/Escenario.js";
import EscenarioMascara from "./EscenarioMascara/EscenarioMascara.js";
import Mario from "./Mario/Mario.js";
import MarioMascara from "./MarioMascara/MarioMascara.js";
import Goomba from "./Goomba/Goomba.js";
import Borde from "./Borde/Borde.js";
import MSica from "./MSica/MSica.js";
import PantallaFinal from "./PantallaFinal/PantallaFinal.js";

const stage = new Stage({ costumeNumber: 1 });

const sprites = {
  Escenario: new Escenario({
    x: 585,
    y: 0,
    direction: 90,
    costumeNumber: 11,
    size: 100,
    visible: false,
    layerOrder: 1
  }),
  EscenarioMascara: new EscenarioMascara({
    x: 465,
    y: 0,
    direction: 90,
    costumeNumber: 11,
    size: 100,
    visible: false,
    layerOrder: 8
  }),
  Mario: new Mario({
    x: 0,
    y: -21,
    direction: 90,
    costumeNumber: 5,
    size: 100,
    visible: true,
    layerOrder: 7
  }),
  MarioMascara: new MarioMascara({
    x: 0,
    y: -17,
    direction: 90,
    costumeNumber: 1,
    size: 100,
    visible: true,
    layerOrder: 2
  }),
  Goomba: new Goomba({
    x: 235.0020769187434,
    y: 0,
    direction: 90,
    costumeNumber: 1,
    size: 50,
    visible: false,
    layerOrder: 3
  }),
  Borde: new Borde({
    x: 0,
    y: 0,
    direction: 90,
    costumeNumber: 1,
    size: 100,
    visible: true,
    layerOrder: 4
  }),
  MSica: new MSica({
    x: 36,
    y: 28,
    direction: 90,
    costumeNumber: 1,
    size: 100,
    visible: true,
    layerOrder: 5
  }),
  PantallaFinal: new PantallaFinal({
    x: 0,
    y: 0,
    direction: 90,
    costumeNumber: 1,
    size: 100,
    visible: false,
    layerOrder: 6
  })
};

const project = new Project(stage, sprites, {
  frameRate: 30 // Set to 60 to make your project run faster
});
export default project;
