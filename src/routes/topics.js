const express = require("express");
const router = express.Router();

const topicController = require("../controllers/topicController"); //defining a constant variable called topicController. The value of this variable is
//the path of topicController

router.get("/topics", topicController.index); //for the route /topics, call the function index from topicController (the variable topicController is defined above)
router.get("/topics/new", topicController.new);
router.post("/topics/create", topicController.create);
router.get("/topics/:id", topicController.show);
router.post("/topics/:id/destroy", topicController.destroy);
router.get("/topics/:id/edit", topicController.edit);
router.post("/topics/:id/update", topicController.update);

module.exports = router;
