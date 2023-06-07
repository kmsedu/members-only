import type { Request, Response } from "express";
import { body, validationResult } from "express-validator";
import nconf from "nconf";
import { MemberStatus, User } from "../models/user.model.js";
import { fileURLToPath } from "url";
import path from "path";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const src = __dirname.replace("/controllers", "");

nconf.env().file({ file: path.join(src, "/config/config.json") });

const MEMBER_CODE = nconf.get("MEMBER_CODE");

export class MemberController {
    public static get(req: Request, res: Response) {
        if (!req.user) {
            return res.redirect("/");
        }
        return res.render("members", {
            user: req.user,
            errors: null,
        });
    }

    public static post = [
        body("code")
            .escape()
            .trim()
            .matches(MEMBER_CODE)
            .withMessage("Incorrect member code."),

        async function (req: Request, res: Response) {
            const validationErrors = validationResult(req);

            if (!req.user) {
                return res.redirect("/");
            }

            if (!validationErrors.isEmpty()) {
                return res.render("members", {
                    user: req.user,
                    errors: validationErrors,
                });
            }

            const user = await User.findById(req.user.id);
            if (user) {
                user.member_status = MemberStatus.MEMBER;
                await user.save();
            }

            return res.redirect("/");
        },
    ];
}
