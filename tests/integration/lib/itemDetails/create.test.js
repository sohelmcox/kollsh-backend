const { updateOrCreate } = require("../../../../src/lib/itemDetails");
const { ItemDetails } = require("../../../../src/models");
const {
  newItemDetailsData,
  existingItemDetails,
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
  it("should create a new itemDetails", async () => {
    // Mock the findById method to return null, indicating the itemDetails does not exist
    ItemDetails.findById.mockResolvedValue(null);

    // Mock the findOne method to return null, indicating the itemDetails name is not found
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
});
