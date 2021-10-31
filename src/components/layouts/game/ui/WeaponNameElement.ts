import { CanvasElement } from "../../../rendering/interfaces";
import { BOTTOM_UI_POS_Y, Weapons, WEAPON_UI_DATA } from "../constants";

export default class WeaponNameElement implements CanvasElement {
  texture_offset = WEAPON_UI_DATA[Weapons.Orbit].nameTexture;

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
    this.texture_offset = WEAPON_UI_DATA[weapon].nameTexture;
  }
}
