const request = require("request");
const server = require("../../src/server");
const base = "http://localhost:3000/topics";

const sequelize = require("../../src/db/models/index").sequelize;
const Topic = require("../../src/db/models").Topic;
const Post = require("../../src/db/models").Post;
const Flair = require("../../src/db/models").Flair;

describe("routes : flairs", () => {

  beforeEach((done) => {
    this.topic;
    this.flair;

    sequelize.sync({force: true}).then((res) => {

//#1
      Topic.create({
        title: "Winter activities in Austin",
        description: "Post things to do in winter in Austin."
      })
      .then((topic) => {
        this.topic = topic;

        Flair.create({
          name: "skating",
          color: "blue",
          topicId: this.topic.id
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
    });

  });

  describe("GET /topics/:topicId/flairs/new", () => {

   it("should render a new flair form", (done) => {
     request.get(`${base}/${this.topic.id}/flairs/new`, (err, res, body) => {
       expect(err).toBeNull();
       expect(body).toContain("New Flair");
       done();
     });
   });

 });

});//outermost describe
