const { updateOrCreate } = require("../../../../src/lib/attributeValue");
const { AttributeValue } = require("../../../../src/models");
const {
  newAttributeValueData,
  updatedAttributeValueData,
  existingAttributeValueData,
} = require("../../../testSeed/attributeValue");
// Mock the AttributeValue model's methods
jest.mock("../../../../src/models", () => {
  const mockAttributeValue = {
    findById: jest.fn(),
    findOne: jest.fn(),
    create: jest.fn(),
    save: jest.fn(),
    overwrite: jest.fn(),
  };

  return {
    AttributeValue: {
      findById: mockAttributeValue.findById,
      findOne: mockAttributeValue.findOne,
      create: mockAttributeValue.create,
    },
  };
});

describe("AttributeValue Update or Create Service", () => {
  it("should create a new attributeValue if it does not exist", async () => {
    // Mock the findById method to return null, indicating the attributeValue does not exist
    AttributeValue.findById.mockResolvedValue(null);

    // Mock the findOne method to return null, indicating the attributeValue name is not found
    AttributeValue.findOne.mockResolvedValue(null);

    // Mock the create method to return a new attributeValue instance
    const createdAttributeValueInstance = {
      id: "newAttributeValueId",
      ...newAttributeValueData,
      save: jest.fn(),
    };
    AttributeValue.create.mockReturnValue(createdAttributeValueInstance);

    const result = await updateOrCreate("newAttributeValueId", {
      ...newAttributeValueData,
    });
    // console.log(result);
    expect(result.code).toBe(201);
  });
  it("should update an existing attributeValue if it exists", async () => {
    // Mock an existing attributeValue
    const existingAttributeValue = {
      _id: "existingAttributeValueId",
      name: "Existing AttributeValue",
      color_code: "string",
      // attribute: ["737472696e67206f72206964"],
      value: "string",
      // brands: ["737472696e67206f72206964"],
      overwrite: jest.fn(),
      save: jest.fn(),
    };
    AttributeValue.findById.mockResolvedValue(existingAttributeValue);

    // Mock the findOne method to return null, indicating the attributeValue name is not found
    AttributeValue.findOne.mockResolvedValue(null);

    const result = await updateOrCreate(
      "existingAttributeValueId",
      updatedAttributeValueData,
    );

    // Verify that the findById method was called with the correct ID
    expect(AttributeValue.findById).toHaveBeenCalledWith(
      "existingAttributeValueId",
    );

    // Verify that the overwrite and save methods were called on the existing attributeValue
    expect(existingAttributeValue.overwrite).toHaveBeenCalledWith({
      name: updatedAttributeValueData.name,
      color_code: updatedAttributeValueData.color_code,
      attribute: updatedAttributeValueData.attribute,
      value: updatedAttributeValueData.value,
      brands: updatedAttributeValueData.brands,
    });
    expect(existingAttributeValue.save).toHaveBeenCalled();

    // Verify the result
    // expect(result.data).toEqual({ ...existingAttributeValue });
    expect(result.code).toBe(200);
  });

  it("should throw a badRequest error if the attributeValue name already exists", async () => {
    // Mock the findById method to return null, indicating the attributeValue does not exist
    AttributeValue.findById.mockResolvedValue(null);

    // Mock the findOne method to return an existing attributeValue with the same name

    AttributeValue.findOne.mockResolvedValue(existingAttributeValueData);

    try {
      await updateOrCreate("newAttributeValueId", newAttributeValueData);
      // If the code reaches this point, the test should fail
      expect(true).toBe(false);
    } catch (error) {
      expect(error.status).toBe(400);
      expect(error.message).toBe("AttributeValue name already exist");
    }
  });
});
