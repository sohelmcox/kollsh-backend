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
  name: "New Brand",
  slug: "new-brand",
  priority: 0,
  description: "New Description",
  image: "string or id",
};
const updatedBrandData = {
  name: "Updated Brand",
  description: "Updated Description",
  priority: 0,
  image: "string or id",
};
const existingBrandData = {
  name: "Existing Brand",
  description: "Existing Description",
  slug: "existing-brand",
  priority: 0,
  image: "string or id",
};
const brandTestData = {
  name: "Test Brand",
  description: "Test Description",
  slug: "test-brand",
  priority: 0,
  image: "string or id",
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
module.exports = {
  brandData1,
  brandData2,
  newBrandData,
  updatedBrandData,
  existingBrandData,
  updatedDescription,
  brandTestData,
  createBrandData,
  brandTestUrl,
};
