import { CanvasElement } from "../../../rendering/interfaces";
import { BOTTOM_PANEL_Y } from "../constants";

export default class BottomPanelEl implements CanvasElement {
    position = {
        x: 0,
        y: BOTTOM_PANEL_Y,
    };

    texture_offset = {
        x: 0,
        y: 0,
    };

    size = {
        width: 0,
        height: 0,
    };

    texture = "menu_sprite";
}
