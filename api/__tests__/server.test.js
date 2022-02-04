const request = require("supertest");
const server = require("../server");
const db = require("../data/db-config");

beforeAll(async () => {
  await db.migrate.rollback();
  await db.migrate.latest();
});
beforeEach(async () => {
  await db.seed.run();
});
afterAll(async () => {
  await db.destroy();
});

it("sanity check", () => {
  expect(true).not.toBe(false);
});

describe("server.js", () => {
  it("[0] is the correct testing environment", async () => {
    expect(process.env.NODE_ENV).toBe("testing");
  });
});

describe("POST /api/auth/register", () => {
  let result;
  beforeEach(async () => {
    result = await request(server)
      .post("/api/auth/register")
      .send({ username: "Cullen", password: "test" });
  });
  test("[1] returns a status 201 OK", async () => {
    expect(result.status).toBe(201);
  });
  test("[2] returns a correctly formatted user object with hashed pw", async () => {
    expect(result.body).toMatchObject({
      user_id: 4,
      username: "Cullen",
      permissions: "user",
    });
    expect(result.body.password).not.toBe("test");
  });
  test("[3] prevents duplicate usernames on registration", async () => {
    let result2 = await request(server)
      .post("/api/auth/register")
      .send({ username: "Cullen", password: "test2" });
    expect(result2.status).toBe(401);
  });
});

describe("POST /api/auth/login", () => {
  test("[4] prevents login with invalid credentials", async () => {
    
  })
});
