import { AVATAR_COLORS } from "../../constants";
import { Weapons } from "./game/constants";

interface storeData {
    avatarColor: number;
    levelScore: number;
    livesAfterLevel: number;
    fuelScores: number;
    weaponsData: { [key in Weapons]?: number };
}

/* Simple store, storing all configuration needed between layouts */
const store: storeData = {
    avatarColor: AVATAR_COLORS.red,
    levelScore: 0,
    livesAfterLevel: 0,
    fuelScores: 0,
    weaponsData: {},
};

export default store;
