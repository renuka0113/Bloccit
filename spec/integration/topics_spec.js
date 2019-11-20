const request = require("request");
const server = require("../../src/server");
const base = "http://localhost:3000/topics/";
const sequelize = require("../../src/db/models/index").sequelize;
const Topic = require("../../src/db/models").Topic;

describe("routes : topics", () => {
  beforeEach((done) => {
      this.topic;
      sequelize.sync({force: true}).then((res) => {

       Topic.create({
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
  describe("GET /topics", () => {

    it("should return a status code 200 and all topics", (done) => {
      request.get(base, (err, res, body) => {
        expect(res.statusCode).toBe(200);
        expect(err).toBeNull();
        expect(body).toContain("Topics");
        expect(body).toContain("JS Frameworks");
        done();
      });
    });

  });//GET/topics close

  describe("GET /topics/new", () => {

  it("should render a new form",(done) => {
    request.get(`${base}new`,(err,res,body) => {
      expect(err).toBeNull;
    //  console.log(body); was done for resolving a error
      expect(body).toContain("New Topic");
      done();
    });
  });
});//GET /topic/new close

  describe("POST /topics/create",() => {
    const options={
      url:`${base}create`,
      form: {
          title: "blink-182 songs",
          description: "What's your favorite blink-182 song?"
        }//closing form
      };//closing the variable options
     it("should create a new topic and redirect", (done) => {
       request.post(options,
         (err,res,body) =>{
           Topic.findOne({where:{title:"blink-182 songs"}})
            .then((topic) => {
              expect(res.statusCode).toBe(303);
              expect(topic.title).toBe("blink-182 songs");
              expect(topic.description).toBe("what's your favourite blink-182 song?");
              done();
            })//.then close
             .catch((err) => {
               console.log(err);
               done();
             });//catch close
         }//err,res,body close
       )//request.post close
     })//it close


  })//describe close

});
