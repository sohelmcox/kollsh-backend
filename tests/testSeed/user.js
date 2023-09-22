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
const { testBaseUrl } = require("../../src/config");
const userTestUrl = `${testBaseUrl}/users`;
const userData1 = {
  name: "User 1",
  slug: "user-1",
  image: "string or id",
  description: "Description 1",
  priority: 0,
  attributes: ["string or id", "string or id"],
};
const userData2 = {
  name: "User 2",
  slug: "user-2",
  image: "string or id",
  description: "Description 2",
  priority: 0,
  attributes: ["string or id", "string or id"],
};
const newUserData = {
  id: "newUserId",
  name: "New User",
  slug: "new-user",
  priority: 0,
  description: "New Description",
  image: "string or id",
};
const updatedUserData = {
  name: "Updated User",
  slug: "updated-user",
  description: "Updated Description",
  priority: 0,
  image: "string or id",
};
const editUserData = {
  name: "Edit User",
  description: "Edit Description",
};
const existingUserData = {
  name: "Existing User",
  description: "Existing Description",
  slug: "existing-user",
  priority: 0,
  image: "string or id",
};
const existingUser = {
  id: "existingUserId",
  name: "Existing User Name",
};
const userTestData = {
  id: "userId",
  name: "Test User",
  description: "Test Description",
  slug: "test-user",
  priority: 0,
  image: "string or id",
};
const mockUser = {
  id: "userId",
  name: "Test User",
  description: "Test Description",
  priority: 0,
  image: "string or id",
};
const mockUpdatedUser = {
  id: "userId",
  name: "Updated User",
  description: "Updated Description",
};
const updatedDescription = { description: "Updated Description" };
const createUserData = [
  {
    name: "string",
    slug: "string",
    image: "string or id",
    description: "string",
    priority: 0,
    attributes: ["string or id", "string or id"],
  },
  {
    name: "user name",
    slug: "user-name",
    image: "string or id",
    description: "string",
    priority: 0,
    attributes: ["string or id", "string or id"],
  },
];
const userTestQuery = {
  sort: "name",
  fields: "name,description",
  pageSize: 10,
  pageNumber: 1,
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
  updatedDescription,
  userTestData,
  createUserData,
  mockUser,
  mockUpdatedUser,
  userTestUrl,
  userTestQuery,
};
