import { Focusable } from "../../../../interfaces";
import SinglePlayerIco from "./SinglePlayerIco";

export default class MultiPlayerIco
    extends SinglePlayerIco
    implements Focusable
{
    texture_offset = {
        x: 1261,
        y: 600,
    };

    isSelected = false;

    endFocus() {
        this.texture_offset.y = this.isSelected ? 700 : 600;
    }

    changeFocus(value: boolean) {
        this.texture_offset.y = value ? 700 : 600;
    }
}
