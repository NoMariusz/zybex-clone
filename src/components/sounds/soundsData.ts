import { Sound } from "./constants";

import mainTheme from "../../../static/sounds/main_theme.mp3";
import levelAnnounce from "../../../static/sounds/level_announce.mp3";
import endLevel from "../../../static/sounds/end_level.mp3";
import gameOver from "../../../static/sounds/game_over.mp3";
import playerDeath from "../../../static/sounds/player_death.mp3";
import enemyDeath from "../../../static/sounds/enemy_death.mp3";
import enemyShot from "../../../static/sounds/enemy_shot.mp3";
import orbitShot from "../../../static/sounds/orbit_shot.mp3";
import pulseShot from "../../../static/sounds/pulse_shot.mp3";
import pickup from "../../../static/sounds/pickup.mp3";
import pickupWeapon from "../../../static/sounds/pickup_weapon.mp3";
import pointsCalc from "../../../static/sounds/points_calc.mp3";
import pointsCalcEnd from "../../../static/sounds/points_calc_end.mp3";
import saveScore from "../../../static/sounds/save_score.mp3";

const soundsData: { [key in Sound]: string } = {
    [Sound.MainTheme]: mainTheme,
    [Sound.LevelAnnounce]: levelAnnounce,
    [Sound.LevelEnd]: endLevel,
    [Sound.GamOver]: gameOver,
    [Sound.PlayerDeath]: playerDeath,
    [Sound.EnemyDeath]: enemyDeath,
    [Sound.EnemyShot]: enemyShot,
    [Sound.OrbitShot]: orbitShot,
    [Sound.PulseShot]: pulseShot,
    [Sound.Pickup]: pickup,
    [Sound.WeaponPickup]: pickupWeapon,
    [Sound.CalculatePoints]: pointsCalc,
    [Sound.CalculatePointsEnd]: pointsCalcEnd,
    [Sound.ScoreSave]: saveScore,
};

export default soundsData;
