import { Router } from "express"; 
import { getLogger } from "../../Controllers/API/logger.controller.js";


const router = Router();
router.get("/", getLogger);

export default router;