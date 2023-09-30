const { testBaseUrl } = require("../../src/config");
const stateTestUrl = `${testBaseUrl}/states`;
const stateData1 = {
  name: "State 1",
  image: "string or id",
  priority: 0,
  cities: ["string or id", "string or id"],
  country: "string or id",
};
const stateData2 = {
  name: "State 2",
  image: "string or id",
  priority: 0,
  cities: ["string or id", "string or id"],
  country: "string or id",
};
const newStateData = {
  id: "newStateId",
  name: "New State",
  image: "string or id",
  priority: 0,
  cities: ["string or id", "string or id"],
  country: "string or id",
};
const updatedStateData = {
  name: "Updated State",
  image: "string or id",
  priority: 0,
  cities: ["string or id", "string or id"],
  country: "string or id",
};
const editStateData = {
  name: "Edit State",
  priority: 0,
};
const existingStateData = {
  name: "Existing State",
  image: "string or id",
  priority: 0,
  cities: ["string or id", "string or id"],
  country: "string or id",
};
const existingState = {
  id: "existingStateId",
  name: "Existing State Name",
};
const stateTestData = {
  id: "stateId",
  name: "Test State",
  image: "string or id",
  priority: 0,
  cities: ["string or id", "string or id"],
  country: "string or id",
};
const mockState = {
  id: "stateId",
  name: "Test State",
  image: "string or id",
  priority: 0,
  cities: ["string or id", "string or id"],
  country: "string or id",
};
const mockUpdatedState = {
  id: "stateId",
  name: "Updated State",
  priority: 0,
};
const updatedPriority = { priority: 0 };
const createStateData = [
  {
    name: "string",
    image: "string or id",
    priority: 0,
    cities: ["string or id", "string or id"],
    country: "string or id",
  },
  {
    name: "state name",
    image: "string or id",
    priority: 0,
    cities: ["string or id", "string or id"],
    country: "string or id",
  },
];
const permissionsData = {
  controller: "state",
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
const stateTestQuery = {
  sort: "name",
  fields: "name,priority",
  pageSize: 10,
  pageNumber: 1,
};
module.exports = {
  stateData1,
  stateData2,
  newStateData,
  updatedStateData,
  editStateData,
  existingStateData,
  existingState,
  updatedPriority,
  stateTestData,
  createStateData,
  mockState,
  mockUpdatedState,
  stateTestUrl,
  permissionsData,
  rolesData,
  stateTestQuery,
};
