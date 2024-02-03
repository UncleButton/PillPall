import ScheduleMed from "./ScheduleMed";
import Time from "./Time";

export class ScheduleResponse {
    id = -1;
    userId = -1;
    scheduleMeds = [new ScheduleMed()];
    times = [new Time()];

    constructor() { }
}

export default ScheduleResponse;