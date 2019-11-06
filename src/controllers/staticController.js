module.exports = {
  index(req, res, next){   //index is a function that will contain the route handler for the / route in src/routes/static.js
    //res.send("Welcome to Bloccit");
    res.render("static/index", {title: "Welcome to Bloccit"}); //render method takes the location of the template and an object containing the data we wish to make available in the template.<%= title %> will now return "Welcome to Bloccit."
  }
}
