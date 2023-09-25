const { edit } = require("../../../../src/lib/subcategory");
const { Subcategory } = require("../../../../src/models");
const { updatedSubcategoryData } = require("../../../testSeed/subcategory");

// Mock the Subcategory model's methods
jest.mock("../../../../src/models", () => {
  const mockSubcategory = {
    findById: jest.fn(),
    save: jest.fn(),
  };

  return {
    Subcategory: {
      findById: mockSubcategory.findById,
    },
  };
});

describe("Subcategory Edit Service", () => {
  it("should edit an existing subcategory", async () => {
    // Mock the findById method to return a subcategory
    const existingSubcategory = {
      id: "subcategoryId",
      name: "Old Subcategory",
      image: "string or id",
      priority: 0,
      cities: ["string or id", "string or id"],
      country: "string or id",
      priority: 1,
      save: jest.fn(),
    };
    Subcategory.findById.mockResolvedValue(existingSubcategory);

    const result = await edit("subcategoryId", updatedSubcategoryData);

    // Verify that the findById method was called with the correct ID
    expect(Subcategory.findById).toHaveBeenCalledWith("subcategoryId");

    // Verify that the subcategory's properties were updated correctly
    expect(existingSubcategory.name).toBe(updatedSubcategoryData.name);
    expect(existingSubcategory.image).toBe(updatedSubcategoryData.image);
    expect(existingSubcategory.priority).toBe(updatedSubcategoryData.priority);

    // Verify that the save method was called on the subcategory instance
    expect(existingSubcategory.save).toHaveBeenCalled();

    // Verify the result
    // console.log(result);
    expect(result.id).toBe("subcategoryId");
  });

  it("should throw an error if the subcategory is not found", async () => {
    // Mock the findById method to return null, indicating the subcategory was not found
    Subcategory.findById.mockResolvedValue(null);

    try {
      await edit("nonExistentSubcategoryId", updatedSubcategoryData);
      // If the code reaches this point, the test should fail
      expect(true).toBe(false);
    } catch (error) {
      expect(error.status).toBe(404);
      expect(error.message).toBe("Subcategory not found.");
    }
  });
});
