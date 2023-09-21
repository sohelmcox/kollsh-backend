const { destroy } = require("../../../../src/lib/category");
const { Category } = require("../../../../src/models");

// Mock the Category model's methods
jest.mock("../../../../src/models", () => {
  const mockCategory = {
    findById: jest.fn(),
  };

  return {
    Category: {
      findById: mockCategory.findById,
    },
  };
});

describe("Category Destroy Service", () => {
  it("should destroy an existing category", async () => {
    // Mock the findById method to return a category
    const mockCategoryInstance = {
      deleteOne: jest.fn(),
    };
    Category.findById.mockResolvedValue(mockCategoryInstance);

    await destroy("categoryId");

    // Verify that the findById method was called with the correct ID
    expect(Category.findById).toHaveBeenCalledWith("categoryId");

    // Verify that the deleteOne method was called on the category instance
    expect(mockCategoryInstance.deleteOne).toHaveBeenCalled();
  });

  it("should throw an error if the category is not found", async () => {
    // Mock the findById method to return null, indicating the category was not found
    Category.findById.mockResolvedValue(null);

    // Attempt to destroy a non-existent category
    try {
      await destroy("nonExistentCategoryId");
      // If the code reaches this point, the test should fail
      expect(true).toBe(false);
    } catch (error) {
      expect(error.message).toBe("Category not found.");
      expect(error.status).toBe(404);
    }
  });
});
