import { Position } from "../../../../interfaces";
import { CanvasElement } from "../../../../rendering/interfaces";
import { AnimationName } from "../animationNames";
import FrameAnimation from "../FrameAnimation";

export default class ButterflyIddleAnimation extends FrameAnimation {
    active = false;
    name = AnimationName.ButterflyIddle;

    tickIntervalTime = 100;
    interval: NodeJS.Timer;

    element: CanvasElement;
    baseTexture: Position;

    textures: Position[] = Array(6)
        .fill(null)
        .map((e, i) => ({ x: 600 + 75 * i, y: 700 }));
    actualTextureIdx = 0;

    constructor(element: CanvasElement) {
        super();
        this.element = element;
    }
}
