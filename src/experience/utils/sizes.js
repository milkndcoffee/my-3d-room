import { EventEmitter } from "events";

// in charge of declaring the size of the experience and canvas?
export default class Sizes extends EventEmitter{
    constructor(){
        super();
        this.width = window.innerWidth;
        this.height = window.innerHeight;
        this.aspect = this.width/this.height;
        this.pixelRation = Math.min(window.devicePixelRatio, 2)

        this.frustrum = 5;

        //on resize we want to update these values
        window.addEventListener('resize', ()=>{
            this.width = window.innerWidth;
            this.height = window.innerHeight;
            this.aspect = this.width/this.height;
            this.pixelRation = Math.min(window.devicePixelRatio, 2)
            this.emit("resize");
        })
    }
}