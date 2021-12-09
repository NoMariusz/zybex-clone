import { AnimationName } from "../../../../../../animating/animationNames";
import { BulletType } from "../../../../bullets/bulletsData";
import { BOARD_SCROLL_SPEED } from "../../../../constants";
import EnemySection from "../../../EnemySection";
import DragonFlyElement from "../DragonflyElement";

export default class DiagonalDragonflySection extends EnemySection {
    shotTimerMs: number;
    velocityY: number;
    bulletType: BulletType = BulletType.Enemy;

    constructor(velocityY: number) {
        super();

        this.velocityY = velocityY;
        this.shotTimerMs = 5000;

        // prepare element and make element needed stuff
        this.element = new DragonFlyElement();
        this.initAfterElementPresent();
    }

    makeBullet() {
        return this.bulletFactory.makeBullet(this.bulletType);
    }

    move() {
        this.position = {
            y: this.position.y + this.velocityY * 2,
            x: this.position.x - BOARD_SCROLL_SPEED * 5,
        };
    }

    die() {
        super.die();
        this.animator.endAnim(AnimationName.DragonflyIddle);
    }
}
