const { edit } = require("../../../../src/lib/attributeValue");
const { AttributeValue } = require("../../../../src/models");
const {
  updatedAttributeValueData,
} = require("../../../testSeed/attributeValue");

// Mock the AttributeValue model's methods
jest.mock("../../../../src/models", () => {
  const mockAttributeValue = {
    findById: jest.fn(),
    save: jest.fn(),
  };

  return {
    AttributeValue: {
      findById: mockAttributeValue.findById,
    },
  };
});

describe("AttributeValue Edit Service", () => {
  it("should edit an existing attributeValue", async () => {
    // Mock the findById method to return a attributeValue
    const existingAttributeValue = {
      id: "attributeValueId",
      name: "Old AttributeValue",
      slug: "old-attributeValue",
      image: "old-image.jpg",
      description: "Old Description",
      priority: 1,
      save: jest.fn(),
    };
    AttributeValue.findById.mockResolvedValue(existingAttributeValue);

    const result = await edit("attributeValueId", updatedAttributeValueData);

    // Verify that the findById method was called with the correct ID
    expect(AttributeValue.findById).toHaveBeenCalledWith("attributeValueId");

    // Verify that the attributeValue's properties were updated correctly
    expect(existingAttributeValue.name).toBe(updatedAttributeValueData.name);
    expect(existingAttributeValue.color_code).toBe(
      updatedAttributeValueData.color_code,
    );

    // Verify that the save method was called on the attributeValue instance
    expect(existingAttributeValue.save).toHaveBeenCalled();

    // Verify the result
    // console.log(result);
    expect(result.id).toBe("attributeValueId");
  });

  it("should throw an error if the attributeValue is not found", async () => {
    // Mock the findById method to return null, indicating the attributeValue was not found
    AttributeValue.findById.mockResolvedValue(null);

    try {
      await edit("nonExistentAttributeValueId", updatedAttributeValueData);
      // If the code reaches this point, the test should fail
      expect(true).toBe(false);
    } catch (error) {
      expect(error.status).toBe(404);
      expect(error.message).toBe("AttributeValue not found.");
    }
  });
});
