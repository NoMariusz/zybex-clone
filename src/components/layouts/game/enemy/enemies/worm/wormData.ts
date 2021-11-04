import { Position } from "../../../../../interfaces";

export enum WormPatrs{
    UpperHead,
    Body,
    LowerHead
}

export const WORM_PART_TO_TETURE_OFFSET: {[key in WormPatrs]: Position} = {
    [WormPatrs.UpperHead]: {
        x: 300, y: 600
    }, 
    [WormPatrs.Body]: {
        x: 450, y: 600
    }, 
    [WormPatrs.LowerHead]: {
        x: 375, y: 600
    }, 
}