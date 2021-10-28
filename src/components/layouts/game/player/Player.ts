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
import PlayerAnimator from "./animations/PlayerAnimator";
import ShotManager from "./ShotManager";

export default class Player implements Renderable {
  /* Describe player in game */

  avatar: Avatar;
  animator: PlayerAnimator;
  shotManager: ShotManager;

  // properties in game
  weapons: Weapon[];
  lives: number = 7;
  points: number = 0;
  immortality = false;
  locked = false;

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

    this.weapon = new Weapon(Weapons.Orbit);
    this.weapons = [this.weapon];

    this.size = this.avatar.size;
    this.updateAvatar();
  }

  onStart() {
    this.avatar.loadColor();
    this.shotManager.startShot();
  }

  render() {
    Renderer.render(this.avatar);
    this.shotManager.render();
  }

  updateAvatar() {
    this.avatar.position = translateToCanvasPos(this.position);
  }

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
    }

    //play die animation
    this.animator.startAnim("death");
    setTimeout(() => {
      // after anim make next actions
      this.position = {
        x: 0,
        y: BOARD_HEIGHT / 2,
      };
      this.shotManager.startShot();

      this.animator.endAnim("death");
      this.locked = false;

      this.startImmortalityAnim();
    }, 200 * 7);
  }

  onDie() {
    this.shotManager.stopShot();
    this.dieCallbak();
  }

  onEnemyDie() {
    this.points += SCORE_FOR_ENEMY;
  }

  startImmortalityAnim() {
    this.animator.startAnim("immortality");
    setTimeout(() => {
      this.endImmortality();
    }, PLAYER_IMMORTALITY_TIME);
  }

  endImmortality() {
    this.immortality = false;
    this.animator.endAnim("immortality");
  }
}
