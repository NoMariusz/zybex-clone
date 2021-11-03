import { Position } from "../../../interfaces";
import { BOARD_HEIGHT } from "../constants";
import Coins from "./enemies/coins/Coins";
import CoinWall from "./enemies/coin_wall/CoinWall";

interface SpawnData {
  class: typeof Coins | typeof CoinWall;
  initialPosition: Position;
}

const spawnData: SpawnData[] = [
  { class: Coins, initialPosition: { x: 0, y: 100 } },
  { class: CoinWall, initialPosition: { x: 0, y: 80 } },
  { class: Coins, initialPosition: { x: 0, y: BOARD_HEIGHT / 2 } },
];

export default spawnData;
