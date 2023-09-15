const { Item, User, Role } = require("../../src/models"); // Import your Mongoose model
const { hashing } = require("../../src/utils");

const seedTestDatabase = async () => {
  try {
    // Define the initial data you want to insert
    const initialItemData = [
      {
        name: "string",
        description: "string",
        released: "2023-09-12",
        thumbnail: "string or id",
        subcategory: "string or id",
        state: "string or id",
        cities: ["string or id", "string or id"],
        price: 0,
        negotiable: true,
        is_argent: true,
        brand: "string or id",
      },
      {
        name: "hello",
        description: "hello description",
        released: "2023-09-12",
        thumbnail: "string or id",
        subcategory: "string or id",
        state: "string or id",
        cities: ["string or id", "string or id"],
        price: 0,
        negotiable: true,
        is_argent: true,
        brand: "string or id",
      },
    ];
    const initialUserData = [
      {
        name: "Ibrahim Sifat",
        username: "username",
        email: "ibsifat900@gmail.com",
        confirmed: true,
        blocked: false,
        password: await hashing.generateHash("Test1234"),
      },
      {
        name: "Ibrahim Sifat",
        username: "usernameTwo",
        email: "ibrahimsifat.me@gmail.com",
        confirmed: true,
        blocked: false,
        password: await hashing.generateHash("Test1234"),
      },
    ];
    const initialRoleData = {
      name: "user",
      description: "this is a user role",
    };

    // Use a loop to insert each item into the database
    Item.insertMany(initialItemData);
    User.insertMany(initialUserData);
    Role.insertMany(initialRoleData);

    console.log("Test database seeded successfully");
  } catch (error) {
    console.error("Error seeding test database:", error);
  }
};

module.exports = seedTestDatabase;
