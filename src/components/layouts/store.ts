import { AVATAR_COLORS } from "../../constants";
import { Weapons } from "./game/constants";

interface storeData {
    avatarColors: AVATAR_COLORS[];
    levelScores: number[];
    livesAfterLevel: number[];
    fuelScores: number[];
    weaponsDatas: { [key in Weapons]?: number }[];
    twoPlayersMode: boolean;
}

/* Simple store, storing all configuration needed between layouts */
const store: storeData = {
    avatarColors: [AVATAR_COLORS.red, AVATAR_COLORS.red],
    levelScores: [0, 0],
    livesAfterLevel: [0, 0],
    fuelScores: [0, 0],
    weaponsDatas: [{}, {}],
    twoPlayersMode: false,
};

export default store;
