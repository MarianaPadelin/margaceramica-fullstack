import { Router } from "express";
import { passportCall, authorization } from "../../utils/authorizations.js";
// import { passportCall, authorization } from "../../utils/dirname.js";
import {
  getAllTickets,
  getTicketById,
} from "../../Controllers/API/ticket.controller.js";

const router = Router();

router.get("/", passportCall("jwt"), authorization(["admin"]), getAllTickets);

router.get(
  "/:id",
  passportCall("jwt"),
  authorization(["premium", "user"]),
  getTicketById
);

export default router;
