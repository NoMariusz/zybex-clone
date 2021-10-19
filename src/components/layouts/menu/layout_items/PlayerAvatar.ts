import { CANVAS_HEIGHT, CANVAS_WIDTH } from "../../../../constants";
import { CanvasElement } from "../../../rendering/interfaces";
import { AVATAR_COLORS } from "../constants";
import BottomPanelEl from "./BottomPanelEl";

export default class PlayerAvatar extends BottomPanelEl {
    texture_offset = {
        x: 1261,
        y: AVATAR_COLORS.red,
    };

    size = {
        width: 67,
        height: 70,
    };

    changeColor(color: AVATAR_COLORS) {
        this.texture_offset.y = color;
    }
}
