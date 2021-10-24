import { CanvasElement } from "../../../rendering/interfaces";
import { BOTTOM_UI_POS_Y, Weapons, WEAPON_TO_NAME_TEXTURE } from "../constants";

export default class WeaponNameElement implements CanvasElement {
  texture_offset = WEAPON_TO_NAME_TEXTURE[Weapons.Orbit];

  position = {
    x: 0,
    y: BOTTOM_UI_POS_Y,
  };

  size = {
    width: 170,
    height: 35,
  };

  texture = "game_sprite";

  change(weapon: Weapons) {
    this.texture_offset = WEAPON_TO_NAME_TEXTURE[weapon];
  }
}
