import CanvasElement from "../../../rendering/CavnasElement";
import { TextureSpriteSheets } from "../../../rendering/constants";
import { BOTTOM_UI_POS_Y, Weapons, WEAPON_UI_DATA } from "../constants";

export default class WeaponNameElement extends CanvasElement {
    texture_offset = WEAPON_UI_DATA[Weapons.Orbit].nameTexture;

    position = {
        x: 0,
        y: BOTTOM_UI_POS_Y,
    };

    size = {
        width: 170,
        height: 35,
    };

    texture = TextureSpriteSheets.Main;

    change(weapon: Weapons) {
        this.texture_offset = WEAPON_UI_DATA[weapon].nameTexture;
    }
}
