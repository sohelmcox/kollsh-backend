const { destroy } = require("../../../../src/lib/subcategory");
const { Subcategory } = require("../../../../src/models");

// Mock the Subcategory model's methods
jest.mock("../../../../src/models", () => {
  const mockSubcategory = {
    findById: jest.fn(),
  };

  return {
    Subcategory: {
      findById: mockSubcategory.findById,
    },
  };
});

describe("Subcategory Destroy Service", () => {
  it("should destroy an existing subcategory", async () => {
    // Mock the findById method to return a subcategory
    const mockSubcategoryInstance = {
      deleteOne: jest.fn(),
    };
    Subcategory.findById.mockResolvedValue(mockSubcategoryInstance);

    await destroy("subcategoryId");

    // Verify that the findById method was called with the correct ID
    expect(Subcategory.findById).toHaveBeenCalledWith("subcategoryId");

    // Verify that the deleteOne method was called on the subcategory instance
    expect(mockSubcategoryInstance.deleteOne).toHaveBeenCalled();
  });

  it("should throw an error if the subcategory is not found", async () => {
    // Mock the findById method to return null, indicating the subcategory was not found
    Subcategory.findById.mockResolvedValue(null);

    // Attempt to destroy a non-existent subcategory
    try {
      await destroy("nonExistentSubcategoryId");
      // If the code reaches this point, the test should fail
      expect(true).toBe(false);
    } catch (error) {
      expect(error.message).toBe("Subcategory not found.");
      expect(error.status).toBe(404);
    }
  });
});
