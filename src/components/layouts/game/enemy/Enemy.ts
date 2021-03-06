import { Position, Renderable, Size } from "../../../interfaces";
import Bullet from "../bullets/Bullet";
import { ALL_ENEMY_SECTIONS, BOARD_HEIGHT } from "../constants";
import { Pickups } from "../pickups/pickupsData";
import Player from "../player/Player";
import { SafeTimeoutable } from "../utils";
import EnemySection from "./EnemySection";

export default abstract class Enemy
    extends SafeTimeoutable
    implements Renderable
{
    /* Describe enemy as a whole, as gropu of live sections */

    static sectionCount: number;
    sections: EnemySection[];
    deathCallback: () => void;
    bulletsRef: Bullet[];

    protected player: Player | undefined;

    constructor(
        startPos: Position,
        deathCallback: () => void,
        bulletsRef: Bullet[],
        player?: Player,
        pickups?: { [index: number]: Pickups }
    ) {
        super();
        this.player = player;
        // prepare section and delegate child to populate
        this.sections = [];
        this.initSections();

        // init positions
        this.initPositions(startPos);
        this.deathCallback = deathCallback;

        // connect bullets array
        for (const sec of this.sections) {
            sec.bullets = bulletsRef;
        }

        if (pickups) this.loadPickups(pickups);
    }

    abstract initSections(): void;

    private initPositions(startPos: Position) {
        for (let idx = 0; idx < this.sections.length; idx++) {
            const sec = this.sections[idx];
            sec.position = this.calcInitPosition(startPos, idx);
        }
    }

    abstract calcInitPosition(pos: Position, index: number): Position;

    render() {
        for (const sec of this.sections) {
            sec.move();
            sec.render();
            this.checkSectionClear(sec);
        }
    }

    clear() {
        this.clearTimeouts();

        for (const sec of this.sections) {
            sec.clear();
        }
    }

    checkSectionClear(section: EnemySection) {
        if (
            section.position.x < -section.size.width - 50 ||
            section.position.y < -section.size.height - 50 ||
            section.position.y > BOARD_HEIGHT + 50 ||
            section.canBeCleared
        ) {
            this.clearSection(section);
        }
    }

    clearSection(section: EnemySection) {
        const secIdx = this.sections.findIndex((s) => s === section);
        this.sections[secIdx].clear();
        this.sections.splice(secIdx, 1);

        if (this.sections.length <= 0) this.deathCallback();
    }

    loadPickups(pickups: { [index: number]: Pickups }) {
        for (let idx = 0; idx < this.sections.length; idx++) {
            const pickup = pickups[idx] || pickups[ALL_ENEMY_SECTIONS];

            this.sections[idx].posiiblePickup = pickup;
        }
    }
}
