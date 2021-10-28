import { Keys } from "../../../controls/constants";
import pressedKeys from "../../../controls/pressedKeys";
import { Position, Renderable } from "../../../interfaces";
import Renderer from "../../../rendering/Renderer";
import { BOARD_HEIGHT, BOARD_WIDTH, PLAYER_SPEED } from "../constants";
import EnemyManager from "../enemy/EnemyManager";
import Player from "../player/Player";
import PlayfieldManager from "./PlayfieldManager";
import CollidableCollider from "./CollidableCollider";
import Enemy from "../enemy/Enemy";
import EnemySection from "../enemy/EnemySection";

export default class Board implements Renderable {
  /* Manage all board actions, like managing player or enemies */
  player: Player;

  playfieldManager: PlayfieldManager;
  enemyManager: EnemyManager;
  collidableCollider: CollidableCollider;

  constructor(player: Player, enemyManager: EnemyManager) {
    this.player = player;
    this.playfieldManager = new PlayfieldManager(player);
    this.enemyManager = enemyManager;
    this.collidableCollider = new CollidableCollider();
  }

  render() {
    this.movePlayer();
    this.playfieldManager.render();
    this.collidePlayer();
    this.collideEnemies();
  }

  //player moves

  movePlayer() {
    // not move player when is locked
    if (this.player.locked) {
      return;
    }
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

  // not playfield collisions

  collidePlayer() {
    for (const enemyColl of this.enemyManager.collidablesWithPlayer) {
      const collide = this.collidableCollider.checkCollision(
        enemyColl,
        this.player
      );
      if (collide) this.player.takeDamage();
    }
  }

  collideEnemies() {
    if (this.enemyManager.activeEnemy == null) return;

    for (const bullet of this.player.shotManager.bullets) {
      for (const enemyCollidable of this.enemyManager
        .collidablesWithPlayerBullets) {
        const collide = this.collidableCollider.checkCollision(
          bullet,
          enemyCollidable
        );
        if (collide) {
          if (enemyCollidable instanceof EnemySection)
            enemyCollidable.takeDamage(bullet.damage);

          bullet.destroy();
          break;
        }
      }
    }
  }
}
