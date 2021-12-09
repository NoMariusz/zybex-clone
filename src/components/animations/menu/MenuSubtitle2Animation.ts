import { Position } from "../../interfaces";
import { AnimationName } from "../animationNames";
import FrameAnimation from "../FrameAnimation";

export default class MenuSubtitle2Animation extends FrameAnimation {
    name = AnimationName.MenuSubtitle2;
    tickIntervalTime = 100;

    textures: Position[] = [
        { x: 0, y: 7675 },
        { x: 627, y: 7675 },
        { x: 0, y: 7739 },
        { x: 627, y: 7739 },
    ];
}
