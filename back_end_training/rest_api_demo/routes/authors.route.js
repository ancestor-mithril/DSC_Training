const router = require("express").Router();
const { authorController } = require("../controllers");
const { payloadValidation, requireAdmin } = require("../middlewares");
const { author, authorId } = require("../schemas");


router.post("/create", requireAdmin, payloadValidation(author), authorController.create);
router.get("/", authorController.getAuthors);
router.get("/get_author", payloadValidation(authorId) ,authorController.getAuthor);

module.exports = router;