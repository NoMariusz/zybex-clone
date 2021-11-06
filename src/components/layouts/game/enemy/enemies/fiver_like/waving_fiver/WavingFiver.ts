import { Position, Size } from "../../../../../../interfaces";
import Bullet from "../../../../bullets/Bullet";
import { BOARD_HEIGHT, BOARD_WIDTH } from "../../../../constants";
import Enemy from "../../../Enemy";
import WavingFiverSection from "./WavingFiverSection";

export default class WAvingFiver extends Enemy {
    static sectionCount = 6;

    constructor(
        pos: Position,
        deathCallback: () => void,
        bulletsRef: Bullet[]
    ) {
        super(pos, deathCallback, bulletsRef);
    }

    initSections() {
        for (let i = 0; i < WAvingFiver.sectionCount; i++) {
            const section = new WavingFiverSection(i);
            this.sections.push(section);
        }
    }

    calcInitPosition(pos: Position, idx: number) {
        return {
            x: pos.x + BOARD_WIDTH + idx * 75,
            y: pos.y,
        };
    }
}
