const dotenv = require("dotenv");

process.env.NODE_ENV = "test";

if (!process.env.DB_HOST) {
  dotenv.config({
    path: ".env.test",
  });
}

const pool = require("../db/db");

beforeEach(async () => {
  await pool.query("DELETE FROM users");

  await pool.query(`
    INSERT INTO users (email, password)
    VALUES ('admin@test.com', '123456')
  `);
});

afterAll(async () => {
  await pool.end();
});
