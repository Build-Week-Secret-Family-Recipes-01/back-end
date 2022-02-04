const request = require("supertest");
const server = require("../server");
const db = require("../data/db-config");

const testRecipe = {
  user_id: 1,
  title: "Lemonade",
  categories: ["Drinks"],
  ingredients: [
    {
      quantity: "3 cups",
      ingredient_name: "water",
    },
    {
      quantity: "to taste",
      ingredient_name: "lemon juice",
    },
    {
      quantity: "1 cup",
      ingredient_name: "sugar",
    },
  ],
  steps: [
    {
      step_number: 1,
      step_text: "Pour water into a pitcher",
    },
    {
      step_number: 2,
      step_text: "Combine lemon juice and sugar with the water",
    },
    {
      step_number: 3,
      step_text: "Serve, garnish, enjoy!",
    },
  ],
};
const postedTestRecipe = {
  recipe_id: 6,
  user_id: 1,
  title: "Lemonade",
  source: null,
  description: null,
  image: null,
  categories: ["Drinks"],
  steps: [
    {
      step_number: 1,
      step_text: "Pour water into a pitcher",
    },
    {
      step_number: 2,
      step_text: "Combine lemon juice and sugar with the water",
    },
    {
      step_number: 3,
      step_text: "Serve, garnish, enjoy!",
    },
  ],
  ingredients: [
    {
      quantity: "3 cups",
      ingredient_name: "water",
    },
    {
      quantity: "to taste",
      ingredient_name: "lemon juice",
    },
    {
      quantity: "1 cup",
      ingredient_name: "sugar",
    },
  ],
};

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
  test("[2] returns a correctly formatted user object with hashed pw", () => {
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
    let result = await request(server)
      .post("/api/auth/login")
      .send({ username: "INVALID", password: "DATA" });
    expect(result.status).toBe(401);
    expect(result.body.message).toBe("Invalid credentials");
  });
  let result;
  beforeEach(async () => {
    result = await request(server)
      .post("/api/auth/login")
      .send({ username: "admin", password: "test" });
  });
  test("[5] returns a status 200 OK", () => {
    expect(result.status).toBe(200);
  });
  test("[6] returns a complete user object with token", () => {
    expect(result.body.message).toBe("admin logged in");
    expect(result.body.user).toMatchObject({
      permissions: "admin",
      user_id: 1,
      username: "admin",
    });
    expect(result.body.token).not.toBe(false);
  });
});

describe("GET /api/recipes", () => {
  test("[7] returns recipes on authorized request", async () => {
    let res = await request(server)
      .post("/api/auth/login")
      .send({ username: "admin", password: "test" });
    let res2 = await request(server)
      .get("/api/recipes")
      .set("Authorization", res.body.token);
    expect(res2.body.length).toEqual(5);
    expect(res2.status).toBe(200);
  });
  test.todo("[8] rejects unauthorized requests");
});

describe("POST /api/recipes", () => {
  let res;
  beforeEach(async () => {
    await request(server)
      .post("/api/auth/login")
      .send({ username: "admin", password: "test" });
    res = await request(server).post("/api/recipes").send(testRecipe);
  });
  test("[9] returns a status 201", async () => {
    expect(res.status).toBe(201);
  });
  test("[10] returns posted recipe object", () => {
    expect(res.body).toMatchObject(postedTestRecipe);
  });
});
