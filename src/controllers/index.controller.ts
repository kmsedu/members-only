import type { Request, Response } from "express";
import { Message } from "../models/message.model.js";

export class IndexController {
    public static async get(req: Request, res: Response) {
        const posts = await Message.find()
            .populate("author", { _id: 0, first_name: 1 })
            .exec();

        if (!posts) {
            return res.send("No posts found on database.");
        }

        if (!req.user) {
            return res.render("index", {
                user: null,
                posts,
            });
        }
        return res.render("index", {
            user: req.user,
            posts,
        });
    }
}
