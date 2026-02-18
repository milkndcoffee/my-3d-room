// handle all our controls
import * as THREE from "three";
import Experience from "../experience.js";
import GSAP from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger.js";

export default class Controls {
  constructor() {
    this.experience = Experience.instance; //acccess the singleton instance
    this.scene = this.experience.scene;
    this.sizes = this.experience.sizes;
    this.resources = this.experience.resources;
    this.room = this.experience.world.room.actualRoom;
    this.floor = this.experience.world.floor;

    GSAP.registerPlugin(ScrollTrigger);

    this.setScrollTrigger();
  }

  setScrollTrigger() {
    ScrollTrigger.matchMedia({
      // Desktop
      "(min-width: 969px)": () => {
        this.room.scale.set(1, 1, 1);
        let tl = new GSAP.timeline({
          scrollTrigger: {
            trigger: ".first-move.section-margin",
            start: "top bottom",
            end: "bottom bottom",
            scrub: 2,
            invalidateOnRefresh: true,
          },
        });
        tl.to(this.room.position, {
          x: () => {
            return this.sizes.width * 0.0013;
          },
        });

        let secondTl = new GSAP.timeline({
          scrollTrigger: {
            trigger: ".second-move.section-margin",
            start: "bottom bottom",
            end: "200%",
            scrub: 2,
            invalidateOnRefresh: true,
          },
        });
        secondTl.to(this.room.scale, {
          x: 4,
          y: 4,
          z: 4,
        });

        let thirdTl = new GSAP.timeline({
          scrollTrigger: {
            trigger: ".first-section.section.left",
            start: "top bottom",
            end: "145%",
            scrub: true,
            invalidateOnRefresh: true,
          },
        });
        thirdTl
          .from(".left", {
            borderTopRightRadius: "200px 200px",
            borderBottomRightRadius: "0px 0px",
          })
          .to(".left", {
            borderTopRightRadius: "0px 0px",
            borderBottomRightRadius: "200px 200px",
            ease: "back.out",
          });

        let fourthTl = new GSAP.timeline({
          scrollTrigger: {
            trigger: ".second-section.section.right",
            start: "top center",
            end: "bottom center",
            scrub: true,
            invalidateOnRefresh: true,
          },
        });
        fourthTl
          .from(".right", {
            borderTopLeftRadius: "200px 200px",
            borderBottomLeftRadius: "0px 0px",
          })
          .to(".right", {
            borderTopLeftRadius: "0px 0px",
            borderBottomLeftRadius: "200px 200px",
            ease: "back.out",
          });
      },

      // Mobile
      "(max-width: 968px)": () => {
        //reset
        this.room.scale.set(0.7, 0.7, 0.7);
        this.room.position.set(0, 0, 0);

        let tl = new GSAP.timeline({
          scrollTrigger: {
            trigger: ".first-move.section-margin",
            start: "top bottom",
            end: "bottom bottom",
            scrub: 0.6,
            invalidateOnRefresh: true,
          },
        });

        tl.to(
          ".hero-main",
          {
            opacity: 0,
            height: "50vh",
          },
          "same"
        );

        tl.to(
          this.room.scale,
          {
            x: 0.8,
            y: 0.8,
            z: 0.8,
          },
          "same"
        );

        let secondTl = new GSAP.timeline({
          scrollTrigger: {
            trigger: ".second-move.section-margin",
            start: "top bottom",
            end: "bottom bottom",
            scrub: 1,
            invalidateOnRefresh: true,
          },
        });
        secondTl
          .to(
            this.room.scale,
            {
              x: 4,
              y: 4,
              z: 4,
            },
            "second"
          )
          .to(this.room.position, { x: -1.3, y: -2 }, "second")
          .to(this.floor.plane.position, { y: -4 }, "second");

        let thirdTl = new GSAP.timeline({
          scrollTrigger: {
            trigger: ".first-section.section.left",
            start: "top center",
            end: "135%",
            scrub: true,
            invalidateOnRefresh: true,
          },
        });
        thirdTl
          .from(".first-section.section.left", {
            borderTopRightRadius: "100px 100px",
            borderTopLeftRadius: "100px 100px",
            borderBottomRightRadius: "0px 0px",
            borderBottomLeftRadius: "0px 0px",
          })
          .to(".first-section.section.left", {
            borderTopRightRadius: "0px 0px",
            borderTopLeftRadius: "0px 0px",
            borderBottomRightRadius: "100px 100px",
            borderBottomLeftRadius: "100px 100px",
            ease: "back.out",
          });

        let fourthTl = new GSAP.timeline({
          scrollTrigger: {
            trigger: ".second-section.section.right",
            start: "top center",
            end: "bottom bottom",
            scrub: true,
            invalidateOnRefresh: true,
          },
        });
        fourthTl
          .from(".right", {
            borderTopRightRadius: "100px 100px",
            borderTopLeftRadius: "100px 100px",
            borderBottomRightRadius: "0px 0px",
            borderBottomLeftRadius: "0px 0px",
          })
          .to(".right", {
            borderTopRightRadius: "0px 0px",
            borderTopLeftRadius: "0px 0px",
            borderBottomRightRadius: "0px 0px",
            borderBottomLeftRadius: "0px 0px",
            ease: "back.out",
          });
      },

      //all
      all: () => {
        //Room Animation when loaded
        GSAP.from(this.room.scale, {
          x: 0.001,
          y: 0.001,
          z: 0.001,
          duration: 1.2,
          ease: "back.out",
        });
        GSAP.from(this.room.rotation, {
          z: 3,
          duration: 1.4,
          ease: "back.out",
        });
      },
    });
  }

  resize() {}
  update() {}
}
