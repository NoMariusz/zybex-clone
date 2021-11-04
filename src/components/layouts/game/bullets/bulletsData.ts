import { Position, Size } from "../../../interfaces";

interface BulletData {
    texture_offset: Position;
    size: Size;
    damage: number;
}

export enum BulletType {
    Enemy,
    EnemyDown,
    EnemyUp,
    Orbit,
    Pulse1,
    Pulse2,
    EightWayUp,
    EightWayDown,
    RGun1,
    RGun2,
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
        damage: 20,
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
        damage: 20,
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
        damage: 15,
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
        damage: 15,
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
        damage: 130,
    },
    [BulletType.RGun2]: {
        texture_offset: {
            x: 225,
            y: 200,
        },
        size: {
            width: 119,
            height: 29,
        },
        damage: 130,
    },
};

export default bulletData;
