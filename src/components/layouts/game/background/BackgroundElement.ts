import { CANVAS_WIDTH } from "../../../../constants";
import { CanvasElement } from "../../../rendering/interfaces";
import {
  BOARD_HEIGHT,
  BOARD_WIDTH,
  BOARD_X,
  BOARD_Y,
  LEVEL_TEXTURE_SCALE,
} from "../constants";

export default class BackgroundElement implements CanvasElement {
  texture_offset = {
    x: 0,
    y: 1750,
  };

  position = {
    x: 0,
    y: 0,
  };

  size = {
    width: CANVAS_WIDTH,
    height: BOARD_Y,
  };

  texture = "screens_sprite";
}
