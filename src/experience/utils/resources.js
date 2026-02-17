//loads and stores all our resources
import * as THREE from "three";
import { EventEmitter } from "events";
import Experience from "../experience";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { DRACOLoader } from "three/addons/loaders/DRACOLoader.js";

export default class Resources extends EventEmitter{
    constructor(assets){
        super();
        this.experience = Experience.instance;
        this.renderer = this.experience.renderer;

        this.assets = assets;

        this.items = {        }
        this.queue = this.assets.length; //tells us how many items are in queue to be loaded
        this.loaded = 0;

        this.setLoaders();
        this.startLoading();
    }

    setLoaders(){
        this.loaders = {}
        this.loaders.gltfLoader = new GLTFLoader();
        this.loaders.dracoLoader = new DRACOLoader();
        this.loaders.dracoLoader.setDecoderPath( '/draco/' );
        this.loaders.gltfLoader.setDRACOLoader(this.loaders.dracoLoader);
    }
    
    startLoading(){
        console.log("Assets to load:", this.assets);
        for(const asset of this.assets){
            if(asset.type === "glbModel"){
                console.log(`Attempting to load: ${asset.path}`);

                this.loaders.gltfLoader.load(asset.path, (file)=>{
                    console.log(`Successfully loaded: ${asset.name}`);
                    this.singleAssetLoaded(asset, file);
                });
            } else if (asset.type === "videoTexture"){
                this.video = {} //for our video element
                this.videoTexture = {} //threejs configurations

                //video element
                this.video[asset.name] = document.createElement("video");
                this.video[asset.name].src = asset.path;
                this.video[asset.name].muted = true;
                this.video[asset.name].playsInline = true;
                this.video[asset.name].autoplay = true;
                this.video[asset.name].loop = true;
                this.video[asset.name].play();

                //threejs video config
                this.videoTexture[asset.name] = new THREE.VideoTexture(
                    this.video[asset.name]
                );
                this.videoTexture[asset.name].flipY= true;
                this.videoTexture[asset.name].minFilter= THREE.NearestFilter;
                this.videoTexture[asset.name].mageFilter= THREE.NearestFilter;
                this.videoTexture[asset.name].generateMipmaps= false;
                this.videoTexture[asset.name].encoding= THREE.sRGBEncoding;

                this.singleAssetLoaded(asset, this.videoTexture[asset.name]);
            }
        }
    }


    singleAssetLoaded(asset, file){
        this.items[asset.name] = file;
        this.loaded++;
        console.log("asset is loading");
        if(this.loaded === this.queue){
            console.log("all assets are done");
            //we want to create the world after our assets have loaded
            this.emit("ready");
        }
    }
}