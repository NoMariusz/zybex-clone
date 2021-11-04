import { Position } from "../../../../../../interfaces";
import { AnimationName } from "../../../../animations/animationNames";
import {
    BOARD_HEIGHT,
    BOARD_SCROLL_SPEED,
    BOARD_WIDTH,
} from "../../../../constants";
import EnemySection from "../../../EnemySection";
import DragonFlyElement from "../DragonflyElement";

export default class SquareDragonflySection extends EnemySection {
    shotTimerMs: number;

    stage: number;
    static stageToVelocity: Position[] = [
        { x: -1, y: 0 },
        { x: 0, y: 1 },
        { x: -1, y: 0 },
        { x: 0, y: -1 },
        { x: -1, y: 0 },
        { x: 0, y: 1 },
        { x: -1, y: 0 },
    ];
    static speed = BOARD_SCROLL_SPEED * 4;

    velocity: Position;

    constructor() {
        super();
        this.stage = 0;
        this.loadVelocity();
        // prepare element and make element needed stuff
        this.element = new DragonFlyElement();
        this.initAfterElementPresent();
    }

    move() {
        this.position = {
            y: this.position.y + this.velocity.y * SquareDragonflySection.speed,
            x: this.position.x + this.velocity.x * SquareDragonflySection.speed,
        };
        this.checkStage();
    }

    checkStage() {
        if (
            (this.stage == 0 && this.position.x <= (BOARD_WIDTH * 7) / 8) ||
            (this.stage == 1 && this.position.y >= (BOARD_HEIGHT * 8) / 9) ||
            (this.stage == 2 && this.position.x <= (BOARD_WIDTH * 6) / 8) ||
            (this.stage == 3 && this.position.y <= BOARD_HEIGHT / 9) ||
            (this.stage == 4 && this.position.x <= (BOARD_WIDTH * 5) / 8) ||
            (this.stage == 5 && this.position.y >= BOARD_HEIGHT / 3)
        ) {
            this.stage++;
            this.loadVelocity();
        }
    }

    loadVelocity() {
        this.velocity = SquareDragonflySection.stageToVelocity[this.stage];
    }

    die() {
        super.die();
        this.animator.endAnim(AnimationName.DragonflyIddle);
    }
}
