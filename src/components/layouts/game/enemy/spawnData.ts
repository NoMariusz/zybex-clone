import { Position } from "../../../interfaces";
import { ALL_ENEMY_SECTIONS, BOARD_HEIGHT } from "../constants";
import { Pickups } from "../pickups/pickupsData";
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
import { EnemyInterface } from "./utils";

interface SpawnData {
    class: EnemyInterface;
    initialPosition: Position;
    pickups?: { [index: number]: Pickups };
}

const spawnData: SpawnData[] = [
    {
        class: Coins,
        initialPosition: { x: 0, y: 100 },
        pickups: { 1: Pickups.RGun, 2: Pickups.RGun },
    },
    {
        class: CoinWall,
        initialPosition: { x: 0, y: 80 },
        pickups: { [ALL_ENEMY_SECTIONS]: Pickups.Fuel },
    },
    {
        class: Worm,
        initialPosition: { x: 0, y: BOARD_HEIGHT / 4 },
        pickups: { [ALL_ENEMY_SECTIONS]: Pickups.Fuel },
    },
    {
        class: Coins,
        initialPosition: { x: 0, y: BOARD_HEIGHT / 2 },
        pickups: { 0: Pickups.EightWay, 3: Pickups.Pulse },
    },
    {
        class: DiagonalDragonflyDown,
        initialPosition: { x: 0, y: BOARD_HEIGHT / 4 },
        pickups: { 2: Pickups.Orbit },
    },
    {
        class: DiagonalDragonflyUp,
        initialPosition: { x: 0, y: (BOARD_HEIGHT / 3) * 2 },
        pickups: { 3: Pickups.Orbit },
    },
    {
        class: SquareDragonflyDown,
        initialPosition: { x: 0, y: BOARD_HEIGHT / 3 },
        pickups: { 4: Pickups.Pulse },
    },
    {
        class: SquareDragonfly,
        initialPosition: { x: 0, y: (BOARD_HEIGHT / 3) * 2 },
        pickups: { 1: Pickups.EightWay },
    },
    {
        class: WavingFiver,
        initialPosition: { x: 0, y: BOARD_HEIGHT / 2 },
    },
    {
        class: BirdWall,
        initialPosition: { x: 0, y: 120 },
        pickups: { 2: Pickups.Orbit },
    },
    {
        class: TargetedBird,
        initialPosition: { x: 0, y: 120 },
        pickups: { 2: Pickups.Fuel },
    },
    {
        class: Butterfly,
        initialPosition: { x: 0, y: BOARD_HEIGHT / 2 },
    },
    { class: FastCoins, initialPosition: { x: 0, y: 100 } },
    {
        class: BouncingFiver,
        initialPosition: { x: 0, y: BOARD_HEIGHT / 2 },
        pickups: { 3: Pickups.EightWay },
    },
    {
        class: DownPhantom,
        initialPosition: { x: 0, y: 0 },
        pickups: { 1: Pickups.Orbit, 3: Pickups.Fuel },
    },
    {
        class: UpPhantom,
        initialPosition: { x: 0, y: 0 },
        pickups: { 2: Pickups.Pulse },
    },
];

export default spawnData;
