import { IUser } from "./models/user.model.ts";

declare global {
    namespace Express {
        export interface User extends IUser {}
    }
}
