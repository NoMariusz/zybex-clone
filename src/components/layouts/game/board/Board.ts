import { Keys } from "../../../controls/constants";
import pressedKeys from "../../../controls/pressedKeys";
import { Position, Renderable } from "../../../interfaces";
import Renderer from "../../../rendering/Renderer";
import {
  BOARD_HEIGHT,
  BOARD_WIDTH,
  MAX_ATTACK_SPEED_MULTIPLIER,
  PLAYER_SPEED,
} from "../constants";
import EnemyManager from "../enemy/EnemyManager";
import Player from "../player/Player";
import PlayfieldManager from "./PlayfieldManager";
import CollidableCollider from "./CollidableCollider";
import PickupsManager from "../pickups/PickupsManager";
import EnemySection from "../enemy/EnemySection";
import Bullet from "../bullets/Bullet";

export default class Board implements Renderable {
  /* Handle board placed things, relations between enemy and player,
  like collisions, or calculating shot attack speed */
  player: Player;

  playfieldManager: PlayfieldManager;
  enemyManager: EnemyManager;
  collidableCollider: CollidableCollider;
  pickupsManager: PickupsManager;

  constructor(player: Player, enemyManager: EnemyManager) {
    this.player = player;
    this.playfieldManager = new PlayfieldManager(player);
    this.enemyManager = enemyManager;
    this.collidableCollider = new CollidableCollider();
    this.pickupsManager = new PickupsManager();
  }

  render() {
    this.movePlayer();
    this.playfieldManager.render();
    this.pickupsManager.render();
    this.collidePlayer();
    this.collideEnemies();
    this.modifyAttackSpeed();
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
    this.collidePlayerWithEnemies();
    this.collidePlayerWithPickups();
  }

  collidePlayerWithEnemies() {
    for (const enemyColl of this.enemyManager.collidablesWithPlayer) {
      const collide = this.collidableCollider.checkCollision(
        enemyColl,
        this.player
      );
      if (collide) this.player.takeDamage();
    }
  }

  collidePlayerWithPickups() {
    for (const pickup of this.pickupsManager.pickups) {
      const collide = this.collidableCollider.checkCollision(
        pickup,
        this.player
      );
      if (collide) {
        this.player.points++;
        this.pickupsManager.clearPickup(pickup);
      }
    }
  }

  collideEnemies() {
    if (this.enemyManager.activeEnemy == null) return;

    for (const bullet of this.player.shotManager.bullets) {
      let destroyBullet = false;

      for (const enemyCollidable of this.enemyManager
        .collidablesWithPlayerBullets) {
        const collide = this.collidableCollider.checkCollision(
          bullet,
          enemyCollidable
        );
        if (collide) {
          if (enemyCollidable instanceof EnemySection)
            this.onEnemyCollide(enemyCollidable, bullet);
          destroyBullet = true;
        }
      }
      // destroy bullet after check collisions with all collidables
      // so bullet can hit simultaneously many enemy sections
      if (destroyBullet) {
        bullet.destroy();
      }
    }
  }

  onEnemyCollide(enemySection: EnemySection, bullet: Bullet) {
    enemySection.takeDamage(bullet.damage);
    // detect if enemy died after got shoot
    if (!enemySection.live) {
      this.player.onEnemyDie();
      this.pickupsManager.onEnemyDie(enemySection.position);
    }
  }

  // calculating attack speed multiplier

  modifyAttackSpeed() {
    const enemiesOnLine = this.getEnemiesOnLine();
    if (enemiesOnLine.length <= 0) {
      this.player.shotManager.shotSpeedMultiplier = 1;
      return;
    }

    const s = this.calcAttackSpeed(enemiesOnLine);
    this.player.shotManager.shotSpeedMultiplier = s;
  }

  private getEnemiesOnLine() {
    return this.enemyManager.activeSections.filter(
      (e) =>
        Math.abs(
          e.position.y +
            e.size.height / 2 -
            (this.player.position.y + this.player.size.height / 2)
        ) < 25
    );
  }

  private calcAttackSpeed(enemiesOnLine: EnemySection[]) {
    const minDistance = enemiesOnLine.reduce(
      (prev, current) =>
        prev <= this.calcDistance(current) ? prev : this.calcDistance(current),
      Infinity
    );
    const speedMultiplier =
      minDistance == Infinity ? 1 : Math.sqrt(BOARD_WIDTH / minDistance);
    return Math.min(speedMultiplier, MAX_ATTACK_SPEED_MULTIPLIER);
  }

  private calcDistance(enemy: EnemySection) {
    return Math.abs(enemy.position.x - this.player.position.x);
  }
}
