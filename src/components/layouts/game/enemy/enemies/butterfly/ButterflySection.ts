import { AnimationName } from "../../../../../animating/animationNames";
import { BOARD_HEIGHT, BOARD_SCROLL_SPEED } from "../../../constants";
import EnemySection from "../../EnemySection";
import { DoubleRowEnemyParts } from "../../utils";
import Butterfly from "./Butterfly";
import ButterflyElement from "./ButterflyElement";

export default class ButterflySection extends EnemySection {
    shotTimerMs: number;
    moveIterator: number;
    part: DoubleRowEnemyParts;

    constructor(index: number) {
        super();
        this.part =
            index >= 3 ? DoubleRowEnemyParts.Up : DoubleRowEnemyParts.Down;
        this.moveIterator =
            -(Math.PI / 6) * (index % (Butterfly.sectionCount / 2));

        // prepare element and make element needed stuff
        this.element = new ButterflyElement();
        this.initAfterElementPresent();
        this.makeSafeTimeout(() => {
            this.animator.startAnim(AnimationName.ButterflyIddle);
        }, 100 * index);
    }

    move() {
        this.position = {
            y: this.calcYPosition(),
            x: this.position.x - BOARD_SCROLL_SPEED * 3,
        };
        this.moveIterator += Math.PI / 30;
    }

    calcYPosition() {
        return (
            ((Math.sin(this.moveIterator) * 2 - 1) *
                (this.part == DoubleRowEnemyParts.Up ? -1 : 1) *
                BOARD_HEIGHT) /
                8 +
            BOARD_HEIGHT / 2
        );
    }

    die() {
        super.die();
        this.animator.endAnim(AnimationName.ButterflyIddle);
    }
}
