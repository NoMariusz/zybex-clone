import { Layout, Layouts } from "../interfaces";
import KeyListener from "../../controls/KeyListener";
import { Keys } from "../../controls/constants";
import Board from "./board/Board";
import PlayerUi from "./ui/PlayerUi";
import Player from "./player/Player";
import EnemyManager from "./enemy/EnemyManager";
import Background from "./background/Background";

export default class Game implements Layout {
  changeLayout: (layName: Layouts) => void;
  keyListener: KeyListener;

  //items
  board: Board;
  enemyManager: EnemyManager;
  background: Background;

  playerUi: PlayerUi;
  player2Ui: PlayerUi;

  player: Player;

  constructor(
    changeLayout: (layName: Layouts) => void,
    keyListener: KeyListener
  ) {
    this.changeLayout = (s) => changeLayout(s);
    this.keyListener = keyListener;

    this.background = new Background();

    this.init();
  }

  init() {
    this.player = new Player(() => this.gameOver());
    this.playerUi = new PlayerUi(this.player, 1);
    this.player2Ui = new PlayerUi(new Player(), 2);

    this.enemyManager = new EnemyManager();
    this.board = new Board(this.player, this.enemyManager);
  }

  render() {
    this.board.render();
    this.enemyManager.render();
    this.player.render();
    this.background.render();
    this.playerUi.render();
    this.player2Ui.render();
  }

  handleKeys(key: string) {
    if (key == Keys.ACTION) {
      this.player.changeWeapon();
    }
  }

  onShow() {
    this.init();

    this.keyListener.subscribedFunc = (k) => this.handleKeys(k);
    this.player.onStart();
    this.enemyManager.start();
  }
  onHide() {
    this.player.clear();
    this.enemyManager.clear();
  }

  gameOver() {
    console.log("Game Over, changing layout");
    this.changeLayout(Layouts.MENU);
  }
}
