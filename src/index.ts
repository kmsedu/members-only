import dotenv from "dotenv";
dotenv.config();

import path from "node:path";
import { fileURLToPath } from "node:url";
import mongoose from "mongoose";
import express, { urlencoded, json } from "express";
import { router } from "./router.js";
import session from "express-session";
import passport from "passport";
import { User } from "./models/user.model.js";
import { Auth } from "./util/auth.js";

export const __filename = fileURLToPath(import.meta.url);
export const __dirname = path.dirname(__filename);

const app = express();

const DB_STRING = process.env.DB_STRING;
const SESSION_SECRET = process.env.SESSION_SECRET;
const PORT = process.env.PORT;

if (!DB_STRING || !SESSION_SECRET || !PORT) {
    throw new Error(
        "Error getting environmental variables, check .env file or environment."
    );
}

mongoose.connect(DB_STRING);

app.set("views", path.join(__dirname, "views"));
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
app.use(express.static(path.join(__dirname, "/public")));
app.use(router);

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});
