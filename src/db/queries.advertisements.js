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
  },//addAdvertisement

  getAdvertisement(id, callback){
    return Advertisement.findById(id)
     .then((advertisement) => {
       callback(null, advertisement);
     })//then
     .catch((err) => {
       callback(err);
     })//catch
   },

   deleteAdvertisement(id, callback){
     return Advertisement.destroy({
       where: {id}
     })
     .then((advertisement) => {
       callback(null, advertisement);
     })
     .catch((err) => {
       callback(err);
     })
   },

   updateAdvertisement(id, updatedAdvertisement, callback){
    return Advertisement.findById(id)
    .then((advertisement) => {
      if(!advertisement){
        return callback("Advertisement not found");
      }

    advertisement.update(updatedAdvertisement, {
        fields: Object.keys(updatedAdvertisement)
      })
      .then(() => {
        callback(null, advertisement);
      })
      .catch((err) => {
        callback(err);
      });
    });
  }
}
