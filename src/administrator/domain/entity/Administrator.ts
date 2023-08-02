export class Administrator {
  private _name: string;
  private _email: string;
  private _password: string;
  constructor(name: string, email: string, password: string) {
    this._name = name;
    this._email = email;
    this._password = password;
  }
  get name() {
    return this._name;
  }
  get email() {
    return this._email;
  }
  get password() {
    return this._password;
  }
}
