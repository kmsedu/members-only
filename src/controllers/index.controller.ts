import type { Request, Response } from "express";

export class IndexController {
    public static readonly get = (req: Request, res: Response) => {
        if (!req.user) {
            return res.render("index", {
                user: null,
            });
        }
        return res.render("index", {
            user: req.user,
        });
    };
}
