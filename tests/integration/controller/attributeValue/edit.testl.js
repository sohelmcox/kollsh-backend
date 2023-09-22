const request = require("supertest");
const { app } = require("../../../setup/app");
const attributeValueController = require("../../../../src/api/v1/attributeValue/controllers");
const attributeValueServices = require("../../../../src/lib/attributeValue");
const {
  attributeValueTestUrl,
  mockUpdatedAttributeValue,
  editAttributeValueData,
} = require("../../../testSeed/attributeValue");

// Mock service methods
jest.mock("../../../../src/lib/attributeValue", () => ({
  edit: jest.fn(),
}));

// Set up route
app.put(`${attributeValueTestUrl}/:id`, attributeValueController.edit);

describe("AttributeValue Edit Controller", () => {
  it("should update an existing attributeValue", async () => {
    // Mock the edit method from your service to return an updated attributeValue
    attributeValueServices.edit.mockResolvedValue(mockUpdatedAttributeValue);

    const response = await request(app)
      .put(`${attributeValueTestUrl}/attributeValueId`)
      .send(editAttributeValueData);

    expect(response.statusCode).toBe(200);
    expect(response.body.code).toBe(200);
    expect(response.body.message).toBe("AttributeValue updated successfully");
    expect(response.body.data.id).toBe("attributeValueId");
    expect(response.body.data.name).toBe("Updated AttributeValue");
    expect(response.body.data.value).toBe("string");
  });

  it("should handle errors from the service", async () => {
    // Mock the edit method to throw an error
    attributeValueServices.edit.mockRejectedValue(new Error("Service Error"));

    const response = await request(app)
      .put(`${attributeValueTestUrl}/attributeValueId`)
      .send(editAttributeValueData);

    expect(response.statusCode).toBe(500);
  });
});
