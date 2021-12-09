import { Position } from "../../interfaces";
import CanvasElement from "../../rendering/CanvasElement";
import Animation from "../Animation";
import { AnimationName } from "../animationNames";

export default abstract class FrameAnimation implements Animation {
    abstract name: AnimationName;
    active: boolean = false;

    abstract tickIntervalTime: number;
    interval: NodeJS.Timer;

    element: CanvasElement;

    abstract textures: Position[];
    baseTexture: Position;
    actualTextureIdx = 0;

    constructor(element: CanvasElement) {
        this.element = element;
    }

    get animTime() {
        return this.tickIntervalTime * this.textures.length;
    }

    start() {
        this.baseTexture = this.element.texture_offset;
        this.actualTextureIdx = 0;
    }

    end() {
        this.element.texture_offset = this.baseTexture;
    }

    tick() {
        if (this.actualTextureIdx >= this.textures.length) {
            this.actualTextureIdx = 0;
        }
        const tex = this.textures[this.actualTextureIdx];
        this.element.texture_offset = tex;
        this.actualTextureIdx++;
    }
}
