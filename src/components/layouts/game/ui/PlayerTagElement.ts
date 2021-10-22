import { CANVAS_WIDTH } from "../../../../constants";
import { Focusable, Position } from "../../../interfaces";
import { CanvasElement } from "../../../rendering/interfaces";
import {
  BOARD_HEIGHT,
  BOARD_Y,
  BOTTOM_UI_POS_Y,
  NUMBER_POS,
  PLAYER_TAGS,
} from "../constants";

export default class PlayerTagElement implements CanvasElement {
  texture_offset: Position;

  position = {
    x: 0,
    y: BOTTOM_UI_POS_Y,
  };

  size = {
    width: 65,
    height: 40,
  };

  texture = "game_sprite";

  flip = false;

  constructor(playerNum: number) {
    this.position.x = playerNum == 1 ? 75 : CANVAS_WIDTH / 2 + 75;
    this.texture_offset = PLAYER_TAGS[playerNum - 1];
  }
}
