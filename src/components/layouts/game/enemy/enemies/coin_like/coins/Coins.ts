import { Position, Size } from "../../../../../../interfaces";
import Bullet from "../../../../bullets/Bullet";
import { BOARD_WIDTH } from "../../../../constants";
import Enemy from "../../../Enemy";
import CoinSection from "./CoinSection";

const shotOffsets = [0, 600, 900, 1100, 1200, 1400];
const initPositions: Position[] = [
    { x: 0, y: 30 },
    { x: 75, y: 120 },
    { x: 140, y: 80 },
    { x: 195, y: 180 },
    { x: 210, y: 0 },
    { x: 270, y: 110 },
];

export default class Coin extends Enemy {
    static sectionCount = 6;

    initSections() {
        for (let i = 0; i < Coin.sectionCount; i++) {
            const section = new CoinSection();
            this.sections.push(section);

            setTimeout(() => {
                section.startShotTimer();
            }, shotOffsets[i]);
        }
    }

    calcInitPosition(pos: Position, idx: number) {
        return {
            x: pos.x + BOARD_WIDTH + initPositions[idx].x,
            y: pos.y + initPositions[idx].y,
        };
    }
}
