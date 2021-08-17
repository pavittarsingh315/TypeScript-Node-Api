import express from "express";
import dotenv from "dotenv";
import log from "./logger";
import connect from "./db/connect";
import routes from "./routes";
dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const port = <number>(<unknown>process.env.PORT);
const host = <string>process.env.HOST;

app.listen(port, host, () => {
   log.info(`Server listening at http://${host}:${port}`);
   connect();
   routes(app);
});
