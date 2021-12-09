import { AnimationName } from "../../../../../../animating/animationNames";
import {
    BIRD_WALL_WAIT_TIME,
    BOARD_SCROLL_SPEED,
    BOARD_WIDTH,
} from "../../../../constants";
import EnemySection from "../../../EnemySection";
import BirdElement from "../BirdElement";

enum MovingStatuses {
    InitialStop,
    Moving,
    Waiting,
    Running,
}

export default class BirdWallSection extends EnemySection {
    shotTimerMs: number;
    speed: number;
    moveStatus: MovingStatuses;

    moveTimeout: NodeJS.Timeout;

    constructor() {
        super();
        this.element = new BirdElement();
        this.initAfterElementPresent();

        this.speed = 0;
        this.moveStatus = MovingStatuses.InitialStop;

        this.shotTimerMs = 5000;
    }

    startMoving() {
        this.moveStatus = MovingStatuses.Moving;
        this.speed = BOARD_SCROLL_SPEED * 4;
        this.animator.startAnim(AnimationName.BirdIddle);
    }

    startWaiting() {
        this.moveStatus = MovingStatuses.Waiting;
        this.speed = 0;
        this.moveTimeout = setTimeout(
            () => this.startRunning(),
            BIRD_WALL_WAIT_TIME
        );
    }

    startRunning() {
        this.moveStatus = MovingStatuses.Running;
        this.speed = BOARD_SCROLL_SPEED * 6;
    }

    move() {
        this.position = {
            ...this.position,
            x: this.position.x - this.speed,
        };

        if (
            this.moveStatus == MovingStatuses.Moving &&
            this.position.x <= BOARD_WIDTH - 50
        ) {
            this.startWaiting();
        }
    }

    die() {
        clearTimeout(this.moveTimeout);
        super.die();
        this.animator.endAnim(AnimationName.BirdIddle);
    }
}
