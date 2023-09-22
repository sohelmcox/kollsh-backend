const { findSingle } = require("../../../../src/lib/itemDetails");
const { ItemDetails } = require("../../../../src/models");
const { newItemDetailsData } = require("../../../testSeed/itemDetails");

// Mock the ItemDetails model's methods
jest.mock("../../../../src/models", () => {
  const mockItemDetails = {
    findById: jest.fn(),
    exec: jest.fn(),
  };

  return {
    ItemDetails: {
      findById: mockItemDetails.findById,
    },
  };
});

describe("ItemDetails Find Single Service", () => {
  it("should find a single itemDetails by ID", async () => {
    // Mock the ItemDetails model's findById method to return a sample itemDetails

    ItemDetails.findById.mockResolvedValue(newItemDetailsData);

    const params = {
      id: "newItemDetailsId",
      populate: [],
    };

    const result = await findSingle(params);

    // Verify that the findById method was called with the correct ID
    expect(ItemDetails.findById).toHaveBeenCalledWith("newItemDetailsId");

    // Verify the result
    expect(result).toEqual(newItemDetailsData);
    expect(result.description).toEqual("New ItemDetails");
  });

  it("should throw a notFound error if itemDetails with given ID is not found", async () => {
    // Mock the ItemDetails model's findById method to return null, indicating the itemDetails is not found
    ItemDetails.findById.mockResolvedValue(null);

    const params = {
      id: "6502a59b35d01ff95a2c2527",
      populate: [],
    };

    // Expecting the service to throw a notFound error
    try {
      await findSingle(params);
    } catch (error) {
      // Verify that the error is a not found error
      expect(error.message).toEqual("ItemDetails not found");
      // console.log(error);
    }
  });
});
