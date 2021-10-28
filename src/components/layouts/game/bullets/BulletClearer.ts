import { BOARD_WIDTH } from "../constants";
import Bullet from "./Bullet";

export default class BulletClearer {
  bullets: Bullet[];

  checkBullets() {
    for (const bullet of this.bullets) {
      if (
        bullet.position.x > BOARD_WIDTH ||
        !bullet.active ||
        bullet.position.x < -50
      )
        this.clearBullet(bullet);
    }
  }

  private clearBullet(bullet: Bullet) {
    const idx = this.bullets.findIndex((b) => b == bullet);
    this.bullets.splice(idx, 1);
  }
}
