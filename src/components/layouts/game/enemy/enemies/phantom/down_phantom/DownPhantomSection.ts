import { Position } from "../../../../../../interfaces";
import { AnimationName } from "../../../../../../animating/animationNames";
import EnemySection from "../../../EnemySection";
import PhantomElement from "../PhantomElement";

export default class DownPhantomSection extends EnemySection {
    shotTimerMs: number;
    static speed = 10;

    moveStageIterator: number;
    velocity: Position;
    moving: boolean;

    constructor(index: number) {
        super();
        this.element = new PhantomElement();
        this.initAfterElementPresent();
        this.velocity = { y: 0, x: 0 };

        this.moveStageIterator = 0;
        this.moving = false;

        this.makeSafeTimeout(() => {
            this.startMoving();
        }, Math.abs(index - 6) * 200 + 500);

        this.makeSafeTimeout(() => {
            this.animator.startAnim(AnimationName.PhantomIddle);
        }, Math.abs(index - 6) * 50);
    }

    move() {
        this.position = {
            y: this.position.y + this.velocity.y * DownPhantomSection.speed,
            x: this.position.x + this.velocity.x * DownPhantomSection.speed,
        };
        if (this.moving) this.moveStageIterator += 1;
        this.modifyMove();
    }

    startMoving() {
        this.velocity = { y: 1, x: 0 };
        this.moving = true;
    }

    modifyMove() {
        if (this.moveStageIterator >= 5) {
            this.moveStageIterator = 0;
            this.changeVelocity();
        }
    }

    changeVelocity() {
        if (this.velocity.y == 0) {
            this.velocity = {
                y: 1,
                x: 0,
            };
        } else {
            this.velocity = {
                y: 0,
                x: 1,
            };
        }
    }
}
