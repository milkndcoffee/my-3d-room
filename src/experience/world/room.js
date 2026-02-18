import * as THREE from "three";
import Experience from "../experience.js";
import GSAP from "gsap";
import { RectAreaLightHelper } from "three/examples/jsm/helpers/RectAreaLightHelper.js";

export default class Room {
  constructor() {
    this.experience = Experience.instance; //acccess the singleton instance
    this.scene = this.experience.scene;
    this.resources = this.experience.resources;
    this.room = this.resources.items.room;
    this.actualRoom = this.room.scene;
    this.roomChildren = {};

    this.lerp = {
      current: 0,
      target: 0,
      ease: 0.1, //determines how smooth
    };

    this.setModel();
    this.onMouseMove();
    this.setNightLights();
  }

  setModel() {
    this.actualRoom.children.forEach((child) => {
      child.castShadow = true;
      child.receiveShadow = true;
      // child.scale.set(0,0,0);

      // intro cube
      if (child.name==="load_cube"){
        // child.scale.set(1,1,1);
        child.position.set(0, -.04, 0);
      }

      if (child instanceof THREE.Group) {
        child.children.forEach((groupChild) => {
          groupChild.castShadow = true;
          groupChild.receiveShadow = true;
        });
      }


      if (child.name === "plastic_tower") {
        child.material = new THREE.MeshPhysicalMaterial();
        child.material.roughtness = 0;
        child.material.color.set(0xc5cfc4);
        child.material.ior = 3;
        child.material.transmission = 1;
        child.material.opacity = 1;
      }
      if (child.name === "monitor_screen") {
        child.material = new THREE.MeshBasicMaterial({
          map: this.resources.items.screen,
        });
      }

      this.roomChildren[child.name] = child;
    });

    this.scene.add(this.actualRoom);
  }

  setNightLights() {
    //DS lighting
    const dsLight = {
      width: 0.2,
      height: 0.2,
      intensity: .5,
      color: 0xffffff,
      posX: -0.35,
      posY: 0.9,
      posZ: 0.4,
    };

    const dsRectLight = this.createRectLight(dsLight);
    dsRectLight.rotation.x = -Math.PI / 2;
    dsRectLight.rotation.y = Math.PI / 0.5;

    //lamp lighting
    const lampLight = {
      width: 0.2,
      height: 0.1,
      intensity: 1,
      color: 0xf2d697,
      posX: 0.2,
      posY: 0.9,
      posZ: -0.45,
    };
    const lampRectLight = this.createRectLight(lampLight);
    lampRectLight.rotation.x = -Math.PI / 2;
    lampRectLight.rotation.z = -Math.PI / 0.75;

    //pc lighting
    const pcLight = {
      width: 0.4,
      height: 0.2,
      intensity: 1.5,
      color: 0x0f649b,
      posX: .69,
      posY: .95,
      posZ: -0.28,
    };
    const pcRectLight = this.createRectLight(pcLight);
    pcRectLight.rotation.y = Math.PI / 1.35;

    //globe lamp lighting
    const globeLight = {
      width: 0.05,
      height: 0.05,
      intensity: 1.2,
      color: 0xffffff,
      posX: .78,
      posY: 1.40,
      posZ: -0.24,
    };
    const globeRectLight = this.createRectLight(globeLight);
    globeRectLight.rotation.x = Math.PI / 2;
    globeRectLight.rotation.y = Math.PI / 0.5;

    //tower lighting
    const towerLight = {
      width: 0.12,
      height: 0.18,
      intensity: 10,
      color: 0x9c1051,
      posX: .96,
      posY: .83,
      posZ: .02,
    };
    const towerRectLight = this.createRectLight(towerLight);
    towerRectLight.rotation.x = Math.PI / 2;

    //stand lighting
    const standLight = {
      intensity: .3,
      color: 0xfff3d4,
      posX: -0.36,
      posY: 0.9,
      posZ: -0.5,
    };

    // const standRectLight = this.createRectLight(standLight);
    dsRectLight.rotation.x = -Math.PI / 2;
    dsRectLight.rotation.y = Math.PI / 0.4;

    const standPointLight = new THREE.PointLight(standLight.color, standLight.intensity, 1.5, .5);
    standPointLight.position.set(standLight.posX, standLight.posY, standLight.posZ);

    //add RectLighting
    this.actualRoom.add(dsRectLight);
    this.actualRoom.add(lampRectLight);
    this.actualRoom.add(pcRectLight);
    this.actualRoom.add(globeRectLight);
    this.actualRoom.add(towerRectLight);
    this.actualRoom.add(standPointLight);

    // add lighting to roomChildren object
    this.roomChildren["dsRectLight"] = dsRectLight;
    this.roomChildren["lampRectLight"] = lampRectLight;
    this.roomChildren["pcRectLight"] = pcRectLight;
    this.roomChildren["globeRectLight"] = globeRectLight;
    this.roomChildren["towerRectLight"] = towerRectLight;
    this.roomChildren["standPointLight"] = standPointLight;
  }

  createRectLight(item) {
    const rectLight = new THREE.RectAreaLight(
      item.color,
      item.intensity,
      item.width,
      item.height
    );
    rectLight.position.set(item.posX, item.posY, item.posZ);
    return rectLight;
  }

  onMouseMove() {
    // need to listen to mouse move event
    window.addEventListener("mousemove", (e) => {
      // innerWidth is the width of the window
      // the expression below allows us tor receive a value of -1 to 1 for our rotation
      this.rotation =
        (e.clientX - window.innerWidth / 2) * (2 / window.innerWidth);
      this.lerp.target = this.rotation * 0.1;
    });
  }

  resize() {}

  update() {
    this.lerp.current = GSAP.utils.interpolate(
      this.lerp.current,
      this.lerp.target,
      this.lerp.ease
    );

    this.actualRoom.rotation.y = this.lerp.current;
  }
}
