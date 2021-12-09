import { Position } from "../../interfaces";
import { AnimationName } from "../animationNames";
import FrameAnimation from "../utils/FrameAnimation";

export default class EnemyDeathAnimation extends FrameAnimation {
    name = AnimationName.EnemyDeath;

    tickIntervalTime = 150;

    textures: Position[] = Array(5)
        .fill(null)
        .map((e, i) => ({ x: 75 * i, y: 800 }));

    tick() {
        if (this.actualTextureIdx >= this.textures.length) {
            this.actualTextureIdx = 0;
            return;
        }
        const tex = this.textures[this.actualTextureIdx];
        this.element.texture_offset = tex;
        this.actualTextureIdx++;
    }

    end() {
        this.element.texture_offset = { x: -100, y: -100 };
    }
}
