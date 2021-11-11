import { Position } from "../../../../interfaces";
import { AnimationName } from "../animationNames";
import FrameAnimation from "../FrameAnimation";

export default class RGunUseAnimation extends FrameAnimation {
    name = AnimationName.RGunUse;
    tickIntervalTime = 250;

    textures: Position[] = Array(4)
        .fill(null)
        .map((e, i) => ({ x: 700 + 100 * i, y: 875 }));
}
