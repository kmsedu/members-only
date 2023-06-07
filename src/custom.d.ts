import { IUser } from "./models/user.ts";

declare global {
    namespace Express {
        export interface User extends IUser {}
    }
}
