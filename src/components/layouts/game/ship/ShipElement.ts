import CanvasElement from "../../../rendering/CavnasElement";
import { TextureSpriteSheets } from "../../../rendering/constants";

export default class ShipElement extends CanvasElement {
    texture_offset = {
        x: 150,
        y: 600,
    };

    position = {
        x: 0,
        y: 0,
    };

    size = {
        width: 130,
        height: 84,
    };
}
