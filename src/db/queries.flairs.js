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
  }
}
