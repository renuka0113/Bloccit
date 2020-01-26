const Topic = require("./models").Topic;
 const Post = require("./models").Post; //include the Post model so that we can use it
 const Flair = require("./models").Flair;

module.exports = {

//#1
//Wherever in the code the getAllTopics function is called, its called with a parameter that is passed to the getAllTopics function in the form of callback.
//callback here is not a keyword, you can give it any name,we are calling it here as callback.
//the callback parameter is a function that again gets called if the return part of the getALlTopics is successful.
//For instance, if we call getAllTopics somewhere in the code, it is called as getAllTopics(myfunc2), this myFunc2 is pased as parameter callback here.
  getAllTopics(callback){ //we define a getAllTopics function with a parameter callback. The getAllTopics is a function that returns the promise Topic.findAll
    return Topic.findAll() //.findAll is a method on the table Topic and will return all the records of the Topic table

//#2
    .then((topics) => {    //if the return  Topic.findAll is successful then, the .then part is executed.
      callback(null, topics);
    })
    .catch((err) => {   //if the return Topic.findAll is not successful, then the .catch(err) part is executed.
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
    //return Topic.findById(id)//(earlier id was the only parameter) in the checkpoint this is findByPk but since it was getting error, I changed it to findById..this has to do with sequelize versions
     return Topic.findByPk(id,{

     include:[
       {
       model:Post,
       as:"posts"
     }
   ]//include
  })
    .then((topic) => {
      callback(null, topic);
    })//.then close
    .catch((err)=>{
       callback(err);
    })//catch

  },//getTopic close

  /*deleteTopic(id, callback){
      return Topic.destroy({
        where: {id}
      })
      .then((topic) => {
        callback(null, topic);
      })
      .catch((err) => {
        callback(err);
      })
    },
    */

    deleteTopic(req, callback){

 // #1
     return Topic.findByPk(req.params.id)
     .then((topic) => {

 // #2
       const authorized = new Authorizer(req.user, topic).destroy();

       if(authorized) {
 // #3
         topic.destroy()
         .then((res) => {
           callback(null, topic);
         });

       } else {

 // #4
         req.flash("notice", "You are not authorized to do that.")
         callback(401);
       }
     })
     .catch((err) => {
       callback(err);
     });
   },

/*
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
  }*/

  updateTopic(req, updatedTopic, callback){

// #1
     return Topic.findByPk(req.params.id)
     .then((topic) => {

// #2
       if(!topic){
         return callback("Topic not found");
       }

// #3
       const authorized = new Authorizer(req.user, topic).update();

       if(authorized) {

// #4
         topic.update(updatedTopic, {
           fields: Object.keys(updatedTopic)
         })
         .then(() => {
           callback(null, topic);
         })
         .catch((err) => {
           callback(err);
         });
       } else {

// #5
         req.flash("notice", "You are not authorized to do that.");
         callback("Forbidden");
       }
     });
   }

}//module.exports close
