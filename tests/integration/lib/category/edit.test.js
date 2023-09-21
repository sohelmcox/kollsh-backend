const { edit } = require("../../../../src/lib/category");
const { Category } = require("../../../../src/models");
const { updatedCategoryData } = require("../../../testSeed/category");

// Mock the Category model's methods
jest.mock("../../../../src/models", () => {
  const mockCategory = {
    findById: jest.fn(),
    save: jest.fn(),
  };

  return {
    Category: {
      findById: mockCategory.findById,
    },
  };
});

describe("Category Edit Service", () => {
  it("should edit an existing category", async () => {
    // Mock the findById method to return a category
    const existingCategory = {
      id: "categoryId",
      name: "Old Category",
      slug: "old-category",
      image: "old-image.jpg",
      cover_image: "old-cover-image.jpg",
      featured: true,
      priority: 1,
      save: jest.fn(),
    };
    Category.findById.mockResolvedValue(existingCategory);

    const result = await edit("categoryId", updatedCategoryData);

    // Verify that the findById method was called with the correct ID
    expect(Category.findById).toHaveBeenCalledWith("categoryId");

    // Verify that the category's properties were updated correctly
    expect(existingCategory.name).toBe(updatedCategoryData.name);
    expect(existingCategory.slug).toBe(updatedCategoryData.slug);
    expect(existingCategory.image).toBe(updatedCategoryData.image);
    expect(existingCategory.featured).toBe(updatedCategoryData.featured);
    expect(existingCategory.priority).toBe(updatedCategoryData.priority);

    // Verify that the save method was called on the category instance
    expect(existingCategory.save).toHaveBeenCalled();

    // Verify the result
    // console.log(result);
    expect(result.id).toBe("categoryId");
  });

  it("should throw an error if the category is not found", async () => {
    // Mock the findById method to return null, indicating the category was not found
    Category.findById.mockResolvedValue(null);

    try {
      await edit("nonExistentCategoryId", updatedCategoryData);
      // If the code reaches this point, the test should fail
      expect(true).toBe(false);
    } catch (error) {
      expect(error.status).toBe(404);
      expect(error.message).toBe("Category not found.");
    }
  });
});
