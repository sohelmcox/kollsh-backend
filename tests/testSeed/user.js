const testUsers = [
  {
    name: "Ibrahim Sifat",
    username: "main username",
    email: "ibsifat100@gmail.com",
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
  email: "ibsifat1000@gmail.com",
  confirmed: true,
  blocked: false,
  password: "string",
};
const userData2 = {
  name: "User 2",
  username: "username4",
  email: "ibsifat9@gmail.com",
  confirmed: true,
  blocked: false,
  password: "string",
};
const newUserData = {
  id: "newUserId",
  name: "New User",
  username: "usernames",
  email: "ibsifat90@gmail.com",
  confirmed: true,
  blocked: false,
  password: "string",
};
const updatedUserData = {
  name: "Updated User",
  username: "username5",
  email: "ibsifat800@gmail.com",
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
  email: "ibsifat700@gmail.com",
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
  email: "ibsifat400@gmail.com",
  confirmed: true,
  blocked: false,
  password: "string",
};
const mockUser = {
  id: "userId",
  name: "Test User",
  username: "test username",
  email: "ibsifat200@gmail.com",
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
    username: "username data",
    email: "ibsifat100@gmail.com",
    confirmed: true,
    blocked: false,
    password: "string",
  },
  {
    name: "user name",
    username: "username data2",
    email: "ibsifat50@gmail.com",
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
  username: "real username",
  email: "ibsifat0@gmail.com",
  confirmed: true,
  blocked: false,
};
const toUpdateUser = {
  name: "patch string",
  username: "patch username data",
  email: "ibsifatpatch00@gmail.com",
  confirmed: true,
  blocked: false,
  password: "string",
};
const toDeleteUser = {
  name: "delete string",
  username: "delete username data",
  email: "ibsifatdelete00@gmail.com",
  confirmed: true,
  blocked: false,
  password: "string",
};
const toChangePassword = {
  name: "change string",
  username: "change username data",
  email: "ibsifatchange00@gmail.com",
  confirmed: true,
  blocked: false,
  password: "string",
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
  toUpdateUser,
  toDeleteUser,
  toChangePassword,
};
