import { Position } from "../../interfaces";
import AvatarElement from "../../layouts/game/player/AvatarElement";
import { AnimationName } from "../animationNames";
import FrameAnimation from "../utils/FrameAnimation";

export default class DeathAnimation extends FrameAnimation {
    name = AnimationName.PlayerDeath;

    tickIntervalTime = 200;

    textures: Position[] = [
        {
            x: 600,
            y: 500,
        },
        {
            x: 700,
            y: 500,
        },
        {
            x: 800,
            y: 500,
        },
        {
            x: 900,
            y: 500,
        },
        {
            x: 1000,
            y: 500,
        },
        {
            x: 1100,
            y: 500,
        },
        {
            x: 1200,
            y: 500,
        },
    ];

    tick() {
        if (this.actualTextureIdx >= this.textures.length) {
            return;
        }
        const tex = this.textures[this.actualTextureIdx];
        this.element.texture_offset = tex;
        this.actualTextureIdx++;
    }

    end() {
        (this.element as AvatarElement).loadBaseColor();
    }
}
