import { PlayerFrames } from "../../player/playerFrames";
import { AnimationName } from "../animationNames";
import PlayerFrameAnimation from "./PlayerFrameAnimation";

export default class MoveDownAnimation extends PlayerFrameAnimation {
    name = AnimationName.PlayerMoveDown;
    tickIntervalTime = 300;

    texturesX: number[] = [PlayerFrames.Down];
}
