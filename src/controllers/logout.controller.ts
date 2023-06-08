import type { Request, Response, NextFunction } from "express";

export class LogoutController {
    public static get(req: Request, res: Response, next: NextFunction) {
        req.logout((error) => {
            if (error) {
                return next(error);
            }
            return res.redirect("/");
        });
    }
}
