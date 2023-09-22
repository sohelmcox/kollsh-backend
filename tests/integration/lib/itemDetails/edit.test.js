const { edit } = require("../../../../src/lib/itemDetails");
const { ItemDetails } = require("../../../../src/models");
const { updatedItemDetailsData } = require("../../../testSeed/itemDetails");

// Mock the ItemDetails model's methods
jest.mock("../../../../src/models", () => {
  const mockItemDetails = {
    findById: jest.fn(),
    save: jest.fn(),
  };

  return {
    ItemDetails: {
      findById: mockItemDetails.findById,
    },
  };
});

describe("ItemDetails Edit Service", () => {
  it("should edit an existing itemDetails", async () => {
    // Mock the findById method to return a itemDetails
    const existingItemDetails = {
      id: "itemDetailsId",
      description: "Test Description",
      item: "string or id",
      images: ["string or id", "string or id"],
      contactNumber: "123456789",
      whatsappNumber: "123456789",
      email: "user@example.com",
      address: "string",
      latitude: "123456789",
      longitude: "123456789",
      metadata: "string or id",
      save: jest.fn(),
    };
    ItemDetails.findById.mockResolvedValue(existingItemDetails);

    const result = await edit("itemDetailsId", updatedItemDetailsData);

    // Verify that the findById method was called with the correct ID
    expect(ItemDetails.findById).toHaveBeenCalledWith("itemDetailsId");

    // Verify that the itemDetails's properties were updated correctly
    expect(existingItemDetails.description).toBe(
      updatedItemDetailsData.description,
    );
    expect(existingItemDetails.item).toBe(updatedItemDetailsData.item);
    expect(existingItemDetails.images).toBe(updatedItemDetailsData.images);
    expect(existingItemDetails.contactNumber).toBe(
      updatedItemDetailsData.contactNumber,
    );
    expect(existingItemDetails.whatsappNumber).toBe(
      updatedItemDetailsData.whatsappNumber,
    );
    expect(existingItemDetails.email).toBe(updatedItemDetailsData.email);
    expect(existingItemDetails.address).toBe(updatedItemDetailsData.address);
    expect(existingItemDetails.latitude).toBe(updatedItemDetailsData.latitude);
    expect(existingItemDetails.longitude).toBe(
      updatedItemDetailsData.longitude,
    );

    // Verify that the save method was called on the itemDetails instance
    expect(existingItemDetails.save).toHaveBeenCalled();

    // Verify the result
    // console.log(result);
    expect(result.id).toBe("itemDetailsId");
  });

  it("should throw an error if the itemDetails is not found", async () => {
    // Mock the findById method to return null, indicating the itemDetails was not found
    ItemDetails.findById.mockResolvedValue(null);

    try {
      await edit("nonExistentItemDetailsId", updatedItemDetailsData);
      // If the code reaches this point, the test should fail
      expect(true).toBe(false);
    } catch (error) {
      expect(error.status).toBe(404);
      expect(error.message).toBe("ItemDetails not found.");
    }
  });
});
