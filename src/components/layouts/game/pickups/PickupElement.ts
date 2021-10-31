import { Position, Size } from "../../../interfaces";
import { CanvasElement } from "../../../rendering/interfaces";

export default class PickupElement implements CanvasElement {
  position: Position = { x: 0, y: 0 };
  texture_offset: Position = { x: 0, y: 0 };
  size: Size = { width: 0, height: 0 };
  texture = "game_sprite";
}
