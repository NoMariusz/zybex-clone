import { Focusable } from "../../../../interfaces";
import { FOCUSED_START_ICO_Y, START_ICO_Y } from "../../constants";
import BottomPanelEl from "./BottomPanelElement";

export default class StartIco extends BottomPanelEl implements Focusable {
    texture_offset = {
        x: 1261,
        y: START_ICO_Y,
    };

    size = {
        width: 75,
        height: 60,
    };

    startFocus() {
        this.texture_offset.y = FOCUSED_START_ICO_Y;
    }
    endFocus() {
        this.texture_offset.y = START_ICO_Y;
    }

    changeFocus(value: boolean) {}
}
