import express from "express";
import { router } from "./router.js";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();

app.set("views", join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(router);

app.listen(8000, () => console.log("Server listening on port 8000."));
