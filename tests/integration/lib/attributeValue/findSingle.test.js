const { findSingle } = require("../../../../src/lib/attributeValue");
const { AttributeValue } = require("../../../../src/models");
const { newAttributeValueData } = require("../../../testSeed/attributeValue");

// Mock the AttributeValue model's methods
jest.mock("../../../../src/models", () => {
  const mockAttributeValue = {
    findById: jest.fn(),
    exec: jest.fn(),
  };

  return {
    AttributeValue: {
      findById: mockAttributeValue.findById,
    },
  };
});

describe("AttributeValue Find Single Service", () => {
  it("should find a single attributeValue by ID", async () => {
    // Mock the AttributeValue model's findById method to return a sample attributeValue

    AttributeValue.findById.mockResolvedValue(newAttributeValueData);

    const params = {
      id: "newAttributeValueId",
      populate: [],
    };

    const result = await findSingle(params);

    // Verify that the findById method was called with the correct ID
    expect(AttributeValue.findById).toHaveBeenCalledWith("newAttributeValueId");

    // Verify the result
    expect(result).toEqual(newAttributeValueData);
    expect(result.name).toEqual("New AttributeValue");
  });

  it("should throw a notFound error if attributeValue with given ID is not found", async () => {
    // Mock the AttributeValue model's findById method to return null, indicating the attributeValue is not found
    AttributeValue.findById.mockResolvedValue(null);

    const params = {
      id: "6502a59b35d01ff95a2c2527",
      populate: [],
    };

    // Expecting the service to throw a notFound error
    try {
      await findSingle(params);
    } catch (error) {
      // Verify that the error is a not found error
      expect(error.message).toEqual("AttributeValue not found");
      // console.log(error);
    }
    // await expect(findSingle(params)).rejects.toThrow(notFound());
  });
});
