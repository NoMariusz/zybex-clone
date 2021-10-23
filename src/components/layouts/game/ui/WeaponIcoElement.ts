import { Position } from "../../../interfaces";
import HideableElement from "../../../rendering/HideableElement";
import { CanvasElement } from "../../../rendering/interfaces";
import {
  TOP_UI_POS_Y,
  Weapons,
  WEAPON_TO_TEXTURE,
  WEAPON_TO_X_POSITION,
} from "../constants";

export default class WeaponIcoElement
  extends HideableElement
  implements CanvasElement
{
  texture_offset: Position;

  position = {
    x: 0,
    y: TOP_UI_POS_Y,
  };

  size = {
    width: 120,
    height: 60,
  };

  texture = "game_sprite";

  flip = false;

  weapon: Weapons;

  constructor(weapon: Weapons) {
    super(65);
    this.weapon = weapon;
    this.texture_offset = WEAPON_TO_TEXTURE[weapon];
    this.position.x = WEAPON_TO_X_POSITION[weapon];
  }
}
