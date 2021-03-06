import { AnimationName } from "../../../../../animating/animationNames";
import {
    BOARD_HEIGHT,
    BOARD_SCROLL_SPEED,
    BOARD_WIDTH,
    WORM_HP,
} from "../../../constants";
import EnemySection from "../../EnemySection";
import Worm from "./Worm";
import { WormPatrs } from "./wormData";
import WormElement from "./WormElement";

export default class WormSection extends EnemySection {
    shotTimerMs: number;

    moveIterator: number;
    index: number;

    constructor(index: number) {
        super();
        this.index = index;
        this.moveIterator = (-index * Math.PI) / 10;
        this.hp = WORM_HP;
        // make element
        const wormPartType = this.getWormPartByI(index);
        this.element = new WormElement(wormPartType);
        // prepare all thing needing element
        this.initAfterElementPresent();
        this.shotTimerMs = 1250;
    }

    getWormPartByI(i: number) {
        switch (i) {
            case 0:
                return WormPatrs.UpperHead;
            case Worm.sectionCount - 1:
                return WormPatrs.LowerHead;
            default:
                return WormPatrs.Body;
        }
    }

    move() {
        this.position = {
            ...this.position,
            x:
                this.position.x -
                Math.sin(this.moveIterator) * 4.5 -
                BOARD_SCROLL_SPEED / 3,
        };
        this.moveIterator += Math.PI / 30;
    }

    playShotSound() {
        /* override parrent function to only middle section can play shot sound
        so that sound shouldn't ovelapping self */
        if (this.index == Math.round(Worm.sectionCount / 2))
            super.playShotSound();
    }
}
