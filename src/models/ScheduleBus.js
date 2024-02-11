import ScheduleMed from "./ScheduleMed";
import Time from "./Time";

export class ScheduleBus {
    id = -1;
    userId = -1;
    name = "";
    pin = -1;
    scheduleMeds = [];
    times = [];

    constructor() { }
}

export default ScheduleBus;