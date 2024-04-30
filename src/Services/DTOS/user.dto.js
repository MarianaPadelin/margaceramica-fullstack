export default class UserDTO {
  constructor(id, firstName, lastName, email, role) {
    this.id = id;
    this.name = firstName + " " + lastName;
    this.email = email;
    this.role = role;
  }
}
