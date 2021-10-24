import { Keys } from "../../../controls/constants";
import pressedKeys from "../../../controls/pressedKeys";
import { Position, Renderable } from "../../../interfaces";
import Renderer from "../../../rendering/Renderer";
import { BOARD_HEIGHT, BOARD_WIDTH, PLAYER_SPEED } from "../constants";
import Player from "../player/Player";
import PlayfieldManager from "./PlayfieldManager";

export default class Board implements Renderable {
  /* Manage all board actions, like managing player or enemies */
  player: Player;

  playfieldManager: PlayfieldManager;

  constructor(player: Player) {
    this.player = player;
    this.playfieldManager = new PlayfieldManager(player);
  }

  render() {
    this.movePlayer();
    this.playfieldManager.render();
  }

  //player moves

  movePlayer() {
    // get pos after move
    const newPos = this.getPlayerNewPos();
    // restrict player move to be at board area
    const restrictedPos = this.restrictPlayerMove(newPos);
    //make that move
    this.player.position = restrictedPos;
  }

  getPlayerNewPos(): Position {
    const velocity: Position = {
      x:
        Number(pressedKeys[Keys.LEFT]) * -1 +
        Number(pressedKeys[Keys.RIGHT]) * 1,
      y: Number(pressedKeys[Keys.UP]) * -1 + Number(pressedKeys[Keys.DOWN]) * 1,
    };
    return {
      x: this.player.position.x + velocity.x * PLAYER_SPEED,
      y: this.player.position.y + velocity.y * PLAYER_SPEED,
    };
  }

  restrictPlayerMove(pos: Position) {
    return {
      x: Math.min(Math.max(pos.x, 0), BOARD_WIDTH - this.player.size.width),
      y: Math.min(Math.max(pos.y, 0), BOARD_HEIGHT - this.player.size.height),
    };
  }
}
