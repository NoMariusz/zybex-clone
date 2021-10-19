import { Focusable } from "../../../interfaces";
import BottomPanelEl from "./BottomPanelEl";

export default class SinglePlayerIco extends BottomPanelEl implements Focusable {
    texture_offset = {
        x: 1261,
        y: 500,
    };

    size = {
        width: 70,
        height: 60,
    };

    isSelected = true;

    select(){
        this.isSelected = true;
        this.endFocus();
    }

    unselect(){
        this.isSelected = false;
        this.endFocus();
    }

    startFocus(){}
    endFocus(){
        this.texture_offset.y = this.isSelected  ? 500 : 400;
    }

    changeFocus(value: boolean) {
        this.texture_offset.y = value ? 500 : 400;
    }
}
