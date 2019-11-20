require("dotenv").config();
//dotenv is  node package that assists us with handling environment variables for our development environment

const path = require("path");
const viewsFolder = path.join(__dirname, "..", "views");
 const bodyParser = require("body-parser");

module.exports = {
  init(app,express){
    app.set("views", viewsFolder);
    app.set("view engine", "ejs");
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(express.static(path.join(__dirname, "..", "assets")));

  }
};
