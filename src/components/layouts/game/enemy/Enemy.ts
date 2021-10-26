import { Position, Renderable, Size } from "../../../interfaces";
import EnemySection from "./EnemySection";

export default abstract class Enemy implements Renderable {
  /* Describe enemy as a whole, as gropu of live sections */

  static sectionCount: number;
  sections: EnemySection[];
  deathCallback: () => void;

  constructor(startPos: Position, deathCallback: () => void) {
    // prepare section and delegate child to populate
    this.sections = [];
    this.initSections();

    // init positions
    this.initPositions(startPos);
    this.deathCallback = deathCallback;
  }

  abstract initSections(): void;

  private initPositions(startPos: Position) {
    for (let idx = 0; idx < this.sections.length; idx++) {
      const sec = this.sections[idx];
      sec.position = this.calcInitPosition(startPos, idx);
    }
  }

  abstract calcInitPosition(pos: Position, index: number): Position;

  render() {
    for (const sec of this.sections) {
      sec.move();
      sec.render();
      this.checkSectionClear(sec);
    }
  }

  checkSectionClear(section: EnemySection) {
    if (section.position.x < -section.size.width - 50 || section.canClear) {
      this.clearSection(section);
    }
  }

  clearSection(section: EnemySection) {
    const secIdx = this.sections.findIndex((s) => s == section);
    this.sections.splice(secIdx, 1);

    if (this.sections.length <= 1) this.deathCallback();
  }
}
