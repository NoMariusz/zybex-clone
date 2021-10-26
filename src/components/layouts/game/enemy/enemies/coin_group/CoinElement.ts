import { Position } from "../../../../../interfaces";
import { CanvasElement } from "../../../../../rendering/interfaces";

export default class CoinElement implements CanvasElement {
  position: Position;
  texture_offset = {
    x: 0,
    y: 700,
  };
  size = {
    width: 75,
    height: 75,
  };
  texture = "game_sprite";
}
