const topicQueries = require("../db/queries.topics.js");
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

 destroy(req, res, next){
      topicQueries.deleteTopic(req.params.id, (err, topic) => {
        if(err){
          res.redirect(500, `/topics/${topic.id}`)
        } else {
          res.redirect(303, "/topics")
        }
      });
    },

    edit(req, res, next){
    topicQueries.getTopic(req.params.id, (err, topic) => {
      if(err || topic == null){
        res.redirect(404, "/");
      } else {
        res.render("topics/edit", {topic});
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
