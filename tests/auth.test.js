const request = require("supertest");
const app = require("../app");

describe("POST /login", () => {
  test("should login successfully", async () => {
    const res = await request(app).post("/login").send({
      email: "admin@test.com",
      password: "123456",
    });

    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBe("success");
    expect(res.body.token).toBeDefined();
  });

  test("should return 400 if email missing", async () => {
    const res = await request(app).post("/login").send({
      password: "123456",
    });

    expect(res.statusCode).toBe(400);
    expect(res.body.status).toBe("error");
  });

  test("should return 401 for wrong credentials", async () => {
    const res = await request(app).post("/login").send({
      email: "wrong@test.com",
      password: "111111",
    });

    expect(res.statusCode).toBe(401);
    expect(res.body.status).toBe("error");
  });
});
