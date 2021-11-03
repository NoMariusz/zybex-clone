import { Position } from "../../../../../interfaces";
import Bullet from "../../../bullets/Bullet";
import { BOARD_WIDTH } from "../../../constants";
import Enemy from "../../Enemy";
import CoinWallSection from "./CoinWallSection";

const shotOffsets = [400, 800, 1200, 800, 400, 0];

export default class CoinWall extends Enemy {
  static sectionCount = 6;

  constructor(pos: Position, deathCallback: () => void, bulletsRef: Bullet[]) {
    super(pos, deathCallback, bulletsRef);
  }

  initSections() {
    for (let i = 0; i < CoinWall.sectionCount; i++) {
      const section = new CoinWallSection();
      this.sections.push(section);

      setTimeout(() => {
        section.startShotTimer();
      }, shotOffsets[i]);
    }
  }

  calcInitPosition(pos: Position, idx: number) {
    return {
      x: pos.x + BOARD_WIDTH,
      y: pos.y + idx * 80,
    };
  }
}
