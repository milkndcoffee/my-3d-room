import * as THREE from "three";
import Experience from "./experience.js";

export default class Renderer{

    constructor(){
        this.experience = Experience.instance; //acccess the singleton instance
        this.sizes = this.experience.sizes;
        this.scene = this.experience.scene;
        this.canvas = this.experience.canvas;
        this.camera = this.experience.camera;

        this.setRenderer();
    }

    setRenderer(){
        this.renderer = new THREE.WebGLRenderer({
            canvas: this.canvas,
            antialias: true
        });

        //this.renderer.physicallyCorrectLights = true; // cannot be set to false so this is commented out
        //this.renderer.outputEndcoding = THREE.sRGBEncoding; // seems to no longer exist
        this.renderer.toneMapping = THREE.CineonToneMapping;
        this.renderer.toneMappingExposure = 1.5;
        this.renderer.shadowMap.enabled = true;
        this.renderer.shadowMap.entypeabled = THREE.PCFSoftShadowMap;
        this.renderer.setSize(this.sizes.width, this.sizes.height);
        this.renderer.setPixelRatio(this.sizes.pixelRatio);
    }

    resize(){
        this.renderer.setSize(this.sizes.width, this.sizes.height);
        this.renderer.setPixelRatio(this.sizes.pixelRatio);
    }

    update(){
        this.renderer.setViewport(0, 0, this.sizes.width, this.sizes.height);
        this.renderer.render(this.scene, this.camera.orthographicCamera);
    }
}