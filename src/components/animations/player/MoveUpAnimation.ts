import { PlayerFrames } from "../../layouts/game/player/playerFrames";
import { AnimationName } from "../animationNames";
import PlayerFrameAnimation from "./PlayerFrameAnimation";

export default class MoveUpAnimation extends PlayerFrameAnimation {
    name = AnimationName.PlayerMoveUp;
    tickIntervalTime = 150;

    texturesX: number[] = [
        PlayerFrames.Fly1,
        PlayerFrames.Fly2,
        PlayerFrames.Fly3,
        PlayerFrames.Fly2,
    ];
}
