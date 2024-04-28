import { Router } from "express";
import { getMocks } from "../../Controllers/API/mocking.controller.js";

const router = Router();

router.get("/", getMocks);

export default router;
