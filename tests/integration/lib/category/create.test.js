const { updateOrCreate } = require("../../../../src/lib/category");
const { Category } = require("../../../../src/models");
const {
  newCategoryData,
  existingCategory,
} = require("../../../testSeed/category");
// Mock the Category model's methods
jest.mock("../../../../src/models", () => {
  const mockCategory = {
    findById: jest.fn(),
    findOne: jest.fn(),
    create: jest.fn(),
    save: jest.fn(),
    overwrite: jest.fn(),
  };

  return {
    Category: {
      findById: mockCategory.findById,
      findOne: mockCategory.findOne,
      create: mockCategory.create,
    },
  };
});

describe("Category Update or Create Service", () => {
  it("should create a new category", async () => {
    // Mock the findById method to return null, indicating the category does not exist
    Category.findById.mockResolvedValue(null);

    // Mock the findOne method to return null, indicating the category name is not found
    Category.findOne.mockResolvedValue(null);

    // Mock the create method to return a new category instance
    const createdCategoryInstance = {
      id: "newCategoryId",
      ...newCategoryData,
      save: jest.fn(),
    };
    Category.create.mockReturnValue(createdCategoryInstance);

    const result = await updateOrCreate("newCategoryId", {
      ...newCategoryData,
    });
    // console.log(result);
    expect(result.code).toBe(201);
  });

  it("should throw a badRequest error if the category name already exists", async () => {
    // Mock the findById method to return null, indicating the category does not exist
    Category.findById.mockResolvedValue(null);

    // Mock the findOne method to return an existing category with the same name
    Category.findOne.mockResolvedValue(existingCategory);

    try {
      await updateOrCreate("newCategoryId", newCategoryData);
      // If the code reaches this point, the test should fail
      expect(true).toBe(false);
    } catch (error) {
      expect(error.status).toBe(400);
      expect(error.message).toBe("Category name already exist");
    }
  });
});
