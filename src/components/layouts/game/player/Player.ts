import { Position, Renderable, Size } from "../../../interfaces";
import Renderer from "../../../rendering/Renderer";
import {
  BOARD_HEIGHT,
  PLAYER_IMMORTAL,
  PLAYER_IMMORTALITY_TIME,
  SCORE_FOR_ENEMY,
  Weapons,
} from "../constants";
import { translateToCanvasPos } from "../utils";
import Avatar from "./AvatarElement";
import Weapon from "../weapons/Weapon";
import PlayerAnimator from "../animations/Animator";
import ShotManager from "./ShotManager";
import { AnimationName } from "../animations/animationNames";
import WeaponsFactory from "../weapons/WeaponsFactory";
import WeaponsManager from "./WeaponsManager";
import PickUp from "../pickups/Pickup";
import { Pickups, PICKUP_TO_WEAPON } from "../pickups/pickupsData";

export default class Player implements Renderable {
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
  locked = false;

  size: Size;

  dieCallbak: () => void;
  timeouts: NodeJS.Timeout[] = [];

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
  }

  clear() {
    // clear not ended timeouts
    for (const timeout of this.timeouts) {
      clearTimeout(timeout);
    }

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

  // taking damage

  takeDamage() {
    if (this.immortality || PLAYER_IMMORTAL) {
      return;
    }

    // change properties
    this.lives--;
    this.immortality = true;
    this.locked = true;

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
      // after anim make next actions
      this.position = {
        x: 0,
        y: BOARD_HEIGHT / 2,
      };
      this.shotManager.startShot();

      this.animator.endAnim(AnimationName.PlayerDeath);
      this.locked = false;

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

  makeSafeTimeout(fun: () => void, timeoutMs: number | undefined) {
    const t = setTimeout(() => {
      fun();
      const idx = this.timeouts.findIndex((timeout) => timeout == t);
      this.timeouts.splice(idx, 1);
    }, timeoutMs);
    this.timeouts.push(t);
  }
}
