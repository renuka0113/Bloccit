const Advertisement = require("./models").Advertisement; //requiring the Advertisement model that we created using sequelize mode:create etc in a constant variable Advertisement

module.exports = {

//#1
  getAllAdvertisements(callback){  //we define a function getAllAdvertisement with callback as a argument
    return Advertisement.findAll()  //we are calling the findAll method on the Advertisement model, this will return all the records in the Advertisement table.

//#2
    .then((advertisements) => {
      callback(null, advertisements);
    })
    .catch((err) => {
      callback(err);
    })
  },

  addAdvertisement(newAdvertisement, callback){
    return Advertisement.create({
      title:newAdvertisement.title,
      description:newAdvertisement.description
    })
    .then((advertisement) => {
      callback(null, advertisement);
    })//.then close
    .catch((err) =>{
      callback(err);
    })//catch
  }//addAdvertisement
}
