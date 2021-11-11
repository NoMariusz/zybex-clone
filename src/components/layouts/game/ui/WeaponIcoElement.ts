import { Position } from "../../../interfaces";
import HideableElement from "../../../rendering/HideableElement";
import { CanvasElement } from "../../../rendering/interfaces";
import Animator from "../animations/Animator";
import { TOP_UI_POS_Y, Weapons, WEAPON_UI_DATA } from "../constants";

export default class WeaponIcoElement
    extends HideableElement
    implements CanvasElement
{
    texture_offset: Position;
    animator: Animator;

    position = {
        x: 0,
        y: TOP_UI_POS_Y,
    };

    size = {
        width: 90,
        height: 70,
    };

    texture = "game_sprite";

    weapon: Weapons;

    constructor(weapon: Weapons) {
        super(70);
        this.weapon = weapon;
        this.texture_offset = WEAPON_UI_DATA[weapon].texture;
        this.position.x = WEAPON_UI_DATA[weapon].uiXPosition;
        this.animator = new Animator(this);
    }

    get animationName() {
        return WEAPON_UI_DATA[this.weapon].animationName;
    }
}
