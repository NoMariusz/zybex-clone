import { Position, Size } from "../../../interfaces";
import CanvasElement from "../../../rendering/CanvasElement";

export default class BulletElement extends CanvasElement {
    position: Position;
    texture_offset: Position;
    size: Size;
}
