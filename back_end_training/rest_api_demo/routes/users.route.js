const router = require("express").Router();
const { userController } = require("../controllers");
const { payloadValidation } = require("../middlewares");
const { user } = require("../schemas");

router.get("/", userController.getUsers);
router.get("/get_user", userController.getUser);
router.patch("/make_admin", payloadValidation(user), userController.makeAdmin);
router.patch("/delete_user", payloadValidation(user), userController.deleteUser);

module.exports = router;