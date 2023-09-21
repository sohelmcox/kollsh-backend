const { updateOrCreate } = require("../../../../src/lib/brand");
const { Brand } = require("../../../../src/models");

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
  it("should create a new brand if it does not exist", async () => {
    // Mock the findById method to return null, indicating the brand does not exist
    Brand.findById.mockResolvedValue(null);

    // Mock the findOne method to return null, indicating the brand name is not found
    Brand.findOne.mockResolvedValue(null);

    const newBrandData = {
      name: "New Brand Name",
      image: "new-image.jpg",
      description: "New Description",
      priority: 2,
    };

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
  it("should update an existing brand if it exists", async () => {
    // Mock an existing brand
    const existingBrand = {
      id: "existingBrandId",
      name: "Existing Brand Name",
      image: "existing-image.jpg",
      description: "Existing Description",
      priority: 1,
      overwrite: jest.fn(),
      save: jest.fn(),
    };
    Brand.findById.mockResolvedValue(existingBrand);

    // Mock the findOne method to return null, indicating the brand name is not found
    Brand.findOne.mockResolvedValue(null);

    const updatedData = {
      name: "Updated Brand Name",
      image: "updated-image.jpg",
      description: "Updated Description",
      priority: 2,
    };

    const result = await updateOrCreate("existingBrandId", updatedData);

    // Verify that the findById method was called with the correct ID
    expect(Brand.findById).toHaveBeenCalledWith("existingBrandId");

    // Verify that the overwrite and save methods were called on the existing brand
    expect(existingBrand.overwrite).toHaveBeenCalledWith({
      name: updatedData.name,
      slug: expect.any(String),
      image: updatedData.image,
      description: updatedData.description,
      priority: updatedData.priority,
    });
    expect(existingBrand.save).toHaveBeenCalled();

    // Verify the result
    // expect(result.data).toEqual({ ...existingBrand });
    expect(result.code).toBe(200);
  });

  it("should throw a badRequest error if the brand name already exists", async () => {
    // Mock the findById method to return null, indicating the brand does not exist
    Brand.findById.mockResolvedValue(null);

    // Mock the findOne method to return an existing brand with the same name
    const existingBrand = {
      id: "existingBrandId",
      name: "Existing Brand Name",
    };
    Brand.findOne.mockResolvedValue(existingBrand);

    const newBrandData = {
      name: "Existing Brand Name", // Same name as the existing brand
      image: "new-image.jpg",
      description: "New Description",
      priority: 2,
    };

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
