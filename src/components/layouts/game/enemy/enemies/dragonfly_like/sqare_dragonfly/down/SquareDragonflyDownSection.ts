import { Position } from "../../../../../../../interfaces";
import { BOARD_HEIGHT, BOARD_WIDTH } from "../../../../../constants";
import SquareDragonflyUpSection from "../up/SquareDragonflyUpSection";

export default class SquareDragonflyDownSection extends SquareDragonflyUpSection {
    static stageToVelocity: Position[] = [
        { x: -1, y: 0 },
        { x: 0, y: -1 },
        { x: -1, y: 0 },
        { x: 0, y: 1 },
        { x: -1, y: 0 },
        { x: 0, y: -1 },
        { x: -1, y: 0 },
    ];

    checkStage() {
        if (
            (this.stage == 0 && this.position.x <= (BOARD_WIDTH * 7) / 8) ||
            (this.stage == 1 && this.position.y <= BOARD_HEIGHT / 9) ||
            (this.stage == 2 && this.position.x <= (BOARD_WIDTH * 6) / 8) ||
            (this.stage == 3 && this.position.y >= (BOARD_HEIGHT * 8) / 9) ||
            (this.stage == 4 && this.position.x <= (BOARD_WIDTH * 5) / 8) ||
            (this.stage == 5 && this.position.y <= (BOARD_HEIGHT * 2) / 3)
        ) {
            this.stage++;
            this.loadVelocity();
        }
    }

    loadVelocity() {
        this.velocity = SquareDragonflyDownSection.stageToVelocity[this.stage];
    }
}
