import { AnimationClass } from "./Animation";
import PlayerIddleAnimation from "./player/PlayerIddleAnimation";
import ImmortalityAnimation from "./player/ImmortalityAnimation";
import DeathAnimation from "./player/DeathAnimation";
import CoinIddleAnimation from "./enemies/CoinIddleAnimation";
import EnemyDeathAnimation from "./enemies/EnemyDeathAnimation";
import BirdIddleAnimation from "./enemies/BirdIddleAnimation";
import DragonflyIddleAnimation from "./enemies/DragonflyIddleAnimation";
import ButterflyIddleAnimation from "./enemies/ButterflyIddle";
import FiverIddleAnimation from "./enemies/FiverIddleAnimation";
import PhantomIddleAnimation from "./enemies/PhantomIddleAnimation";
import MoveUpAnimation from "./player/MoveUpAnimation";
import MoveDownAnimation from "./player/MoveDownAnimation";
import MoveForwardAnimation from "./player/MoveForwardAnimation";
import MoveBackwardAnimation from "./player/MoveBackwardAnimation";
import OrbitUseAnimation from "./weapons/OrbitUseAnimation";
import PulseUseAnimation from "./weapons/PulseUseAnimation";
import EightWayUseAnimation from "./weapons/EightWayAnimation";
import RGunUseAnimation from "./weapons/RGunUseAnimation";
import SymbolRedAnimation from "./menu/SymbolRedAnimation";
import { AnimationName } from "./animationNames";
import MenuSubtitle1Animation from "./menu/MenuSubtitle1Animation";
import MenuSubtitle2Animation from "./menu/MenuSubtitle2Animation";
import MenuSubtitle3Animation from "./menu/MenuSubtitle3Animation";
import WavingTriangleAnimation from "./other/WavingTriangleAnimation";
import WavingReverseTriangleAnimation from "./other/WavingReverseTriangleAnimation";

const animationConfig: {
    [key in AnimationName]: { class: AnimationClass; priority: number };
} = {
    [AnimationName.PlayerDeath]: { class: DeathAnimation, priority: 100 },
    [AnimationName.Immortality]: { class: ImmortalityAnimation, priority: 90 },
    [AnimationName.PlayerMoveUp]: { class: MoveUpAnimation, priority: 53 },
    [AnimationName.PlayerMoveDown]: { class: MoveDownAnimation, priority: 52 },
    [AnimationName.PlayerMoveForward]: {
        class: MoveForwardAnimation,
        priority: 51,
    },
    [AnimationName.PlayerMoveBackward]: {
        class: MoveBackwardAnimation,
        priority: 50,
    },
    [AnimationName.PlayerIddle]: { class: PlayerIddleAnimation, priority: 1 },
    [AnimationName.EnemyDeath]: { class: EnemyDeathAnimation, priority: 100 },
    [AnimationName.CoinIddle]: { class: CoinIddleAnimation, priority: 1 },
    [AnimationName.BirdIddle]: { class: BirdIddleAnimation, priority: 1 },
    [AnimationName.DragonflyIddle]: {
        class: DragonflyIddleAnimation,
        priority: 1,
    },
    [AnimationName.ButterflyIddle]: {
        class: ButterflyIddleAnimation,
        priority: 1,
    },
    [AnimationName.FiverIddle]: { class: FiverIddleAnimation, priority: 1 },
    [AnimationName.PhantomIddle]: { class: PhantomIddleAnimation, priority: 1 },
    [AnimationName.OrbitUse]: { class: OrbitUseAnimation, priority: 1 },
    [AnimationName.PulseUse]: { class: PulseUseAnimation, priority: 1 },
    [AnimationName.EightWayUse]: { class: EightWayUseAnimation, priority: 1 },
    [AnimationName.RGunUse]: { class: RGunUseAnimation, priority: 1 },
    [AnimationName.RedSymbol]: { class: SymbolRedAnimation, priority: 1 },
    [AnimationName.MenuSubtitle1]: {
        class: MenuSubtitle1Animation,
        priority: 1,
    },
    [AnimationName.MenuSubtitle2]: {
        class: MenuSubtitle2Animation,
        priority: 1,
    },
    [AnimationName.MenuSubtitle3]: {
        class: MenuSubtitle3Animation,
        priority: 1,
    },
    [AnimationName.TriangleWaving]: {
        class: WavingTriangleAnimation,
        priority: 1,
    },
    [AnimationName.ReverseTriangleWaving]: {
        class: WavingReverseTriangleAnimation,
        priority: 1,
    },
};

export default animationConfig;
