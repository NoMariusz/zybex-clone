import { CanvasElement } from "../../../rendering/interfaces";
import { AVATAR_COLORS, CANVAS_HEIGHT } from "../../../../constants";
import store from "../../store";

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

  loadColor() {
    // load avatar color from store
    this.texture_offset.y = store.avatarColor;
  }
}
