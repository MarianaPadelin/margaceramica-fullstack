import { Router } from "express";

const router = Router()

router.get("/login", (req,res) => {
    res.render("github")
})


router.get("/error", (req, res) => {
    res.render("error", { error: "No se pudo autenticar la cuenta con github"})
});


export default router;