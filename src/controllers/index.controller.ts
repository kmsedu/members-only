import type { Request, Response } from "express";
import { Message } from "../models/message.model.js";
import htmlString from "he";

export class IndexController {
    private static readonly PAGE_TITLE = "Veiled";

    public static async get(req: Request, res: Response) {
        const posts = await Message.find()
            .populate("author", { _id: 0, first_name: 1 })
            .exec();

        if (!posts) {
            return res.send("No posts found on database.");
        }

        for (let i = 0; i < posts.length; i++) {
            posts[i].title = htmlString.unescape(posts[i].title);
            posts[i].message = htmlString.unescape(posts[i].message);
        }

        if (!req.user) {
            return res.render("index", {
                title: IndexController.PAGE_TITLE,
                user: null,
                posts,
            });
        }
        return res.render("index", {
            title: IndexController.PAGE_TITLE,
            user: req.user,
            posts,
        });
    }
}
