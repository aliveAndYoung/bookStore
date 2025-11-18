const express = require("express");
const {
    getBooks,
    getBook,
    createBook,
    updateBook,
    deleteBook,
} = require("../controllers/booksController");
const { protect, authorize } = require("../middlewares/authentication");

const router = express.Router();

router.route("/").get(getBooks).post(protect, authorize("admin"), createBook);

router
    .route("/:id")
    .get(getBook)
    .put(protect, authorize("admin"), updateBook)
    .delete(protect, authorize("admin"), deleteBook);

module.exports = router;
