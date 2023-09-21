const { updateOrCreate } = require("../../../../src/lib/attribute");
const { Attribute } = require("../../../../src/models");
const {
  newAttributeData,
  existingAttribute,
} = require("../../../testSeed/attribute");
// Mock the Attribute model's methods
jest.mock("../../../../src/models", () => {
  const mockAttribute = {
    findById: jest.fn(),
    findOne: jest.fn(),
    create: jest.fn(),
    save: jest.fn(),
    overwrite: jest.fn(),
  };

  return {
    Attribute: {
      findById: mockAttribute.findById,
      findOne: mockAttribute.findOne,
      create: mockAttribute.create,
    },
  };
});

describe("Attribute Update or Create Service", () => {
  it("should create a new attribute", async () => {
    // Mock the findById method to return null, indicating the attribute does not exist
    Attribute.findById.mockResolvedValue(null);

    // Mock the findOne method to return null, indicating the attribute name is not found
    Attribute.findOne.mockResolvedValue(null);

    // Mock the create method to return a new attribute instance
    const createdAttributeInstance = {
      id: "newAttributeId",
      ...newAttributeData,
      save: jest.fn(),
    };
    Attribute.create.mockReturnValue(createdAttributeInstance);

    const result = await updateOrCreate("newAttributeId", {
      ...newAttributeData,
    });
    // console.log(result);
    expect(result.code).toBe(201);
  });

  it("should throw a badRequest error if the attribute name already exists", async () => {
    // Mock the findById method to return null, indicating the attribute does not exist
    Attribute.findById.mockResolvedValue(null);

    // Mock the findOne method to return an existing attribute with the same name
    Attribute.findOne.mockResolvedValue(existingAttribute);

    try {
      await updateOrCreate("newAttributeId", newAttributeData);
      // If the code reaches this point, the test should fail
      expect(true).toBe(false);
    } catch (error) {
      expect(error.status).toBe(400);
      expect(error.message).toBe("Attribute name already exist");
    }
  });
});
