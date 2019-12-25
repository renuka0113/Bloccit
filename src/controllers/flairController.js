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
    },

create(req, res, next){
     let newFlair = {
       name: req.body.name,
       color: req.body.color
     };
     flairQueries.addFlair(newFlair, (err, flair) => {
       if(err){
         res.redirect(500, "/flairs/new");
       } else {
         res.redirect(303, `/flairs/${flair.id}`);
       }
     });
   },

   show(req, res, next){
     flairQueries.getFlair(req.params.id, (err, flair) => {
        if(err || flair == null){
         res.redirect(404, "/");
       } else {
         res.render("flairs/show", {flair});
       }
     });
   }
}//module.exports close
