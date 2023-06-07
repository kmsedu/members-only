import { User, MemberStatus } from "../models/user.js";
import { body, validationResult } from "express-validator";
import type { Request, Response } from "express";
import bcrypt from "bcrypt";
import { checkIsUser } from "../util/check-is-user.js";

export class SignUpController {
    public post = [
        body("first-name", "First name can not be empty.")
            .notEmpty()
            .trim()
            .escape(),
        body("second-name", "Second name can not be empty.")
            .notEmpty()
            .trim()
            .escape(),
        body("username", "Must be a valid email address.")
            .isEmail()
            .notEmpty()
            .trim()
            .escape()
            .custom(async (username) => {
                const isUser = await checkIsUser(username);

                if (isUser) {
                    throw new Error("Username/Email address already in use");
                }
            }),
        body(
            "password",
            "Password must be at least 8 characters long, and contain at least 1 uppercase character."
        )
            .notEmpty()
            .withMessage("Password can not be empty")
            .trim()
            .isStrongPassword({
                minLength: 8,
                minUppercase: 1,
                minSymbols: 0,
                minNumbers: 0,
                minLowercase: 0,
            }),
        body("confirm-password", "Passwords do not match")
            .notEmpty()
            .trim()
            .custom((value, { req }) => {
                return value === req.body["password"];
            }),

        async function (req: Request, res: Response) {
            const validationErrors = validationResult(req);

            if (!validationErrors.isEmpty()) {
                const formData = {
                    "first-name": req.body["first-name"],
                    "second-name": req.body["second-name"],
                    username: req.body["username"],
                };

                return res.render("sign-up-form", {
                    user: formData,
                    errors: validationErrors,
                });
            }

            const newUser = new User({
                first_name: req.body["first-name"],
                second_name: req.body["second-name"],
                username: req.body["username"],
                password: await bcrypt.hash(req.body["password"], 10),
                member_status: MemberStatus.STANDARD,
            });

            await newUser.save();
            res.redirect("/");
        },
    ];
}
