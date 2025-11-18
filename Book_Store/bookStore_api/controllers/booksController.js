const Book = require("../models/books");

// @desc    Get all books
// @route   GET /api/books
// @access  Public
const getBooks = async (req, res, next) => {
    try {
        const books = await Book.find();
        res.status(200).json({
            success: true,
            count: books.length,
            data: books,
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            error: "Server Error",
        });
    }
};

// @desc    Get single book
// @route   GET /api/books/:id
// @access  Public
const getBook = async (req, res, next) => {
    try {
        const book = await Book.findById(req.params.id);

        if (!book) {
            return res.status(404).json({
                success: false,
                error: "Book not found",
            });
        }

        res.status(200).json({
            success: true,
            data: book,
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            error: "Server Error",
        });
    }
};

// @desc    Create new book
// @route   POST /api/books
// @access  Private (Admin)
const createBook = async (req, res, next) => {
    try {
        const book = await Book.create(req.body);

        res.status(201).json({
            success: true,
            data: book,
        });
    } catch (err) {
        if (err.name === "ValidationError") {
            const messages = Object.values(err.errors).map(
                (val) => val.message
            );
            return res.status(400).json({
                success: false,
                error: messages,
            });
        } else if (err.code === 11000) {
            return res.status(400).json({
                success: false,
                error: "ISBN already exists",
            });
        } else {
            return res.status(500).json({
                success: false,
                error: "Server Error",
            });
        }
    }
};

// @desc    Update book
// @route   PUT /api/books/:id
// @access  Private (Admin)
const updateBook = async (req, res, next) => {
    try {
        const book = await Book.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });

        if (!book) {
            return res.status(404).json({
                success: false,
                error: "Book not found",
            });
        }

        res.status(200).json({
            success: true,
            data: book,
        });
    } catch (err) {
        if (err.name === "ValidationError") {
            const messages = Object.values(err.errors).map(
                (val) => val.message
            );
            return res.status(400).json({
                success: false,
                error: messages,
            });
        } else if (err.code === 11000) {
            return res.status(400).json({
                success: false,
                error: "ISBN already exists",
            });
        } else {
            return res.status(500).json({
                success: false,
                error: "Server Error",
            });
        }
    }
};

// @desc    Delete book
// @route   DELETE /api/books/:id
// @access  Private (Admin)
const deleteBook = async (req, res, next) => {
    try {
        const book = await Book.findByIdAndDelete(req.params.id);

        if (!book) {
            return res.status(404).json({
                success: false,
                error: "Book not found",
            });
        }

        res.status(200).json({
            success: true,
            data: {},
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            error: "Server Error",
        });
    }
};

module.exports = {
    getBooks,
    getBook,
    createBook,
    updateBook,
    deleteBook,
};
