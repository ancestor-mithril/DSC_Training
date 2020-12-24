const router = require("express").Router();
const { bookController } = require("../controllers");
const { payloadValidation, requireAdmin } = require("../middlewares");
const { book, bookId, bookTitle, authorName } = require("../schemas");


router.post("/create", requireAdmin, payloadValidation(book), bookController.create);
router.get("/", bookController.getBooks);
router.get("/get_book", payloadValidation(bookId) ,bookController.getBook);
router.get("/search_book_by_title", payloadValidation(bookTitle) ,bookController.searchBookByTitle);
router.get("/search_book_by_author", payloadValidation(authorName) ,bookController.searchBookByAuthor);

module.exports = router;