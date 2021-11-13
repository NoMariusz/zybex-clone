import { Position } from "../../../../../../interfaces";
import Bullet from "../../../../bullets/Bullet";
import { BOARD_WIDTH } from "../../../../constants";
import Player from "../../../../player/Player";
import Enemy from "../../../Enemy";
import TargetedBirdSection from "./TargetedBirdSection";

const moveOffsets = [1000, 200, 600, 0, 400, 800];

export default class TargetedBird extends Enemy {
    static sectionCount = 6;

    initSections() {
        for (let i = 0; i < TargetedBird.sectionCount; i++) {
            if (this.player == undefined)
                throw new Error("Player reference is undefined");

            const section = new TargetedBirdSection(this.player);
            this.sections.push(section);
        }
    }

    calcInitPosition(pos: Position, idx: number) {
        return {
            x: pos.x + BOARD_WIDTH + moveOffsets[idx] / 2,
            y: pos.y + idx * 70,
        };
    }
}
