const request = require("request");
const server = require("../../src/server");
const base = "http://localhost:3000/flairs/";
const sequelize = require("../../src/db/models/index").sequelize;
const Topic = require("../../src/db/models").Flair;

describe("routes : flairs", () => {
  beforeEach((done) => {
      this.flair;
      sequelize.sync({force: true}).then((res) => {

       Flair.create({
         title: "JS Frameworks",
         description: "There is a lot of them"
       })
        .then((topic) => {
          this.topic = topic;
          done();
        })
        .catch((err) => {
          console.log(err);
          done();
        });

      });

    });
