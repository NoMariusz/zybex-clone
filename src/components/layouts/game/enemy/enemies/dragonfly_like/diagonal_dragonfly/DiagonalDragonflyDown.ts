import { Position, Size } from "../../../../../../interfaces";
import { AnimationName } from "../../../../animations/animationNames";
import Bullet from "../../../../bullets/Bullet";
import { BulletType } from "../../../../bullets/bulletsData";
import { BOARD_WIDTH } from "../../../../constants";
import Enemy from "../../../Enemy";
import DiagonalDragonflySection from "./DiagonalDragonflySection";
import DiagonalDragonflyUp from "./DiagonalDragonflyUp";

interface ShotData {
    timeOffset: number;
    bulletType: BulletType;
}

export default class DiagonalDragonflyDown extends DiagonalDragonflyUp {
    makeSection() {
        return new DiagonalDragonflySection(1);
    }

    calcInitPosition(pos: Position, idx: number) {
        return {
            x: pos.x + BOARD_WIDTH + idx * 70,
            y: pos.y - idx * 15,
        };
    }
}
