import { Position, Size } from "../../../interfaces";
import { CanvasElement } from "../../../rendering/interfaces";

export default class BulletElement implements CanvasElement {
  position: Position;
  texture_offset: Position;
  size: Size;
  texture = "game_sprite";
}
