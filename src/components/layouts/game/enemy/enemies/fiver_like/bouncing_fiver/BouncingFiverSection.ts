import { AnimationName } from "../../../../../../animations/animationNames";
import { BulletType } from "../../../../bullets/bulletsData";
import {
    BOARD_HEIGHT,
    BOARD_SCROLL_SPEED,
    BOARD_WIDTH,
} from "../../../../constants";
import EnemySection from "../../../EnemySection";
import { DoubleRowEnemyParts } from "../../../utils";
import FiverElement from "../FiverElement";

export default class BouncingFiverSection extends EnemySection {
    shotTimerMs = 1000;
    moveIterator: number;
    moveIteratorX: number;

    part: DoubleRowEnemyParts;
    bulletType: BulletType;

    constructor(index: number) {
        super();
        this.element = new FiverElement();
        this.initAfterElementPresent();

        this.part =
            index >= 3 ? DoubleRowEnemyParts.Up : DoubleRowEnemyParts.Down;
        this.bulletType =
            this.part == DoubleRowEnemyParts.Up
                ? BulletType.EnemyUp
                : BulletType.EnemyDown;

        this.moveIterator = (Math.PI / 6) * (index % 3);
        this.moveIteratorX = this.moveIterator;

        this.animator.startAnim(AnimationName.FiverIddle);
        this.makeSafeTimeout(() => {
            this.startShotTimer();
        }, (index % 3 == 0 ? 1 : 0) * 150 + 500);
    }

    move() {
        this.position = {
            y: this.calcYPosition(),
            x: this.calcXPosition(),
        };
        this.moveIterator += Math.PI / 60;
        this.moveIteratorX += Math.PI / 60;
    }

    calcYPosition() {
        return (
            (Math.pow(Math.sin(this.moveIterator / 2 + Math.PI / 4), 4) - 1) *
                (this.part == DoubleRowEnemyParts.Up ? -2 : 2) *
                (BOARD_HEIGHT / 6) +
            BOARD_HEIGHT / 2
        );
    }
    calcXPosition() {
        return (
            this.position.x -
            BOARD_SCROLL_SPEED *
                (Math.abs(
                    Math.sin((this.moveIteratorX * 1) / 2 + Math.PI / 4)
                ) +
                    1)
        );
    }

    die() {
        super.die();
        this.animator.endAnim(AnimationName.FiverIddle);
    }

    makeBullet() {
        return this.bulletFactory.makeBullet(this.bulletType);
    }
}
