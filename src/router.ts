import { Router } from "express";
import { SignUpController } from "./controllers/sign-up-controller.js";

const SignUp = new SignUpController();

const router = Router();

router.get("/", (req, res, next) => {
  res.render("index");
});

router.get("/sign-up-form", (req, res, next) => {
  res.render("sign-up-form", {
    user: null,
    errors: null,
  });
});

router.post("/sign-up-form", SignUp.post);

export { router };
