const Flair = require("./models").Flair;

module.exports = {

//#1
  getAllFlairs(callback){
    return Flair.findAll()

//#2
    .then((flairs) => {
      callback(null, flairs);
    })
    .catch((err) => {
      callback(err);
    })
  },//getAllFlairs close

  addFlair(newFlair, callback){
     return Flair.create({
       name: newFlair.name,
       color: newFlair.color
     })
     .then((flair) => {
       callback(null, flair);
     })
     .catch((err) => {
       callback(err);
     })
   },//addFlair

   getFlair(id, callback){
    return Flair.findById(id)
    .then((flair) => {
      callback(null, flair);
    })
    .catch((err) => {
      callback(err);
    })
  },//getFlair

  deleteFlair(id, callback){
     return Flair.destroy({
       where: {id}
     })
     .then((flair) => {
       callback(null, flair);
     })
     .catch((err) => {
       callback(err);
     })
   },

   updateTopic(id, updatedTopic, callback){
     return Topic.findByPk(id)
     .then((topic) => {
       if(!topic){
         return callback("Topic not found");
       }

//#1
       topic.update(updatedTopic, {
         fields: Object.keys(updatedTopic)
       })
       .then(() => {
         callback(null, topic);
       })
       .catch((err) => {
         callback(err);
       });
     });
   }
}//module.exports close
