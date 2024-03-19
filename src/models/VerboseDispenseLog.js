export class VerboseDispenseLog {
    scheduleName = "";
    medName = "";
    numPills = 0;
    timestamp = ""; 

    constructor() { }

    getDate(){
        var datetime = new Date(this.timestamp);
        return `${datetime.getFullYear()}-${datetime.getMonth() + 1}-${datetime.getDay()}`
    }

    getTime(){
        var datetime = new Date(this.timestamp);
        return `${datetime.getHours()}:${datetime.getMinutes()}:${datetime.getSeconds()}`
    }
}

export default VerboseDispenseLog;