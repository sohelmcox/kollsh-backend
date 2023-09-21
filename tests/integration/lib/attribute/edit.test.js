const { edit } = require("../../../../src/lib/attribute");
const { Attribute } = require("../../../../src/models");
const { updatedAttributeData } = require("../../../testSeed/attribute");

// Mock the Attribute model's methods
jest.mock("../../../../src/models", () => {
  const mockAttribute = {
    findById: jest.fn(),
    save: jest.fn(),
  };

  return {
    Attribute: {
      findById: mockAttribute.findById,
    },
  };
});

describe("Attribute Edit Service", () => {
  it("should edit an existing attribute", async () => {
    // Mock the findById method to return a attribute
    const existingAttribute = {
      id: "attributeId",
      name: "Old Attribute",
      attribute_values: ["string or id", "string or id"],
      subcategories: ["string or id", "string or id"],
      brands: ["string or id", "string or id"],
      save: jest.fn(),
    };
    Attribute.findById.mockResolvedValue(existingAttribute);

    const result = await edit("attributeId", updatedAttributeData);

    // Verify that the findById method was called with the correct ID
    expect(Attribute.findById).toHaveBeenCalledWith("attributeId");
    // Verify that the attribute's properties were updated correctly
    expect(existingAttribute.name).toBe(updatedAttributeData.name);
    expect(existingAttribute.attribute_values).toBe(
      updatedAttributeData.attribute_values,
    );
    expect(existingAttribute.subcategories).toBe(
      updatedAttributeData.subcategories,
    );
    expect(existingAttribute.brands).toBe(updatedAttributeData.brands);

    // Verify that the save method was called on the attribute instance
    expect(existingAttribute.save).toHaveBeenCalled();

    // Verify the result
    // console.log(result);
    expect(result.id).toBe("attributeId");
  });

  it("should throw an error if the attribute is not found", async () => {
    // Mock the findById method to return null, indicating the attribute was not found
    Attribute.findById.mockResolvedValue(null);

    try {
      await edit("nonExistentAttributeId", updatedAttributeData);
      // If the code reaches this point, the test should fail
      expect(true).toBe(false);
    } catch (error) {
      expect(error.status).toBe(404);
      expect(error.message).toBe("Attribute not found.");
    }
  });
});
