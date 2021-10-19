import { CanvasElement } from "../../../rendering/interfaces";
import BottomPanelEl from "./BottomPanelEl";

export default class StartIco extends BottomPanelEl {

    texture_offset = {
        x: 1261,
        y: 800,
    };

    size = {
        width: 75,
        height: 60,
    };

    changeFocus(value: boolean) {
        this.texture_offset.y = value ? 900 : 800;
    }
}
