const flairQueries = require("../db/queries.flairs.js");
module.exports = {
  index(req, res, next){ //creating a function called index
  //  res.send("TODO: list all flairs");
  flairQueries.getAllFlairs((err, flairs) => {
//  console.log(err);
//#3
        if(err){
          res.redirect(500, "static/index");
        } else {
          res.render("flairs/index", {flairs, title: "Flairs"});
          //res.render("flairs/index", { flairs, title: "Flairs"  });
        }
      })
  },//index

  new(req, res, next){
      res.render("flairs/new");
    }
}//module.exports close
