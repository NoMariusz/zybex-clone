import { Renderable } from "../../../interfaces";
import Renderer from "../../../rendering/Renderer";
import { Players } from "../constants";
import Player from "../player/Player";

export default class PlayerUi implements Renderable {
  /* Display player status informations on game ui */
  playerMode: Players;
  player: Player;

  constructor(player: Player) {
    this.player = player;
    this.playerMode = player.mode;
  }

  render() {}
}
