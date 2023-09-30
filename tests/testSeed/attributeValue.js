const { testBaseUrl } = require("../../src/config");
const attributeValueTestUrl = `${testBaseUrl}/attribute-values`;
const attributeValueData1 = {
  name: "AttributeValue 1",
  color_code: "string",
  attribute: ["737472696e67206f72206964"],
  value: "string",
  brands: ["737472696e67206f72206964"],
};
const attributeValueData2 = {
  name: "AttributeValue 2",
  color_code: "string",
  attribute: ["737472696e67206f72206964"],
  value: "string",
  brands: ["737472696e67206f72206964"],
};
const newAttributeValueData = {
  id: "newAttributeValueId",
  name: "New AttributeValue",
  color_code: "string",
  attribute: ["737472696e67206f72206964"],
  value: "string",
  brands: ["737472696e67206f72206964"],
};
const updatedAttributeValueData = {
  name: "Updated AttributeValue",
  color_code: "string",
  attribute: ["737472696e67206f72206964"],
  value: "string",
  brands: ["737472696e67206f72206964"],
};
const editAttributeValueData = {
  name: "Edit AttributeValue",
  color_code: "string",
};
const existingAttributeValueData = {
  name: "Existing AttributeValue",
  color_code: "string",
  attribute: ["737472696e67206f72206964"],
  value: "string",
  brands: ["737472696e67206f72206964"],
};
const existingAttributeValue = {
  id: "existingAttributeValueId",
  name: "Existing AttributeValue Name",
};
const attributeValueTestData = {
  id: "attributeValueId",
  name: "Test AttributeValue",
  color_code: "string",
  attribute: ["737472696e67206f72206964"],
  value: "string",
  brands: ["737472696e67206f72206964"],
};
const mockAttributeValue = {
  id: "attributeValueId",
  name: "Test AttributeValue",
  color_code: "string",
  attribute: ["737472696e67206f72206964"],
  value: "string",
  brands: ["737472696e67206f72206964"],
};
const mockUpdatedAttributeValue = {
  id: "attributeValueId",
  name: "Updated AttributeValue",
  color_code: "string",
};
const updatedColorCode = { color_code: "string" };
const createAttributeValueData = [
  {
    name: "string",
    color_code: "string",
    attribute: ["737472696e67206f72206964"],
    value: "string",
    brands: ["737472696e67206f72206964"],
  },
  {
    name: "attributeValue name",
    color_code: "string",
    attribute: ["737472696e67206f72206964"],
    value: "string",
    brands: ["737472696e67206f72206964"],
  },
];
const permissionsData = {
  controller: "attributeValue",
  actions: ["read", "write", "delete", "update"],
  description: "Read Users",
  createdBy: null,
};

const rolesData = {
  name: "admin",
  description: "Admin Role",
  permissions: [],
  createdBy: "650d880858e6f8be2bb7b421",
};
const attributeValueTestQuery = {
  sort: "name",
  fields: "name",
  pageSize: 10,
  pageNumber: 1,
};
module.exports = {
  attributeValueData1,
  attributeValueData2,
  newAttributeValueData,
  updatedAttributeValueData,
  editAttributeValueData,
  existingAttributeValueData,
  existingAttributeValue,
  updatedColorCode,
  attributeValueTestData,
  createAttributeValueData,
  mockAttributeValue,
  mockUpdatedAttributeValue,
  attributeValueTestUrl,
  permissionsData,
  rolesData,
  attributeValueTestQuery,
};
