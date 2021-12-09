import { Position } from "../../interfaces";
import { AnimationName } from "../animationNames";
import FrameAnimation from "../utils/FrameAnimation";

export default class MenuSubtitle3Animation extends FrameAnimation {
    name = AnimationName.MenuSubtitle3;
    tickIntervalTime = 100;

    textures: Position[] = Array(4)
        .fill(null)
        .map((e, i) => ({ x: 396 * i, y: 7611 }));
}
