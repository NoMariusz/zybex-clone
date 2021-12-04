import { Position } from "../../../../../interfaces";
import CanvasElement from "../../../../../rendering/CavnasElement";
import { TextureSpriteSheets } from "../../../../../rendering/constants";

export default class FiverElement extends CanvasElement {
    position: Position;
    texture_offset = {
        x: 825,
        y: 800,
    };
    size = {
        width: 66,
        height: 74,
    };
}
