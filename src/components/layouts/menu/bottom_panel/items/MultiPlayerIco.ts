import { Focusable } from "../../../../interfaces";
import {
    MULTI_PLAYER_ICO_Y,
    SELECTED_MULTI_PLAYER_ICO_Y,
} from "../../constants";
import SinglePlayerIco from "./SinglePlayerIco";

export default class MultiPlayerIco
    extends SinglePlayerIco
    implements Focusable
{
    texture_offset = {
        x: 1261,
        y: MULTI_PLAYER_ICO_Y,
    };

    isSelected = false;

    endFocus() {
        this.texture_offset.y = this.isSelected
            ? SELECTED_MULTI_PLAYER_ICO_Y
            : MULTI_PLAYER_ICO_Y;
    }

    changeFocus(value: boolean) {
        this.texture_offset.y = value
            ? SELECTED_MULTI_PLAYER_ICO_Y
            : MULTI_PLAYER_ICO_Y;
    }
}
