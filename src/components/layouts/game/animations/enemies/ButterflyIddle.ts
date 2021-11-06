import { Position } from "../../../../interfaces";
import { AnimationName } from "../animationNames";
import FrameAnimation from "../FrameAnimation";

export default class ButterflyIddleAnimation extends FrameAnimation {
    name = AnimationName.ButterflyIddle;

    tickIntervalTime = 100;

    textures: Position[] = Array(6)
        .fill(null)
        .map((e, i) => ({ x: 600 + 75 * i, y: 700 }));
}
