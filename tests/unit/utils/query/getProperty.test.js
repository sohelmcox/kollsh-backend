const { getProperty } = require("../../../../src/utils/Query/getProperty");

describe("getProperty", () => {
  it("should return the value of a nested property", () => {
    // Arrange
    const obj = {
      person: {
        name: {
          first: "John",
          last: "Doe",
        },
      },
    };

    // Act
    const result = getProperty(obj, "person.name.first");

    // Assert
    expect(result).toBe("John");
  });

  it("should return undefined for non-existent properties", () => {
    // Arrange
    const obj = {
      person: {
        name: {
          first: "John",
          last: "Doe",
        },
      },
    };

    // Act
    const result = getProperty(obj, "person.address.city");

    // Assert
    expect(result).toBeUndefined();
  });

  it("should return the value of a top-level property", () => {
    // Arrange
    const obj = {
      name: "Alice",
      age: 30,
    };

    // Act
    const result = getProperty(obj, "name");

    // Assert
    expect(result).toBe("Alice");
  });

  it("should return undefined for a non-existent top-level property", () => {
    // Arrange
    const obj = {
      name: "Alice",
      age: 30,
    };

    // Act
    const result = getProperty(obj, "address");

    // Assert
    expect(result).toBeUndefined();
  });
});
