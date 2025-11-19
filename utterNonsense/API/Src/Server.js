import express from "express";
import notesRoutes from "./Routes/notesRoutes.js";
import { connect } from "mongoose";
import { connectDb } from "./Config/db.js";
import dotenv from "dotenv";
dotenv.config({ quiet: true });
const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use((_req, _res, next) => {
    console.log(
        `(  ${_req.ip}  )  -> ( ${_req.method}  ) -> (  ${
            _req.originalUrl
        } ) @ ( ${new Date().toISOString()} ) `
    );
    next();
});
app.use("/api/notes", notesRoutes);
connectDb()
    .then(() => {
        console.log("Connected to the database");

        app.listen(port, () => {
            console.log(`Server started on port ${port}`);
        });
    })
    .catch((err) => {
        console.error("Failed to connect to the database", err);
    });
