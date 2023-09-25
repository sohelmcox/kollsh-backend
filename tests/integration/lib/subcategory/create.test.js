const { updateOrCreate } = require("../../../../src/lib/subcategory");
const { Subcategory } = require("../../../../src/models");
const {
  newSubcategoryData,
  existingSubcategory,
} = require("../../../testSeed/subcategory");
// Mock the Subcategory model's methods
jest.mock("../../../../src/models", () => {
  const mockSubcategory = {
    findById: jest.fn(),
    findOne: jest.fn(),
    create: jest.fn(),
    save: jest.fn(),
    overwrite: jest.fn(),
  };

  return {
    Subcategory: {
      findById: mockSubcategory.findById,
      findOne: mockSubcategory.findOne,
      create: mockSubcategory.create,
    },
  };
});

describe("Subcategory Update or Create Service", () => {
  it("should create a new subcategory", async () => {
    // Mock the findById method to return null, indicating the subcategory does not exist
    Subcategory.findById.mockResolvedValue(null);

    // Mock the findOne method to return null, indicating the subcategory name is not found
    Subcategory.findOne.mockResolvedValue(null);

    // Mock the create method to return a new subcategory instance
    const createdSubcategoryInstance = {
      id: "newSubcategoryId",
      ...newSubcategoryData,
      save: jest.fn(),
    };
    Subcategory.create.mockReturnValue(createdSubcategoryInstance);

    const result = await updateOrCreate("newSubcategoryId", {
      ...newSubcategoryData,
    });
    // console.log(result);
    expect(result.code).toBe(201);
  });

  it("should throw a badRequest error if the subcategory name already exists", async () => {
    // Mock the findById method to return null, indicating the subcategory does not exist
    Subcategory.findById.mockResolvedValue(null);

    // Mock the findOne method to return an existing subcategory with the same name
    Subcategory.findOne.mockResolvedValue(existingSubcategory);

    try {
      await updateOrCreate("newSubcategoryId", newSubcategoryData);
      // If the code reaches this point, the test should fail
      expect(true).toBe(false);
    } catch (error) {
      expect(error.status).toBe(400);
      expect(error.message).toBe("Subcategory name already exist");
    }
  });
});
