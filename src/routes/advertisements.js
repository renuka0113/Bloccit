const express = require("express");
const router = express.Router();

const advertisementController = require("../controllers/advertisementController")
 router.get("/advertisements/new", advertisementController.new);

router.get("/advertisements", advertisementController.index);

module.exports = router;
