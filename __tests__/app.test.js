const request = require("supertest");
const db = require("../db/connection.js");
const seed = require("../db/seeds/seed.js");
const app = require("../app");
const testData = require("../db/development-data/index.js");
require("jest-sorted");

beforeEach(() => seed(testData));

afterAll(() => {
  return db.end();
});

///// GET score API tests////
describe("GET/api/scores", () => {
  it("return an array of objects", () => {
    return request(app)
      .get("/api/scores")
      .expect(200)
      .then(({ body: { scores } }) => {
        expect(Array.isArray(scores));
        expect(typeof scores[0] === "object").toBe(true);
      });
  });
  it("The objects have a score value which is of type number", () => {
    return request(app)
      .get("/api/scores")
      .expect(200)
      .then(({ body: { scores } }) => {
        scores.forEach((object, index) => {
          expect.objectContaining({ score: expect.any(Number) });
        });
      });
  });
  it("successfully return a limit of 3 returned scores", () => {
    return request(app)
      .get("/api/scores?limit=3")
      .expect(200)
      .then(({ body: { scores } }) => {
        expect(scores.length === 3);
        scores.forEach((object, index) => {
          expect.objectContaining({ score: expect.any(Number) });
        });
      });
  });

  it("default return is ascending order, test for return of descending order + limit of 3", () => {
    return request(app)
      .get("/api/scores?limit=3&direction=DESC")
      .expect(200)
      .then(({ body: { scores } }) => {
        scores.forEach((object, index) => {
          expect(scores).toBeSortedBy("score", {
            descending: true,
            coerce: true,
          });
        });
      });
  });
});

///// GET personalScoreHistory API tests////

describe("GET/api/scores/userScores/:user_id", () => {
  it("return all the scores of ONE user and return it with the correct data type", () => {
    return request(app)
      .get("/api/scores/userScores/jason")
      .expect(200)
      .then(({ body: { personalScores } }) => {
        expect(personalScores).toHaveLength(7);
        personalScores.forEach((userScores) => {
          expect(userScores.user_id).toBe(3);
          expect(userScores).toEqual({
            score_id: expect.any(Number),
            score: expect.any(Number),
            user_id: expect.any(Number),
            created_at: expect.any(String),
          });
        });
      });
  });
  it("return all the scores of ONE user and return it in ascending order", () => {
    return request(app)
      .get("/api/scores/userScores/jason?direction=ASC")
      .expect(200)
      .then(({ body: { personalScores } }) => {
        personalScores.forEach((userScores) => {
          let previous = 0;
          expect(
            userScores.score > previous || userScores.score === previous
          ).toEqual(true);
          previous = userScores.score;
        });
      });
  });

  it("return all the scores of ONE user and return it in ascending order and limited to 3 entries", () => {
    return request(app)
      .get("/api/scores/userScores/jason?direction=ASC&limit=3")
      .expect(200)
      .then(({ body: { personalScores } }) => {
        expect(personalScores.length === 3);
        expect(personalScores).toBeSortedBy("score", {
          ascending: true,
          coerce: true,
        });
      });
  });
});

///// GET getUsers tests////

describe("GET/api/users/", () => {
  it("return one user by their username", () => {
    return request(app)
      .get("/api/users?username=james")
      .expect(200)
      .then(({ body: { users } }) => {
        expect(users).toHaveLength(1);
        expect(users[0].username).toEqual("james");
      });
  });
});

describe("GET/api/users/", () => {
  it("return all users - default no params (should be ascending order)", () => {
    return request(app)
      .get("/api/users")
      .expect(200)
      .then(({ body: { users } }) => {
        expect(users).toHaveLength(12);
        expect(users).toBeSortedBy("username", {
          ascending: true,
        });
      });
  });

  it("return users with params direction=DESC, limit=5", () => {
    return request(app)
      .get("/api/users?direction=DESC&limit=5")
      .expect(200)
      .then(({ body: { users } }) => {
        expect(users).toHaveLength(5);
        expect(users).toBeSortedBy("username", {
          descending: true,
        });
      });
  });

  it("ensure any returned users are in the correct format", () => {
    return request(app)
      .get("/api/users/")
      .expect(200)
      .then(({ body: { users } }) => {
        users.forEach((user) => {
          expect(user).toEqual({
            user_id: expect.any(Number),
            username: expect.any(String),
            created_at: expect.any(String),
          });
        });
      });
  });
});

///// tests for POST SCORE ////
describe("POST/score", () => {
  it("return 201 if successfully posted a score", () => {
    const scoreToPost = { score: 4, username: "jason" };
    return request(app).post("/api/scores").send([scoreToPost]).expect(201);
  });

  it("check to see if score is posted correctly", () => {
    const scoreToPost = { score: 1011, username: "jim" };
    return request(app)
      .post("/api/scores")
      .send([scoreToPost])
      .expect(201)
      .then(({ body: { putScore } }) => {
        expect(putScore[0].score).toEqual(1011);
        expect(putScore[0].user_id).toBe(2);
      });
  });
});

///// tests for POST user ////
describe("POST/user", () => {
  it("return 201 if successfully posted a score", () => {
    const postUser = { username: "Mark" };
    return request(app)
      .post("/api/users")
      .send([postUser])
      .expect(201)
      .then(({ body: { putUser } }) => {
        expect(putUser[0].username).toEqual("Mark");
      });
  });
});
