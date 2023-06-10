import type { Request, Response } from "express";
import { MemberStatus } from "../models/user.model.js";
import { Message } from "../models/message.model.js";

export class DeleteController {
    public static get(req: Request, res: Response) {
        if (!req.user || req.user.member_status !== MemberStatus.ADMIN) {
            return res.redirect("/");
        }

        return res.render("delete", {
            title: "Delete message",
            id: req.params.id,
            user: req.user,
        });
    }

    public static async post(req: Request, res: Response) {
        if (!req.user || req.user.member_status !== MemberStatus.ADMIN) {
            return res.redirect("/");
        }

        const result = await Message.findByIdAndDelete(req.params.id);

        if (!result) {
            console.error("Unable to find message ID in database");
        }

        return res.redirect("/");
    }
}
