const { testBaseUrl } = require("../../src/config");
const commentTestUrl = `${testBaseUrl}/comments`;
const commentData1 = {
  content: "Comment 1",
  author: "64c0e03779da93002b059be0",
  itemDetails: "string or id",
};
const commentData2 = {
  content: "Comment 2",
  author: "64c0e03779da93002b059be0",
  itemDetails: "string or id",
};
const newCommentData = {
  id: "newCommentId",
  content: "New Comment",
  author: "64c0e03779da93002b059be0",
  itemDetails: "string or id",
};
const updatedCommentData = {
  content: "Updated Comment",
  itemDetails: "string or id",
  priority: 1,
};
const editCommentData = {
  content: "Edit Comment",
  author: "64c0e03779da93002b059be0",
  itemDetails: "string or id",
};
const existingCommentData = {
  content: "Existing Comment",
  author: "64c0e03779da93002b059be0",
  itemDetails: "string or id",
};
const existingComment = {
  id: "existingCommentId",
  content: "Existing Comment Name",
  author: "64c0e03779da93002b059be0",
};

const commentTestData = {
  id: "commentId",
  content: "Test Comment",
  author: "64c0e03779da93002b059be0",
  itemDetails: "string or id",
};
const mockComment = {
  id: "commentId",
  content: "Test Comment",
  author: "64c0e03779da93002b059be0",
  itemDetails: "string or id",
};
const mockUpdatedComment = {
  id: "commentId",
  content: "Updated Comment",
  author: "64c0e03779da93002b059be0",
  itemDetails: "string or id",
};
const updatedContent = { content: "Updated Comment" };
const createCommentData = [
  {
    content: "string",
    author: "64c0e03779da93002b059be0",
    itemDetails: "string or id",
  },
  {
    content: "comment name",
    author: "64c0e03779da93002b059be0",
    itemDetails: "string or id",
  },
];
const permissionsData = {
  controller: "comment",
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
const commentTestQuery = {
  sort: "name",
  itemDetails: "string or id",
};
module.exports = {
  commentData1,
  commentData2,
  newCommentData,
  updatedCommentData,
  editCommentData,
  existingCommentData,
  existingComment,
  updatedContent,
  commentTestData,
  createCommentData,
  mockComment,
  mockUpdatedComment,
  permissionsData,
  rolesData,
  commentTestUrl,
  commentTestQuery,
};
