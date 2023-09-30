const { testBaseUrl } = require("../../src/config");
const brandTestUrl = `${testBaseUrl}/brands`;
const brandData1 = {
  name: "Brand 1",
  slug: "brand-1",
  image: "string or id",
  description: "Description 1",
  priority: 0,
  attributes: ["string or id", "string or id"],
};
const brandData2 = {
  name: "Brand 2",
  slug: "brand-2",
  image: "string or id",
  description: "Description 2",
  priority: 0,
  attributes: ["string or id", "string or id"],
};
const newBrandData = {
  id: "newBrandId",
  name: "New Brand",
  slug: "new-brand",
  priority: 0,
  description: "New Description",
  image: "string or id",
};
const updatedBrandData = {
  name: "Updated Brand",
  slug: "updated-brand",
  description: "Updated Description",
  priority: 0,
  image: "string or id",
};
const editBrandData = {
  name: "Edit Brand",
  description: "Edit Description",
};
const existingBrandData = {
  name: "Existing Brand",
  description: "Existing Description",
  slug: "existing-brand",
  priority: 0,
  image: "string or id",
};
const existingBrand = {
  id: "existingBrandId",
  name: "Existing Brand Name",
};
const brandTestData = {
  id: "brandId",
  name: "Test Brand",
  description: "Test Description",
  slug: "test-brand",
  priority: 0,
  image: "string or id",
};
const mockBrand = {
  id: "brandId",
  name: "Test Brand",
  description: "Test Description",
  priority: 0,
  image: "string or id",
};
const mockUpdatedBrand = {
  id: "brandId",
  name: "Updated Brand",
  description: "Updated Description",
};
const updatedDescription = { description: "Updated Description" };
const createBrandData = [
  {
    name: "string",
    slug: "string",
    image: "string or id",
    description: "string",
    priority: 0,
    attributes: ["string or id", "string or id"],
  },
  {
    name: "brand name",
    slug: "brand-name",
    image: "string or id",
    description: "string",
    priority: 0,
    attributes: ["string or id", "string or id"],
  },
];
const permissionsData = {
  controller: "brand",
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
const brandTestQuery = {
  sort: "name",
  fields: "name,description",
  pageSize: 10,
  pageNumber: 1,
};
module.exports = {
  brandData1,
  brandData2,
  newBrandData,
  updatedBrandData,
  editBrandData,
  existingBrandData,
  existingBrand,
  updatedDescription,
  brandTestData,
  createBrandData,
  mockBrand,
  mockUpdatedBrand,
  permissionsData,
  rolesData,
  brandTestUrl,
  brandTestQuery,
};
