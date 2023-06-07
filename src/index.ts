import mongoose from "mongoose";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import express, { urlencoded, json } from "express";
import { router } from "./router.js";
import nconf from "nconf";
import session from "express-session";
import passport from "passport";
import { Strategy } from "passport-local";
import { User } from "./models/user.js";
import bcrypt from "bcrypt";

const __dirname = dirname(fileURLToPath(import.meta.url));
nconf.env().file({ file: join(__dirname, "config/config.json") });

const PORT = nconf.get("PORT");
const DB_STRING = nconf.get("DB_STRING");
const SESSION_SECRET = nconf.get("SESSION_SECRET");
const app = express();
const LocalStrategy = Strategy;

mongoose.connect(DB_STRING);

app.set("views", join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(
    session({ secret: SESSION_SECRET, resave: false, saveUninitialized: true })
);

passport.use(
    new LocalStrategy(async (username, password, done) => {
        try {
            const user = await User.findOne({ username });

            if (!user) {
                return done(null, false, {
                    message: "Incorrect username or password",
                });
            }

            bcrypt.compare(password, user.password, function (error, isMatch) {
                if (error) {
                    return done(null, false, {
                        message: "Incorrect username or password",
                    });
                }

                if (isMatch === false) {
                    return done(null, false, {
                        message: "Incorrect username or password",
                    });
                }

                return done(null, user);
            });
        } catch (error) {
            return done(error);
        }
    })
);

passport.serializeUser(function (user, done) {
    done(null, user.id);
});

passport.deserializeUser(async function (id: string, done) {
    try {
        const user = await User.findById(id);
        done(null, user);
    } catch (error) {
        done(error);
    }
});

app.use(passport.initialize());
app.use(passport.session());

app.use(urlencoded({ extended: false }));
app.use(json());
app.use(router);

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});
