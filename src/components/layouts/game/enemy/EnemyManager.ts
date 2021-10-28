import { Collidable, Renderable } from "../../../interfaces";
import Bullet from "../bullets/Bullet";
import BulletClearer from "../bullets/BulletClearer";
import Enemy from "./Enemy";
import spawnData from "./spawnData";

export default class EnemyManager extends BulletClearer implements Renderable {
  /* manage enemies, their creation, communication with other application systems */
  private spawnDataIndex: number;
  activeEnemy: Enemy | null;
  bullets: Bullet[];

  get collidablesWithPlayer(): Collidable[] {
    return this.activeEnemy == null
      ? []
      : [...this.activeEnemy.sections.filter((s) => s.live), ...this.bullets];
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
      // // return break enemies spawn loop
      // return;
    }
    // get next enemy data
    const spawnInfo = spawnData[this.spawnDataIndex];
    // init enemy
    const enemy = new spawnInfo.class(
      spawnInfo.initialPosition,
      () => this.onEnemyDie(),
      this.bullets
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
    // to temporary loop enemies
    this.spawnDataIndex = 0;
  }
}
