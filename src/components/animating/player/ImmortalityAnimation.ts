import { AVATAR_COLORS } from "../../../constants";
import { Position } from "../../interfaces";
import { COLOR_TO_GAME_AVATAR_Y } from "../../layouts/game/constants";
import AvatarElement from "../../layouts/game/player/AvatarElement";
import { PlayerFrames } from "../../layouts/game/player/playerFrames";
import PlayerAvatar from "../../layouts/menu/bottom_panel/items/PlayerAvatar";
import store from "../../layouts/store";
import CanvasElement from "../../rendering/CanvasElement";
import Animation from "../Animation";
import { AnimationName } from "../animationNames";

export default class ImmortalityAnimation implements Animation {
    active = false;
    name = AnimationName.Immortality;

    tickIntervalTime = 100;
    interval: NodeJS.Timer;

    element: CanvasElement;

    colorQueue = [AVATAR_COLORS.red, AVATAR_COLORS.green, AVATAR_COLORS.blue];
    xQueue = [PlayerFrames.Base, PlayerFrames.Iddle2];
    animationIdx = 0;

    constructor(element: CanvasElement) {
        this.element = element;
    }

    start() {
        this.animationIdx = 0;
    }

    end() {
        this.element.texture_offset = {
            ...this.element.texture_offset,
            x: PlayerFrames.Base,
        };
        (this.element as AvatarElement).loadBaseColor();
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
