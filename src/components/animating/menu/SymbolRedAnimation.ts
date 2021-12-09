import CanvasElement from "../../rendering/CanvasElement";
import { SymbolsTypes } from "../../rendering/constants";
import Animation from "../Animation";
import { AnimationName } from "../animationNames";
import SymbolElement from "../../rendering/utils/SymbolElement";
import { safeChangeIndex } from "components/utils";

export default class SymbolRedAnimation implements Animation {
    name = AnimationName.RedSymbol;
    active: boolean = false;

    tickIntervalTime: number = 100;
    interval: NodeJS.Timer;

    element: CanvasElement;

    symbolTypesQueue: SymbolsTypes[] = [
        SymbolsTypes.RedBase,
        SymbolsTypes.RedAnimationFrame1,
        SymbolsTypes.RedAnimationFrame2,
        SymbolsTypes.RedAnimationFrame3,
    ];
    numberSymbolTypesQueue: SymbolsTypes[] = [
        SymbolsTypes.RedBaseNumber,
        SymbolsTypes.RedAnimationFrame1Number,
        SymbolsTypes.RedAnimationFrame2Number,
        SymbolsTypes.RedAnimationFrame3Number,
    ];
    actualQueuePosition = 0;

    constructor(element: CanvasElement) {
        this.element = element;
    }

    start() {}

    end() {
        this.getSymbolElement().changeType(this.getSymbolQueue()[0]);
    }

    tick() {
        const symbolElement = this.getSymbolElement();
        const queue = this.getSymbolQueue();

        symbolElement.changeType(queue[this.actualQueuePosition]);

        this.actualQueuePosition = safeChangeIndex(
            this.actualQueuePosition,
            1,
            this.symbolTypesQueue.length - 1
        );
    }

    private getSymbolElement() {
        if (!(this.element instanceof SymbolElement)) {
            throw new Error(
                "Try to use SymbolRedAnimation on non SymbolElement element"
            );
        }
        return this.element as SymbolElement;
    }

    private getSymbolQueue() {
        const symbolElement = this.getSymbolElement();
        return typeof symbolElement.value != "number"
            ? this.symbolTypesQueue
            : this.numberSymbolTypesQueue;
    }
}
