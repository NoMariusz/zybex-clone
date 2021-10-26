import { Position, Size } from "../../../../../interfaces";
import { BOARD_WIDTH } from "../../../constants";
import Enemy from "../../Enemy";
import CoinSection from "./CoinSection";

export default class Coin extends Enemy {
  static sectionCount = 6;

  constructor(pos: Position, deathCallback: () => void) {
    super(pos, deathCallback);
  }

  initSections() {
    for (let i = 0; i < Coin.sectionCount; i++) {
      const section = new CoinSection();
      this.sections.push(section);
    }
  }

  calcInitPosition(pos: Position, idx: number) {
    return {
      x: pos.x + BOARD_WIDTH + 80 * idx,
      y: pos.y + (idx % 2) * 100,
    };
  }
}
