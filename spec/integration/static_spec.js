const request = require("request"); // import the request module  which we will use to make requests to the server during testing
const server = require("../../src/server");
const base = "http://localhost:3000/";//base url that we will ue for our requests

describe("routes : static", () => {

//#1
  describe("GET /", () => {

//#2
    it("should return status code 200", (done) => {

//#3
      request.get(base, (err, res, body) => {
        expect(res.statusCode).toBe(200);

//#4
        done();
      });
    });

  });

  describe("GET /marco",() => {
    it("should return status code 200",(done) => {
      request.get(base,(err, res, body) => {
        expect(res.statusCode).toBe(200);
        expect(res.body).toBe("polo");
      })
    })
  })

});
