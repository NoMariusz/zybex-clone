import { Position } from "../../../../interfaces";
import { CanvasElement } from "../../../../rendering/interfaces";
import { AnimationName } from "../animationNames";
import FrameAnimation from "../FrameAnimation";

export default class DragonflyIddleAnimation extends FrameAnimation {
    name = AnimationName.DragonflyIddle;

    tickIntervalTime = 100;

    textureXoffsets = [1, 2, 3, 2, 1, 0];

    textures: Position[] = Array(6)
        .fill(null)
        .map((e, i) => ({ x: 525 + 75 * this.textureXoffsets[i], y: 600 }));
}
