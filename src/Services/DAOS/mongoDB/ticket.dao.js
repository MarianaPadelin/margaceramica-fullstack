import { ticketModel } from "../../Models/ticket.model.js";
import mongoose from "mongoose";


export default class TicketDao {
  async getAll() {
    return await ticketModel.find();
  }
//verificar el populate del cart
  async findOneTicket(_id) {
    try {
      if (mongoose.Types.ObjectId.isValid(_id)) {
        const ticket = await ticketModel.findById(_id).populate("cart._id")
        return ticket
      }
      return { error: "Id format not valid" };
    } catch (error) {
      return error;
    }
  }
  async generateTicket(newTicket) {
    try {
      return await ticketModel.create(newTicket);
    } catch (error) {
      return error;
    }
  }
}


// export default new TicketDao();