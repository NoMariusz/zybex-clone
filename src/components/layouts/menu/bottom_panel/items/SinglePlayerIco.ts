import { Focusable } from "../../../../interfaces";
import {
    SELECTED_SINGLE_PLAYER_ICO_Y,
    SINGLE_PLAYER_ICO_Y,
} from "../../constants";
import BottomPanelEl from "./BottomPanelElement";

export default class SinglePlayerIco
    extends BottomPanelEl
    implements Focusable
{
    texture_offset = {
        x: 1261,
        y: SELECTED_SINGLE_PLAYER_ICO_Y,
    };

    size = {
        width: 70,
        height: 60,
    };

    isSelected = true;

    select() {
        this.isSelected = true;
        this.endFocus();
    }

    unselect() {
        this.isSelected = false;
        this.endFocus();
    }

    startFocus() {}
    endFocus() {
        this.texture_offset.y = this.isSelected
            ? SELECTED_SINGLE_PLAYER_ICO_Y
            : SINGLE_PLAYER_ICO_Y;
    }

    changeFocus(value: boolean) {
        this.texture_offset.y = value
            ? SELECTED_SINGLE_PLAYER_ICO_Y
            : SINGLE_PLAYER_ICO_Y;
    }
}
