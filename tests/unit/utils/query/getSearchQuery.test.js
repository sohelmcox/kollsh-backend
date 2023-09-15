const getSearchQuery = require("../../../../src/utils/Query/getSearchQuery");

const { badRequest } = require("../../../../src/utils/error");

describe("getSearchQuery", () => {
  // Define some sample search query parameters and allowed fields
  const sampleSearchParams = {
    name: "John",
  };
  const allowedFields = ["name", "age"];

  it("should return an empty object if searchQueryParams is empty", () => {
    const searchQueryParams = {};
    const result = getSearchQuery(searchQueryParams, allowedFields);
    expect(result).toEqual({});
  });

  it("should return a valid search query object if the key is allowed", () => {
    const searchQueryParams = { name: "John" };
    const result = getSearchQuery(searchQueryParams, allowedFields);
    expect(result).toEqual({ name: { $regex: "John", $options: "i" } });
  });

  it("should throw a bad request error if the key is not allowed", () => {
    const searchQueryParams = { invalidField: "Value" };
    try {
      getSearchQuery(searchQueryParams, allowedFields);
      // If the function does not throw an error, fail the test
      fail("Expected an error to be thrown");
    } catch (error) {
      expect(error).toHaveProperty(
        "message",
        "Search query parameter invalidField is not allowed. allowed Fields are name,age",
      );
    }
  });
});
