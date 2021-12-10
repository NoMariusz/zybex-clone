import { Collidable, Renderable } from "../../../interfaces";
import Bullet from "../bullets/Bullet";
import BulletClearer from "../bullets/BulletClearer";
import Player from "../player/Player";
import Enemy from "./Enemy";
import EnemySection from "./EnemySection";
import spawnData from "./spawnData";

export default class EnemyManager extends BulletClearer implements Renderable {
    /* manage enemies, their creation, communication with other application systems */
    private spawnDataIndex: number;
    activeEnemy: Enemy | null;
    bullets: Bullet[];

    enemiesEndedCallback: () => void;

    get activeSections(): EnemySection[] {
        return this.activeEnemy == null
            ? []
            : [...this.activeEnemy.sections.filter((s) => s.live)];
    }
    get collidablesWithPlayer(): Collidable[] {
        return this.activeEnemy == null
            ? []
            : [...this.activeSections, ...this.bullets];
    }
    get collidablesWithPlayerBullets(): Collidable[] {
        return this.activeEnemy == null ? [] : [...this.activeSections];
    }

    constructor(private players: Player[], enemiesEndedCallback: () => void) {
        super();
        this.enemiesEndedCallback = enemiesEndedCallback;
    }

    start() {
        this.bullets = [];
        this.spawnDataIndex = 0;
        this.initEnemy();
    }

    clear() {
        this.clearEnemy();
    }

    clearEnemy() {
        this.activeEnemy?.clear();
        this.activeEnemy = null;
    }

    render() {
        this.activeEnemy?.render();
        for (const b of this.bullets) {
            b.render();
        }
        this.checkBullets();
    }

    initEnemy() {
        // check if can init new enemies
        if (this.spawnDataIndex >= spawnData.length) {
            this.enemiesEnded();
            // return break enemies spawn loop
            return;
        }
        // get next enemy data
        const spawnInfo = spawnData[this.spawnDataIndex];
        // init enemy
        const enemy = new spawnInfo.class(
            spawnInfo.initialPosition,
            () => this.onEnemyDie(),
            this.bullets,
            this.players[0],
            spawnInfo.pickups
        );
        this.activeEnemy = enemy;

        // increment index
        this.spawnDataIndex++;
    }

    onEnemyDie() {
        //spawn new enemy
        this.clearEnemy();
        this.initEnemy();
    }

    enemiesEnded() {
        this.enemiesEndedCallback();
    }
}
