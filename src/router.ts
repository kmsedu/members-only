import { IndexController } from "./controllers/index.controller.js";
import { SignupController } from "./controllers/signup.controller.js";
import { LoginController } from "./controllers/login.controller.js";
import { LogoutController } from "./controllers/logout.controller.js";
import { MemberController } from "./controllers/member.controller.js";
import { MessageController } from "./controllers/message.controller.js";
import { DeleteController } from "./controllers/delete.controller.js";

import { Router } from "express";
const router: Router = Router();

router.get("/", IndexController.get);

router.get("/members", MemberController.get);
router.post("/members", MemberController.post);

router.get("/signup", SignupController.get);
router.post("/signup", SignupController.post);

router.get("/login", LoginController.get);
router.post("/login", LoginController.post);

router.get("/logout", LogoutController.get);

router.get("/message", MessageController.get);
router.post("/message", MessageController.post);

router.get("/delete/:id", DeleteController.get);
router.post("/delete/:id", DeleteController.post);

export { router };
