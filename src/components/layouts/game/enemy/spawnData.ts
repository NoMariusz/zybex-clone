import { Position } from "../../../interfaces";
import { BOARD_HEIGHT } from "../constants";
import BirdWall from "./enemies/bird_like/bird_wall/BirdWall";
import TargetedBird from "./enemies/bird_like/targetet_bird/TargetedBird";
import Coins from "./enemies/coin_like/coins/Coins";
import CoinWall from "./enemies/coin_like/coin_wall/CoinWall";
import FastCoins from "./enemies/coin_like/fast_coins/FastCoins";
import Worm from "./enemies/worm/Worm";

interface SpawnData {
    class:
        | typeof Coins
        | typeof CoinWall
        | typeof Worm
        | typeof BirdWall
        | typeof FastCoins
        | typeof TargetedBird;
    initialPosition: Position;
}

const spawnData: SpawnData[] = [
    { class: Coins, initialPosition: { x: 0, y: 100 } },
    { class: CoinWall, initialPosition: { x: 0, y: 80 } },
    { class: Worm, initialPosition: { x: 0, y: BOARD_HEIGHT / 4 } },
    { class: Coins, initialPosition: { x: 0, y: BOARD_HEIGHT / 2 } },
    { class: BirdWall, initialPosition: { x: 0, y: 120 } },
    { class: FastCoins, initialPosition: { x: 0, y: 100 } },
    { class: TargetedBird, initialPosition: { x: 0, y: 120 } },
];

export default spawnData;
