import { NextFunction, Request, Response } from "express";

export class LogoutController {
    public static get(req: Request, res: Response, next: NextFunction) {
        req.logout((error) => {
            if (error) {
                return next(error);
            }
            res.redirect("/");
        });
    }
}
