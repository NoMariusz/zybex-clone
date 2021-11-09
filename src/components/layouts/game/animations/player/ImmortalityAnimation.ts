import { Position } from "../../../../interfaces";
import { CanvasElement } from "../../../../rendering/interfaces";
import { AVATAR_COLORS } from "../../../../../constants";
import Animation from "../Animation";
import { AnimationName } from "../animationNames";
import store from "../../../store";
import { COLOR_TO_GAME_AVATAR_Y } from "../../constants";
import { PlayerFrames } from "../../player/playerFrames";

export default class ImmortalityAnimation implements Animation {
    active = false;
    name = AnimationName.Immortality;

    tickIntervalTime = 100;
    interval: NodeJS.Timer;

    element: CanvasElement;
    baseTexture: Position;

    colorQueue = [AVATAR_COLORS.red, AVATAR_COLORS.green, AVATAR_COLORS.blue];
    xQueue = [PlayerFrames.Base, PlayerFrames.Iddle2];
    animationIdx = 0;

    constructor(element: CanvasElement) {
        this.element = element;
    }

    start() {
        this.baseTexture = this.element.texture_offset;
        this.animationIdx = 0;
    }

    end() {
        this.element.texture_offset = {
            x: PlayerFrames.Base,
            y: COLOR_TO_GAME_AVATAR_Y[store.avatarColor],
        };
    }

    tick() {
        const x = this.xQueue[this.animationIdx % 2];
        const y = this.colorQueue[Math.floor(this.animationIdx / 2)];
        this.element.texture_offset = {
            x: x,
            y: y,
        };
        this.animationIdx++;
        if (this.animationIdx >= this.colorQueue.length * this.xQueue.length) {
            this.animationIdx = 0;
        }
    }
}
