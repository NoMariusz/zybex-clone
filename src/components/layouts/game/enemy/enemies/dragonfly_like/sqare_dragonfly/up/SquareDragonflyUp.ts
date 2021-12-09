import { Position } from "../../../../../../../interfaces";
import { AnimationName } from "../../../../../../../animating/animationNames";
import Bullet from "../../../../../bullets/Bullet";
import { BOARD_WIDTH } from "../../../../../constants";
import Enemy from "../../../../Enemy";
import SquareDragonflySection from "./SquareDragonflyUpSection";

export default class SquareDragonflyUp extends Enemy {
    static sectionCount = 6;

    initSections() {
        for (let i = 0; i < SquareDragonflyUp.sectionCount; i++) {
            const section = this.makeSection();
            this.sections.push(section);

            this.makeSafeTimeout(() => {
                section.animator.startAnim(AnimationName.DragonflyIddle);
            }, i * 100);
        }
    }

    makeSection() {
        return new SquareDragonflySection();
    }

    calcInitPosition(pos: Position, idx: number) {
        return {
            x: pos.x + BOARD_WIDTH + idx * 70,
            y: pos.y,
        };
    }
}
