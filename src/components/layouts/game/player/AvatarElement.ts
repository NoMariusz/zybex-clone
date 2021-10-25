import { CanvasElement } from "../../../rendering/interfaces";
import { AVATAR_COLORS, CANVAS_HEIGHT } from "../../../../constants";
import store from "../../store";

export default class AvatarElement implements CanvasElement {
  texture_offset = {
    x: 600,
    y: AVATAR_COLORS.red,
  };

  position = {
    x: 0,
    y: CANVAS_HEIGHT / 2,
  };

  size = {
    width: 65,
    height: 67,
  };

  texture = "game_sprite";

  loadColor() {
    // load avatar color from store
    this.texture_offset.y = store.avatarColor;
  }
}
