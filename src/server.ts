import express from "express";
import dotenv from "dotenv";
dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const port = <number>(<unknown>process.env.PORT);
const host = <string>process.env.HOST;

app.get("/", (req, res) => {
   res.status(200).json({ msg: "Hello World" });
});

app.listen(port, host, () => {
   console.log(`Server listening at http://${host}:${port}`);
});
