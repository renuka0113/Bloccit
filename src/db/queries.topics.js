const Topic = require("./models").Topic;

module.exports = {

//#1
  getAllTopics(callback){
    return Topic.findAll()

//#2
    .then((topics) => {
      callback(null, topics);
    })
    .catch((err) => {
      callback(err);
    })
  }

addTopic(newTopic, callback){
  return Topic.create({
    title:newTopic.title,
    description:newTopic.description
    })//return close
    .then((topic) => {
     callback(null, topic);
    })//.then close
    .catch((err) => {
     callback(err);
    })//.catch error
  }//addTopic function close
}//module.exports close
