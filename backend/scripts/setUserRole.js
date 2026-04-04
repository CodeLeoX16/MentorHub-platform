require("../config/db");
const User = require("../models/user.model");

const [,, emailArg, roleArg] = process.argv;

if (!emailArg || !roleArg) {
  console.error("Usage: node scripts/setUserRole.js <email> <role>");
  process.exit(1);
}

const validRoles = ["mentor", "student", "admin", "analyst", "viewer"];
if (!validRoles.includes(roleArg)) {
  console.error("Invalid role. Valid roles:", validRoles.join(", "));
  process.exit(1);
}

async function run() {
  try {   
    const user = await User.findOneAndUpdate(
      { email: emailArg },
      { $set: { role: roleArg, verified: true } },
      { new: true }
    );
    if (!user) {
      console.error("User not found for email:", emailArg);
      process.exit(1);
    }
    console.log(`Updated user ${emailArg} -> role: ${roleArg}`);
    console.log(user);
    process.exit(0);
  } catch (err) {
    console.error("Error updating user:", err);
    process.exit(1);
  }
}

run();
