const { testBaseUrl } = require("../../src/config");
const itemDetailsTestUrl = `${testBaseUrl}/item-details`;
const itemDetailsData1 = {
  description: "ItemDetails 1",
  item: "string or id",
  images: ["string or id", "string or id"],
  contactNumber: "123456789",
  whatsappNumber: "123456789",
  email: "user@example.com",
  address: "string",
  latitude: "123456789",
  longitude: "123456789",
  metadata: "string or id",
};
const itemDetailsData2 = {
  description: "ItemDetails 2",
  item: "string or id",
  images: ["string or id", "string or id"],
  contactNumber: "123456789",
  whatsappNumber: "123456789",
  email: "user@example.com",
  address: "string",
  latitude: "123456789",
  longitude: "123456789",
  metadata: "string or id",
};
const newItemDetailsData = {
  id: "newItemDetailsId",
  description: "New ItemDetails",
  item: "string or id",
  images: ["string or id", "string or id"],
  contactNumber: "123456789",
  whatsappNumber: "123456789",
  email: "user@example.com",
  address: "string",
  latitude: "123456789",
  longitude: "123456789",
  metadata: "string or id",
};
const updatedItemDetailsData = {
  description: "Updated ItemDetails",
  item: "string or id",
  images: ["string or id", "string or id"],
  contactNumber: "123456789",
  whatsappNumber: "123456789",
  email: "user@example.com",
  address: "string",
  latitude: "123456789",
  longitude: "123456789",
  metadata: "string or id",
};
const editItemDetailsData = {
  email: "user@example.com",
  description: "Edit Description",
};
const existingItemDetailsData = {
  description: "Existing ItemDetails",
  item: "string or id",
  images: ["string or id", "string or id"],
  contactNumber: "123456789",
  whatsappNumber: "123456789",
  email: "user@example.com",
  address: "string",
  latitude: "123456789",
  longitude: "123456789",
  metadata: "string or id",
};
const existingItemDetails = {
  id: "existingItemDetailsId",
  description: "Existing ItemDetails Name",
};
const itemDetailsTestData = {
  id: "itemDetailsId",
  description: "Test ItemDetails",
  item: "string or id",
  images: ["string or id", "string or id"],
  contactNumber: "123456789",
  whatsappNumber: "123456789",
  email: "user@example.com",
  address: "string",
  latitude: "123456789",
  longitude: "123456789",
  metadata: "string or id",
};
const mockItemDetails = {
  id: "itemDetailsId",
  description: "Test Description",
  item: "string or id",
  images: ["string or id", "string or id"],
  contactNumber: "123456789",
  whatsappNumber: "123456789",
  email: "user@example.com",
  address: "string",
  latitude: "123456789",
  longitude: "123456789",
  metadata: "string or id",
};
const mockUpdatedItemDetails = {
  id: "itemDetailsId",
  email: "user@example.com",
  description: "Updated Description",
};
const updatedDescription = { description: "Updated ItemDetails" };
const createItemDetailsData = [
  {
    description: "string",
    item: "string or id",
    images: ["string or id", "string or id"],
    contactNumber: "123456789",
    whatsappNumber: "123456789",
    email: "user@example.com",
    address: "string",
    latitude: "123456789",
    longitude: "123456789",
    metadata: "string or id",
  },
  {
    description: "itemDetails name",
    item: "string or id",
    images: ["string or id", "string or id"],
    contactNumber: "123456789",
    whatsappNumber: "123456789",
    email: "user@example.com",
    address: "string",
    latitude: "123456789",
    longitude: "123456789",
    metadata: "string or id",
  },
];
const permissionsData = {
  controller: "itemDetails",
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
const itemDetailsTestQuery = {
  sort: "name",
  fields: "description,email",
  pageSize: 10,
  pageNumber: 1,
};
module.exports = {
  itemDetailsData1,
  itemDetailsData2,
  newItemDetailsData,
  updatedItemDetailsData,
  editItemDetailsData,
  existingItemDetailsData,
  existingItemDetails,
  updatedDescription,
  itemDetailsTestData,
  createItemDetailsData,
  mockItemDetails,
  mockUpdatedItemDetails,
  itemDetailsTestUrl,
  permissionsData,
  rolesData,
  itemDetailsTestQuery,
};
