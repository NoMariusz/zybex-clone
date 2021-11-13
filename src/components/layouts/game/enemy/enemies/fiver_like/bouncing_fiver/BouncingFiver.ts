import { Position, Size } from "../../../../../../interfaces";
import Bullet from "../../../../bullets/Bullet";
import { BOARD_HEIGHT, BOARD_WIDTH } from "../../../../constants";
import Enemy from "../../../Enemy";
import BouncingFiverSection from "./BouncingFiverSection";

export default class BouncingFiver extends Enemy {
    static sectionCount = 6;

    initSections() {
        for (let i = 0; i < BouncingFiver.sectionCount; i++) {
            const section = new BouncingFiverSection(i);
            this.sections.push(section);
        }
    }

    calcInitPosition(pos: Position, idx: number) {
        return {
            x: pos.x + BOARD_WIDTH + (idx % 3) * 75,
            y: pos.y,
        };
    }
}
