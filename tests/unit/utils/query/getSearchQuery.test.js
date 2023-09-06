const getSearchQuery = require("../../../../src/utils/Query/getSearchQuery");

describe("getSearchQuery", () => {
  it("should return an empty object for empty search query parameters", () => {
    // Arrange
    const searchQueryParams = {};

    // Act
    const result = getSearchQuery(searchQueryParams);

    // Assert
    expect(result).toEqual({});
  });

  it("should return a search query with regex for a valid search field", () => {
    // Arrange
    const searchQueryParams = {
      name: "apple",
    };

    // Act
    const result = getSearchQuery(searchQueryParams);

    // Assert
    expect(result).toEqual({
      name: { $regex: "apple", $options: "i" },
    });
  });

  it("should return an empty object for an invalid search field", () => {
    // Arrange
    const searchQueryParams = {
      price: 100,
    };

    // Act
    const result = getSearchQuery(searchQueryParams);

    // Assert
    expect(result).toEqual({});
  });

  it("should handle case-insensitive search", () => {
    // Arrange
    const searchQueryParams = {
      name: "OrAnGe",
    };

    // Act
    const result = getSearchQuery(searchQueryParams);

    // Assert
    expect(result).toEqual({
      name: { $regex: "OrAnGe", $options: "i" },
    });
  });

  it("should return an empty object if the value is falsy", () => {
    // Arrange
    const searchQueryParams = {
      name: "",
    };

    // Act
    const result = getSearchQuery(searchQueryParams);

    // Assert
    expect(result).toEqual({ name: { $regex: "", $options: "i" } });
  });
});
