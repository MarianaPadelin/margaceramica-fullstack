import { ticketService } from "../../Services/services.js";
import config from "../../config/config.js";
import __dirname from "../../dirname.js";

export const getAllTickets = async (req, res) => {
  try {
    const ticketList = await ticketService.getAll();
    res.json({
      message: "These are the tickets",
      data: ticketList,
    });
  } catch (error) {
    req.logger.error(error);
    return res.status(500).send({
      status: "error",
      error: "Error al traer los tickets.",
    });
  }
};

export const getTicketById = async (req, res) => {
  try {
    const { id } = req.params;
    const { email } = req.user
    const ticket = await ticketService.getById(id);
    if (email === ticket.purchaser){
      if (!ticket) {
        return res.status(404).json({
          message: "Ticket id not found",
        });
      }
     return res.json({
        message: `this is the ticket with id ${id}`,
        data: ticket,
      });
    }
    return res.json({
      message: `you can't access a ticket from a different email account`,
    });
    
  } catch (error) {
    req.logger.error(error);
    return res.status(500).send({
      status: "error",
      error: "Error al traer el ticket.",
    });
  }
};
