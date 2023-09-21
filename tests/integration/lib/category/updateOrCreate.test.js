const { updateOrCreate } = require("../../../../src/lib/category");
const { Category } = require("../../../../src/models");
const {
  newCategoryData,
  updatedCategoryData,
  existingCategoryData,
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
  it("should create a new category if it does not exist", async () => {
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
  it("should update an existing category if it exists", async () => {
    // Mock an existing category
    const existingCategory = {
      id: "existingCategoryId",
      name: "Existing Category",
      image: "existing-image.jpg",
      cover_image: "existing-cover-image.jpg",
      featured: true,
      priority: 1,
      overwrite: jest.fn(),
      save: jest.fn(),
    };
    Category.findById.mockResolvedValue(existingCategory);

    // Mock the findOne method to return null, indicating the category name is not found
    Category.findOne.mockResolvedValue(null);

    const result = await updateOrCreate(
      "existingCategoryId",
      updatedCategoryData,
    );

    // Verify that the findById method was called with the correct ID
    expect(Category.findById).toHaveBeenCalledWith("existingCategoryId");

    // Verify that the overwrite and save methods were called on the existing category
    expect(existingCategory.overwrite).toHaveBeenCalledWith({
      name: updatedCategoryData.name,
      slug: expect.any(String),
      image: updatedCategoryData.image,
      cover_image: updatedCategoryData.cover_image,
      featured: updatedCategoryData.featured,
      priority: updatedCategoryData.priority,
    });
    expect(existingCategory.save).toHaveBeenCalled();

    // Verify the result
    // expect(result.data).toEqual({ ...existingCategory });
    expect(result.code).toBe(200);
  });

  it("should throw a badRequest error if the category name already exists", async () => {
    // Mock the findById method to return null, indicating the category does not exist
    Category.findById.mockResolvedValue(null);

    // Mock the findOne method to return an existing category with the same name

    Category.findOne.mockResolvedValue(existingCategoryData);

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
