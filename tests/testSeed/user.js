const testUsers = [
  {
    name: "Ibrahim Sifat",
    username: "username",
    email: "ibsifat900@gmail.com",
    confirmed: true,
    blocked: false,
    password: "string",
  },
];
const { testBaseUrl } = require("../../src/config");
const userTestUrl = `${testBaseUrl}/users`;
const userData1 = {
  name: "User 1",
  username: "username2",
  email: "ibsifat900@gmail.com",
  confirmed: true,
  blocked: false,
  password: "string",
};
const userData2 = {
  name: "User 2",
  username: "username4",
  email: "ibsifat900@gmail.com",
  confirmed: true,
  blocked: false,
  password: "string",
};
const newUserData = {
  id: "newUserId",
  name: "New User",
  username: "usernames",
  email: "ibsifat900@gmail.com",
  confirmed: true,
  blocked: false,
  password: "string",
};
const updatedUserData = {
  name: "Updated User",
  username: "username5",
  email: "ibsifat900@gmail.com",
  confirmed: true,
  blocked: false,
  password: "string",
};
const editUserData = {
  name: "Edit User",
  username: "Edit username",
};
const existingUserData = {
  name: "Existing User",
  username: "Existing username",
  email: "ibsifat900@gmail.com",
  confirmed: true,
  blocked: false,
  password: "string",
};
const existingUser = {
  id: "existingUserId",
  name: "Existing User Name",
};
const userTestData = {
  id: "userId",
  name: "Test User",
  username: "test_username",
  email: "ibsifat900@gmail.com",
  confirmed: true,
  blocked: false,
  password: "string",
};
const mockUser = {
  id: "userId",
  name: "Test User",
  username: "username",
  email: "ibsifat900@gmail.com",
  confirmed: true,
  blocked: false,
  password: "string",
};
const mockUpdatedUser = {
  id: "userId",
  name: "Updated User",
  username: "Updated Username",
};
const updatedUsername = { username: "Updated Username" };
const createUserData = [
  {
    name: "string",
    username: "username",
    email: "ibsifat900@gmail.com",
    confirmed: true,
    blocked: false,
    password: "string",
  },
  {
    name: "user name",
    username: "username",
    email: "ibsifat900@gmail.com",
    confirmed: true,
    blocked: false,
    password: "string",
  },
];
const userTestQuery = {
  sort: "name",
  fields: "name,username,email",
  pageSize: 10,
  pageNumber: 1,
};
const reqTestUser = {
  id: "6502a59b35d01ff95a2c2527",
  name: "Ibrahim Sifat",
  username: "username",
  email: "ibsifat900@gmail.com",
  confirmed: true,
  blocked: false,
};
module.exports = {
  testUsers,
  userData1,
  userData2,
  newUserData,
  updatedUserData,
  editUserData,
  existingUserData,
  existingUser,
  updatedUsername,
  userTestData,
  createUserData,
  mockUser,
  mockUpdatedUser,
  userTestUrl,
  userTestQuery,
  reqTestUser,
};
