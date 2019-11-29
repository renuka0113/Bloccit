const request = require("request");
const server = require("../../src/server");
const base = "http://localhost:3000/advertisements/";
const sequelize = require("../../src/db/models/index").sequelize;
const Advertisement = require("../../src/db/models").Advertisement;

describe("routes : advertisements", () => {
  beforeEach((done) => {
      this.advertisement;
      sequelize.sync({force: true}).then((res) => {

       Advertisement.create({
         title: "coding bootcamps",
         description: "online"
       })
        .then((advertisement) => {
          this.advertisement = advertisement;
          done();
        })//.then
        .catch((err) => {
          console.log(err);
          done();
        });//catch

      });

    });


  describe("GET /advertisements", () => {

    it("should return a status code 200 and all advertisements", (done) => {
      request.get(base, (err, res, body) => {
        expect(res.statusCode).toBe(200);
        expect(err).toBeNull();
        expect(body).toContain("Advertisements");
        expect(body).toContain("coding bootcamps");
        done();
      });
    });

  });

  describe("GET/advertisements/new", () => {
    it("should render a new advertisement form", (done) => {
      request.get(`${base}new`,(err, res, body) => {
      expect(err).toBeNull();
      expect(body).toContain("New Advertisement");
      done();
    });//get/new
    });//it
  });//describe

  describe("POST/advertisements/create", () => {
    const options={
      url:`{base}create`,
      form:{
        title:"javascript books",
        description:"what is your favourite javascript book?"
      }//form
    };//options

    it("should create a new advertisement and redirect",(done) => {
      request.post(options,
        (err, res, body) => {
          Advertisement.findOne({where:{title:"javascript books"}})
           .then((advertisement) =>{
             expect(res.statusCode).toBe(303);
             expect(advertisement.title).toBe("javascript books");
             expect(advertisement.description).toBe("what is your favourite javascript book?");
             done();
           })//then
           .catch((err) => {
             console.log(err);
             done();
           });
        }
      );
    });//it close
  });//describe

});
