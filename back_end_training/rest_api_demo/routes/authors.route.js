const router = require("express").Router();
const { authorController } = require("../controllers");
const { payloadValidation, requireAdmin } = require("../middlewares");
const { author, authorId, authorName, bookTitle } = require("../schemas");


router.post("/create", requireAdmin, payloadValidation(author), authorController.create);
router.get("/", authorController.getAuthors);
router.get("/get_author", payloadValidation(authorId), authorController.getAuthor);
router.get("/search_author_by_name", payloadValidation(authorName), authorController.searchAuthorByName);
router.get("/search_author_by_book", payloadValidation(bookTitle), authorController.searchAuthorByBook);
router.put("/update", requireAdmin, payloadValidation(author), authorController.update);
router.delete("/delete", requireAdmin, payloadValidation(authorId), authorController.deleteAuthor);

module.exports = router;