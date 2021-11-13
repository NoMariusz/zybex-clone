import { Position, Size } from "../../../../../interfaces";
import Bullet from "../../../bullets/Bullet";
import { BOARD_WIDTH } from "../../../constants";
import Enemy from "../../Enemy";
import ButterflySection from "./ButterflySection";

export default class Butterfly extends Enemy {
    static sectionCount = 6;

    initSections() {
        for (let i = 0; i < Butterfly.sectionCount; i++) {
            const section = new ButterflySection(i);
            this.sections.push(section);
        }
    }

    calcInitPosition(pos: Position, idx: number) {
        return {
            x: pos.x + BOARD_WIDTH + (idx % 3) * 75,
            y: pos.y + Math.floor(idx / 3) * 100,
        };
    }
}
