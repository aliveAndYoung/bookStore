const mongoose = require("mongoose");

const BookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Please add a title"],
        trim: true,
        maxlength: [100, "Title cannot be more than 100 characters"],
    },
    author: {
        type: String,
        required: [true, "Please add an author"],
        trim: true,
        maxlength: [50, "Author name cannot be more than 50 characters"],
    },
    price: {
        type: Number,
        required: [true, "Please add a price"],
        min: [0, "Price must be at least 0"],
    },
    ISBN: {
        type: String,
        required: [true, "Please add an ISBN"],
        unique: true,
        trim: true,
        maxlength: [13, "ISBN cannot be more than 13 characters"],
    },
    publishedDate: {
        type: Date,
        required: [true, "Please add a published date"],
    },
    genre: {
        type: String,
        required: [true, "Please add a genre"],
        enum: [
            "Fiction",
            "Non-Fiction",
            "Science Fiction",
            "Fantasy",
            "Mystery",
            "Thriller",
            "Romance",
            "Biography",
            "History",
            "Self-Help",
            "Other",
        ],
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model("Book", BookSchema);
