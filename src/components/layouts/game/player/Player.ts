import { Position, Renderable, Size } from "../../../interfaces";
import Renderer from "../../../rendering/Renderer";
import {
  BOARD_HEIGHT,
  BOARD_Y,
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

export default class Player implements Renderable {
  /* Describe player in game */

  avatar: Avatar;
  animator: PlayerAnimator;
  shotManager: ShotManager;
  weaponFactory: WeaponsFactory;

  // properties in game
  weapons: Weapon[];
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

  // make real weapon private to update at setter weapon in shotManager too
  private _weapon: Weapon;
  get weapon() {
    return this._weapon;
  }
  set weapon(val: Weapon) {
    this._weapon = val;
    this.shotManager.weapon = val;
  }

  constructor(dieCallbak: () => void = () => {}) {
    this.avatar = new Avatar();

    this.animator = new PlayerAnimator(this.avatar);

    this.dieCallbak = dieCallbak;

    this.shotManager = new ShotManager(this._position);

    this.weaponFactory = new WeaponsFactory();

    this.weapon = this.weaponFactory.create(Weapons.Orbit);
    this.weapons = [this.weapon];
    this.sortWeapons();

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
    if (this.immortality) {
      return;
    }

    // change properties
    this.lives--;
    this.immortality = true;
    this.locked = true;

    this.shotManager.stopShot();

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

  // weapons

  sortWeapons() {
    this.weapons = this.weapons.sort((w1, w2) => w1.type - w2.type);
  }

  changeWeapon() {
    const actualWeaponIDx = this.weapons.findIndex((w) => w == this.weapon);
    const newWeaponIDx =
      actualWeaponIDx >= this.weapons.length - 1 ? 0 : actualWeaponIDx + 1;
    this.weapon = this.weapons[newWeaponIDx];
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
