import express from "express";
import http from "http";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import compression from "compression";
import cors from "cors";
import mongoose from "mongoose";
import router from "./routers/index";

const app = express();
app.use(
    cors({
        credentials: true,
    })
);
app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());

const server = http.createServer(app);
server.listen(8080, () => {
    console.log("server up and running @ http://localhost:8080");
});

const MONGO_URI = " HERE_GOES_YOUR_MONGO_URI";

console.log(MONGO_URI);

mongoose.Promise = Promise;
mongoose.connect(MONGO_URI);
mongoose.connection.on("error", (error: Error) => console.log(error));

const theroute = router();

app.use("/auth", theroute);
