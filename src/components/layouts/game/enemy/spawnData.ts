import { Position } from "../../../interfaces";
import Enemy from "./Enemy";
import Coin from "./enemies/coin_group/Coin";
import { BOARD_HEIGHT } from "../constants";

interface SpawnData {
  class: typeof Coin;
  initialPosition: Position;
}

const spawnData: SpawnData[] = [
  { class: Coin, initialPosition: { x: 0, y: 100 } },
  { class: Coin, initialPosition: { x: 0, y: BOARD_HEIGHT / 2 } },
  { class: Coin, initialPosition: { x: 0, y: 100 } },
  { class: Coin, initialPosition: { x: 0, y: BOARD_HEIGHT / 3 } },
  { class: Coin, initialPosition: { x: 0, y: 100 } },
];

export default spawnData;
