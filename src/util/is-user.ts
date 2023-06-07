import { User } from "../models/user.model.js";

/**
 * Checks the database for existing User with matching username property.
 *
 * @param username {string} - Username to find in the database.
 * @returns `Promise<boolean>`
 */

export async function isUser(username: string) {
    const user = await User.findOne({ username });

    if (user === undefined || user === null) {
        return false;
    }

    return true;
}
