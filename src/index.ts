import express from "express";
const app = express();
import "dotenv/config";
import cors from "cors";
import cookieParser from "cookie-parser";
import { env } from "./env";

import CreateServer from "./routes/create-server";

app.use(cookieParser());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", CreateServer);

app.listen(env.PORT, () => {
  console.log("Server is running", process.env.PORT);
});
