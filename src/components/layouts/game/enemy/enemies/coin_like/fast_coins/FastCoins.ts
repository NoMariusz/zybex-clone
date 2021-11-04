import { Position, Size } from "../../../../../../interfaces";
import Bullet from "../../../../bullets/Bullet";
import { BOARD_WIDTH } from "../../../../constants";
import Enemy from "../../../Enemy";
import FastCoinSection from "./FastCoinSection";

const speedBonuses = [4, 5, 6, 7, 4.8, 3.8];


export default class FastCoins extends Enemy {
  static sectionCount = 6;

  constructor(pos: Position, deathCallback: () => void, bulletsRef: Bullet[]) {
    super(pos, deathCallback, bulletsRef);
  }

  initSections() {
    for (let i = 0; i < FastCoins.sectionCount; i++) {
      const section = new FastCoinSection(speedBonuses[i]);
      this.sections.push(section);
    }
  }

  calcInitPosition(pos: Position, idx: number) {
    return {
        x: pos.x + BOARD_WIDTH + idx * 20,
        y: pos.y + idx * 80,
      };
  }
}
