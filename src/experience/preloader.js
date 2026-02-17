import { EventEmitter } from "events";
import Experience from "./experience.js";
import GSAP from "gsap";

// in charge of declaring the size of the experience and canvas?
export default class Preloader extends EventEmitter {
  constructor() {
    super();

    this.experience = Experience.instance; //acccess the singleton instance
    this.scene = this.experience.scene;
    this.sizes = this.experience.sizes;
    this.resources = this.experience.resources;
    this.world = this.experience.world;

    this.world.on("worldready", ()=>{
        this.setAssets();
        this.playIntro();
    });
  }

  setAssets(){
    this.room = this.world.room.actualRoom;
    this.roomChildren = this.world.room.roomChildren;
    console.log(this.roomChildren);
  }

  firstIntro(){
    this.timeline = new GSAP.timeline();

    this.timeline.to(this.roomChildren.load_cube.scale,{
      x:1,y:1,z:1,
      ease:"back.out(2.5)",
      duration: 1
    },"initial").to(this.room.position,{
      y: .15,
    },"initial")
    .to(this.room.rotation,{
      z: -3.14,
      duration: 2.5,
      ease:"power4.out",
      repeat: 2
    })
    ;
  }

  playIntro(){
    this.firstIntro();
  }
}
