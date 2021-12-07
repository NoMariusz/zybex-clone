import { AnimationName } from "../../../../../../animations/animationNames";
import { BOARD_SCROLL_SPEED } from "../../../../constants";
import EnemySection from "../../../EnemySection";
import CoinElement from "../CoinElement";

export default class FastCoinSection extends EnemySection {
    shotTimerMs: number;
    speedBonus: number;

    constructor(speed: number) {
        super();
        this.speedBonus = speed;
        // prepare element and make element needed stuff
        this.element = new CoinElement();
        this.initAfterElementPresent();

        this.animator.startAnim(AnimationName.CoinIddle);
    }

    move() {
        this.position = {
            ...this.position,
            x: this.position.x - BOARD_SCROLL_SPEED * this.speedBonus,
        };
    }

    die() {
        super.die();
        this.animator.endAnim(AnimationName.CoinIddle);
    }
}
