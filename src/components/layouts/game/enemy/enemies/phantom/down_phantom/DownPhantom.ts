import { Position, Size } from "../../../../../../interfaces";
import Bullet from "../../../../bullets/Bullet";
import { BOARD_HEIGHT, BOARD_WIDTH } from "../../../../constants";
import Enemy from "../../../Enemy";
import PhantomSection from "./DownPhantomSection";

export default class DownPhantom extends Enemy {
    static sectionCount = 6;

    constructor(
        pos: Position,
        deathCallback: () => void,
        bulletsRef: Bullet[]
    ) {
        super(pos, deathCallback, bulletsRef);
    }

    initSections() {
        for (let i = 0; i < DownPhantom.sectionCount; i++) {
            const section = new PhantomSection(i);
            this.sections.push(section);
        }
    }

    calcInitPosition(pos: Position, idx: number) {
        return {
            x: BOARD_WIDTH / 8 + idx * 68,
            y: BOARD_HEIGHT / 10,
        };
    }
}
