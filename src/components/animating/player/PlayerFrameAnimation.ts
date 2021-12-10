import AvatarElement from "../../layouts/game/player/AvatarElement";
import FrameAnimation from "../utils/FrameAnimation";

export default abstract class PlayerFrameAnimation extends FrameAnimation {
    abstract texturesX: number[];

    get textures() {
        return this.texturesX.map((e) => ({
            ...this.element.texture_offset,
            x: e,
        }));
    }

    end() {
        (this.element as AvatarElement).loadBaseColor();
    }
}
