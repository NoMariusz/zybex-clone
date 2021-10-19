import { Focusable } from "../../../interfaces";
import { AVATAR_COLORS } from "../constants";
import BottomPanelEl from "./BottomPanelEl";

export default class PlayerAvatar extends BottomPanelEl implements Focusable {
    texture_offset = {
        x: 1261,
        y: AVATAR_COLORS.red,
    };

    lastColor: number = AVATAR_COLORS.red;

    size = {
        width: 67,
        height: 70,
    };

    changeFocus(value: boolean) {
        this.texture_offset.y = value ? AVATAR_COLORS.white : this.lastColor;
    }

    startFocus(){}
    endFocus(){}

    changeColor(color: AVATAR_COLORS) {
        this.texture_offset.y = color;
        this.lastColor = color;
    }
}
