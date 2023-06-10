import dotenv from "dotenv";
dotenv.config();

import type { Request, Response } from "express";
import { body, validationResult } from "express-validator";
import { MemberStatus, User } from "../models/user.model.js";

export class MemberController {
    private static getMemberCode() {
        const MEMBER_CODE = process.env.MEMBER_CODE;

        if (!MEMBER_CODE) throw new Error("Unable to get MEMBER_CODE from env");

        return MEMBER_CODE;
    }

    private static readonly PAGE_TITLE = "Members area";

    public static get(req: Request, res: Response) {
        if (!req.user || req.user.member_status !== 0) {
            return res.redirect("/");
        }
        return res.render("member", {
            title: MemberController.PAGE_TITLE,
            user: req.user,
            errors: null,
        });
    }

    public static post = [
        body("code")
            .escape()
            .trim()
            .matches(MemberController.getMemberCode())
            .withMessage("Incorrect member code."),

        async function (req: Request, res: Response) {
            const validationErrors = validationResult(req);

            if (!req.user) {
                return res.redirect("/");
            }

            if (!validationErrors.isEmpty()) {
                return res.render("member", {
                    title: MemberController.PAGE_TITLE,
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
