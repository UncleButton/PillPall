
export class Medication {
    name = "";
    description = "";
    numPills = null;
    expirationDate = "";
    pin = "";
    isLarge = null;
    maxPillsPerDose = null;
    maxDosesPerDay = null;
    prescriberName = "";
    pharmacyAddr1 = "";
    pharmacyAddr2 = "";
    pharmacyCity = "";
    pharmacyState = "";
    pharmacyZip = "";
    pharmacyPhone = "";
    userId = -1;
    scheduleMeds = [];

    constructor() { }
}

export default Medication;