import Medication from "./Medication";
import Schedule from "./Schedule";

export class ScheduleMed {
    id = -1;
    medication = new Medication();
    numPills = 0;
    schedule = new Schedule(); 

    constructor() { }
}

export default ScheduleMed;