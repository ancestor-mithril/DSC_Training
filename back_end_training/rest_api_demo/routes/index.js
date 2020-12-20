const router = require("express").Router();
const authRoutes = require("./auth.route");
const authorRoutes = require("./authors.route");
const bookRoutes = require("./books.route");


router.use("/auth", authRoutes);
router.use("/authors", authorRoutes);
router.use("/books", bookRoutes);

module.exports = router;