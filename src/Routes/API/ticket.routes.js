import { Router } from "express";
import { passportCall, authorization } from "../../utils/authorizations.js";
import {
  getAllTickets,
  getTicketById,
} from "../../Controllers/API/ticket.controller.js";
import cors from "cors";
import config from "../../config/config.js";

const router = Router();

router.use(
  cors({
    credentials: true,
    origin: config.rootUrl,
  })
);

router.get("/", passportCall("jwt"), authorization(["admin"]), getAllTickets);

router.get(
  "/:id",
  passportCall("jwt"),
  authorization(["premium", "user"]),
  getTicketById
);

export default router;
