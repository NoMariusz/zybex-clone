import { Position } from "../../../../../../interfaces";
import Bullet from "../../../../bullets/Bullet";
import { BOARD_WIDTH } from "../../../../constants";
import Enemy from "../../../Enemy";
import BirdWallSection from "./BirdWallSection";

const moveOffsets = [1000, 200, 600, 0, 400, 800];

export default class BirdWall extends Enemy {
    static sectionCount = 6;

    constructor(
        pos: Position,
        deathCallback: () => void,
        bulletsRef: Bullet[]
    ) {
        super(pos, deathCallback, bulletsRef);
    }

    initSections() {
        for (let i = 0; i < BirdWall.sectionCount; i++) {
            const section = new BirdWallSection();
            this.sections.push(section);

            this.makeSafeTimeout(() => {
                section.startMoving();
            }, moveOffsets[i]);
            this.makeSafeTimeout(() => {
                section.startShotTimer();
            }, moveOffsets[i] * 3);
        }
    }

    calcInitPosition(pos: Position, idx: number) {
        return {
            x: pos.x + BOARD_WIDTH,
            y: pos.y + idx * 70,
        };
    }
}
