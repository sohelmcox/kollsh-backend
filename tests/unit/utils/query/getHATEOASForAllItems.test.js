const {
  generateQueryString,
  getHATEOASForAllItems,
} = require("../../../../src/utils/Query/getHATEOASForAllItems");

describe("generateQueryString", () => {
  it("should generate a query string from an object", () => {
    // Arrange
    const queryObject = {
      key1: "value1",
      key2: "value2",
    };

    // Act
    const queryString = generateQueryString(queryObject);

    // Assert
    expect(queryString).toBe("key1=value1&key2=value2");
  });

  // Add more test cases or edge cases as needed
});

describe("getHATEOASForAllItems", () => {
  it("should generate HATEOAS links with next and prev", () => {
    // Arrange
    const requestQuery = {
      pageNumber: 2,
      pageSize: 10,
    };

    // Act
    const links = getHATEOASForAllItems({
      url: "/items",
      path: "/items",
      requestQuery,
      hasNext: true,
      hasPrev: true,
      pageNumber: 2,
    });

    // Assert
    expect(links).toEqual({
      self: "/items",
      next: "/items?pageNumber=3&pageSize=10",
      prev: "/items?pageNumber=1&pageSize=10",
    });
  });

  it("should generate HATEOAS links with only next", () => {
    // Arrange
    const requestQuery = {
      pageNumber: 1,
      pageSize: 10,
    };

    // Act
    const links = getHATEOASForAllItems({
      url: "/items",
      path: "/items",
      requestQuery,
      hasNext: true,
      hasPrev: false,
      pageNumber: 1,
    });

    // Assert
    expect(links).toEqual({
      self: "/items",
      next: "/items?pageNumber=2&pageSize=10",
    });
  });
});
