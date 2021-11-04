import { Position } from "../../../../../../interfaces";
import { AnimationName } from "../../../../animations/animationNames";
import Bullet from "../../../../bullets/Bullet";
import { BOARD_WIDTH } from "../../../../constants";
import Enemy from "../../../Enemy";
import SquareDragonflySection from "./SquareDragonflySection";

export default class SquareDragonfly extends Enemy {
    static sectionCount = 6;

    constructor(
        pos: Position,
        deathCallback: () => void,
        bulletsRef: Bullet[]
    ) {
        super(pos, deathCallback, bulletsRef);
    }

    initSections() {
        for (let i = 0; i < SquareDragonfly.sectionCount; i++) {
            const section = new SquareDragonflySection();
            this.sections.push(section);

            this.makeSafeTimeout(() => {
                section.animator.startAnim(AnimationName.DragonflyIddle);
            }, i * 100);
        }
    }

    calcInitPosition(pos: Position, idx: number) {
        return {
            x: pos.x + BOARD_WIDTH + idx * 70,
            y: pos.y,
        };
    }
}
