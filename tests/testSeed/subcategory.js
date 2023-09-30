const { testBaseUrl } = require("../../src/config");
const subcategoryTestUrl = `${testBaseUrl}/subcategories`;
const subcategoryData1 = {
  name: "Subcategory 1",
  slug: "subcategory-1",
  category: "string or id",
  image: "string or id",
  cover_image: "string or id",
  priority: 0,
  is_brand: true,
  attributes: ["string or id", "string or id"],
};
const subcategoryData2 = {
  name: "Subcategory 2",
  slug: "subcategory-2",
  category: "string or id",
  image: "string or id",
  cover_image: "string or id",
  priority: 0,
  is_brand: true,
  attributes: ["string or id", "string or id"],
};
const newSubcategoryData = {
  id: "newSubcategoryId",
  name: "New Subcategory",
  slug: "new-subcategory",
  category: "string or id",
  image: "string or id",
  cover_image: "string or id",
  priority: 0,
  is_brand: true,
  attributes: ["string or id", "string or id"],
};
const updatedSubcategoryData = {
  name: "Updated Subcategory",
  category: "string or id",
  image: "string or id",
  cover_image: "string or id",
  priority: 0,
  is_brand: true,
  attributes: ["string or id", "string or id"],
};
const editSubcategoryData = {
  name: "Edit Subcategory",
  priority: 0,
};
const existingSubcategoryData = {
  name: "Existing Subcategory",
  category: "string or id",
  image: "string or id",
  cover_image: "string or id",
  priority: 0,
  is_brand: true,
  attributes: ["string or id", "string or id"],
};
const existingSubcategory = {
  id: "existingSubcategoryId",
  name: "Existing Subcategory Name",
};
const subcategoryTestData = {
  id: "subcategoryId",
  name: "Test Subcategory",
  category: "string or id",
  image: "string or id",
  cover_image: "string or id",
  priority: 0,
  is_brand: true,
  attributes: ["string or id", "string or id"],
};
const mockSubcategory = {
  id: "subcategoryId",
  name: "Test Subcategory",
  category: "string or id",
  image: "string or id",
  cover_image: "string or id",
  priority: 0,
  is_brand: true,
  attributes: ["string or id", "string or id"],
};
const mockUpdatedSubcategory = {
  id: "subcategoryId",
  name: "Updated Subcategory",
  priority: 1,
};
const updatedPriority = { priority: 0 };
const createSubcategoryData = [
  {
    name: "string",
    slug: "string",
    category: "string or id",
    image: "string or id",
    cover_image: "string or id",
    priority: 0,
    is_brand: true,
    attributes: ["string or id", "string or id"],
  },
  {
    name: "subcategory name",
    slug: "subcategory-name",
    category: "string or id",
    image: "string or id",
    cover_image: "string or id",
    priority: 0,
    is_brand: true,
    attributes: ["string or id", "string or id"],
  },
];
const permissionsData = {
  controller: "subcategory",
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
const subcategoryTestQuery = {
  sort: "name",
  fields: "name,priority",
  pageSize: 10,
  pageNumber: 1,
};
module.exports = {
  subcategoryData1,
  subcategoryData2,
  newSubcategoryData,
  updatedSubcategoryData,
  editSubcategoryData,
  existingSubcategoryData,
  existingSubcategory,
  updatedPriority,
  subcategoryTestData,
  createSubcategoryData,
  mockSubcategory,
  mockUpdatedSubcategory,
  subcategoryTestUrl,
  permissionsData,
  rolesData,
  subcategoryTestQuery,
};
