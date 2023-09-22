const { create: createBrandService } = require("../../../src/lib/brand");
const { Brand } = require("../../../src/models");
const { create: createMetadataService } = require("../../../src/lib/metadata");
const { badRequest } = require("../../../src/utils/error");
const { slugify } = require("../../../src/utils/generateUniqueSlug");

// Mock dependencies and services
jest.mock("../../../src/lib/metadata", () => ({
  create: jest.fn(),
}));

describe("Brand Service", () => {
  it("should create a new brand", async () => {
    // Mock dependencies and services
    const mockBrand = {
      name: "Sample Brand",
      image: "sample.jpg",
      description: "Sample brand description",
      priority: 1,
    };
    const mockMetadata = {
      id: "metadataId",
    };

    // Create a spy on the slugify function
    const slugifySpy = jest.spyOn(slugify, "slugify");
    slugifySpy.mockReturnValue("sample-brand"); // Mock the return value

    createMetadataService.mockResolvedValue(mockMetadata);

    // Call the createBrandService method
    const newBrand = await createBrandService(mockBrand);

    // Assertions
    expect(slugifySpy).toHaveBeenCalledWith(mockBrand.name);
    expect(createMetadataService).toHaveBeenCalledWith({
      title: mockBrand.name,
      description: mockBrand.description,
      image: mockBrand.image,
      keywords: mockBrand.name.split(" "),
    });
    expect(newBrand).toEqual({ id: "mockBrandId", ...mockBrand });

    // Restore the original slugify function
    slugifySpy.mockRestore();
  });
});
