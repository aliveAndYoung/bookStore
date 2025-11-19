import express from "express";
import notesRoutes from "./Routes/notesRoutes.js";
import { connect } from "mongoose";
import { connectDb } from "./Config/db.js";
import dotenv from "dotenv";
dotenv.config({ quiet: true });
const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
connectDb();
app.use("/api/notes", notesRoutes);

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});
