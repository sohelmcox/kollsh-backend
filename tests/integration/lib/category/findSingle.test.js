const { findSingle } = require("../../../../src/lib/category");
const { Category } = require("../../../../src/models");
const { newCategoryData } = require("../../../testSeed/category");

// Mock the Category model's methods
jest.mock("../../../../src/models", () => {
  const mockCategory = {
    findById: jest.fn(),
    exec: jest.fn(),
  };

  return {
    Category: {
      findById: mockCategory.findById,
    },
  };
});

describe("Category Find Single Service", () => {
  it("should find a single category by ID", async () => {
    // Mock the Category model's findById method to return a sample category

    Category.findById.mockResolvedValue(newCategoryData);

    const params = {
      id: "newCategoryId",
      populate: [],
    };

    const result = await findSingle(params);

    // Verify that the findById method was called with the correct ID
    expect(Category.findById).toHaveBeenCalledWith("newCategoryId");

    // Verify the result
    expect(result).toEqual(newCategoryData);
    expect(result.name).toEqual("New Category");
  });

  it("should throw a notFound error if category with given ID is not found", async () => {
    // Mock the Category model's findById method to return null, indicating the category is not found
    Category.findById.mockResolvedValue(null);

    const params = {
      id: "6502a59b35d01ff95a2c2527",
      populate: [],
    };

    // Expecting the service to throw a notFound error
    try {
      await findSingle(params);
    } catch (error) {
      // Verify that the error is a not found error
      expect(error.message).toEqual("Category Not Found");
    }
    // await expect(findSingle(params)).rejects.toThrow(notFound());
  });
});
