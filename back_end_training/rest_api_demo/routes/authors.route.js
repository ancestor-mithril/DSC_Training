const router = require("express").Router();
const { authorController } = require("../controllers");
const { payloadValidation } = require("../middlewares");
const { author } = require("../schemas");


router.post("/create", payloadValidation(author), authorController.create);

module.exports = router;