import { Position, Size } from "../../../interfaces";

interface BulletData {
    texture_offset: Position;
    size: Size;
    damage: number;
}

const EIGHT_WAY_DAMAGE = 23;
const PULSE_DAMAGE = 20;
const RGUN_DAMAGE = 30;

export enum BulletType {
    Enemy,
    EnemyDown,
    EnemyUp,
    Orbit,
    Pulse1,
    Pulse2,
    EightWayUp,
    EightWayDown,
    EightWayRight,
    EightWayLeft,
    RGun1,
    RGun2,
    RGun3,
    OrbitRotate,
    PulseBallUp,
    PulseBallDown,
}

const bulletData: { [key in BulletType]: BulletData } = {
    [BulletType.Enemy]: {
        texture_offset: {
            x: 75,
            y: 250,
        },
        size: {
            width: 33,
            height: 26,
        },
        damage: 100,
    },
    [BulletType.EnemyDown]: {
        texture_offset: {
            x: 75,
            y: 250,
        },
        size: {
            width: 33,
            height: 26,
        },
        damage: 100,
    },
    [BulletType.EnemyUp]: {
        texture_offset: {
            x: 75,
            y: 250,
        },
        size: {
            width: 33,
            height: 26,
        },
        damage: 100,
    },
    [BulletType.Orbit]: {
        texture_offset: {
            x: 0,
            y: 250,
        },
        size: {
            width: 33,
            height: 34,
        },
        damage: 35,
    },
    [BulletType.Pulse1]: {
        texture_offset: {
            x: 225,
            y: 350,
        },
        size: {
            width: 27,
            height: 66,
        },
        damage: PULSE_DAMAGE,
    },
    [BulletType.Pulse2]: {
        texture_offset: {
            x: 150,
            y: 350,
        },
        size: {
            width: 30,
            height: 112,
        },
        damage: PULSE_DAMAGE,
    },
    [BulletType.EightWayDown]: {
        texture_offset: {
            x: 225,
            y: 250,
        },
        size: {
            width: 18,
            height: 32,
        },
        damage: EIGHT_WAY_DAMAGE,
    },
    [BulletType.EightWayUp]: {
        texture_offset: {
            x: 250,
            y: 250,
        },
        size: {
            width: 18,
            height: 32,
        },
        damage: EIGHT_WAY_DAMAGE,
    },
    [BulletType.EightWayRight]: {
        texture_offset: {
            x: 225,
            y: 300,
        },
        size: {
            width: 32,
            height: 18,
        },
        damage: EIGHT_WAY_DAMAGE,
    },
    [BulletType.EightWayLeft]: {
        texture_offset: {
            x: 260,
            y: 300,
        },
        size: {
            width: 32,
            height: 18,
        },
        damage: EIGHT_WAY_DAMAGE,
    },
    [BulletType.RGun1]: {
        texture_offset: {
            x: 150,
            y: 200,
        },
        size: {
            width: 57,
            height: 31,
        },
        damage: RGUN_DAMAGE,
    },
    [BulletType.RGun2]: {
        texture_offset: {
            x: 150,
            y: 200,
        },
        size: {
            width: 119,
            height: 29,
        },
        damage: RGUN_DAMAGE,
    },
    [BulletType.RGun3]: {
        texture_offset: {
            x: 150,
            y: 200,
        },
        size: {
            width: 195,
            height: 29,
        },
        damage: RGUN_DAMAGE,
    },
    [BulletType.OrbitRotate]: {
        texture_offset: {
            x: 150,
            y: 250,
        },
        size: {
            width: 33,
            height: 33,
        },
        damage: 50,
    },
    [BulletType.PulseBallUp]: {
        texture_offset: {
            x: 150,
            y: 250,
        },
        size: {
            width: 33,
            height: 33,
        },
        damage: PULSE_DAMAGE,
    },
    [BulletType.PulseBallDown]: {
        texture_offset: {
            x: 150,
            y: 250,
        },
        size: {
            width: 33,
            height: 33,
        },
        damage: PULSE_DAMAGE,
    },
};

export default bulletData;
