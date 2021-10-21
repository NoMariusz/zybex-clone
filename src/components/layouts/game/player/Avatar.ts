import { CanvasElement } from "../../../rendering/interfaces";
import { AVATAR_COLORS, CANVAS_HEIGHT } from "../../../../constants";

export default class Avatar implements CanvasElement {
  texture_offset = {
    x: 1261,
    y: AVATAR_COLORS.red,
  };

  position = {
    x: 0,
    y: CANVAS_HEIGHT / 2,
  };

  size = {
    width: 67,
    height: 70,
  };

  texture = "menu_sprite";

  flip = false;
}
