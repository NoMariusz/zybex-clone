import { Position } from "../../../../interfaces";
import { CanvasElement } from "../../../../rendering/interfaces";
import { AnimationName } from "../animationNames";
import FrameAnimation from "../FrameAnimation";

export default class FiverIddleAnimation extends FrameAnimation {
    active = false;
    name = AnimationName.FiverIddle;

    tickIntervalTime = 150;
    interval: NodeJS.Timer;

    element: CanvasElement;
    baseTexture: Position;

    textures: Position[] = Array(6)
        .fill(null)
        .map((e, i) => ({ x: 825 + 75 * i, y: 800 }));
    actualTextureIdx = 0;

    constructor(element: CanvasElement) {
        super();
        this.element = element;
    }
}
