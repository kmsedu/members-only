import { User, MemberStatus } from "../models/user.model.js";
import { validationResult } from "express-validator";
import type { Request, Response } from "express";
import bcrypt from "bcrypt";
import { body, matchedData } from "express-validator";
import { isUser } from "../util/is-user.js";

export class SignupController {
    public static get(req: Request, res: Response) {
        if (req.user) {
            return res.redirect("/");
        }
        return res.render("signup", {
            user: null,
            errors: null,
        });
    }

    public static readonly post = [
        body("first_name")
            .escape()
            .trim()
            .notEmpty()
            .withMessage("First name can not be empty."),
        body("second_name")
            .escape()
            .trim()
            .notEmpty()
            .withMessage("Second name can not be empty"),
        body("username")
            .escape()
            .trim()
            .isEmail()
            .withMessage("Requires a valid email address.")
            .custom(async (username) => {
                const isExistingUser = await isUser(username);

                if (isExistingUser) {
                    throw new Error("Username already in use");
                }
            }),
        body("password")
            .escape()
            .trim()
            .isStrongPassword({
                minLength: 8,
                minUppercase: 1,
                minLowercase: 0,
                minSymbols: 0,
                minNumbers: 0,
            })
            .withMessage(
                "Password must be at least 8 characters long, and contain at least 1 uppercase character."
            ),
        body("confirm_password")
            .custom((password, { req }) => {
                const data = matchedData(req, {
                    onlyValidData: false,
                });

                return data.password === password;
            })
            .withMessage("Passwords do not match"),

        async function (req: Request, res: Response) {
            const validationErrors = validationResult(req);

            if (!validationErrors.isEmpty()) {
                const formData = {
                    first_name: req.body.first_name,
                    second_name: req.body.second_name,
                    username: req.body.username,
                };

                return res.render("signup", {
                    user: formData,
                    errors: validationErrors,
                });
            }

            const newUser = new User({
                first_name: req.body.first_name,
                second_name: req.body.second_name,
                username: req.body.username,
                password: await bcrypt.hash(req.body.password, 10),
                member_status: MemberStatus.STANDARD,
            });

            await newUser.save();
            res.redirect("/");
        },
    ];
}
