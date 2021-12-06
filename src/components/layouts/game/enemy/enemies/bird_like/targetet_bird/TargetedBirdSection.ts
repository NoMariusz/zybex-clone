import { clampValue } from "../../../../../../utils";
import { AnimationName } from "../../../../animations/animationNames";
import { BOARD_SCROLL_SPEED, TARGETED_BIRD_HP } from "../../../../constants";
import Player from "../../../../player/Player";
import EnemySection from "../../../EnemySection";
import BirdElement from "../BirdElement";

export default class TargetedBirdSection extends EnemySection {
    shotTimerMs: number;
    playerPosition: number;
    player: Player;

    constructor(player: Player) {
        super();
        this.player = player;

        this.hp = TARGETED_BIRD_HP;

        this.element = new BirdElement();
        this.initAfterElementPresent();

        this.shotTimerMs = 3000;
        this.animator.startAnim(AnimationName.BirdIddle);
    }

    move() {
        this.position = {
            y: this.position.y - this.getYVelocity() * 1.5,
            x: this.position.x - BOARD_SCROLL_SPEED * 6,
        };
    }

    getYVelocity() {
        return clampValue(this.position.y - this.player.position.y);
    }

    die() {
        super.die();
        this.animator.endAnim(AnimationName.BirdIddle);
    }
}
