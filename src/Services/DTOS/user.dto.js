export default class UserDTO {
  constructor(firstName, lastName, email, role) {
    // this.name = user.first_name + user.last_name
    this.name = firstName + " " + lastName;
    this.email = email;
    this.role = role;
  }
}
