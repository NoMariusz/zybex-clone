import { Position, Size } from "../interfaces";
import { TextureSpriteSheets } from "./constants";

export default abstract class CanvasElement {
    abstract position: Position;
    abstract texture_offset: Position;
    abstract size: Size;

    texture = TextureSpriteSheets.Main;

    flip: boolean = false;
    texture_size: Size | undefined;
}
