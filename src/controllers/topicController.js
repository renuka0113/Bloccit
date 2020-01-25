const topicQueries = require("../db/queries.topics.js");
const Authorizer = require("../policies/topic");
module.exports = {
  index(req, res, next){ //creating a function called index
  //  res.send("TODO: list all topics");
  topicQueries.getAllTopics((err, topics) => {
//  console.log(err);
//#3
        if(err){
          res.redirect(500, "static/index");
        } else {
          //res.render("topics/index", {topics});
          res.render("topics/index", { topics, title: "Topics" });
        }
      })
  },

//new(req,res,next){
//  res.render("topics/new");
//},

new(req, res, next){
 // #2
     const authorized = new Authorizer(req.user).new();

     if(authorized) {
       res.render("topics/new");
     } else {
       req.flash("notice", "You are not authorized to do that.");
       res.redirect("/topics");
     }
   },

/*
create(req, res, next){
   let newTopic = {
     title: req.body.title,
     description: req.body.description
   };
   topicQueries.addTopic(newTopic, (err, topic) => {
     if(err){
       res.redirect(500, "/topics/new");
     } else {
       res.redirect(303, `/topics/${topic.id}`);
     }
   });
 },*/

 create(req, res, next){

 // #1
     const authorized = new Authorizer(req.user).create();

 // #2
     if(authorized) {
       let newTopic = {
         title: req.body.title,
         description: req.body.description
       };
       topicQueries.addTopic(newTopic, (err, topic) => {
         if(err){
           res.redirect(500, "topics/new");
         } else {
           res.redirect(303, `/topics/${topic.id}`);
         }
       });
     } else {

 // #3
       req.flash("notice", "You are not authorized to do that.");
       res.redirect("/topics");
     }
   },

 show(req,res,next){
  topicQueries.getTopic(req.params.id,(err,topic)=> {
    if(err||topic==null){
      res.redirect(404, "/");
    }//if close
    else{
      res.render("topics/show",{topic});
    }//else close

  });//getTopic close
},//show close

/* destroy(req, res, next){
      topicQueries.deleteTopic(req.params.id, (err, topic) => {
        if(err){
          res.redirect(500, `/topics/${topic.id}`)
        } else {
          res.redirect(303, "/topics")
        }
      });
    },*/

    destroy(req, res, next){
// #1
     topicQueries.deleteTopic(req, (err, topic) => {
       if(err){
         res.redirect(err, `/topics/${req.params.id}`)
       } else {
         res.redirect(303, "/topics")
       }
     });
   },

  /*  edit(req, res, next){
    topicQueries.getTopic(req.params.id, (err, topic) => {
      if(err || topic == null){
        res.redirect(404, "/");
      } else {
        res.render("topics/edit", {topic});
      }
    });
  },*/

  edit(req, res, next){
// #1
     topicQueries.getTopic(req.params.id, (err, topic) => {
       if(err || topic == null){
         res.redirect(404, "/");
       } else {

 // #2
         const authorized = new Authorizer(req.user, topic).edit();

 // #3
         if(authorized){
           res.render("topics/edit", {topic});
         } else {
           req.flash("You are not authorized to do that.")
           res.redirect(`/topics/${req.params.id}`)
         }
       }
     });
   },

  update(req, res, next){
//#1
    topicQueries.updateTopic(req.params.id, req.body, (err, topic) => {

//#2
      if(err || topic == null){
        res.redirect(404, `/topics/${req.params.id}/edit`);
      } else {
        res.redirect(`/topics/${topic.id}`);
      }
    });
  }

}//module.exports close
