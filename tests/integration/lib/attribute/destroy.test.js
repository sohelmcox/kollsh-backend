const { destroy } = require("../../../../src/lib/attribute");
const { Attribute } = require("../../../../src/models");

// Mock the Attribute model's methods
jest.mock("../../../../src/models", () => {
  const mockAttribute = {
    findById: jest.fn(),
  };

  return {
    Attribute: {
      findById: mockAttribute.findById,
    },
  };
});

describe("Attribute Destroy Service", () => {
  it("should destroy an existing attribute", async () => {
    // Mock the findById method to return a attribute
    const mockAttributeInstance = {
      deleteOne: jest.fn(),
    };
    Attribute.findById.mockResolvedValue(mockAttributeInstance);

    await destroy("attributeId");

    // Verify that the findById method was called with the correct ID
    expect(Attribute.findById).toHaveBeenCalledWith("attributeId");

    // Verify that the deleteOne method was called on the attribute instance
    expect(mockAttributeInstance.deleteOne).toHaveBeenCalled();
  });

  it("should throw an error if the attribute is not found", async () => {
    // Mock the findById method to return null, indicating the attribute was not found
    Attribute.findById.mockResolvedValue(null);

    // Attempt to destroy a non-existent attribute
    try {
      await destroy("nonExistentAttributeId");
      // If the code reaches this point, the test should fail
      expect(true).toBe(false);
    } catch (error) {
      expect(error.message).toBe("attribute not found.");
      expect(error.status).toBe(404);
    }
  });
});
