const { testBaseUrl } = require("../../src/config");
const cityTestUrl = `${testBaseUrl}/cities`;
const cityData1 = {
  name: "City 1",
  state: "string or id",
  priority: 0,
};
const cityData2 = {
  name: "City 2",
  state: "string or id",
  priority: 0,
};
const newCityData = {
  id: "newCityId",
  name: "New City",
  priority: 0,
  state: "string or id",
};
const updatedCityData = {
  name: "Updated City",
  priority: 0,
  state: "string or id",
};
const editCityData = {
  name: "Edit City",
};
const existingCityData = {
  name: "Existing City",
  priority: 0,
  state: "string or id",
};
const existingCity = {
  id: "existingCityId",
  name: "Existing City Name",
};
const cityTestData = {
  id: "cityId",
  name: "Test City",
  priority: 0,
  state: "string or id",
};
const mockCity = {
  id: "cityId",
  name: "Test City",
  priority: 0,
  state: "string or id",
};
const mockUpdatedCity = {
  id: "cityId",
  name: "Updated City",
};
const updatedName = { name: "Updated City" };
const createCityData = [
  {
    name: "string",
    state: "string or id",
    priority: 0,
  },
  {
    name: "city name",
    state: "string or id",
    priority: 0,
  },
];
const permissionsData = {
  controller: "city",
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
const cityTestQuery = {
  sort: "name",
  fields: "name",
  pageSize: 10,
  pageNumber: 1,
};
module.exports = {
  cityData1,
  cityData2,
  newCityData,
  updatedCityData,
  editCityData,
  existingCityData,
  existingCity,
  updatedName,
  cityTestData,
  createCityData,
  mockCity,
  mockUpdatedCity,
  permissionsData,
  rolesData,
  cityTestUrl,
  cityTestQuery,
};
