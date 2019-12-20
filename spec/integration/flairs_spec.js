const request = require("request");
const server = require("../../src/server");
const base = "http://localhost:3000/flairs/";
const sequelize = require("../../src/db/models/index").sequelize;
const Flair = require("../../src/db/models").Flair;

describe("routes : flairs", () => {

//#2
    beforeEach((done) => {
      this.flair;
      sequelize.sync({force: true}).then((res) => {

       Flair.create({
         name: "rain",
         color: "pink"
       })
        .then((flair) => {
          this.flair = flair;
          done();
        })
        .catch((err) => {
          console.log(err);
          done();
        });

      });

  //  });
describe("routes : flairs", () => {

  describe("GET /flairs", () => {

    it("should return a status code 200 and all flairs", (done) => {
      request.get(base, (err, res, body) => {
        expect(res.statusCode).toBe(200);
        expect(err).toBeNull();
      //  expect(body).toContain("Flairs");not expecting body to contain Flairs and thats why I am not passing title: "Flairs"
      //in flairController at res.render("flairs/index", { flairs }); like we did in the case of Topics
        expect(body).toContain("rainy");
        done();
      });
    });

  });
});

});//beforeEach done close
