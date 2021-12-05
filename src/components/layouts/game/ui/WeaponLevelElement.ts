import CanvasElement from "../../../rendering/CanvasElement";
import { TextureSpriteSheets } from "../../../rendering/constants";
import { TOP_UI_POS_Y, WEAPON_LEVELS_TEXTURES } from "../constants";

export default class WeaponLevelElement extends CanvasElement {
    texture_offset = WEAPON_LEVELS_TEXTURES[0];

    position = {
        x: 0,
        y: TOP_UI_POS_Y,
    };

    size = {
        width: 100,
        height: 60,
    };

    change(level: number) {
        this.texture_offset = WEAPON_LEVELS_TEXTURES[level - 1];
    }
}
