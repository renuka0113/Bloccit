'use strict';

const faker = require("faker");
 let topics = []; //an array

 for(let i = 1 ; i <= 15 ; i++){  //populating the topics array with 15 objects
   topics.push({
     title: faker.hacker.noun(),
     description: faker.hacker.phrase(),
     createdAt: new Date(),
     updatedAt: new Date()
   });
 }
module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('Person', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
   return queryInterface.bulkInsert("Topics", topics, {}); //calling bulkInsert(to insert multiple records in a table) method of queryInterface class; first argument is the tablename, second argument is the array topics from which to build records

  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
    return queryInterface.bulkDelete("Topics", null, {});
  }
};
