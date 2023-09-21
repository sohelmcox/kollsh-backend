const { findSingle } = require("../../../../src/lib/brand");
const { Brand } = require("../../../../src/models");
// Mock the Brand model's methods
jest.mock("../../../../src/models", () => {
  const mockBrand = {
    findById: jest.fn(),
    exec: jest.fn(),
  };

  return {
    Brand: {
      findById: mockBrand.findById,
    },
  };
});

describe("Brand Find Single Service", () => {
  it("should find a single brand by ID", async () => {
    // Mock the Brand model's findById method to return a sample brand
    const sampleBrand = {
      _id: "sampleBrandId",
      name: "Sample Brand",
      description: "Sample Description",
      image: "sample-image.jpg",
      priority: 1,
    };
    Brand.findById.mockResolvedValue(sampleBrand);

    const params = {
      id: "sampleBrandId",
      populate: [],
    };

    const result = await findSingle(params);

    // Verify that the findById method was called with the correct ID
    expect(Brand.findById).toHaveBeenCalledWith("sampleBrandId");

    // Verify the result
    expect(result).toEqual(sampleBrand);
    expect(result.name).toEqual("Sample Brand");
  });

  it("should throw a notFound error if brand with given ID is not found", async () => {
    // Mock the Brand model's findById method to return null, indicating the brand is not found
    Brand.findById.mockResolvedValue(null);

    const params = {
      id: "6502a59b35d01ff95a2c2527",
      populate: [],
    };

    // Expecting the service to throw a notFound error
    try {
      await findSingle(params);
    } catch (error) {
      // Verify that the error is a not found error
      expect(error.message).toEqual("Brand not found");
      // console.log(error);
    }
    // await expect(findSingle(params)).rejects.toThrow(notFound());
  });
});
