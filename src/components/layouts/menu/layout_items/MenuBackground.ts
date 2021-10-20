import { CANVAS_HEIGHT, CANVAS_WIDTH } from "../../../../constants";
import { CanvasElement } from "../../../rendering/interfaces";

export default class MenuBackground implements CanvasElement {
    position = {
        x: 0,
        y: 0,
    };

    texture_offset = {
        x: 0,
        y: 0,
    };

    size = {
        width: CANVAS_WIDTH,
        height: CANVAS_HEIGHT,
    };

    texture = "menu_sprite";

    flip = false;

    changeTexture(pageNumber: number) {
        this.texture_offset.y = pageNumber * CANVAS_HEIGHT;
    }
}
