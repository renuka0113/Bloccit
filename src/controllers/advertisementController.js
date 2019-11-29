const advertisementQueries = require("../db/queries.advertisements.js");

module.exports = {
  index(req, res, next){     //creating a function called index
  //  res.send("TODO: list all topics");
advertisementQueries.getAllAdvertisements((err, advertisements) => {

//#3
        if(err){
          res.redirect(500, "static/index");
        } else {
          res.render("advertisements/index", { advertisements, title: "Advertisements" });
        }
      })
  },

  new(req, res, next){
     res.render("advertisements/new");
   },

   create(req, res, next){
     let newAdvertisement ={
       title:req.body.title,
       description:req.body.description
     };//let variable
     advertisementQueries.addAdvertisement(newAdvertisement,(err, advertisement) => {
       if(err){
         res.redirect(500, "advertisements/new");
       } else{
         res.redirect(303, `/advertisements/${advertisement.id}`);
       }
     });
   },//create

   show(req, res, next){
     advertisementQueries.getAdvertisement(req.params.id,(err, advertisement) => {
       if(err||advertisement==null){
         res.redirect(404, "/");
       } else{
         res.render("advertisements/show", {advertisement});
       }
     });
   }//show close


}
