import { PlayerFrames } from "../../player/playerFrames";
import { AnimationName } from "../animationNames";
import PlayerFrameAnimation from "./PlayerFrameAnimation";

export default class MoveBackwardAnimation extends PlayerFrameAnimation {
    name = AnimationName.PlayerMoveBackward;
    tickIntervalTime = 150;

    texturesX: number[] = [PlayerFrames.Curled, PlayerFrames.Curled2];
}
