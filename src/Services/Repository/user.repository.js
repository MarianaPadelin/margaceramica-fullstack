export default class UserRepository {
  constructor(dao) {
    this.dao = dao;
  }
  getAll = async () => {
    return await this.dao.getAll();
  };
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
  findUser = async (email) => {
    return await this.dao.findUser(email);
  };
  createUser = async (user) => {
    return await this.dao.createUser(user);
  };
}
