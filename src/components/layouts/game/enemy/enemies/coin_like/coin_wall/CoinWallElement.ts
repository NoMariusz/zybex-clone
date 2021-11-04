import { Position } from "../../../../../../interfaces";
import { CanvasElement } from "../../../../../../rendering/interfaces";

const stageToTexture = [
  { x: 0, y: 700 },
  { x: 75, y: 700 },
  { x: 150, y: 700 },
  { x: 225, y: 700 },
  { x: 300, y: 700 },
  { x: 450, y: 700 },
];

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

  changeStage(stage: number) {
    this.texture_offset = stageToTexture[stage];
  }
}
