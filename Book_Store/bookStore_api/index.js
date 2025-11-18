// basic dependencies config
require("dotenv").config();
const morgan = require("morgan");
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

// importing used routes
const bookRoutes = require("./routes/bookRoutes");
const authRoutes = require("./routes/authRoutes");

// importing used middlewares
const errorHandler = require("./middlewares/globalErrorHandeler");

// creating the app
const app = express();

// applying the middlewares
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// using the routes
app.use("/api/books", bookRoutes);
app.use("/api/auth", authRoutes);

// gglobal error handeler
app.use(errorHandler);

// connecting to DB
mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
        // running the app
        app.listen(process.env.PORT, () => {
            console.log(
                `Connected to DB & Server running on port ${process.env.PORT}`
            );
        });
    })
    .catch((error) => {
        console.log(error);
    });
