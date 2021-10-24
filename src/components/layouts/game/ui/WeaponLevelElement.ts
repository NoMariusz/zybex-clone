import { CanvasElement } from "../../../rendering/interfaces";
import { TOP_UI_POS_Y, WEAPON_LEVELS_TEXTURES } from "../constants";

export default class WeaponLevelElement implements CanvasElement {
  texture_offset = WEAPON_LEVELS_TEXTURES[0];

  position = {
    x: 0,
    y: TOP_UI_POS_Y,
  };

  size = {
    width: 100,
    height: 60,
  };

  texture = "game_sprite";

  change(level: number) {
    this.texture_offset = WEAPON_LEVELS_TEXTURES[level - 1];
  }
}
