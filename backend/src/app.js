import express from "express"
import * as dotenv from "dotenv"
dotenv.config()
import cors from "cors";
const app = express()
const { CLIENT_URL } = process.env;

console.log(CLIENT_URL)

const whitelist = {
    origin: ['http://localhost:3001', CLIENT_URL,]
}


app.use(cors({
    origin: whitelist
}));

console.log("holitas")

const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})

console.log("hello world")

export default app