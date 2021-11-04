import { Position } from "../../../../interfaces";
import { CanvasElement } from "../../../../rendering/interfaces";
import { AnimationName } from "../animationNames";
import FrameAnimation from "../FrameAnimation";

export default class DragonflyIddleAnimation extends FrameAnimation {
    active = false;
    name = AnimationName.DragonflyIddle;

    tickIntervalTime = 100;
    interval: NodeJS.Timer;

    element: CanvasElement;
    baseTexture: Position;

    textureXoffsets = [1, 2, 3, 2, 1, 0];

    textures: Position[] = Array(6)
        .fill(null)
        .map((e, i) => ({ x: 525 + 75 * this.textureXoffsets[i], y: 600 }));
    actualTextureIdx = 0;

    constructor(element: CanvasElement) {
        super();
        this.element = element;
    }
}
