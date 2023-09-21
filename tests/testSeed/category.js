const { testBaseUrl } = require("../../src/config");
const categoryTestUrl = `${testBaseUrl}/categories`;
const categoryData1 = {
  name: "Category 1",
  slug: "category-1",
  image: "string or id",
  priority: 0,
  cover_image: "string or id",
  featured: true,
};
const categoryData2 = {
  name: "Category 2",
  slug: "category-2",
  image: "string or id",
  cover_image: "string or id",
  priority: 0,
  featured: true,
};
const newCategoryData = {
  id: "newCategoryId",
  name: "New Category",
  slug: "new-category",
  priority: 0,
  image: "string or id",
  cover_image: "string or id",
  featured: true,
};
const updatedCategoryData = {
  name: "Updated Category",
  slug: "updated-category",
  image: "string or id",
  cover_image: "string or id",
  featured: true,
  priority: 0,
};
const editCategoryData = {
  name: "Edit Category",
  featured: true,
};
const existingCategoryData = {
  name: "Existing Category",
  slug: "existing-category",
  priority: 0,
  image: "string or id",
  cover_image: "string or id",
  featured: true,
};
const existingCategory = {
  id: "existingCategoryId",
  name: "Existing Category Name",
};
const categoryTestData = {
  id: "categoryId",
  name: "Test Category",
  slug: "test-category",
  priority: 0,
  image: "string or id",
  cover_image: "string or id",
  featured: true,
  priority: 0,
};
const mockCategory = {
  id: "categoryId",
  name: "Test Category",
  priority: 0,
  image: "string or id",
  cover_image: "string or id",
  featured: true,
  priority: 0,
};
const mockUpdatedCategory = {
  id: "categoryId",
  name: "Updated Category",
  featured: true,
};
const updatedName = { name: "Updated Category" };
const createCategoryData = [
  {
    name: "string",
    slug: "string",
    image: "string or id",
    cover_image: "string or id",
    featured: true,
    priority: 0,
  },
  {
    name: "category name",
    slug: "category-name",
    image: "string or id",
    cover_image: "string or id",
    featured: true,
    priority: 0,
  },
];
const categoryTestQuery = {
  sort: "name",
  fields: "name,featured",
  pageSize: 10,
  pageNumber: 1,
};
module.exports = {
  categoryData1,
  categoryData2,
  newCategoryData,
  updatedCategoryData,
  editCategoryData,
  existingCategoryData,
  existingCategory,
  updatedName,
  categoryTestData,
  createCategoryData,
  mockCategory,
  mockUpdatedCategory,
  categoryTestUrl,
  categoryTestQuery,
};
