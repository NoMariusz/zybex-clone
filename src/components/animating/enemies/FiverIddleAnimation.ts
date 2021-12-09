import { Position } from "../../interfaces";
import { AnimationName } from "../animationNames";
import FrameAnimation from "../utils/FrameAnimation";

export default class FiverIddleAnimation extends FrameAnimation {
    name = AnimationName.FiverIddle;

    tickIntervalTime = 150;

    textures: Position[] = Array(6)
        .fill(null)
        .map((e, i) => ({ x: 825 + 75 * i, y: 800 }));
}
