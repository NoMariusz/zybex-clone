import { AnimationName } from "../../../../../../animations/animationNames";
import {
    BOARD_HEIGHT,
    BOARD_SCROLL_SPEED,
    BOARD_WIDTH,
} from "../../../../constants";
import EnemySection from "../../../EnemySection";
import FiverElement from "../FiverElement";

export default class WavingFiverSection extends EnemySection {
    shotTimerMs: number;
    moveIterator: number;

    constructor(index: number) {
        super();
        this.element = new FiverElement();
        this.initAfterElementPresent();

        this.moveIterator = (-Math.PI / 6) * index;
        this.makeSafeTimeout(() => {
            this.animator.startAnim(AnimationName.FiverIddle);
        }, index * 50);
    }

    move() {
        this.position = {
            y:
                Math.cos(this.moveIterator) * (BOARD_HEIGHT / 4) +
                BOARD_HEIGHT / 2,
            x: this.position.x - BOARD_SCROLL_SPEED * 4,
        };
        this.moveIterator += Math.PI / 30;
    }

    die() {
        super.die();
        this.animator.endAnim(AnimationName.FiverIddle);
    }
}
