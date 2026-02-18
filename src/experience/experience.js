import * as THREE from "three";

import Sizes from "./utils/sizes.js";
import Time from "./utils/time.js";
import Resources from "./utils/resources.js";
import assets from "./utils/assets.js";

import Camera from "./camera.js";
import Theme from "./theme.js";
import Renderer from "./renderer.js";

import World from "./world/world.js";

export default class Experience {
  static instance;
  constructor(canvas) {
    //if this instance exists, return it | for Singleton design
    if (Experience.instance) {
      return Experience.instance;
    }

    Experience.instance = this;

    //canvas and scene
    this.canvas = canvas;
    this.scene = new THREE.Scene();

    //utils
    this.time = new Time();
    this.sizes = new Sizes();
    this.resources = new Resources(assets);

    this.theme = new Theme();

    this.world = new World();

    this.camera = new Camera();
    this.renderer = new Renderer();

    //when screen is resized, call resize functions
    this.sizes.on("resize", () => {
      this.resize();
    });
    //when time is updating, we want to call these functions
    this.time.on("update", () => {
      this.update();
    });
  }

  resize() {
    // this.world.resize();
    this.camera.resize();
    this.renderer.resize();
  }
  update() {
    this.world.update();
    this.camera.update();
    this.renderer.update();
  }
}
