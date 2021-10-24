import { Focusable, Position } from "../../../interfaces";
import { CanvasElement } from "../../../rendering/interfaces";
import {
  BOARD_HEIGHT,
  BOARD_Y,
  BOTTOM_UI_POS_Y,
  NUMBER_OFF,
} from "../constants";

export default class NumberElement implements CanvasElement {
  texture_offset = NUMBER_OFF[0];

  position = {
    x: 0,
    y: BOTTOM_UI_POS_Y,
  };

  size = {
    width: 35,
    height: 35,
  };

  texture = "game_sprite";

  changeNum(number: number) {
    this.texture_offset = NUMBER_OFF[number];
  }
}
