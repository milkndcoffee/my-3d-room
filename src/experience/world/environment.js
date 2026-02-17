// deals w environmental items like lighting
import * as THREE from "three";
import Experience from "../experience.js";
import GSAP from "gsap";
import GUI from 'lil-gui';

export default class Environment {
  constructor() {
    this.experience = Experience.instance; //acccess the singleton instance
    this.scene = this.experience.scene;
    this.resources = this.experience.resources;

    this.obj = {
      colorObj: {r:0, g:0, b:0},
      intensity: 2,
    };

    this.setSunlight();
  }

  setGUI(){
    this.gui.addColor(this.obj, "colorObj").onChange(()=>{
      this.sunlight.color.copy(this.obj.colorObj);
      this.ambientLight.color.copy(this.obj.colorObj);
      console.log(this.obj.colorObj);
    });
    this.gui.add(this.obj, "intensity", 0, 10).onChange(()=>{
      this.ambientLight.intensity = this.obj.intensity;
    });
  }

  setSunlight() {
    this.sunlight = new THREE.DirectionalLight("#ffe8e8", 3);
    this.sunlight.castShadow = true;
    this.sunlight.shadow.camera.far = 20;
    this.sunlight.shadow.mapSize.set(1024, 1024);
    this.sunlight.shadow.normalBias = 0.05;

    this.sunlight.position.set(-1.5, 7, 3);
    this.scene.add(this.sunlight);
    this.ambientLight = new THREE.AmbientLight("#ffffff", 2);
    this.scene.add(this.ambientLight);
  }

  switchTheme(theme) {
    if (theme === "dark") {
      GSAP.to(this.sunlight.color, {
        r: 0.08627450980392157, 
        g: 0.08627450980392157, 
        b: 0.15294117647058825 
      });
      GSAP.to(this.ambientLight.color, {
        r:0.011764705882352941, 
        g: 0.011764705882352941, 
        b: 0.0196078431372549 
      });
      GSAP.to(this.sunlight, {
        intensity: 1.03
      })
      GSAP.to(this.ambientLight, {
        intensity: 10
      })
    } else {
      GSAP.to(this.sunlight.color, {
        r: 255/255,
        g: 255/255,
        b: 255/255,
      });
      GSAP.to(this.ambientLight.color, {
        r: 255/255,
        g: 255/255,
        b: 255/255,
      });
      GSAP.to(this.sunlight, {
        intensity: 2
      })
      GSAP.to(this.ambientLight, {
        intensity: 2
      })
    }
  }

  resize() {}

  update() {}
}
