import express, { json, urlencoded } from "express"
import * as dotenv from "dotenv"
dotenv.config()
import cors from "cors";
import { allowCors, error404, generalErrorHandler } from "./middlewares/index.js";
import router from "./routes/index.js";
import cookieParser from "cookie-parser";

const app = express()
const { CLIENT_URL } = process.env;

console.log(CLIENT_URL)

const whitelist = {
    origin: ['http://localhost:3000', CLIENT_URL,]
}

app.set("trust proxy", 1);
app.use(cookieParser());
app.use(cors({
    origin: 'http://127.0.0.1:3000',
    credentials: true
}));

console.log("holitas")
console.log("hello world")

app.use(json({ limit: "50mb" }));
app.use(urlencoded({ extended: true, limit: "50mb" }));
app.use('/', router)
app.use('/{*any}', error404)
app.use(generalErrorHandler)

export default app