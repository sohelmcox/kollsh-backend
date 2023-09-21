const { hashing } = require("../../src/utils");

const testUsers = [
  {
    name: "Ibrahim Sifat",
    username: "username",
    email: "ibsifat900@gmail.com",
    confirmed: true,
    blocked: false,
    password: await hashing.generateHash("string"),
  },
];
module.exports = { testUsers };
