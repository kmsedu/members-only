import { Strategy as LocalStrategy } from "passport-local";
import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";

export class Auth {
    public static localStrategy = new LocalStrategy(
        async (username, password, done) => {
            try {
                const user = await User.findOne({ username });

                if (!user) {
                    return done(null, false, {
                        message: "Incorrect username or password",
                    });
                }

                bcrypt.compare(
                    password,
                    user.password,
                    function (error, isMatch) {
                        if (error || isMatch === false) {
                            return done(null, false, {
                                message: "Incorrect username or password",
                            });
                        }

                        return done(null, user);
                    }
                );
            } catch (error) {
                return done(error);
            }
        }
    );
}
