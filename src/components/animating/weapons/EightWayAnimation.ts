import { Position } from "../../interfaces";
import { AnimationName } from "../animationNames";
import FrameAnimation from "../utils/FrameAnimation";

export default class EightWayUseAnimation extends FrameAnimation {
    name = AnimationName.EightWayUse;
    tickIntervalTime = 250;

    textures: Position[] = Array(4)
        .fill(null)
        .map((e, i) => ({ x: 1100 + 100 * i, y: 875 }));
}
