const { destroy } = require("../../../../src/lib/itemDetails");
const { ItemDetails } = require("../../../../src/models");

// Mock the ItemDetails model's methods
jest.mock("../../../../src/models", () => {
  const mockItemDetails = {
    findById: jest.fn(),
  };

  return {
    ItemDetails: {
      findById: mockItemDetails.findById,
    },
  };
});

describe("ItemDetails Destroy Service", () => {
  it("should destroy an existing itemDetails", async () => {
    // Mock the findById method to return a itemDetails
    const mockItemDetailsInstance = {
      deleteOne: jest.fn(),
    };
    ItemDetails.findById.mockResolvedValue(mockItemDetailsInstance);

    await destroy("651481fb16b817cab5c59f78");

    // Verify that the findById method was called with the correct ID
    expect(ItemDetails.findById).toHaveBeenCalledWith(
      "651481fb16b817cab5c59f78",
    );

    // Verify that the deleteOne method was called on the itemDetails instance
    expect(mockItemDetailsInstance.deleteOne).toHaveBeenCalled();
  });

  it("should throw an error if the itemDetails is not found", async () => {
    // Mock the findById method to return null, indicating the itemDetails was not found
    ItemDetails.findById.mockResolvedValue(null);

    // Attempt to destroy a non-existent itemDetails
    try {
      await destroy("nonExistentItemDetailsId");
      // If the code reaches this point, the test should fail
      expect(true).toBe(false);
    } catch (error) {
      expect(error.message).toBe("ItemDetails not found.");
      expect(error.status).toBe(404);
    }
  });
});
