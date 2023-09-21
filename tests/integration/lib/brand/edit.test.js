const { edit } = require("../../../../src/lib/brand");
const { Brand } = require("../../../../src/models");
const { updatedBrandData } = require("../../../testSeed/brand");

// Mock the Brand model's methods
jest.mock("../../../../src/models", () => {
  const mockBrand = {
    findById: jest.fn(),
    save: jest.fn(),
  };

  return {
    Brand: {
      findById: mockBrand.findById,
    },
  };
});

describe("Brand Edit Service", () => {
  it("should edit an existing brand", async () => {
    // Mock the findById method to return a brand
    const existingBrand = {
      id: "brandId",
      name: "Old Brand",
      slug: "old-brand",
      image: "old-image.jpg",
      description: "Old Description",
      priority: 1,
      save: jest.fn(),
    };
    Brand.findById.mockResolvedValue(existingBrand);

    const result = await edit("brandId", updatedBrandData);

    // Verify that the findById method was called with the correct ID
    expect(Brand.findById).toHaveBeenCalledWith("brandId");

    // Verify that the brand's properties were updated correctly
    expect(existingBrand.name).toBe(updatedBrandData.name);
    expect(existingBrand.slug).toBe(updatedBrandData.slug);
    expect(existingBrand.image).toBe(updatedBrandData.image);
    expect(existingBrand.description).toBe(updatedBrandData.description);
    expect(existingBrand.priority).toBe(updatedBrandData.priority);

    // Verify that the save method was called on the brand instance
    expect(existingBrand.save).toHaveBeenCalled();

    // Verify the result
    // console.log(result);
    expect(result.id).toBe("brandId");
  });

  it("should throw an error if the brand is not found", async () => {
    // Mock the findById method to return null, indicating the brand was not found
    Brand.findById.mockResolvedValue(null);

    try {
      await edit("nonExistentBrandId", updatedBrandData);
      // If the code reaches this point, the test should fail
      expect(true).toBe(false);
    } catch (error) {
      expect(error.status).toBe(404);
      expect(error.message).toBe("Brand not found.");
    }
  });
});
