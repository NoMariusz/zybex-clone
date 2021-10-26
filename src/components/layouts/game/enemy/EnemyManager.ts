import { Collidable, Renderable } from "../../../interfaces";
import Enemy from "./Enemy";
import spawnData from "./spawnData";

export default class EnemyManager implements Renderable {
  /* manage enemies, their creation, communication with other application systems */
  private spawnDataIndex: number;
  activeEnemy: Enemy;

  get collidablesWithPlayer(): Collidable[] {
    return this.activeEnemy != null ? [...this.activeEnemy.sections] : [];
  }

  start() {
    this.spawnDataIndex = 0;
    this.initEnemy();
  }

  clear() {
    this.activeEnemy = null;
  }

  render() {
    this.activeEnemy?.render();
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
    const enemy = new spawnInfo.class(spawnInfo.initialPosition, () =>
      this.onEnemyDie()
    );
    this.activeEnemy = enemy;

    // increment index
    this.spawnDataIndex++;
  }

  onEnemyDie() {
    //spawn new enemy
    this.activeEnemy = null;
    this.initEnemy();
  }

  enemiesEnded() {
    // to temporary loop enemies
    this.spawnDataIndex = 0;
  }
}
