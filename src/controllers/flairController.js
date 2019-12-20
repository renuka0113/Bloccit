const flairQueries = require("../db/queries.flairs.js");
module.exports = {
  index(req, res, next){ //creating a function called index
  //  res.send("TODO: list all topics");
  flairQueries.getAllFlairs((err, flairs) => {
//  console.log(err);
//#3
        if(err){
          res.redirect(500, "static/index");
        } else {
          //res.render("topics/index", {topics});
          res.render("flairs/index", { flairs });
        }
      })
  }//index
}//module.exports close
