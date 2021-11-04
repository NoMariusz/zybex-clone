import { Position } from "../../../../interfaces";
import { CanvasElement } from "../../../../rendering/interfaces";
import { AnimationName } from "../animationNames";
import FrameAnimation from "../FrameAnimation";

export default class BirdIddleAnimation extends FrameAnimation {
    active = false;
    name = AnimationName.BirdIddle;

    tickIntervalTime = 150;
    interval: NodeJS.Timer;

    element: CanvasElement;
    baseTexture: Position;

    // TODO: prepare textures for animation and implement them
    textures: Position[] = Array(6)
        .fill(null)
        .map((e, i) => ({ x: 375 + 75 * i, y: 800 }));
    actualTextureIdx = 0;

    constructor(element: CanvasElement) {
        super();
        this.element = element;
    }
}
