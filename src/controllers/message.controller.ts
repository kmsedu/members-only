import type { Request, Response } from "express";
import { body, validationResult } from "express-validator";
import { Message } from "../models/message.model.js";

export class MessageController {
    public static get(req: Request, res: Response) {
        if (!req.user) {
            return res.redirect("/login");
        }

        res.render("message", {
            user: req.user,
            errors: null,
        });
    }

    public static readonly post = [
        body("title")
            .escape()
            .trim()
            .notEmpty()
            .withMessage("Title can not be an empty input")
            .isLength({ min: 3, max: 70 })
            .withMessage("Title must be min 3 chars, and max 70 chars"),

        body("message")
            .escape()
            .trim()
            .notEmpty()
            .withMessage("Message can not be empty")
            .isLength({ min: 8, max: 255 })
            .withMessage("Message must be min 8 chars, and max 255 chars"),

        async function (req: Request, res: Response) {
            if (!req.user) {
                return res.redirect("/login");
            }

            const validationErrors = validationResult(req);

            if (!validationErrors.isEmpty()) {
                const formData = {
                    title: req.body.title,
                    message: req.body.message,
                };

                return res.render("message", { formData });
            }

            const newMessage = new Message({
                title: req.body.title,
                message: req.body.message,
                author: req.user.id,
            });

            await newMessage.save();
            return res.redirect("/");
        },
    ];
}
