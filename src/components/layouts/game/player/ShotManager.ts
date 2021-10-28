import { Position, Renderable } from "../../../interfaces";
import Renderer from "../../../rendering/Renderer";
import Bullet from "../bullets/Bullet";
import { BOARD_WIDTH } from "../constants";
import Weapon from "../weapons/Weapon";

export default class ShotManager implements Renderable {
  weapon: Weapon;
  position: Position;

  shotTimeout: NodeJS.Timeout;
  shotBurstMultiplier = 1;
  shotTimeoutMs = 700;
  private break = false;

  bullets: Bullet[] = [];

  constructor(position: Position) {
    this.position = position;
  }

  render() {
    for (const bullet of this.bullets) {
      bullet.render();
    }
    this.checkBullets();
  }

  startShot() {
    this.shotLoop();
  }

  shotLoop() {
    if (this.break) return;

    this.shotTimeout = setTimeout(() => {
      this.shot();
      this.shotLoop();
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
    this.break = true;
  }

  checkBullets() {
    for (const bullet of this.bullets) {
      if (bullet.position.x > BOARD_WIDTH || !bullet.active)
        this.clearBullet(bullet);
    }
  }

  clearBullet(bullet: Bullet) {
    const idx = this.bullets.findIndex((b) => b == bullet);
    this.bullets.splice(idx, 1);
  }
}
