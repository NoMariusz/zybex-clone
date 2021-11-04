import { BOARD_SCROLL_SPEED, COIN_WALL_HP } from "../../../../constants";
import EnemySection from "../../../EnemySection";
import CoinWallElement from "./CoinWallElement";

export default class CoinWallSection extends EnemySection {
  shotTimerMs: number;
  element: CoinWallElement;

  constructor() {
    super();
    this.hp = COIN_WALL_HP;
    this.element = new CoinWallElement();
    this.size = this.element.size;
    this.shotTimerMs = 2500;
    this.initAnimator();
  }

  move() {
    this.position = {
      ...this.position,
      x: this.position.x - BOARD_SCROLL_SPEED,
    };
  }

  takeDamage(count: number) {
    super.takeDamage(count);
    this.updateTexture();
  }

  updateTexture() {
    // calculate in which stage is section, depending on actual hp level
    const stage = Math.min(6 - Math.round((this.hp / COIN_WALL_HP) * 6), 5);
    // change texture in element
    this.element.changeStage(stage);
  }
}
