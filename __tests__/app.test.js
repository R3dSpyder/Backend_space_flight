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
      .get("/api/scores?limit=3")
      .expect(200)
      .then(({ body }) => {
        expect(Array.isArray(body));
        expect(typeof body[0] === "object").toBe(true);
      });
  });
  it("The objects have a score value which is of type number", () => {
    return request(app)
      .get("/api/scores?limit=3")
      .expect(200)
      .then(({ body }) => {
        body.forEach((object, index) => {
          expect.objectContaining({ score: expect.any(Number) });
        });
      });
  });
});

///// GET personalScoreHistory API tests////

describe("GET/api/scores/userScores/:user_id", () => {
  it("return all the scores of ONE user and return it with the correct data type", () => {
    return request(app)
      .get("/api/scores/userScores/3")
      .expect(200)
      .then(({ body }) => {
        expect(body).toHaveLength(7);
        body.forEach((userScores) => {
          expect(userScores).toEqual({
            score_id: expect.any(Number),
            user_id: expect.any(Number),
            score: expect.any(Number),
            created_at: expect.any(String),
          });
        });
      });
  });
  it("return all the scores of ONE user and return it in ascending order", () => {
    return request(app)
      .get("/api/scores/userScores/3?direction=ASC")
      .expect(200)
      .then(({ body }) => {
        body.forEach((userScores) => {
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
      .get("/api/scores/userScores/3?direction=ASC&limit=3")
      .expect(200)
      .then(({ body }) => {
        expect(body.length === 3);
        expect(body).toBeSortedBy("score", {
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
      .then(({ body }) => {
        expect(body).toHaveLength(1);
        expect(body[0].username).toEqual("james");
      });
  });
});

describe("GET/api/users/", () => {
  it("return all users - default no params (should be ascending order)", () => {
    return request(app)
      .get("/api/users")
      .expect(200)
      .then(({ body }) => {
        expect(body).toHaveLength(12);
        expect(body).toBeSortedBy("username", {
          ascending: true,
        });
      });
  });

  it("return users with params direction=DESC, limit=5", () => {
    return request(app)
      .get("/api/users?direction=DESC&limit=5")
      .expect(200)
      .then(({ body }) => {
        expect(body).toHaveLength(5);
        expect(body).toBeSortedBy("username", {
          descending: true,
        });
      });
  });

  it("ensure any returned users are in the correct format", () => {
    return request(app)
      .get("/api/users/")
      .expect(200)
      .then(({ body }) => {
        body.forEach((user) => {
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
    const scoreToPost = { score: 4, user_id: 3 };
    return request(app).post("/api/scores").send([scoreToPost]).expect(201);
  });

  it("check to see if score is posted correctly", () => {
    const scoreToPost = { score: 1011, user_id: 2 };
    return request(app)
      .post("/api/scores")
      .send([scoreToPost])
      .expect(201)
      .then(({ body }) => {
        expect(body[0].score).toEqual(1011);
        expect(body[0].user_id).toEqual(2);
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
      .then(({ body }) => {
        expect(body[0].username).toEqual("Mark");
      });
  });
});
