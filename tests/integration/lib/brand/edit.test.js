const { edit } = require("../../../../src/lib/brand");
const { Brand } = require("../../../../src/models");
// const { notFound } = require("../../utils/error");

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

    const updatedData = {
      name: "New Brand Name",
      slug: "new-brand-name",
      image: "new-image.jpg",
      description: "New Description",
      priority: 2,
    };

    const result = await edit("brandId", updatedData);

    // Verify that the findById method was called with the correct ID
    expect(Brand.findById).toHaveBeenCalledWith("brandId");

    // Verify that the brand's properties were updated correctly
    expect(existingBrand.name).toBe(updatedData.name);
    expect(existingBrand.slug).toBe(updatedData.slug);
    expect(existingBrand.image).toBe(updatedData.image);
    expect(existingBrand.description).toBe(updatedData.description);
    expect(existingBrand.priority).toBe(updatedData.priority);

    // Verify that the save method was called on the brand instance
    expect(existingBrand.save).toHaveBeenCalled();

    // Verify the result
    // console.log(result);
    expect(result.id).toBe("brandId");
  });

  it("should throw an error if the brand is not found", async () => {
    // Mock the findById method to return null, indicating the brand was not found
    Brand.findById.mockResolvedValue(null);

    const updatedData = {
      name: "New Brand Name",
      slug: "new-brand-name",
      image: "new-image.jpg",
      description: "New Description",
      priority: 2,
    };

    try {
      await edit("nonExistentBrandId", updatedData);
      // If the code reaches this point, the test should fail
      expect(true).toBe(false);
    } catch (error) {
      expect(error.status).toBe(404);
      expect(error.message).toBe("Brand not found.");
    }
  });
});
