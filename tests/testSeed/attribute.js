const { testBaseUrl } = require("../../src/config");
const attributeTestUrl = `${testBaseUrl}/attributes`;
const attributeData1 = {
  name: "Attribute 1",
  attribute_values: ["string or id", "string or id"],
  subcategories: ["string or id", "string or id"],
  brands: ["string or id", "string or id"],
};
const attributeData2 = {
  name: "Attribute 2",
  attribute_values: ["string or id", "string or id"],
  subcategories: ["string or id", "string or id"],
  brands: ["string or id", "string or id"],
};
const newAttributeData = {
  id: "newBrandId",
  name: "New Attribute",
  attribute_values: ["string or id", "string or id"],
  subcategories: ["string or id", "string or id"],
  brands: ["string or id", "string or id"],
};
const mockAttribute = {
  id: "attributeId",
  name: "Mock Attribute",
  attribute_values: ["string or id", "string or id"],
  subcategories: ["string or id", "string or id"],
  brands: ["string or id", "string or id"],
};
const mockUpdatedAttribute = {
  id: "attributeId",
  name: "Updated Attribute",
  attribute_values: ["string or id", "string or id"],
  subcategories: ["string or id", "string or id"],
  brands: ["string or id", "string or id"],
};
const updatedAttributeData = {
  id: "attributeId",
  name: "Updated Attribute",
  attribute_values: ["string or id", "string or id"],
  subcategories: ["string or id", "string or id"],
  brands: ["string or id", "string or id"],
};
const editAttributeData = {
  name: "Edit Attribute",
  attribute_values: ["string or id", "string or id"],
};
const existingAttributeData = {
  name: "Existing Attribute",
  attribute_values: ["string or id", "string or id"],
  subcategories: ["string or id", "string or id"],
  brands: ["string or id", "string or id"],
};
const attributeTestData = {
  id: "attributeId",
  name: "Test Attribute",
  attribute_values: ["string or id", "string or id"],
  subcategories: ["string or id", "string or id"],
  brands: ["string or id", "string or id"],
};
const updatedDescription = { description: "Updated Description" };
const createAttributeData = [
  {
    name: "attribute name new",
    attribute_values: ["string or id", "string or id"],
    subcategories: ["string or id", "string or id"],
    brands: ["string or id", "string or id"],
  },
  {
    name: "attribute name 1",
    attribute_values: ["string or id", "string or id"],
    subcategories: ["string or id", "string or id"],
    brands: ["string or id", "string or id"],
  },
];
const existingAttribute = {
  id: "existingAttributeId",
  name: "Existing Attribute Name",
};
const attributeTestQuery = {
  sort: "name",
  fields: "name",
  pageSize: 10,
  pageNumber: 1,
};
module.exports = {
  attributeData1,
  attributeData2,
  newAttributeData,
  updatedAttributeData,
  editAttributeData,
  existingAttributeData,
  mockAttribute,
  mockUpdatedAttribute,
  updatedDescription,
  attributeTestData,
  createAttributeData,
  attributeTestUrl,
  existingAttribute,
  attributeTestQuery,
};
