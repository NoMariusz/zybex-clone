import { Renderable } from "../../interfaces";
import Renderer from "../../rendering/Renderer";
import Player from "./player/Player";

export default class Board implements Renderable {
  /* Manage all board actions, like managing player or enemies */
  players: Player[];
  constructor(players: Player[]) {
    this.players = players;
  }
  render() {}
}
