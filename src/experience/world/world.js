import Experience from "../experience.js";
import Room from "./room.js";
import Environment from "./environment.js";
import Controls from "./controls.js";
import Floor from "./floor.js";
import { EventEmitter } from "events";


export default class World extends EventEmitter{
  constructor() {
    super();

    this.experience = Experience.instance; //acccess the singleton instance
    this.sizes = this.experience.sizes;
    this.scene = this.experience.scene;
    this.canvas = this.experience.canvas;
    this.camera = this.experience.camera;
    this.resources = this.experience.resources;
    this.theme = this.experience.theme;

    // when all resources in resources.js (coming from -> experience.js) is ready, then let's render our room
    this.resources.on("ready", () => {
      this.room = new Room();
      this.environment = new Environment();
      this.floor = new Floor();
      this.controls = new Controls();
      this.emit("worldready");
    });

    this.theme.on("switch", (theme) => {
      this.switchTheme(theme);
    });
  }

  switchTheme(theme) {
    if (this.environment) {
      this.environment.switchTheme(theme);
    }
  }

  update() {
    if (this.room) {
      //condition needed to ensure that everything is loaded
      this.room.update();
    }
    if (this.controls) {
      this.controls.update();
    }
  }
}
