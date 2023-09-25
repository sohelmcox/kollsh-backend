const { findSingle } = require("../../../../src/lib/subcategory");
const { Subcategory } = require("../../../../src/models");
const { newSubcategoryData } = require("../../../testSeed/subcategory");

// Mock the Subcategory model's methods
jest.mock("../../../../src/models", () => {
  const mockSubcategory = {
    findById: jest.fn(),
    exec: jest.fn(),
  };

  return {
    Subcategory: {
      findById: mockSubcategory.findById,
    },
  };
});

describe("Subcategory Find Single Service", () => {
  it("should find a single subcategory by ID", async () => {
    // Mock the Subcategory model's findById method to return a sample subcategory

    Subcategory.findById.mockResolvedValue(newSubcategoryData);

    const params = {
      id: "newSubcategoryId",
      populate: [],
    };

    const result = await findSingle(params);

    // Verify that the findById method was called with the correct ID
    expect(Subcategory.findById).toHaveBeenCalledWith("newSubcategoryId");

    // Verify the result
    expect(result).toEqual(newSubcategoryData);
    expect(result.name).toEqual("New Subcategory");
  });

  it("should throw a notFound error if subcategory with given ID is not found", async () => {
    // Mock the Subcategory model's findById method to return null, indicating the subcategory is not found
    Subcategory.findById.mockResolvedValue(null);

    const params = {
      id: "6502a59b35d01ff95a2c2527",
      populate: [],
    };

    // Expecting the service to throw a notFound error
    try {
      await findSingle(params);
    } catch (error) {
      // Verify that the error is a not found error
      expect(error.message).toEqual("Subcategory Not Found");
      // console.log(error);
    }
  });
});
