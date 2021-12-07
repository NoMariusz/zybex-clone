import { Position } from "../../interfaces";
import { AnimationName } from "../animationNames";
import FrameAnimation from "../FrameAnimation";

export default class OrbitUseAnimation extends FrameAnimation {
    name = AnimationName.OrbitUse;
    tickIntervalTime = 250;

    textures: Position[] = Array(7)
        .fill(null)
        .map((e, i) => ({ x: 100 * i, y: 875 }));
}
