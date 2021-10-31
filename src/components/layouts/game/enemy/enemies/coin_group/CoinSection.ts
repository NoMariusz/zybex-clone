import { AnimationName } from "../../../animations/animationNames";
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
    this.initAnimator();
    this.animator.startAnim(AnimationName.CoinIddle);
  }

  move() {
    this.position = {
      ...this.position,
      x: this.position.x - BOARD_SCROLL_SPEED,
    };
  }

  die() {
    super.die();
    this.animator.endAnim(AnimationName.CoinIddle);
  }

  render() {
    super.render();
  }
}
