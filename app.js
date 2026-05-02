const express = require("express");
const pool = require("./db/db");

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).json({
    status: "ok",
    message: "api is running again",
  });
});

app.post("/get-user-via-email", async (req, res) => {
  const { email } = req.body ?? {};

  if (!email) {
    return res.status(400).json({
      status: "error",
      message: "Email is required",
    });
  }

  try {
    const result = await pool.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);

    const user = result.rows[0];

    if (!user) {
      return res.status(404).json({
        status: "error",
        message: "Invalid credentials",
      });
    }

    const { password, ...safeUser } = user;

    res.status(200).json({
      status: "ok",
      user: safeUser,
    });
  } catch (e) {
    return res.status(500).json({
      status: "error",
      message: e.message,
    });
  }
});

app.get("/db-health", async (req, res) => {
  try {
    const result = await pool.query("SELECT NOW()");

    res.json({
      status: "success",
      time: result.rows[0].now,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error,
    });
  }
});

app.get("/health", (req, res) => {
  res.status(200).json({
    uptime: process.uptime(),
    status: "healthy",
  });
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body ?? {};

  if (!email || !password) {
    return res.status(400).json({
      status: "error",
      message: "Email and password are required",
    });
  }

  try {
    const result = await pool.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);

    const user = result.rows[0];

    if (!user || user.password !== password) {
      return res.status(401).json({
        status: "error",
        message: "Invalid credentials",
      });
    }

    return res.status(200).json({
      status: "success",
      token: "fake-jwt-token",
    });
  } catch (e) {
    return res.status(500).json({
      status: "error",
      message: err.message,
    });
  }
});

module.exports = app;
