const express = require("express");
const router = express.Router();
const staticController = require("../controllers/staticController");//importing staticController module into static.js

//router is a Router instance
/*router.get("/", (req, res, next) => {
  res.send("Welcome to Bloccit");
});*/

router.get("/", staticController.index);

router.get("/marco",(req, res, next) => {
  res.send("polo"); //what we are doing for the route "marco" is the same as what we did for the routes "/" or "/about" or "/topics".
});//For "/","/about","/topics" routes, the (req,res,next) part is in their respective controller files.For example, for "/" route it isin staticController.index
//For "/topics" route it is in topicController.js and same for "/about" route, this part of (req,res,next) is in staticController,topic function.

module.exports = router;
