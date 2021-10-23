import { Position, Renderable, Size } from "../../../interfaces";
import Renderer from "../../../rendering/Renderer";
import { BOARD_HEIGHT, BOARD_Y, Weapons } from "../constants";
import Avatar from "./Avatar";
import Weapon from "./Weapon";

export default class Player implements Renderable {
  /* Describe player in game */

  avatar: Avatar;

  // properties in game
  weapon: Weapon;
  weapons: Weapon[];
  lives: number = 7;
  points: number = 0;

  // make real position private to set pos only by setter that updates avatar too
  private _position: Position = {
    x: 0,
    y: Math.random() * BOARD_HEIGHT * 0.9,
  };
  get position() {
    return this._position;
  }
  set position(newPos: Position) {
    this._position = newPos;
    this.updateAvatar();
  }

  size: Size;

  constructor() {
    this.avatar = new Avatar();

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
}
