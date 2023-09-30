// seeds.js

const mongoose = require("mongoose");
const { Role, Permission, User } = require("./models");
const { mongoUri } = require("./config");
const createTestUser = require("../tests/setup/createTestUser");
const { localLogin } = require("./lib/auth/");
// Connect to the Mongo database
mongoose.connect(mongoUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Define your seed data
const permissionsData = {
  controller: "item",
  actions: ["read", "write", "delete", "update"],
  description: "Read Users",
  createdBy: null,
};

const rolesData = {
  name: "user",
  description: "User Role",
  permissions: [],
  createdBy: "650d880858e6f8be2bb7b421",
};

// Insert seed data
async function seed() {
  try {
    // Create permission
    const permissions = await Permission.create(permissionsData);

    // Update rolesData with permission ID
    rolesData.permissions = permissions._id;

    // Create role
    const role = await Role.create(rolesData);

    // Create a user
    const newUser = await User.create({
      name: "Ibrahim Sifat",
      username: "username",
      email: "ibsifat900@gmail.com",
      confirmed: true,
      blocked: false,
      role: role.id,
      password: "string",
    });

    console.log("Seed data inserted successfully");
    const login = await localLogin(newUser.email, "string");
    console.log("Login Credentials:", login);
  } catch (error) {
    console.error("Error inserting seed data:", error);
  } finally {
    // Close the database connection
    mongoose.connection.close();
  }
}

// Run the seed function
seed();
