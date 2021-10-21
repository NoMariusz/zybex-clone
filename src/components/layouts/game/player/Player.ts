import { Position, Renderable, Size } from "../../../interfaces";
import Renderer from "../../../rendering/Renderer";
import { BOARD_HEIGHT, BOARD_Y, Players, Weapons } from "../constants";
import Avatar from "./Avatar";
import Weapon from "./Weapon";

export default class Player implements Renderable {
  /* Describe player in game */

  avatar: Avatar;
  mode: Players;

  // properties in game
  weapon: Weapon;
  weapons: Weapon[];
  lives: number = 7;
  points: number = 0;

  position: Position = {
    x: 0,
    y: Math.random() * BOARD_HEIGHT * 0.9,
  };

  size: Size;

  constructor(mode: Players) {
    this.mode = mode;
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
  }
}
