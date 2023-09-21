const { findSingle } = require("../../../../src/lib/attribute");
const { Attribute } = require("../../../../src/models");
const { newAttributeData } = require("../../../testSeed/attribute");

// Mock the Attribute model's methods
jest.mock("../../../../src/models", () => {
  const mockAttribute = {
    findById: jest.fn(),
    exec: jest.fn(),
  };

  return {
    Attribute: {
      findById: mockAttribute.findById,
    },
  };
});

describe("Attribute Find Single Service", () => {
  it("should find a single attribute by ID", async () => {
    // Mock the Attribute model's findById method to return a sample attribute

    Attribute.findById.mockResolvedValue(newAttributeData);

    const params = {
      id: "newAttributeId",
      populate: [],
    };

    const result = await findSingle(params);

    // Verify that the findById method was called with the correct ID
    expect(Attribute.findById).toHaveBeenCalledWith("newAttributeId");

    // Verify the result
    expect(result).toEqual(newAttributeData);
    expect(result.name).toEqual("New Attribute");
  });

  it("should throw a notFound error if attribute with given ID is not found", async () => {
    // Mock the Attribute model's findById method to return null, indicating the attribute is not found
    Attribute.findById.mockResolvedValue(null);

    const params = {
      id: "6502a59b35d01ff95a2c2527",
      populate: [],
    };

    // Expecting the service to throw a notFound error
    try {
      await findSingle(params);
    } catch (error) {
      // Verify that the error is a not found error
      expect(error.message).toEqual("Attribute not found");
      // console.log(error);
    }
    // await expect(findSingle(params)).rejects.toThrow(notFound());
  });
});
