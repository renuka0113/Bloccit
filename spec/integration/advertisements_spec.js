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
          console.log(Advertisement);
          console.log(res);
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

  describe("GET /advertisements/:id",() => {
    it("should render a view with the selected advertisement", (done) => {
      request.get(`${base}${this.advertisement.id}`,(err, res, body) => {
        expect(err).toBeNull();
        expect(body).toContain("coding bootcamps");
        done();
      });//get
    });//it
  });//describe

  describe("POST /advertisements/:id/destroy", () => {

     it("should delete the topic with the associated ID", (done) => {

 //#1
       Advertisement.findAll()
       .then((advertisements) => {

 //#2
         const advertisementCountBeforeDelete = advertisements.length;

         expect(advertisementCountBeforeDelete).toBe(1);

 //#3
         request.post(`${base}${this.advertisement.id}/destroy`, (err, res, body) => {
           Advertisement.findAll()
           .then((advertisements) => {
             expect(err).toBeNull();
             expect(advertisements.length).toBe(advertisementCountBeforeDelete - 1);
             done();
           })

         });
       });

     });

   });


  describe("GET /advertisements/:id/edit", () => {
    it("should render a view with an edit advertisement form", (done) => {
    request.get(`${base}${this.advertisement.id}/edit`, (err, res, body) => {
      expect(err).toBeNull();
      expect(body).toContain("Edit Advertisement");
      expect(body).toContain("coding bootcamps");
      done();
    });
  });

});

describe("POST /advertisements/:id/update", () => {

    it("should update the advertisement with the given values", (done) => {
       const options = {
          url: `${base}${this.advertisement.id}/update`,
          form: {
            title: "coding bootcamps",
            description: "There are a lot of them"
          }
        };
//#1
        request.post(options,
          (err, res, body) => {

          expect(err).toBeNull();
//#2
          Advertisement.findOne({
            where: { id: this.advertisement.id }
          })
          .then((advertisement) => {
            expect(advertisement.title).toBe("coding bootcamps");
            done();
          });
        });
    });

  });

});
