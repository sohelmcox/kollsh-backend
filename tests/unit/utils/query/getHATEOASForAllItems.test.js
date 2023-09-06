const getHATEOASForAllItems = require("../../../../src/utils/Query/getHATEOASForAllItems");

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
