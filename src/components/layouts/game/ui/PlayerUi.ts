import { CANVAS_WIDTH } from "../../../../constants";
import { Renderable } from "../../../interfaces";
import Renderer from "../../../rendering/Renderer";
import { SCORE_ELEMENTS_OFFSET } from "../constants";
import Player from "../player/Player";
import NumberElement from "./NumberElement";
import PlayerTagElement from "./PlayerTagElement";

export default class PlayerUi implements Renderable {
  /* Display player status informations on game ui */
  player: Player;
  playerNum: number;

  //elements
  playerTag: PlayerTagElement;
  scoreElements: NumberElement[] = [];
  hpNumber: NumberElement;

  constructor(player: Player, playerNum: number) {
    this.playerNum = playerNum;
    this.player = player;
    this.playerTag = new PlayerTagElement(this.playerNum);
    this.hpNumber = new NumberElement();
    this.hpNumber.position.x = this.getBottomUiOffset() + 400;
    this.initScoreElements();
  }

  get canvasElements() {
    return [this.playerTag, this.hpNumber, ...this.scoreElements];
  }

  render() {
    this.updateUiData();
    for (const el of this.canvasElements) {
      Renderer.render(el);
    }
  }

  initScoreElements() {
    for (let idx = 0; idx < 6; idx++) {
      const element = new NumberElement();
      element.position.x =
        this.getBottomUiOffset() +
        SCORE_ELEMENTS_OFFSET +
        element.size.width * idx;
      this.scoreElements.push(element);
    }
  }

  updateUiData() {
    this.hpNumber.changeNum(this.player.lives);
    this.loadScoreToUi(this.player.points);
  }

  loadScoreToUi(score: number) {
    for (let idx = 0; idx < 6; idx++) {
      const element = this.scoreElements[idx];
      const divider = Math.pow(10, 5 - idx);
      const rest = Math.floor(score / divider);
      const num = rest % 10;
      element.changeNum(num);
    }
  }

  getBottomUiOffset() {
    return (CANVAS_WIDTH / 2) * (this.playerNum - 1);
  }
}
