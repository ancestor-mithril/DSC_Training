const router = require("express").Router();
const authRoutes = require("./auth.route");
const authorRoutes = require("./authors.route");
const bookRoutes = require("./books.route");
const userRoutes = require("./users.route");
const { requireAuth, requireAdmin } = require("../middlewares");


router.use("/auth", authRoutes);
router.use("/authors", requireAuth, authorRoutes);
router.use("/books", requireAuth, bookRoutes);
router.use("/users", requireAuth, requireAdmin, userRoutes);

module.exports = router;