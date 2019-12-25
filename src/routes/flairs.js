const express = require("express");
const router = express.Router();

const flairController = require("../controllers/flairController")
module.exports = router;

router.get("/flairs", flairController.index);
