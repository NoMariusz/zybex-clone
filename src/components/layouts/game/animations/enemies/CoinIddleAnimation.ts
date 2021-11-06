import { Position } from "../../../../interfaces";
import { AnimationName } from "../animationNames";
import FrameAnimation from "../FrameAnimation";

export default class CoinIddleAnimation extends FrameAnimation {
    name = AnimationName.CoinIddle;

    tickIntervalTime = 200;

    textures: Position[] = Array(8)
        .fill(null)
        .map((e, i) => ({ x: 75 * i, y: 700 }));
}
