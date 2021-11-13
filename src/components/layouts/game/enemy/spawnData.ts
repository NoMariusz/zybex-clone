import { Position } from "../../../interfaces";
import { BOARD_HEIGHT } from "../constants";
import BirdWall from "./enemies/bird_like/bird_wall/BirdWall";
import TargetedBird from "./enemies/bird_like/targetet_bird/TargetedBird";
import Butterfly from "./enemies/butterfly/Butterfly";
import Coins from "./enemies/coin_like/coins/Coins";
import CoinWall from "./enemies/coin_like/coin_wall/CoinWall";
import FastCoins from "./enemies/coin_like/fast_coins/FastCoins";
import DiagonalDragonflyDown from "./enemies/dragonfly_like/diagonal_dragonfly/DiagonalDragonflyDown";
import DiagonalDragonflyUp from "./enemies/dragonfly_like/diagonal_dragonfly/DiagonalDragonflyUp";
import SquareDragonflyDown from "./enemies/dragonfly_like/sqare_dragonfly/down/SquareDragonflyDown";
import SquareDragonfly from "./enemies/dragonfly_like/sqare_dragonfly/up/SquareDragonflyUp";
import BouncingFiver from "./enemies/fiver_like/bouncing_fiver/BouncingFiver";
import WavingFiver from "./enemies/fiver_like/waving_fiver/WavingFiver";
import DownPhantom from "./enemies/phantom/down_phantom/DownPhantom";
import UpPhantom from "./enemies/phantom/up_phantom/UpPhantom";
import Worm from "./enemies/worm/Worm";

interface SpawnData {
    class:
        | typeof Coins
        | typeof CoinWall
        | typeof Worm
        | typeof BirdWall
        | typeof FastCoins
        | typeof TargetedBird
        | typeof DiagonalDragonflyUp
        | typeof DiagonalDragonflyDown
        | typeof SquareDragonfly
        | typeof Butterfly
        | typeof WavingFiver
        | typeof BouncingFiver
        | typeof DownPhantom
        | typeof UpPhantom;
    initialPosition: Position;
}

const spawnData: SpawnData[] = [
    { class: Coins, initialPosition: { x: 0, y: 100 } },
    { class: CoinWall, initialPosition: { x: 0, y: 80 } },
    { class: Worm, initialPosition: { x: 0, y: BOARD_HEIGHT / 4 } },
    { class: Coins, initialPosition: { x: 0, y: BOARD_HEIGHT / 2 } },
    {
        class: DiagonalDragonflyDown,
        initialPosition: { x: 0, y: BOARD_HEIGHT / 4 },
    },
    {
        class: DiagonalDragonflyUp,
        initialPosition: { x: 0, y: (BOARD_HEIGHT / 3) * 2 },
    },
    {
        class: SquareDragonflyDown,
        initialPosition: { x: 0, y: BOARD_HEIGHT / 3 },
    },
    {
        class: SquareDragonfly,
        initialPosition: { x: 0, y: (BOARD_HEIGHT / 3) * 2 },
    },
    { class: WavingFiver, initialPosition: { x: 0, y: BOARD_HEIGHT / 2 } },
    { class: BirdWall, initialPosition: { x: 0, y: 120 } },
    { class: TargetedBird, initialPosition: { x: 0, y: 120 } },
    { class: Butterfly, initialPosition: { x: 0, y: BOARD_HEIGHT / 2 } },
    { class: FastCoins, initialPosition: { x: 0, y: 100 } },
    { class: BouncingFiver, initialPosition: { x: 0, y: BOARD_HEIGHT / 2 } },
    { class: DownPhantom, initialPosition: { x: 0, y: 0 } },
    { class: UpPhantom, initialPosition: { x: 0, y: 0 } },
];

export default spawnData;
