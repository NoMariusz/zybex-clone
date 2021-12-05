import { Position, Size } from "../../../interfaces";
import CanvasElement from "../../../rendering/CanvasElement";
import { TextureSpriteSheets } from "../../../rendering/constants";

export default class PickupElement extends CanvasElement {
    position: Position = { x: 0, y: 0 };
    texture_offset: Position = { x: 0, y: 0 };
    size: Size = { width: 0, height: 0 };
}
