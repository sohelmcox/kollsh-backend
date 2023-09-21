const { destroy } = require("../../../../src/lib/brand");
const { Brand } = require("../../../../src/models");

// Mock the Brand model's methods
jest.mock("../../../../src/models", () => {
  const mockBrand = {
    findById: jest.fn(),
  };

  return {
    Brand: {
      findById: mockBrand.findById,
    },
  };
});

describe("Brand Destroy Service", () => {
  it("should destroy an existing brand", async () => {
    // Mock the findById method to return a brand
    const mockBrandInstance = {
      deleteOne: jest.fn(),
    };
    Brand.findById.mockResolvedValue(mockBrandInstance);

    await destroy("brandId");

    // Verify that the findById method was called with the correct ID
    expect(Brand.findById).toHaveBeenCalledWith("brandId");

    // Verify that the deleteOne method was called on the brand instance
    expect(mockBrandInstance.deleteOne).toHaveBeenCalled();
  });

  it("should throw an error if the brand is not found", async () => {
    // Mock the findById method to return null, indicating the brand was not found
    Brand.findById.mockResolvedValue(null);

    // Attempt to destroy a non-existent brand
    try {
      await destroy("nonExistentBrandId");
      // If the code reaches this point, the test should fail
      expect(true).toBe(false);
    } catch (error) {
      expect(error.message).toBe("brand not found.");
      expect(error.status).toBe(404);
    }
  });
});
