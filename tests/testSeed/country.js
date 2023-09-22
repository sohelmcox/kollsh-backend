const { testBaseUrl } = require("../../src/config");
const countryTestUrl = `${testBaseUrl}/countries`;
const countryData1 = {
  name: "Country 1",
  flag_image: "string or id",
  code: "string",
};
const countryData2 = {
  name: "Country 2",
  flag_image: "string or id",
  code: "string",
};
const newCountryData = {
  id: "newCountryId",
  name: "New Country",
  flag_image: "string or id",
  code: "string",
};
const updatedCountryData = {
  name: "Updated Country",
  flag_image: "string or id",
  code: "string",
};
const editCountryData = {
  name: "Edit Country",
  code: "string",
};
const existingCountryData = {
  name: "Existing Country",
  flag_image: "string or id",
  code: "string",
};
const existingCountry = {
  id: "existingCountryId",
  name: "Existing Country Name",
};
const countryTestData = {
  id: "countryId",
  name: "Test Country",
  flag_image: "string or id",
  code: "string",
};
const mockCountry = {
  id: "countryId",
  name: "Test Country",
  flag_image: "string or id",
  code: "string",
};
const mockUpdatedCountry = {
  id: "countryId",
  name: "Updated Country",
  code: "Updated Code",
};
const updatedCode = { code: "Updated Code" };
const createCountryData = [
  {
    name: "string",
    flag_image: "string or id",
    code: "string",
  },
  {
    name: "country name",
    flag_image: "string or id",
    code: "string",
  },
];
const countryTestQuery = {
  sort: "name",
  fields: "name,code",
  pageSize: 10,
  pageNumber: 1,
};
module.exports = {
  countryData1,
  countryData2,
  newCountryData,
  updatedCountryData,
  editCountryData,
  existingCountryData,
  existingCountry,
  updatedCode,
  countryTestData,
  createCountryData,
  mockCountry,
  mockUpdatedCountry,
  countryTestUrl,
  countryTestQuery,
};
