import { Layout, Layouts } from "../interfaces";
import KeyListener from "../../controls/KeyListener";
import { Keys } from "../../controls/constants";
import Board from "./board/Board";
import PlayerUi from "./ui/PlayerUi";
import Player from "./player/Player";
import EnemyManager from "./enemy/EnemyManager";

export default class Game implements Layout {
  changeLayout: (layName: Layouts) => void;
  keyListener: KeyListener;

  //items
  board: Board;
  enemyManager: EnemyManager;

  playerUi: PlayerUi;
  player2Ui: PlayerUi;

  player: Player;

  constructor(
    changeLayout: (layName: Layouts) => void,
    keyListener: KeyListener
  ) {
    this.changeLayout = (s) => changeLayout(s);
    this.keyListener = keyListener;

    this.init();
  }

  init() {
    this.player = new Player(() => this.gameOver());
    this.playerUi = new PlayerUi(this.player, 1);
    this.player2Ui = new PlayerUi(new Player(), 2);

    this.board = new Board(this.player);
    this.enemyManager = new EnemyManager();
  }

  render() {
    this.board.render();
    this.playerUi.render();
    this.player2Ui.render();
    this.player.render();
    this.enemyManager.render();
  }

  handleKeys(key: string) {
    if (key == Keys.ACTION) {
      this.gameOver();
    }
  }

  onShow() {
    this.init();

    this.keyListener.subscribedFunc = (k) => this.handleKeys(k);
    this.player.avatar.loadColor();
    this.enemyManager.start();
  }
  onHide() {
    this.player.animator.clearAnims();
    this.enemyManager.clear();
  }

  gameOver() {
    console.log("Game Over");
    this.changeLayout(Layouts.MENU);
  }
}
