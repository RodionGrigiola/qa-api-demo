const pool = require("../../db/db");

async function seedDev() {
  await pool.query("DELETE FROM users");

  const users = Array.from({ length: 10 }).map((_, i) => ({
    email: `user${i + 1}@test.com`,
    password: "123456",
  }));

  for (const user of users) {
    await pool.query("INSERT INTO users (email, password) VALUES ($1, $2)", [
      user.email,
      user.password,
    ]);
  }

  console.log("Dev seed completed");
}

seedDev()
  .then(() => process.exit())
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
