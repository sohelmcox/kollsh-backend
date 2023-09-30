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

const userAccessControllers = [
  "item",
  "itemDetails",
  "comment",
  "metadata",
  "replay",
  "upload",
  "user",
  "userProfile",
];
const adminAccessControllers = [
  ...userAccessControllers,
  "attribute",
  "attributeValue",
  "itemSuggestion",
  "brand",
  "category",
  "city",
  "state",
  "country",
];
// Define your seed data
const getPermissions = ({ controllers, actions }) => {
  const permissionData = [];
  for (const controller of controllers) {
    permissionData.push({
      controller: controller,
      actions: actions,
      description: `${controller} Users Access`,
      createdBy: "650d880858e6f8be2bb7b421",
    });
  }
  return permissionData;
};
const userRolesData = {
  name: "user",
  description: "User Role",
  permissions: [],
  createdBy: "650d880858e6f8be2bb7b421",
};
const adminRoleData = {
  name: "admin",
  description: "Admin Role",
  permissions: [],
  createdBy: "650d880858e6f8be2bb7b421",
};

// Insert seed data
async function seed() {
  try {
    // Create user permission
    const userPermissions = await Permission.insertMany(
      getPermissions({
        controllers: userAccessControllers,
        actions: ["read", "write", "delete", "update"],
      }),
    );
    // Create admin permission
    const adminPermissions = await Permission.insertMany(
      getPermissions({
        controllers: adminAccessControllers,
        actions: ["read", "write", "delete", "update"],
      }),
    );

    // Update userRolesData with permissions ID
    userRolesData.permissions = userPermissions.map(
      (permission) => permission._id,
    );
    // Update adminRolesData with permissions ID
    adminRoleData.permissions = adminPermissions.map(
      (permission) => permission._id,
    );

    // Create user & admin role
    const userRole = await Role.create(userRolesData);
    const adminRole = await Role.create(adminRoleData);

    // Create a user
    const newUser = await User.create({
      name: "Ibrahim Sifat",
      username: "username",
      email: "ibsifat900@gmail.com",
      confirmed: true,
      blocked: false,
      role: userRole.id,
      password: "string",
    });
    // Create a admin
    const newAdmin = await User.create({
      name: "Ibrahim Sifat",
      username: "admin_username",
      email: "ibrahimsifat.me@gmail.com",
      confirmed: true,
      blocked: false,
      role: adminRole.id,
      password: "string",
    });

    console.log("Seed data inserted successfully");
    const userLogin = await localLogin(newUser.email, "string");
    const adminLogin = await localLogin(newAdmin.email, "string");
    console.log("User Login Credentials:", userLogin);
    console.log("Admin Login Credentials:", adminLogin);
  } catch (error) {
    console.error("Error inserting seed data:", error);
  } finally {
    // Close the database connection
    mongoose.connection.close();
  }
}

seed();
