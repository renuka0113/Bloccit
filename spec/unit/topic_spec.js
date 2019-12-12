const sequelize = require("../../src/db/models/index").sequelize;
const Topic = require("../../src/db/models").Topic;
const Post = require("../../src/db/models").Post;

describe("Topic", () => {

  beforeEach((done) => {
//#1
    this.topic;
    this.post;
    sequelize.sync({force: true}).then((res) => {

//#2
      Topic.create({
        title: "Expeditions to Alpha Centauri",
        description: "A compilation of reports from recent visits to the star system."
      })
      .then((topic) => {
        this.topic = topic;
//#3
        Post.create({
          title: "My first visit to Proxima Centauri b",
          body: "I saw some rocks.",
//#4
          topicId: this.topic.id
        })
        .then((post) => {
          this.post = post;
          done();
        });
      })
      .catch((err) => {
        console.log(err);
        done();
      });
    });

  });
//});

describe("#create()", () => {

    it("should create a topic object with a title and a body", (done) => {
//#1
      Topic.create({
        title: "Asterix and Obelix",
        body: "very entertaining",
        topicId: this.topic.id
      })
      .then((topic) => {

//#2
        expect(topic.title).toBe("Asterix and Obelix");
        expect(topic.body).toBe("very entertaining");
        done();

      })
      .catch((err) => {
        console.log(err);
        done();
      });
    });

  });

  it("should not create a post with missing title or body", (done) => {
      Topic.create({
        title: "Asterix and Obelix"
      })
      .then((topic) => {

       // the code in this block will not be evaluated since the validation error
       // will skip it. Instead, we'll catch the error in the catch block below
       // and set the expectations there


        done();

      })
      .catch((err) => {
        expect(err.message).toContain("Topic.body cannot be null");
        done();

      })
    });

    describe("#getPosts()", () => {

        it("should return the associated posts", (done) => {

          this.topic.getPosts()
          .then((associatedPosts) => {
            expect(associatedPosts[0].title).toBe("My first visit to Proxima Centauri b");
            expect(associatedPosts[0].body).toBe("I saw some rocks.");
            done();
          });

        });

      });

  });//main
