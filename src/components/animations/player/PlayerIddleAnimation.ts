import { PlayerFrames } from "../../layouts/game/player/playerFrames";
import { AnimationName } from "../animationNames";
import PlayerFrameAnimation from "./PlayerFrameAnimation";

export default class PlayerIddleAnimation extends PlayerFrameAnimation {
    name = AnimationName.PlayerIddle;
    tickIntervalTime = 100;

    texturesX: number[] = [PlayerFrames.Base, PlayerFrames.Iddle2];
}
