const router = require("express").Router();
const articleRoutes = require("./article");

// Book routes
router.use("/article", articleRoutes);

module.exports = router;
