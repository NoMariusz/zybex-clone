import { Position, Renderable, Size } from "../../../interfaces";
import Renderer from "../../../rendering/Renderer";
import {
    BOARD_HEIGHT,
    ENTRANCE_MAX_DISTANCE,
    PlayerStatuses,
    PLAYER_IMMORTAL,
    PLAYER_IMMORTALITY_TIME,
    SCORE_FOR_ENEMY,
    Weapons,
} from "../constants";
import {
    SafeTimeoutable,
    translateToCanvasPos,
    whenPlayerNotHardLocked,
} from "../utils";
import Avatar from "./AvatarElement";
import PlayerAnimator from "../../../animating/Animator";
import ShotManager from "./ShotManager";
import { AnimationName } from "../../../animating/animationNames";
import WeaponsFactory from "../weapons/WeaponsFactory";
import WeaponsManager from "./WeaponsManager";
import PickUp from "../pickups/Pickup";
import { Pickups, PICKUP_TO_WEAPON } from "../pickups/pickupsData";
import MoveAnimationManager from "./MoveAnimationManager";
import { sleep } from "../../../utils";
import store from "../../store";
import SoundPlayer from "../../../sounds/SoundPlayer";
import { Sound } from "../../../sounds/constants";
import Weapon from "../weapons/Weapon";

export default class Player extends SafeTimeoutable implements Renderable {
    /* Describe player in game */

    avatar: Avatar;
    animator: PlayerAnimator;
    shotManager: ShotManager;
    weaponFactory: WeaponsFactory;
    weaponManager: WeaponsManager;
    moveAnimationManager: MoveAnimationManager;

    // properties in game
    lives: number = store.livesAfterLevel;
    points: number = store.levelScore;
    immortality = false;
    private status: PlayerStatuses;

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
        this.moveAnimationManager = new MoveAnimationManager(this.animator);

        this.size = this.avatar.size;
        this.updateAvatar();
    }

    //lifecycle

    onStart() {
        this.immortality = true;
        this.tempLock();
        this.avatar.loadColor();
        this.animator.startAnim(AnimationName.PlayerIddle);

        this.rebirth();
    }

    clear() {
        this.clearTimeouts();

        this.shotManager.stopShot();
        this.animator.clearAnims();
    }

    onDie() {
        this.immortality = true;
        this.dieCallbak();
    }

    onEnemyDie() {
        this.points += SCORE_FOR_ENEMY;
    }

    render() {
        Renderer.render(this.avatar);
        this.shotManager.render();
        this.moveAnimationManager.render();
    }

    // locks

    get locked() {
        return (
            this.status == PlayerStatuses.HardLocked ||
            this.status == PlayerStatuses.TempLocked
        );
    }

    get hardLocked() {
        return this.status == PlayerStatuses.HardLocked;
    }

    lock() {
        /* Hard lock player that can't shot, move from keyboard and collide*/
        this.immortality = true;
        this.status = PlayerStatuses.HardLocked;
        this.moveAnimationManager.locked = true;
        this.shotManager.stopShot();
    }

    tempLock() {
        /* Temp lock player that can't move from keyboard and collide*/
        this.status = PlayerStatuses.TempLocked;
        this.moveAnimationManager.locked = true;
    }

    @whenPlayerNotHardLocked
    unlockTemp() {
        this.status = PlayerStatuses.Playing;
        this.moveAnimationManager.locked = false;
    }

    // taking damage behaviour

    takeDamage() {
        if (this.immortality || PLAYER_IMMORTAL || this.locked) {
            return;
        }

        // change properties
        this.lives--;
        this.immortality = true;
        this.tempLock();

        this.shotManager.stopShot();
        this.weaponManager.loseWeapon();

        if (this.lives < 0) {
            this.onDie();
            return;
        }

        SoundPlayer.play(Sound.PlayerDeath);

        //play die animation
        const time = this.animator.startAnim(AnimationName.PlayerDeath);
        this.makeSafeTimeout(() => {
            this.animator.endAnim(AnimationName.PlayerDeath);
            this.rebirth();
        }, time);
    }

    @whenPlayerNotHardLocked
    private async rebirth() {
        this.position = {
            x: -this.size.width,
            y: BOARD_HEIGHT / 2,
        };

        this.shotManager.startShot();

        this.startEntrance();
        this.startImmortalityAnim();
    }

    private async startEntrance() {
        while (this.position.x <= ENTRANCE_MAX_DISTANCE) {
            this.position = {
                ...this.position,
                x: this.position.x + 10,
            };
            await sleep(40);
        }
        this.unlockTemp();
    }

    private startImmortalityAnim() {
        this.animator.startAnim(AnimationName.Immortality);

        this.makeSafeTimeout(() => {
            this.animator.endAnim(AnimationName.Immortality);

            this.afterImmortalityAnimationEnd();
        }, PLAYER_IMMORTALITY_TIME);
    }

    @whenPlayerNotHardLocked
    private afterImmortalityAnimationEnd() {
        this.immortality = false;
    }

    // weapons

    changeWeapon() {
        this.weaponManager.changeWeapon();
    }

    // pickups

    @whenPlayerNotHardLocked
    onPickup(pickup: PickUp) {
        // check if that is normal pickup or weapon
        if (pickup.type == Pickups.Fuel) {
            this.onFuelPickup();
            return;
        }
        if (pickup.type in PICKUP_TO_WEAPON) {
            this.onWeaponPickup(PICKUP_TO_WEAPON[pickup.type]);
        }
    }

    private onFuelPickup() {
        store.fuelScores++;
        SoundPlayer.play(Sound.Pickup);
    }

    private onWeaponPickup(weaponType: Weapons) {
        this.weaponManager.onWeaponPickup(weaponType);
        SoundPlayer.play(Sound.WeaponPickup);
    }

    //utils

    updateAvatar() {
        this.avatar.position = translateToCanvasPos(this.position);
    }
}
