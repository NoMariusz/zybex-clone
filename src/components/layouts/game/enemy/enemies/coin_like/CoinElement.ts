import { Position } from "../../../../../interfaces";
import CanvasElement from "../../../../../rendering/CanvasElement";

export default class CoinElement extends CanvasElement {
    position: Position;
    texture_offset = {
        x: 0,
        y: 700,
    };
    size = {
        width: 75,
        height: 75,
    };
}
