import { Keys } from "../../../controls/constants";
import pressedKeys from "../../../controls/pressedKeys";
import { Position, Renderable } from "../../../interfaces";
import Renderer from "../../../rendering/Renderer";
import {
    BOARD_HEIGHT,
    BOARD_WIDTH,
    MAX_ATTACK_SPEED_MULTIPLIER,
    PLAYER_SPEED,
    Weapons,
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

    playfieldManager: PlayfieldManager;
    enemyManager: EnemyManager;
    collidableCollider: CollidableCollider;
    pickupsManager: PickupsManager;

    constructor(private players: Player[], enemyManager: EnemyManager) {
        this.playfieldManager = new PlayfieldManager(players);
        this.enemyManager = enemyManager;
        this.collidableCollider = new CollidableCollider();
        this.pickupsManager = new PickupsManager();
    }

    render() {
        for (const player of this.players) {
            this.restrictPlayerMove(player);
            this.modifyAttackSpeed(player);
        }
        this.playfieldManager.render();
        this.pickupsManager.render();
        this.collidePlayer();
        this.collideEnemies();
    }

    //player moves

    private restrictPlayerMove(player: Player) {
        // not move player when is locked
        if (player.locked) {
            return;
        }
        // restrict player move to board area
        const restrictedPos = this.getRestrictedPlayerPos(player);
        player.position = restrictedPos;
    }

    private getRestrictedPlayerPos(player: Player) {
        return {
            x: Math.min(
                Math.max(player.position.x, 0),
                BOARD_WIDTH - player.size.width
            ),
            y: Math.min(
                Math.max(player.position.y, 0),
                BOARD_HEIGHT - player.size.height
            ),
        };
    }

    // not playfield collisions

    collidePlayer() {
        for (const player of this.players) {
            this.collidePlayerWithEnemies(player);
            this.collidePlayerWithPickups(player);
        }
    }

    collidePlayerWithEnemies(player: Player) {
        for (const enemyColl of this.enemyManager.collidablesWithPlayer) {
            const collide = this.collidableCollider.checkCollision(
                enemyColl,
                player
            );
            if (collide) player.takeDamage();
        }
    }

    collidePlayerWithPickups(player: Player) {
        for (const pickup of this.pickupsManager.pickups) {
            const collide = this.collidableCollider.checkCollision(
                pickup,
                player
            );
            if (collide) {
                player.onPickup(pickup);
                this.pickupsManager.clearPickup(pickup);
            }
        }
    }

    collideEnemies() {
        if (this.enemyManager.activeEnemy == null) return;

        for (const player of this.players) {
            for (const bullet of player.shotManager.bullets) {
                let destroyBullet = false;

                for (const enemyCollidable of this.enemyManager
                    .collidablesWithPlayerBullets) {
                    const collide = this.collidableCollider.checkCollision(
                        bullet,
                        enemyCollidable
                    );
                    if (collide) {
                        if (enemyCollidable instanceof EnemySection)
                            this.onEnemyCollide(
                                enemyCollidable,
                                bullet,
                                player
                            );
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
    }

    onEnemyCollide(enemySection: EnemySection, bullet: Bullet, player: Player) {
        enemySection.takeDamage(bullet.damage);
        // detect if enemy died after got shoot
        if (!enemySection.live) {
            player.onEnemyDie();
            this.pickupsManager.onEnemyDie(
                enemySection.position,
                enemySection.posiiblePickup
            );
        }
    }

    // calculating attack speed multiplier

    modifyAttackSpeed(player: Player) {
        // don't modify attack speed for 8way weapon
        const speed =
            player.weapon.type == Weapons.EightWay
                ? 1
                : this.calcAttackSpeed(player);
        player.shotManager.shotSpeedMultiplier = speed;
    }

    private getEnemiesOnLine(player: Player) {
        return this.enemyManager.activeSections.filter(
            (e) =>
                Math.abs(
                    e.position.y +
                        e.size.height / 2 -
                        (player.position.y + player.size.height / 2)
                ) < 25
        );
    }

    private calcAttackSpeed(player: Player) {
        const enemiesOnLine = this.getEnemiesOnLine(player);
        if (enemiesOnLine.length <= 0) {
            return this.calcAttackSpeedForRightEdge(player);
        }

        return this.calcAttackSpeedFromEnemies(enemiesOnLine, player);
    }

    private calcAttackSpeedFromEnemies(
        enemiesOnLine: EnemySection[],
        player: Player
    ) {
        const minDistance = enemiesOnLine.reduce(
            (prev, current) =>
                prev <= this.calcDistance(current, player)
                    ? prev
                    : this.calcDistance(current, player),
            Infinity
        );
        return this.calcAttackSpeedFromDistance(minDistance);
    }

    private calcAttackSpeedForRightEdge(player: Player) {
        const distanceToRight = BOARD_WIDTH - player.position.x;
        return this.calcAttackSpeedFromDistance(distanceToRight);
    }

    private calcDistance(enemy: EnemySection, player: Player) {
        return Math.abs(enemy.position.x - player.position.x);
    }

    private calcAttackSpeedFromDistance(distance: number) {
        const speedMultiplier =
            distance == Infinity
                ? 1
                : MAX_ATTACK_SPEED_MULTIPLIER * (1 - distance / BOARD_WIDTH);
        return Math.max(speedMultiplier, 1);
    }
}
