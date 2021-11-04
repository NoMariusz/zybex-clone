import { Position, Size } from "../../../../../interfaces";
import Bullet from "../../../bullets/Bullet";
import { BOARD_WIDTH } from "../../../constants";
import Enemy from "../../Enemy";
import WormSection from "./WormSection";

export default class Worm extends Enemy {
    static sectionCount = 6;

    constructor(
        pos: Position,
        deathCallback: () => void,
        bulletsRef: Bullet[]
    ) {
        super(pos, deathCallback, bulletsRef);
    }

    initSections() {
        for (let i = 0; i < Worm.sectionCount; i++) {
            const section = new WormSection(i);
            this.sections.push(section);

            setTimeout(() => {
                section.startShotTimer();
              }, 500);
        }
    }

    calcInitPosition(pos: Position, idx: number) {
        return {
            x: pos.x + BOARD_WIDTH,
            y: pos.y + idx * 50,
        };
    }
}
