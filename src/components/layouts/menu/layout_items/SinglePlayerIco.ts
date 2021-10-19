import { Focusable } from "../../../interfaces";
import BottomPanelEl from "./BottomPanelEl";

export default class SinglePlayerIco extends BottomPanelEl implements Focusable {
    texture_offset = {
        x: 1261,
        y: 400,
    };

    size = {
        width: 70,
        height: 60,
    };

    startFocus(){}
    endFocus(){}

    changeFocus(value: boolean) {
        this.texture_offset.y = value ? 500 : 400;
    }
}
