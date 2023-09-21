const { destroy } = require("../../../../src/lib/attributeValue");
const { AttributeValue } = require("../../../../src/models");

// Mock the AttributeValue model's methods
jest.mock("../../../../src/models", () => {
  const mockAttributeValue = {
    findById: jest.fn(),
  };

  return {
    AttributeValue: {
      findById: mockAttributeValue.findById,
    },
  };
});

describe("AttributeValue Destroy Service", () => {
  it("should destroy an existing attributeValue", async () => {
    // Mock the findById method to return a attributeValue
    const mockAttributeValueInstance = {
      deleteOne: jest.fn(),
    };
    AttributeValue.findById.mockResolvedValue(mockAttributeValueInstance);

    await destroy("attributeValueId");

    // Verify that the findById method was called with the correct ID
    expect(AttributeValue.findById).toHaveBeenCalledWith("attributeValueId");

    // Verify that the deleteOne method was called on the attributeValue instance
    expect(mockAttributeValueInstance.deleteOne).toHaveBeenCalled();
  });

  it("should throw an error if the attributeValue is not found", async () => {
    // Mock the findById method to return null, indicating the attributeValue was not found
    AttributeValue.findById.mockResolvedValue(null);

    // Attempt to destroy a non-existent attributeValue
    try {
      await destroy("nonExistentAttributeValueId");
      // If the code reaches this point, the test should fail
      expect(true).toBe(false);
    } catch (error) {
      expect(error.message).toBe("attributeValue not found.");
      expect(error.status).toBe(404);
    }
  });
});
