require("../config/db");
const User = require("../models/user.model");

const EMAIL = process.env.ADMIN_EMAIL || "bhuniasomnath2003@gmail.com";
const PASSWORD = process.env.ADMIN_PASSWORD || "Somnath@2003";
const USERNAME = process.env.ADMIN_USERNAME || "admin";
const NAME = process.env.ADMIN_NAME || "Site Admin";

async function seed() {
  try {
    const existing = await User.findOne({ email: EMAIL });
    if (existing) {
      console.log("Admin user already exists:", existing.email);
      process.exit(0);
    }

    const user = new User({
      name: NAME,
      username: USERNAME,
      email: EMAIL,
      password: PASSWORD,
      role: "admin",
      verified: true,
    });

    await user.save();
    console.log("Admin user created:", EMAIL);
    process.exit(0);
  } catch (err) {
    console.error("Failed to create admin user:", err);
    process.exit(1);
  }
}

seed();
