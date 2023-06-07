import mongoose from "mongoose";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import express, { urlencoded, json } from "express";
import { router } from "./router.js";
import nconf from "nconf";
import session from "express-session";
import passport from "passport";
import { User } from "./models/user.model.js";
import { Auth } from "./util/auth.js";

const __dirname = dirname(fileURLToPath(import.meta.url));
nconf.env().file({ file: join(__dirname, "config/config.json") });

const PORT = nconf.get("PORT");
const DB_STRING = nconf.get("DB_STRING");
const SESSION_SECRET = nconf.get("SESSION_SECRET");
const app = express();

mongoose.connect(DB_STRING);

app.set("views", join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(
    session({
        secret: SESSION_SECRET,
        resave: false,
        saveUninitialized: true,
    })
);

passport.use(Auth.localStrategy);

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
