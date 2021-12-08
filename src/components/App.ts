import LayoutManager from "./layouts/LayoutManager";
import { MAX_FPS } from "../constants";
import Renderer from "./rendering/Renderer";

export default class App {
    /* Main class in game, controling game loop */

    layoutManager: LayoutManager;
    fpsInterval: number;
    lastFrame: number;

    constructor() {
        this.layoutManager = new LayoutManager();
    }

    async init() {
        console.log("Starting game...");
        this.startLoop();
    }

    startLoop() {
        this.fpsInterval = 1000 / MAX_FPS;
        this.lastFrame = Date.now();

        this.loop();
    }

    loop() {
        requestAnimationFrame(() => this.loop());

        // calc time elapsed between last frame
        const now = Date.now();
        const elapsed = now - this.lastFrame;

        // if elapsed enough time, do loop work
        if (elapsed > this.fpsInterval) {
            // prepare last frame
            this.lastFrame = now - (elapsed % this.fpsInterval);

            this.doGameLoop();
        }
    }

    doGameLoop() {
        Renderer.clear();
        this.layoutManager.render();
    }
}
