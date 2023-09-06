const generateQueryString = require("../../../../src/utils/Query/generateQueryString");
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
});
