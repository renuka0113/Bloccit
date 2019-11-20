 const topicQueries = require("../db/queries.topics.js");
module.exports = {
  index(req, res, next){
  //  res.send("TODO: list all topics");
  topicQueries.getAllTopics((err, topics) => {
  console.log(err);
//#3
        if(err){
          res.redirect(500, "static/index");
        } else {
          //res.render("topics/index", {topics});
          res.render("topics/index", { topics, title: "Topics" });
        }
      })
  },

new(req,res,next){
  res.render("topics/new");
},

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
 }


}//module.exports close
