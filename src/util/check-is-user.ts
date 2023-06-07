import { User } from "../models/user.js";

export async function checkIsUser(username: string) {
    const searchedUser = await User.findOne({ username });

    if (searchedUser === undefined || searchedUser === null) {
        return false;
    }

    return true;
}
