import {
  BOARD_HEIGHT,
  BOARD_SCROLL_SPEED,
  BOARD_WIDTH,
} from "../../../constants";
import EnemySection from "../../EnemySection";
import CoinElement from "./CoinElement";

export default class CoinSection extends EnemySection {
  shotTimerMs: number;

  constructor() {
    super();
    this.element = new CoinElement();
    this.size = this.element.size;
    this.shotTimerMs = 2500;
  }

  move() {
    this.position = {
      ...this.position,
      x: this.position.x - BOARD_SCROLL_SPEED,
    };
  }

  render() {
    super.render();
  }
}
