const router = require("express").Router();
const { bookController } = require("../controllers");
const { payloadValidation } = require("../middlewares");
const { book } = require("../schemas");


router.post("/create", payloadValidation(book), bookController.create);

module.exports = router;