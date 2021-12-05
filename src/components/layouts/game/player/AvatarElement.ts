import { AVATAR_COLORS, CANVAS_HEIGHT } from "../../../../constants";
import store from "../../store";
import { COLOR_TO_GAME_AVATAR_Y } from "../constants";
import { PlayerFrames } from "./playerFrames";
import { TextureSpriteSheets } from "../../../rendering/constants";
import CanvasElement from "../../../rendering/CanvasElement";

export default class AvatarElement extends CanvasElement {
    texture_offset = {
        x: PlayerFrames.Base,
        y: AVATAR_COLORS.red,
    };

    position = {
        x: 0,
        y: CANVAS_HEIGHT / 2,
    };

    size = {
        width: 65,
        height: 67,
    };

    texture = TextureSpriteSheets.Main;

    loadColor() {
        // load avatar color from store
        this.texture_offset.y = COLOR_TO_GAME_AVATAR_Y[store.avatarColor];
    }
}
