import { Position, Renderable } from "../../../interfaces";
import BulletClearer from "../bullets/BulletClearer";
import Bullet from "../bullets/Bullet";
import Weapon from "../weapons/Weapon";

export default class ShotManager extends BulletClearer implements Renderable {
  weapon: Weapon;
  position: Position;

  shotTimeout: NodeJS.Timeout;
  shotBurstMultiplier = 1;
  shotTimeoutMs = 400;
  // token restricting shot loops to work only when they started with actual token
  private loopToken = 0;

  bullets: Bullet[] = [];

  constructor(position: Position) {
    super();
    this.position = position;
  }

  render() {
    for (const bullet of this.bullets) {
      bullet.render();
    }
    this.checkBullets();
  }

  startShot() {
    this.shotLoop(this.loopToken);
  }

  shotLoop(token: number) {
    /**
     * @param token: number - token describing loop token when loop start working
     * if token is not equal to actual loop token, break that loop
     */
    if (this.loopToken != token) return;

    this.shotTimeout = setTimeout(() => {
      this.shot();
      this.shotLoop(token);
    }, this.shotTimeoutMs * this.shotBurstMultiplier);
  }

  shot() {
    const bullet = this.weapon.shot();
    this.bullets.push(bullet);
    bullet.position = {
      ...this.position,
      y: this.position.y + 25,
    };
    this.shotBurstMultiplier = this.shotBurstMultiplier == 1 ? 2 : 1;
  }

  stopShot() {
    this.loopToken++;
  }
}
