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

    });//beforeEach

  //  });

  describe("GET /flairs", () => {

    it("should return a status code 200 and all flairs", (done) => {
      request.get(base, (err, res, body) => {
        expect(res.statusCode).toBe(200);
        expect(err).toBeNull();
        expect(body).toContain("rain");
        done();
      });
    });
  });

  describe("GET /flairs/new", () => {

  it("should render a new form",(done) => {
    request.get(`${base}new`,(err,res,body) => {
      expect(err).toBeNull;
    //  console.log(body); was done for resolving a error
      expect(body).toContain("New Flair");
      done();
    });
  });
});//GET /flair/new close

describe("POST /flairs/create", () => {
      const options = {
        url: `${base}create`,
        form: {
         name: "happy",
          color: "yellow"
        }
      };

      it("should create a new flair and redirect", (done) => {

//#1
        request.post(options,

//#2
          (err, res, body) => {
            Flair.findOne({where: {name: "happy"}})
            .then((flair) => {
              expect(res.statusCode).toBe(303);
              expect(flair.name).toBe("happy");
              expect(flair.color).toBe("yellow");
              done();
            })
            .catch((err) => {
              console.log(err);
              done();
            });
        });
    });
  });

  describe("GET /flairs/:id", () => {

     it("should render a view with the selected flair", (done) => {
       request.get(`${base}${this.flair.id}`, (err, res, body) => {
         expect(err).toBeNull();
         expect(body).toContain("rain");
         done();
       });
     });

   });

   describe("POST /flairs/:id/destroy", () => {

     it("should delete the flair with the associated ID", (done) => {

 //#1
       Flair.findAll()
       .then((flairs) => {

 //#2
         const flairCountBeforeDelete = flairs.length;

         expect(flairCountBeforeDelete).toBe(1);

 //#3
         request.post(`${base}${this.flair.id}/destroy`, (err, res, body) => {
           Flair.findAll()
           .then((flairs) => {
             expect(err).toBeNull();
             expect(flairs.length).toBe(flairCountBeforeDelete - 1);
             done();
           })
         });
        });

      });

  });
});//describe routes:flairs
