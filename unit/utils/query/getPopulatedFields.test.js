const {
  getPopulatedFields,
  getSinglePopulatedFields,
} = require("../../../../src/utils/Query/getPopulatedFields");
const mongoose = require("mongoose");

// Create a mock schema and model for testing
const TestSchema = new mongoose.Schema({
  field1: String,
  field2: Number,
});

const TestModel = mongoose.model("TestModel", TestSchema);

describe("getPopulatedFields", () => {
  it('should populate all available fields when "*" is specified', async () => {
    // Arrange
    const populatedFields = ["*"];
    const documents = [new TestModel({ field1: "value1", field2: 42 })];

    // Act
    const result = await getPopulatedFields(populatedFields, documents);

    // Assert
    expect(result.length).toBe(1);
    expect(result[0].field1).toBe("value1");
    expect(result[0].field2).toBe(42);
  });

  it("should populate only specified fields", async () => {
    // Arrange
    const populatedFields = ["field1"];
    const documents = [new TestModel({ field1: "value1", field2: 42 })];

    // Act
    const result = await getPopulatedFields(populatedFields, documents);

    // Assert
    expect(result.length).toBe(1);
    expect(result[0].field1).toBe("value1");
    expect(result[0].field2).toBe(42);
  });
});

describe("getSinglePopulatedFields", () => {
  it('should populate all available fields when "*" is specified', async () => {
    // Arrange
    const populatedFields = ["*"];
    const document = new TestModel({ field1: "value1", field2: 42 });

    // Act
    const result = await getSinglePopulatedFields(document, populatedFields);

    // Assert
    expect(result.field1).toBe("value1");
    expect(result.field2).toBe(42);
  });

  it("should populate only specified fields", async () => {
    // Arrange
    const populatedFields = ["field1"];
    const document = new TestModel({ field1: "value1", field2: 42 });

    // Act
    const result = await getSinglePopulatedFields(document, populatedFields);

    // Assert
    expect(result.field1).toBe("value1");
    expect(result.field2).toBe(42);
  });
});
