import * as THREE from "three";
import Experience from "../experience";

export default class Floor{
    constructor(){
        this.experience = Experience.instance; //acccess the singleton instance
        this.scene = this.experience.scene;

        this.setFloor();
    }

    setFloor(){
        this.geometry = new THREE.PlaneGeometry(100, 100);
        this.material = new THREE.MeshStandardMaterial({
            color: 0xDED3D3,

        });
        this.plane = new THREE.Mesh(this.geometry, this.material);
        this.scene.add(this.plane);
        this.plane.rotation.x = -Math.PI/2;
        this.plane.receiveShadow = true;
        this.plane.position.y = -.05;
    }

    resize(){
    }

    update(){

    }

}