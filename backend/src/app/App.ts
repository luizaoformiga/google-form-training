import express from "express"; //static,
import database from "@/database";
import cors from "cors";
import router from "./routes/router";

const app = express();

database.connect();

//middleware
app.use(cors());
app.use(express.static("public"));
app.use(express.json());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

app.use(router); //"/api", 

export default app;