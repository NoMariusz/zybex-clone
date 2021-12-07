import { Position } from "../../interfaces";
import { AnimationName } from "../animationNames";
import FrameAnimation from "../FrameAnimation";

export default class PhantomIddleAnimation extends FrameAnimation {
    name = AnimationName.PhantomIddle;

    tickIntervalTime = 200;

    textureXoffsets = [0, 1, 2, 3, 4, 3, 2, 1];

    textures: Position[] = Array(this.textureXoffsets.length)
        .fill(null)
        .map((e, i) => ({ x: 825 + 75 * this.textureXoffsets[i], y: 600 }));
}
