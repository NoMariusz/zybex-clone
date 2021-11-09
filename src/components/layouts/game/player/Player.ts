import { Position, Renderable, Size } from "../../../interfaces";
import Renderer from "../../../rendering/Renderer";
import {
    BOARD_HEIGHT,
    PlayerStatuses,
    PLAYER_IMMORTAL,
    PLAYER_IMMORTALITY_TIME,
    SCORE_FOR_ENEMY,
    Weapons,
} from "../constants";
import { SafeTimeoutable, translateToCanvasPos } from "../utils";
import Avatar from "./AvatarElement";
import Weapon from "../weapons/Weapon";
import PlayerAnimator from "../animations/Animator";
import ShotManager from "./ShotManager";
import { AnimationName } from "../animations/animationNames";
import WeaponsFactory from "../weapons/WeaponsFactory";
import WeaponsManager from "./WeaponsManager";
import PickUp from "../pickups/Pickup";
import { Pickups, PICKUP_TO_WEAPON } from "../pickups/pickupsData";

export default class Player extends SafeTimeoutable implements Renderable {
    /* Describe player in game */

    avatar: Avatar;
    animator: PlayerAnimator;
    shotManager: ShotManager;
    weaponFactory: WeaponsFactory;
    private weaponManager: WeaponsManager;

    // properties in game
    lives: number = 7;
    points: number = 0;
    immortality = false;
    status: PlayerStatuses;

    size: Size;

    dieCallbak: () => void;

    // make real position private to set pos only by setter
    // that updates position in other subclassses
    private _position: Position = {
        x: 0,
        y: BOARD_HEIGHT / 2,
    };
    get position() {
        return this._position;
    }
    set position(newPos: Position) {
        this._position = newPos;
        this.updateAvatar();
        this.shotManager.position = newPos;
    }

    // get values from managers
    get weapon() {
        return this.weaponManager.weapon;
    }
    get weapons() {
        return this.weaponManager.weapons;
    }

    constructor(dieCallbak: () => void = () => {}) {
        super();
        this.avatar = new Avatar();

        this.animator = new PlayerAnimator(this.avatar);

        this.dieCallbak = dieCallbak;

        this.shotManager = new ShotManager(this._position);
        this.weaponManager = new WeaponsManager(this.shotManager);

        this.size = this.avatar.size;
        this.updateAvatar();
    }

    //lifecycle

    onStart() {
        this.avatar.loadColor();
        this.shotManager.startShot();
        this.animator.startAnim(AnimationName.PlayerIddle);
    }

    clear() {
        this.clearTimeouts();

        this.shotManager.stopShot();
        this.animator.clearAnims();
    }

    onDie() {
        this.dieCallbak();
    }

    onEnemyDie() {
        this.points += SCORE_FOR_ENEMY;
    }

    render() {
        Renderer.render(this.avatar);
        this.shotManager.render();
    }

    lock() {
        this.immortality = true;
        this.status = PlayerStatuses.HardLocked;
        this.shotManager.stopShot();
    }

    // taking damage

    takeDamage() {
        if (this.immortality || PLAYER_IMMORTAL || this.locked) {
            return;
        }

        // change properties
        this.lives--;
        this.immortality = true;
        this.status = PlayerStatuses.TempLocked;

        this.shotManager.stopShot();
        this.weaponManager.loseWeapon();

        if (this.lives < 0) {
            this.immortality = true;
            this.onDie();
            return;
        }

        //play die animation
        const time = this.animator.startAnim(AnimationName.PlayerDeath);
        this.makeSafeTimeout(() => {
            this.animator.endAnim(AnimationName.PlayerDeath);

            // check if someone doesn't hard lock player
            if (this.status == PlayerStatuses.HardLocked) return;

            // after anim make next actions
            this.position = {
                x: 0,
                y: BOARD_HEIGHT / 2,
            };
            this.shotManager.startShot();
            this.status = PlayerStatuses.Playing;
            this.startImmortalityAnim();
        }, time);
    }

    startImmortalityAnim() {
        this.animator.startAnim(AnimationName.Immortality);
        this.makeSafeTimeout(() => {
            this.endImmortality();
        }, PLAYER_IMMORTALITY_TIME);
    }

    endImmortality() {
        this.immortality = false;
        this.animator.endAnim(AnimationName.Immortality);
    }

    changeWeapon() {
        this.weaponManager.changeWeapon();
    }

    // pickups

    onPickup(pickup: PickUp) {
        // check if that is normal pickup or weapon
        if (pickup.type == Pickups.Fuel) {
            this.points++;
            return;
        }
        if (pickup.type in PICKUP_TO_WEAPON) {
            const weapon = PICKUP_TO_WEAPON[pickup.type];
            this.weaponManager.onWeaponPickup(weapon);
        }
    }

    //utils

    updateAvatar() {
        this.avatar.position = translateToCanvasPos(this.position);
    }

    get locked() {
        return (
            this.status == PlayerStatuses.HardLocked ||
            this.status == PlayerStatuses.TempLocked
        );
    }
}
