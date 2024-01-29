
export class User {
    id = -1;
    name = "";
    pin = 0;

    constructor(id, name, pin) {
      this.id = id;
      this.name = name;
      this.pin = pin;
    }
}

export default User;