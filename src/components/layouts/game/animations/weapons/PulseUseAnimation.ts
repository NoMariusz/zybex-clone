import { Position } from "../../../../interfaces";
import { AnimationName } from "../animationNames";
import FrameAnimation from "../FrameAnimation";

export default class PulseUseAnimation extends FrameAnimation {
    name = AnimationName.PulseUse;
    tickIntervalTime = 250;

    textures: Position[] = Array(5)
        .fill(null)
        .map((e, i) => ({ x: 100 * i, y: 950 }));
}
