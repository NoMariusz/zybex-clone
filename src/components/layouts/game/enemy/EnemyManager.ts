import { Renderable } from "../../../interfaces";
import Coin from "./enemies/coin_group/Coin";
import Enemy from "./Enemy";

export default class EnemyManager implements Renderable {
  /* manage enemies, their creation, communication with other application systems */
  enemiesClasses = [Coin];
  activeEnemy: Enemy;

  start() {
    this.initEnemy();
  }

  clear() {
    this.activeEnemy = null;
  }

  render() {
    this.activeEnemy?.render();
  }

  initEnemy() {
    // get random enemy
    const randomEnemyIdx = Math.floor(
      Math.random() * this.enemiesClasses.length
    );
    const randomEnemyCls = this.enemiesClasses[randomEnemyIdx];
    // init enemy
    const randomEnemy = new randomEnemyCls(
      {
        x: 0,
        y: 80,
      },
      () => this.onEnemyDie()
    );
    this.activeEnemy = randomEnemy;
  }

  onEnemyDie() {
    //spawn new enemy
    this.activeEnemy = null;
    this.initEnemy();
  }
}
