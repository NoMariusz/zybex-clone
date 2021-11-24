import { MAX_IPLEMENTED_WEAPON_LEVEL, Weapons } from "../constants";
import Weapon from "../weapons/Weapon";
import ShotManager from "./ShotManager";
import WeaponsFactory from "../weapons/WeaponsFactory";
import store from "../../store";

export default class WeaponManager {
    weaponFactory: WeaponsFactory;
    weapons: Weapon[];
    shotManager: ShotManager;

    private _weapon: Weapon;
    get weapon() {
        return this._weapon;
    }
    set weapon(val: Weapon) {
        this._weapon = val;
        this.shotManager.weapon = val;
    }

    constructor(shotManager: ShotManager) {
        this.shotManager = shotManager;
        this.weaponFactory = new WeaponsFactory();

        this.loadWeapons();
    }

    // loading weapons

    private loadWeapons() {
        if (!store.weaponsData[Weapons.Orbit]) {
            this.loadBaseWapons();
        } else {
            this.loadStoreWapons();
        }

        this.sortWeapons();
        this.setOrbit();
    }

    private loadBaseWapons() {
        this.weapon = this.weaponFactory.create(Weapons.Orbit);
        this.weapons = [this.weapon];
    }

    private loadStoreWapons() {
        this.weapons = [];

        for (const weaponKey in store.weaponsData) {
            const weaponType = parseInt(weaponKey) as Weapons;

            const weapon = this.weaponFactory.create(weaponType);
            weapon.level = store.weaponsData[weaponType] || 1;

            this.weapons.push(weapon);
        }
    }

    // save

    saveWeapons() {
        store.weaponsData = {};
        for (const weapon of this.weapons) {
            store.weaponsData[weapon.type] = weapon.level;
        }
    }

    // weapons change

    changeWeapon() {
        const actualWeaponIDx = this.weapons.findIndex((w) => w == this.weapon);
        const newWeaponIDx =
            actualWeaponIDx >= this.weapons.length - 1
                ? 0
                : actualWeaponIDx + 1;
        this.weapon = this.weapons[newWeaponIDx];
    }

    // managing pickups/ looses

    onWeaponPickup(weapon: Weapons) {
        // check if weapon exists
        const foundWeapon = this.weapons.find((w) => w.type == weapon);
        // if exists, level up them
        if (foundWeapon) {
            foundWeapon.level =
                foundWeapon.level == MAX_IPLEMENTED_WEAPON_LEVEL
                    ? foundWeapon.level
                    : foundWeapon.level + 1;
            return;
        }
        // else add that weapon
        this.addNewWeapon(weapon);
    }

    addNewWeapon(type: Weapons) {
        const weapon = this.weaponFactory.create(type);

        this.weapons.push(weapon);
        this.sortWeapons();
    }

    loseWeapon() {
        // if level greater than 1, only level down weapon
        if (this.weapon.level > 1) {
            this.weapon.level--;
            return;
        }
        // can not remove Orbit weapon
        if (this.weapon.type == Weapons.Orbit) return;

        // remove weapon
        const weaponIdx = this.weapons.findIndex((w) => w == this.weapon);
        this.weapons.splice(weaponIdx, 1);
        // change actual weapon to first of weapons - orbit
        this.setOrbit();
    }

    // utils

    setOrbit() {
        this.weapon = this.weapons[0];
    }

    sortWeapons() {
        this.weapons = this.weapons.sort((w1, w2) => w1.type - w2.type);
    }
}
