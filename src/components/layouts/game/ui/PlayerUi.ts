import { CANVAS_WIDTH } from "../../../../constants";
import { Renderable } from "../../../interfaces";
import Renderer from "../../../rendering/Renderer";
import {
    BOTTOM_UI_POS_Y,
    PlayerType,
    SCORE_ELEMENTS_OFFSET,
    Weapons,
    WEAPON_UI_DATA,
} from "../constants";
import Player from "../player/Player";
import PlayerTagElement from "./PlayerTagElement";
import WeaponLevelElement from "./WeaponLevelElement";
import WeaponNameElement from "./WeaponNameElement";
import WeaponIcoElement from "./WeaponIcoElement";
import SymbolElement from "../../../rendering/utils/SymbolElement";
import { loadNumberToElements } from "../../../utils";
import { SMALL_SYMBOL_SIZE, SymbolsTypes } from "../../../rendering/constants";

export default class PlayerUi implements Renderable {
    /* Display player status informations on game ui */
    private activeWeaponType: Weapons;

    //elements
    playerTag: PlayerTagElement;
    scoreElements: SymbolElement[] = [];
    hpNumber: SymbolElement;
    weaponName: WeaponNameElement;
    weaponLevel: WeaponLevelElement;
    weaponIcos: WeaponIcoElement[] = [];

    get canvasElements() {
        return [
            this.playerTag,
            this.hpNumber,
            ...this.scoreElements,
            this.weaponName,
            this.weaponLevel,
            ...this.weaponIcos,
        ];
    }

    constructor(private player: Player) {
        // init elements
        this.playerTag = new PlayerTagElement(this.player.playerType);
        this.playerTag.position.x = this.getBottomUiOffset() + 50;
        this.hpNumber = new SymbolElement(
            {
                x: this.getBottomUiOffset() + 370,
                y: BOTTOM_UI_POS_Y,
            },
            SymbolsTypes.SmallWhiteNumber
        );
        this.initScoreElements();
        this.weaponName = new WeaponNameElement();
        this.weaponName.position.x = this.getBottomUiOffset() + 420;

        if (this.player.playerType == PlayerType.Player1)
            this.initOnlyP1Elements();
    }

    render() {
        this.updateUiData();
        for (const el of this.canvasElements) {
            if (el) Renderer.render(el);
        }
        this.checkIfWeaponChanged();
    }

    initScoreElements() {
        for (let idx = 0; idx < 6; idx++) {
            const element = new SymbolElement(
                {
                    x:
                        this.getBottomUiOffset() +
                        SCORE_ELEMENTS_OFFSET +
                        SMALL_SYMBOL_SIZE * idx,
                    y: BOTTOM_UI_POS_Y,
                },
                SymbolsTypes.SmallWhiteNumber
            );
            this.scoreElements.push(element);
        }
    }

    initOnlyP1Elements() {
        this.weaponLevel = new WeaponLevelElement();
        this.weaponLevel.position.x = 50;
        this.initWeaponsIcos();
        this.activeWeaponType = this.player.weapon.type;
        this.startAnimForActualWeaponIco();
    }

    initWeaponsIcos() {
        for (const weapon in Weapons) {
            if (!isNaN(Number(weapon))) {
                this.weaponIcos.push(new WeaponIcoElement(Number(weapon)));
            }
        }
    }

    updateUiData() {
        const lives = this.player.lives < 0 ? 0 : this.player.lives;
        this.hpNumber.changeSymbol(lives);
        loadNumberToElements(this.scoreElements, this.player.points);
        this.weaponName.change(this.player.weapon.type);
        this.weaponLevel?.change(this.player.weapon.level);
        this.updateWeaponsIcos();
    }

    updateWeaponsIcos() {
        for (const ico of this.weaponIcos) {
            const res = this.player.weapons.findIndex(
                (w) => w.type == ico.weapon
            );
            if (res != -1) {
                ico.show();
            } else {
                ico.hide();
            }
        }
    }

    getBottomUiOffset() {
        return (CANVAS_WIDTH / 2) * this.player.playerType;
    }

    // playe icons animation

    checkIfWeaponChanged() {
        if (this.activeWeaponType != this.player.weapon.type) {
            this.onPlayerChangeWeapon();
        }
    }

    onPlayerChangeWeapon() {
        // end anim for old ico
        const oldIco = this.weaponIcos.find(
            (i) => i.weapon == this.activeWeaponType
        );
        oldIco?.animator.endAnim(oldIco.animationName);

        this.activeWeaponType = this.player.weapon.type;
        this.startAnimForActualWeaponIco();
    }

    startAnimForActualWeaponIco() {
        const actualIco = this.weaponIcos.find(
            (i) => i.weapon == this.player.weapon.type
        );
        actualIco?.animator.startAnim(actualIco.animationName);
    }
}
