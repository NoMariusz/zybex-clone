import { COLOR_TO_GAME_AVATAR_Y } from "../../layouts/game/constants";
import store from "../../layouts/store";
import FrameAnimation from "../FrameAnimation";

export default abstract class PlayerFrameAnimation extends FrameAnimation {
    abstract texturesX: number[];

    get textures() {
        return this.texturesX.map((e) => ({
            x: e,
            y: COLOR_TO_GAME_AVATAR_Y[store.avatarColor],
        }));
    }
}
