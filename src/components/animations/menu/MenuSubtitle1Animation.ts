import { Position } from "../../interfaces";
import { AnimationName } from "../animationNames";
import FrameAnimation from "../FrameAnimation";

export default class MenuSubtitle1Animation extends FrameAnimation {
    name = AnimationName.MenuSubtitle1;
    tickIntervalTime = 100;

    textures: Position[] = Array(4)
        .fill(null)
        .map((e, i) => ({ x: 362 * i, y: 7547 }));
}
