import { Position, Renderable, Size } from "../../../interfaces";
import Renderer from "../../../rendering/Renderer";
import {
  BOARD_HEIGHT,
  BOARD_Y,
  PLAYER_IMMORTALITY_TIME,
  Weapons,
} from "../constants";
import Avatar from "./AvatarElement";
import Weapon from "./Weapon";

export default class Player implements Renderable {
  /* Describe player in game */

  avatar: Avatar;

  // properties in game
  weapon: Weapon;
  weapons: Weapon[];
  lives: number = 7;
  points: number = 0;
  immortality = false;

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
    this.avatar.position.y = this.position.y + BOARD_Y;
    this.avatar.position.x = this.position.x;
  }

  takeDamage() {
    if (this.immortality) {
      return;
    }

    // change properties
    this.position = {
      x: 0,
      y: BOARD_HEIGHT / 2,
    };
    this.lives--;

    if (this.lives <= 0) {
      this.immortality = true;
      this.onDie();
    }

    // start immortality
    this.immortality = true;
    setTimeout(() => (this.immortality = false), PLAYER_IMMORTALITY_TIME);
  }

  onDie() {
    this.dieCallbak();
  }
}
