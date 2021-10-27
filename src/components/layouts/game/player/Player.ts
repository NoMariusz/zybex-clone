import { Position, Renderable, Size } from "../../../interfaces";
import Renderer from "../../../rendering/Renderer";
import {
  BOARD_HEIGHT,
  BOARD_Y,
  PLAYER_IMMORTALITY_TIME,
  Weapons,
} from "../constants";
import { translateToCanvasPos } from "../utils";
import Avatar from "./AvatarElement";
import Weapon from "../weapons/Weapon";
import PlayerAnimator from "./animations/PlayerAnimator";

export default class Player implements Renderable {
  /* Describe player in game */

  avatar: Avatar;
  animator: PlayerAnimator;

  // properties in game
  weapon: Weapon;
  weapons: Weapon[];
  lives: number = 7;
  points: number = 0;
  immortality = false;
  locked = false;

  // make real position private to set pos only by setter that updates avatar too
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
  }

  size: Size;

  dieCallbak: () => void;

  constructor(dieCallbak: () => void = () => {}) {
    this.avatar = new Avatar();

    this.animator = new PlayerAnimator(this.avatar);

    this.dieCallbak = dieCallbak;

    this.weapon = new Weapon(Weapons.Orbit);
    this.weapons = [this.weapon];

    this.size = this.avatar.size;
    this.updateAvatar();
  }

  render() {
    Renderer.render(this.avatar);
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

      this.animator.endAnim("death");
      this.locked = false;

      this.startImmortalityAnim();
    }, 200 * 7);
  }

  onDie() {
    this.dieCallbak();
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
