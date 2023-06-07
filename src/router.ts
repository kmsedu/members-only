import { Router } from "express";
import { SignupController } from "./controllers/signup_controller.js";
import { LoginController } from "./controllers/login_controller.js";
import { LogoutController } from "./controllers/logout_controller.js";

const router = Router();

router.get("/", (req, res) => {
    console.log(req.user);
    res.render("index");
});

router.get("/members", (req, res) => {
    res.render("members", {
        user: null,
        errors: null,
    });
});

router.get("/signup", SignupController.get);
router.post("/signup", SignupController.post);

router.get("/login", LoginController.get);
router.post("/login", LoginController.post);

router.get("/logout", LogoutController.get);

export { router };
