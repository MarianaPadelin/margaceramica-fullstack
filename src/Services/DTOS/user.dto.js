export default class UserDTO {
  constructor(id, firstName, lastName, email, role) {
    // this.name = user.first_name + user.last_name
    this.id = id;
    this.name = firstName + " " + lastName;
    this.email = email;
    this.role = role;
  }
}
