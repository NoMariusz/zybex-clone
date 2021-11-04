import { Position } from "../../../../../interfaces";
import { CanvasElement } from "../../../../../rendering/interfaces";
import { WormPatrs, WORM_PART_TO_TETURE_OFFSET } from "./wormData";

export default class CoinElement implements CanvasElement {
  position: Position;
  texture_offset = {
    x: 375,
    y: 600,
  };
  size = {
    width: 64,
    height: 71,
  };
  texture = "game_sprite";

  constructor(part: WormPatrs){
      this.texture_offset = WORM_PART_TO_TETURE_OFFSET[part]
  }
}
