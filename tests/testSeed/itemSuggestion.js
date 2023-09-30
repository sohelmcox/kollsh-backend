const { testBaseUrl } = require("../../src/config");
const itemSuggestionTestUrl = `${testBaseUrl}/item-suggestions`;
const itemSuggestionData1 = {
  user: "6502a59b35d01ff95a2c2527",
  item: ["54759eb3c090d83494e2d804"],
  categories: ["string or id", "string or id"],
  subcategories: ["string or id", "string or id"],
  brands: ["string or id", "string or id"],
};
const itemSuggestionData2 = {
  user: "6502a59b35d01fe55a2c2527",
  item: ["54759eb3c090d83494e2d804"],
  categories: ["string or id", "string or id"],
  subcategories: ["string or id", "string or id"],
  brands: ["string or id", "string or id"],
};
const newItemSuggestionData = {
  id: "6502a59b35d01ff95a2c2528",
  user: "6502a59b35d01ff95a2c2527",
  item: ["54759eb3c090d83494e2d804"],
  categories: ["string or id", "string or id"],
  subcategories: ["string or id", "string or id"],
  brands: ["string or id", "string or id"],
};
const updatedItemSuggestionData = {
  user: "557064617465642055736572",
  item: ["54759eb3c090d83494e2d804"],
  categories: ["string or id", "string or id"],
  subcategories: ["string or id", "string or id"],
  brands: ["string or id", "string or id"],
};
const editItemSuggestionData = {
  user: "6502a59b35d01ff95a2c2527",
  item: ["54759eb3c090d83494e2d804"],
  categories: ["string or id", "string or id"],
  subcategories: ["string or id", "string or id"],
  brands: ["string or id", "string or id"],
};
const existingItemSuggestionData = {
  user: "6502a59b35d01ff95a2c2527",
  item: ["54759eb3c090d83494e2d804"],
  categories: ["string or id", "string or id"],
  subcategories: ["string or id", "string or id"],
  brands: ["string or id", "string or id"],
};
const existingItemSuggestion = {
  id: "6502a59b35d01ff95a2c2523",
  user: "6502a59b35d01ff95a2c2527",
};
const itemSuggestionTestData = {
  id: "6502a59b35d01ff95a2c2524",
  user: "6502a59b35d01ff95a2c2527",
  item: ["54759eb3c090d83494e2d804"],
  categories: ["string or id", "string or id"],
  subcategories: ["string or id", "string or id"],
  brands: ["string or id", "string or id"],
};
const mockItemSuggestion = {
  id: "6502a57b35d01ff95a2c2521",
  user: "6502a59b35d01ff95a2c2527",
  item: ["54759eb3c090d83494e2d804"],
  categories: ["string or id", "string or id"],
  subcategories: ["string or id", "string or id"],
  brands: ["string or id", "string or id"],
};
const mockUpdatedItemSuggestion = {
  id: "itemSuggestionId",
  user: "6502a59b35d01ff95a2c2527",
  item: ["54759eb3c090d83494e2d804"],
  categories: ["string or id", "string or id"],
};
const updatedUser = { user: "Updated User" };
const createItemSuggestionData = [
  {
    user: "557064617465642055756572",
    item: ["54759eb3c090d83494e2d804"],
    categories: ["string or id", "string or id"],
    subcategories: ["string or id", "string or id"],
    brands: ["string or id", "string or id"],
  },
  {
    user: "6502a59b35d01ff95a2c2527",
    item: ["54759eb3c090d83494e2d804"],
    categories: ["string or id", "string or id"],
    subcategories: ["string or id", "string or id"],
    brands: ["string or id", "string or id"],
  },
];
const permissionsData = {
  controller: "itemSuggestion",
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
const itemSuggestionTestQuery = {
  sort: "user",
  fields: "user",
  pageSize: 10,
  pageNumber: 1,
};
module.exports = {
  itemSuggestionData1,
  itemSuggestionData2,
  newItemSuggestionData,
  updatedItemSuggestionData,
  editItemSuggestionData,
  existingItemSuggestionData,
  existingItemSuggestion,
  updatedUser,
  itemSuggestionTestData,
  createItemSuggestionData,
  mockItemSuggestion,
  mockUpdatedItemSuggestion,
  itemSuggestionTestUrl,
  permissionsData,
  rolesData,
  itemSuggestionTestQuery,
};
