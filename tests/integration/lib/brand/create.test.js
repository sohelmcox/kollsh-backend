const { updateOrCreate } = require("../../../../src/lib/brand");
const { Brand } = require("../../../../src/models");
const { newBrandData, existingBrand } = require("../../../testSeed/brand");
// Mock the Brand model's methods
jest.mock("../../../../src/models", () => {
  const mockBrand = {
    findById: jest.fn(),
    findOne: jest.fn(),
    create: jest.fn(),
    save: jest.fn(),
    overwrite: jest.fn(),
  };

  return {
    Brand: {
      findById: mockBrand.findById,
      findOne: mockBrand.findOne,
      create: mockBrand.create,
    },
  };
});

describe("Brand Update or Create Service", () => {
  it("should create a new brand", async () => {
    // Mock the findById method to return null, indicating the brand does not exist
    Brand.findById.mockResolvedValue(null);

    // Mock the findOne method to return null, indicating the brand name is not found
    Brand.findOne.mockResolvedValue(null);

    // Mock the create method to return a new brand instance
    const createdBrandInstance = {
      id: "newBrandId",
      ...newBrandData,
      save: jest.fn(),
    };
    Brand.create.mockReturnValue(createdBrandInstance);

    const result = await updateOrCreate("newBrandId", { ...newBrandData });
    // console.log(result);
    expect(result.code).toBe(201);
  });

  it("should throw a badRequest error if the brand name already exists", async () => {
    // Mock the findById method to return null, indicating the brand does not exist
    Brand.findById.mockResolvedValue(null);

    // Mock the findOne method to return an existing brand with the same name
    Brand.findOne.mockResolvedValue(existingBrand);

    try {
      await updateOrCreate("newBrandId", newBrandData);
      // If the code reaches this point, the test should fail
      expect(true).toBe(false);
    } catch (error) {
      expect(error.status).toBe(400);
      expect(error.message).toBe("Brand name already exist");
    }
  });
});
