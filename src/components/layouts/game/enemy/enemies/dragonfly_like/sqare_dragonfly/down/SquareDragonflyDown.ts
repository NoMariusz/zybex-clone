import SquareDragonflyDownSection from "./SquareDragonflyDownSection";
import SquareDragonflyUp from "../up/SquareDragonflyUp";

export default class SquareDragonflyDown extends SquareDragonflyUp {
    makeSection() {
        return new SquareDragonflyDownSection();
    }
}
