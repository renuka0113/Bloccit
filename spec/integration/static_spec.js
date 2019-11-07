const request = require("request"); // import the request module  which we will use to make requests to the server during testing
const server = require("../../src/server");
const base = "http://localhost:3000/";//base url that we will used for our requests

describe("routes : static", () => {

//#1
  describe("GET /", () => {

//#2
    it("should return status code 200 and have 'Welcome to Bloccit' in the body of the response", (done) => {

//#3
      request.get(base, (err, res, body) => {
        expect(res.statusCode).toBe(200);
        expect(body).toContain("Welcome to Bloccit");

//#4
        done();
      });
    });

  });

  describe("GET /marco",() => {
    it("should return status code 200",() => {
      request.get(`${base}marco`,(err, res, body) => {   //'${base}marco' means we need to access http://localhost:3000/marco as the url, instead of the base url http://localhost:3000
        expect(res.statusCode).toBe(200);
        expect(res.body).toBe("polo");
      })
    })
  })

  describe("GET /about",() => {
    it("should return status code 200 and have 'About Us' in the body of the response",(done) =>{
      request.get(`${base}about`,(err, res, body) => {
        expect(res.statusCode).toBe(200);
        expect(body).toContain("About Us");
      })
    })
  })

});
