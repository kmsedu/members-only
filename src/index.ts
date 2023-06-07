import mongoose from "mongoose";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import express, { urlencoded, json } from "express";
import { router } from "./router.js";
import nconf from "nconf";

const __dirname = dirname(fileURLToPath(import.meta.url));
nconf.env().file({ file: join(__dirname, "config/config.json") });

const PORT = nconf.get("PORT");
const DB_STRING = nconf.get("DB_STRING");
const app = express();

mongoose.connect(DB_STRING);

app.set("views", join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(urlencoded({ extended: false }));
app.use(json());
app.use(router);

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});
