 const topicQueries = require("../db/queries.topics.js");
module.exports = {
  index(req, res, next){
  //  res.send("TODO: list all topics");
  topicQueries.getAllTopics((err, topics) => {

//#3
        if(err){
          res.redirect(500, "static/index");
        } else {
          res.render("topics/index", {topics});
        }
      })
  }
}