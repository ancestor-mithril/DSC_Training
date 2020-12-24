const router = require("express").Router();
const { bookController } = require("../controllers");
const { payloadValidation, requireAdmin } = require("../middlewares");
const { book } = require("../schemas");


router.post("/create", requireAdmin, payloadValidation(book), bookController.create);
router.get("/", bookController.getBooks);

module.exports = router;