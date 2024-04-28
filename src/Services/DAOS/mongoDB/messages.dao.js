import { messageModel } from "../../Models/chat.model.js";

class MessageDao {
  async addMessage(newMessage) {
    try {
      await messageModel.create(newMessage);
    } catch (error) {
      return error;
    }
  }
}

export default new MessageDao();
