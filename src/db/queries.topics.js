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
  },

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
  },//addTopic function close

  getTopic(id, callback){
    return Topic.findById(id)//in the checkpoint this is findByPk but since it was getting error, I changed it to findById..this has to do with sequelize versions
    .then((topic) => {
      callback(null, topic);
    })//.then close
    .catch((err)=>{
       callback(err);
    })//catch
  },//getTopic close

  deleteTopic(id, callback){
      return Topic.destroy({
        where: {id}
      })
      .then((topic) => {
        callback(null, topic);
      })
      .catch((err) => {
        callback(err);
      })
    }

}//module.exports close
