const { updateOrCreate } = require("../../../../src/lib/itemDetails");
const { ItemDetails } = require("../../../../src/models");
const {
  newItemDetailsData,
  updatedItemDetailsData,
  existingItemDetailsData,
} = require("../../../testSeed/itemDetails");
// Mock the ItemDetails model's methods
jest.mock("../../../../src/models", () => {
  const mockItemDetails = {
    findById: jest.fn(),
    findOne: jest.fn(),
    create: jest.fn(),
    save: jest.fn(),
    overwrite: jest.fn(),
  };

  return {
    ItemDetails: {
      findById: mockItemDetails.findById,
      findOne: mockItemDetails.findOne,
      create: mockItemDetails.create,
    },
  };
});

describe("ItemDetails Update or Create Service", () => {
  it("should create a new itemDetails if it does not exist", async () => {
    // Mock the findById method to return null, indicating the itemDetails does not exist
    ItemDetails.findById.mockResolvedValue(null);

    // Mock the findOne method to return null, indicating the itemDetails Description is not found
    ItemDetails.findOne.mockResolvedValue(null);

    // Mock the create method to return a new itemDetails instance
    const createdItemDetailsInstance = {
      id: "newItemDetailsId",
      ...newItemDetailsData,
      save: jest.fn(),
    };
    ItemDetails.create.mockReturnValue(createdItemDetailsInstance);

    const result = await updateOrCreate("newItemDetailsId", {
      ...newItemDetailsData,
    });
    // console.log(result);
    expect(result.code).toBe(201);
  });
  it("should update an existing itemDetails if it exists", async () => {
    // Mock an existing itemDetails
    const existingItemDetails = {
      id: "existingItemDetailsId",
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
      overwrite: jest.fn(),
      save: jest.fn(),
    };
    ItemDetails.findById.mockResolvedValue(existingItemDetails);

    // Mock the findOne method to return null, indicating the itemDetails description is not found
    ItemDetails.findOne.mockResolvedValue(null);

    const result = await updateOrCreate(
      "existingItemDetailsId",
      updatedItemDetailsData,
    );

    // Verify that the findById method was called with the correct ID
    expect(ItemDetails.findById).toHaveBeenCalledWith("existingItemDetailsId");

    // Verify that the overwrite and save methods were called on the existing itemDetails
    expect(existingItemDetails.overwrite).toHaveBeenCalledWith({
      description: updatedItemDetailsData.description,
      item: updatedItemDetailsData.item,
      images: updatedItemDetailsData.images,
      contactNumber: updatedItemDetailsData.contactNumber,
      whatsappNumber: updatedItemDetailsData.whatsappNumber,
      email: updatedItemDetailsData.email,
      address: updatedItemDetailsData.address,
      latitude: updatedItemDetailsData.latitude,
      longitude: updatedItemDetailsData.longitude,
    });
    expect(existingItemDetails.save).toHaveBeenCalled();

    // Verify the result
    // expect(result.data).toEqual({ ...existingItemDetails });
    expect(result.code).toBe(200);
  });
});
