import { Position } from "../../../../interfaces";
import { AnimationName } from "../animationNames";
import FrameAnimation from "../FrameAnimation";

export default class BirdIddleAnimation extends FrameAnimation {
    name = AnimationName.BirdIddle;

    tickIntervalTime = 150;

    textures: Position[] = Array(6)
        .fill(null)
        .map((e, i) => ({ x: 375 + 75 * i, y: 800 }));
}
