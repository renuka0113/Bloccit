const advertisementQueries = require("../db/queries.advertisements.js");

module.exports = {
  index(req, res, next){     //creating a function called index
  //  res.send("TODO: list all topics");
  console.log("inside index function");
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
    console.log("inside new function");
     res.render("advertisements/new");
   },

   create(req, res, next){
     console.log("this is create function");
     let newAdvertisement ={
       title:req.body.title,
       description:req.body.description
     };//let variable
    // console.log('Inside create advertisement')
     advertisementQueries.addAdvertisement(newAdvertisement,(err, advertisement) => {
       if(err){
         //console.log(err);
        // console.log('Inside create advertisement error thrown')
         res.redirect(500, "/advertisements/new");
       } else{
        //  console.log('Inside create advertisement successfull')
         res.redirect(303, `/advertisements/${advertisement.id}`);
       }
     });
   },//create

   show(req, res, next){
     console.log("inside show function");
     advertisementQueries.getAdvertisement(req.params.id,(err, advertisement) => {
       if(err||advertisement==null){
         res.redirect(404, "/");
       } else{
         res.render("advertisements/show", {advertisement});
       }
     });
   },//show close

   destroy(req, res, next){
     console.log("inside destroy function");
     advertisementQueries.deleteAdvertisement(req.params.id, (err, topic) => {
       if(err){
         res.redirect(500, `/advertisements/${advertisement.id}`)
       } else {
         res.redirect(303, "/advertisements")
       }
     });
   },

  edit(req, res, next){
    console.log("inside edit function");
  advertisementQueries.getAdvertisement(req.params.id, (err, advertisement) => {
      if(err || advertisement == null){
        res.redirect(404, "/");
      } else {
        res.render("advertisements/edit", {advertisement});
      }
    });
  },

  update(req, res, next){
    console.log("inside update function");

//#1
  advertisementQueries.updateAdvertisement(req.params.id, req.body, (err, advertisement) => {

//#2
     if(err || advertisement == null){
       res.redirect(404, `/advertisements/${req.params.id}/edit`);
     } else {
       res.redirect(`/advertisements/${advertisement.id}`);
     }
   });
 }


}
