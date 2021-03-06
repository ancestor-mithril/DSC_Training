const router = require("express").Router();
const { bookController } = require("../controllers");
const { payloadValidation, requireAdmin } = require("../middlewares");
const { book, bookId, bookTitle, authorName } = require("../schemas");


router.post("/create", requireAdmin, payloadValidation(book), bookController.create);
router.get("/", bookController.getBooks);
router.get("/get_book", payloadValidation(bookId) ,bookController.getBook);
router.get("/search_book_by_title", payloadValidation(bookTitle) ,bookController.searchBookByTitle);
router.get("/search_book_by_author", payloadValidation(authorName) ,bookController.searchBookByAuthor);
router.put("/update", requireAdmin, payloadValidation(book), bookController.update);
router.delete("/delete", requireAdmin, payloadValidation(bookId), bookController.deleteBook);
router.post("/buy_book", payloadValidation(bookId), bookController.buyBook);

module.exports = router;