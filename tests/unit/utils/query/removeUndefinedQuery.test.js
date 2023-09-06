const removeUndefinedQuery = require("../../../../src/utils/Query/removeUndefinedQuery");

describe("removeUndefinedQuery", () => {
  it("should remove undefined values from the query object", () => {
    // Arrange
    const query = {
      name: "John",
      age: undefined,
      city: "New York",
      country: undefined,
    };

    // Act
    const result = removeUndefinedQuery(query);

    // Assert
    expect(result).toEqual({
      name: "John",
      city: "New York",
    });
  });

  it("should not modify the query object if no undefined values are present", () => {
    // Arrange
    const query = {
      name: "Alice",
      age: 30,
      city: "Los Angeles",
    };

    // Act
    const result = removeUndefinedQuery(query);

    // Assert
    expect(result).toEqual(query);
  });

  it("should handle an empty query object", () => {
    // Arrange
    const query = {};

    // Act
    const result = removeUndefinedQuery(query);

    // Assert
    expect(result).toEqual({});
  });

  it("should handle a query object with all undefined values", () => {
    // Arrange
    const query = {
      name: undefined,
      age: undefined,
      city: undefined,
    };

    // Act
    const result = removeUndefinedQuery(query);

    // Assert
    expect(result).toEqual({});
  });
});
