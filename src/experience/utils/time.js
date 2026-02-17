import { EventEmitter } from "events";

//class for keeping track of time
export default class Time extends EventEmitter{
    constructor(){
        super(); //allows the derived class its own this context

        this.start = Date.now();
        this.current = this.start;
        this.elapsed = 0;
        this.delta = 16;

        this.update();
    }

    update(){
        const currentTime = Date.now();
        this.delta = currentTime - this.current;
        this.current = currentTime;
        this.elapsed = this.current - this.start;

        window.requestAnimationFrame(() => this.update());
        this.emit("update");
    }
}