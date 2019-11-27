const advertisementQueries = require("../db/queries.advertisements.js");

module.exports = {
  index(req, res, next){     //creating a function called index
  //  res.send("TODO: list all topics");
advertisementQueries.getAllAdvertisements((err, advertisements) => {

//#3
        if(err){
          res.redirect(500, "static/index");
        } else {
          res.render("advertisements/index", {advertisements});
        }
      })
  }
}
