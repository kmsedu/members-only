import type { Request, Response } from "express";
import passport from "passport";

export class LoginController {
    public static get(req: Request, res: Response) {
        res.render("login", {
            user: null,
            errors: null,
        });
    }

    public static readonly post = passport.authenticate("local", {
        successRedirect: "/",
        failureRedirect: "/",
    });
}
