const { testBaseUrl } = require("../../src/config");
const metadataTestUrl = `${testBaseUrl}/item-details`;
const metadataData1 = {
  title: "Metadata 1",
  description: "string",
  image: "string or id",
  keywords: ["string"],
};
const metadataData2 = {
  title: "Metadata 2",
  description: "string",
  image: "string or id",
  keywords: ["string"],
};
const newMetadataData = {
  id: "newMetadataId",
  title: "New Metadata",
  description: "string",
  image: "string or id",
  keywords: ["string"],
};
const updatedMetadataData = {
  title: "Updated Metadata",
  description: "Updated Description",
  image: "string or id",
  keywords: ["string"],
};
const editMetadataData = {
  title: "Edit Description",
  description: "string",
};
const existingMetadataData = {
  title: "Existing Metadata",
  description: "string",
  image: "string or id",
  keywords: ["string"],
};
const existingMetadata = {
  id: "existingMetadataId",
  title: "Existing Metadata Name",
};
const metadataTestData = {
  id: "metadataId",
  title: "Test Metadata",
  description: "string",
  image: "string or id",
  keywords: ["string"],
};
const mockMetadata = {
  id: "metadataId",
  title: "Test Metadata",
  description: "string",
  image: "string or id",
  keywords: ["string"],
};
const mockUpdatedMetadata = {
  id: "metadataId",
  title: "Updated Metadata",
  description: "Updated Description",
};
const updatedDescription = { description: "Updated Description" };
const createMetadataData = [
  {
    title: "string",
    description: "string",
    image: "string or id",
    keywords: ["string"],
  },
  {
    title: "metadata title",
    description: "string",
    image: "string or id",
    keywords: ["string"],
  },
];
const metadataTestQuery = {
  sort: "name",
  fields: "title,description",
  pageSize: 10,
  pageNumber: 1,
};
module.exports = {
  metadataData1,
  metadataData2,
  newMetadataData,
  updatedMetadataData,
  editMetadataData,
  existingMetadataData,
  existingMetadata,
  updatedDescription,
  metadataTestData,
  createMetadataData,
  mockMetadata,
  mockUpdatedMetadata,
  metadataTestUrl,
  metadataTestQuery,
};
