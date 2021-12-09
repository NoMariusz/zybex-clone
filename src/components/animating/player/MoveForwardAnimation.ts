import { PlayerFrames } from "../../layouts/game/player/playerFrames";
import { AnimationName } from "../animationNames";
import PlayerFrameAnimation from "./PlayerFrameAnimation";

enum Stages {
    Start,
    Main,
}

export default class MoveForwardAnimation extends PlayerFrameAnimation {
    name = AnimationName.PlayerMoveForward;
    tickIntervalTime = 200;

    stage: Stages = Stages.Start;

    texturesXObj: { [key in Stages]: number[] } = {
        [Stages.Start]: [
            PlayerFrames.ForwardStart1,
            PlayerFrames.ForwardStart2,
            PlayerFrames.ForwardStart2,
        ],
        [Stages.Main]: [PlayerFrames.ForwardMain1, PlayerFrames.ForwardMain2],
    };

    get texturesX() {
        return this.texturesXObj[this.stage];
    }

    start() {
        this.stage = Stages.Start;
        super.start();
    }

    tick() {
        /**
         * Override to provide 2 stages animation,
         * when animation played all start frames, function change this.stage,
         * so animation use other stage frames
         */
        super.tick();
        if (
            this.stage == Stages.Start &&
            this.actualTextureIdx >= this.texturesX.length
        ) {
            this.actualTextureIdx = 0;
            this.stage = Stages.Main;
        }
    }
}
