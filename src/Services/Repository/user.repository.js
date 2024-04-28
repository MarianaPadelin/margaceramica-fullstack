export default class UserRepository {
  constructor(dao) {
    this.dao = dao;
  }
  getAll = async () => {
    return await this.dao.getAll();
  };
  //a este llamarlo getById
  getUser = async (uid) => {
    return await this.dao.getUser(uid);
  };
  updateUserRole = async (uid, role) => {
    return await this.dao.updateUserRole(uid, role);
  };
  updateUserStatus = async (uid) => {
    return await this.dao.updateUserStatus(uid);
  };
  updateUserFiles = async (uid, imgName, imgPath) => {
    return await this.dao.updateUserFiles(uid, imgName, imgPath);
  };
  updatePassword = async (email, password) => {
    return await this.dao.updatePassword(email, password);
  };
  updateConnection = async (email, loginTime) => {
    return await this.dao.updateConnection(email, loginTime);
  };
  modifyUser = async (uid, role) => {
    return await this.dao.modifyUser(uid, role);
  };
  deleteUser = async (uid) => {
    return await this.dao.deleteUser(uid);
  };
  //a este llamarlo getByEmail
  findUser = async (email) => {
    return await this.dao.findUser(email);
  };
  //createUser (arma el DTO)
  createUser = async (user) => {
    console.log("llego al repository")
    return await this.dao.createUser(user);
  };
}
