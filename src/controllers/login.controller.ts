import type { Request, Response } from "express";
import passport from "passport";

export class LoginController {
    public static get(req: Request, res: Response) {
        if (req.user) {
            return res.redirect("/");
        }

        if (req.headers.referer && req.headers.referer.endsWith("/login")) {
            return res.render("login", {
                errors: ["Invalid username or password"],
            });
        }

        return res.render("login", {
            errors: null,
        });
    }

    public static readonly post = passport.authenticate("local", {
        successRedirect: "/",
        failureRedirect: "/login",
    });
}
