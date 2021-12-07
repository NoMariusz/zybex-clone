import { Position, Size } from "../../../../../../interfaces";
import { AnimationName } from "../../../../../../animations/animationNames";
import Bullet from "../../../../bullets/Bullet";
import { BulletType } from "../../../../bullets/bulletsData";
import { BOARD_WIDTH } from "../../../../constants";
import Enemy from "../../../Enemy";
import DiagonalDragonflySection from "./DiagonalDragonflySection";

interface ShotData {
    timeOffset: number;
    bulletType: BulletType;
}

export default class DiagonalDragonflyUp extends Enemy {
    static sectionCount = 6;

    static shotData: { [index: number]: ShotData } = {
        [0]: {
            timeOffset: 1100,
            bulletType: BulletType.EnemyDown,
        },
        [1]: {
            timeOffset: 1350,
            bulletType: BulletType.EnemyUp,
        },
        [5]: {
            timeOffset: 1450,
            bulletType: BulletType.EnemyUp,
        },
    };

    initSections() {
        for (let i = 0; i < DiagonalDragonflyUp.sectionCount; i++) {
            const section = this.makeSection();
            this.sections.push(section);

            this.loadShotData(i, section);

            this.makeSafeTimeout(() => {
                section.animator.startAnim(AnimationName.DragonflyIddle);
            }, i * 100);
        }
    }

    loadShotData(idx: number, section: DiagonalDragonflySection) {
        const shotData = DiagonalDragonflyUp.shotData[idx];
        if (!shotData) return;

        section.bulletType = shotData.bulletType;
        this.makeSafeTimeout(() => {
            section.startShotTimer();
        }, shotData.timeOffset);
    }

    makeSection() {
        return new DiagonalDragonflySection(-1);
    }

    calcInitPosition(pos: Position, idx: number) {
        return {
            x: pos.x + BOARD_WIDTH + idx * 70,
            y: pos.y + idx * 15,
        };
    }
}
