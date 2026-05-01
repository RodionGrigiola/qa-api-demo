const request = require("supertest");
const app = require("../app");

test("should return user by email", async () => {
  const res = await request(app).post("/get-user-via-email").send({
    email: "admin@test.com",
  });

  expect(res.statusCode).toBe(200);
  expect(res.body.status).toBe("ok");
  expect(res.body.user.email).toBe("admin@test.com");
});

test("should return error when email not probided", async () => {
  const res = await request(app).post("/get-user-via-email").send();

  expect(res.statusCode).toBe(400);
  expect(res.body.status).toBe("error");
  expect(res.body.message).toBe("Email is required");
});

test("should return error when user not found", async () => {
  const res = await request(app).post("/get-user-via-email").send({
    email: "non-existing-user@test.com",
  });

  expect(res.statusCode).toBe(404);
  expect(res.body.status).toBe("error");
  expect(res.body.message).toBe("Invalid credentials");
});
