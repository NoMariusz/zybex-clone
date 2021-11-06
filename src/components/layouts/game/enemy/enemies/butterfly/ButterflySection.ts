import { AnimationName } from "../../../animations/animationNames";
import { BOARD_HEIGHT, BOARD_SCROLL_SPEED } from "../../../constants";
import EnemySection from "../../EnemySection";
import Butterfly from "./Butterfly";
import { ButterflyParts, BUTTERFLY_Y_FUNCTIONS } from "./butterflyData";
import ButterflyElement from "./ButterflyElement";

export default class ButterflySection extends EnemySection {
    shotTimerMs: number;
    moveIterator: number;
    part: ButterflyParts;

    constructor(index: number) {
        super();
        this.part = index >= 3 ? ButterflyParts.Up : ButterflyParts.Down;
        this.moveIterator =
            -(Math.PI / 6) * (index % (Butterfly.sectionCount / 2));

        // prepare element and make element needed stuff
        this.element = new ButterflyElement();
        this.initAfterElementPresent();
        this.animator.startAnim(AnimationName.ButterflyIddle);
    }

    move() {
        this.position = {
            y: BUTTERFLY_Y_FUNCTIONS[this.part](this.moveIterator),
            x: this.position.x - BOARD_SCROLL_SPEED * 3,
        };
        this.moveIterator += Math.PI / 30;
    }

    die() {
        super.die();
        this.animator.endAnim(AnimationName.ButterflyIddle);
    }
}
