const {
  parseSortCriteria,
  parseSelectedFields,
  parsePopulatedFields,
  populateAllFields,
} = require("../../../../src/utils/Query/queryParser");
const { badRequest } = require("../../../../src/utils/error");

describe("badRequest", () => {
  it("should create a bad request error with default message", () => {
    const error = badRequest();

    expect(error.name).toBe("Bad Request");
    expect(error.message).toBe("Bad Request");
    expect(error.status).toBe(400);
    expect(error.details).toEqual({});
  });

  it("should create a bad request error with a custom message", () => {
    const customMessage = "Custom Bad Request";
    const error = badRequest(customMessage);

    expect(error.name).toBe("Bad Request");
    expect(error.message).toBe(customMessage);
    expect(error.status).toBe(400);
    expect(error.details).toEqual({});
  });
});

describe("parseSortCriteria", () => {
  it("should parse valid sort criteria in descending order", () => {
    const sort = "updatedAt:desc";
    const allowedSortByFields = ["updatedAt"];
    const result = parseSortCriteria(sort, allowedSortByFields);

    expect(result).toEqual({ updatedAt: -1 });
  });

  it("should parse valid sort criteria in ascending order", () => {
    const sort = "updatedAt:asc";
    const allowedSortByFields = ["updatedAt"];
    const result = parseSortCriteria(sort, allowedSortByFields);

    expect(result).toEqual({ updatedAt: 1 });
  });

  it("should throw a badRequest error for an invalid sort criteria format", () => {
    const sort = "name:asc";
    const allowedSortByFields = ["updatedAt"];

    try {
      parseSortCriteria(sort, allowedSortByFields);
      // If no error is thrown, fail the test
      fail("Expected parseSortCriteria to throw an error");
    } catch (error) {
      expect(error.name).toBe("Bad Request");
      expect(error.message).toBe(
        "Invalid sort criteria. The accepted Sort are: updatedAt",
      );
      expect(error.status).toBe(400);
      expect(error.details).toEqual({});
    }
  });

  it("should throw a badRequest error for an invalid sort criteria field", () => {
    const sort = "invalidField:desc";
    const allowedSortByFields = ["updatedAt"];

    try {
      parseSortCriteria(sort, allowedSortByFields);
      // If no error is thrown, fail the test
      fail("Expected parseSortCriteria to throw an error");
    } catch (error) {
      expect(error.name).toBe("Bad Request");
      expect(error.message).toBe(
        "Invalid sort criteria. The accepted Sort are: updatedAt",
      );
      expect(error.status).toBe(400);
      expect(error.details).toEqual({});
    }
  });
});

describe("parseSelectedFields", () => {
  it("should parse selected fields", () => {
    // Arrange
    const selectedFields = "name,price,description";

    // Act
    const result = parseSelectedFields(selectedFields);

    // Assert
    expect(result).toEqual(["name", "price", "description"]);
  });

  it("should return an empty array for no selected fields", () => {
    // Arrange
    const noFields = "";

    // Act
    const result = parseSelectedFields(noFields);

    // Assert
    expect(result).toEqual([]);
  });
});

describe("parsePopulatedFields", () => {
  it("should parse populated fields from a comma-separated string", () => {
    // Arrange
    const populatedFields = "author,comments";

    // Act
    const result = parsePopulatedFields(populatedFields);

    // Assert
    expect(result).toEqual(["author", "comments"]);
  });

  it("should parse populated fields from an array", () => {
    // Arrange
    const populatedFieldsArray = ["author", "comments"];

    // Act
    const result = parsePopulatedFields(populatedFieldsArray);

    // Assert
    expect(result).toEqual(["author", "comments"]);
  });

  it("should return an empty array for no populated fields", () => {
    // Arrange
    const noFields = "";

    // Act
    const result = parsePopulatedFields(noFields);

    // Assert
    expect(result).toEqual([]);
  });
});

describe("populateAllFields", () => {
  it("should return a string with all available fields from the schema", () => {
    // Arrange
    const schema = {
      paths: {
        name: {},
        price: {},
        description: {},
      },
    };

    // Act
    const result = populateAllFields(schema);

    // Assert
    expect(result).toBe("name price description");
  });

  it('should exclude the "_id" field from the result', () => {
    // Arrange
    const schemaWithId = {
      paths: {
        name: {},
        price: {},
        description: {},
        _id: {},
      },
    };

    // Act
    const result = populateAllFields(schemaWithId);

    // Assert
    expect(result).toBe("name price description");
  });
});
