const request = require("supertest");
const { app } = require("../../../setup/app");
const attributeValueController = require("../../../../src/api/v1/attributeValue/controllers");
const attributeValueServices = require("../../../../src/lib/attributeValue");
const {
  attributeValueTestUrl,
  updatedAttributeValueData,
  newAttributeValueData,
  mockUpdatedAttributeValue,
} = require("../../../testSeed/attributeValue");

// Mock service methods
jest.mock("../../../../src/lib/attributeValue", () => ({
  updateOrCreate: jest.fn(),
}));

// Set up route
app.put(
  `${attributeValueTestUrl}/:id`,
  attributeValueController.updateOrCreate,
);

describe("AttributeValue Update Controller", () => {
  it("should update an existing attributeValue", async () => {
    // Mock the updateOrCreate method from your service to return an updated attributeValue

    attributeValueServices.updateOrCreate.mockResolvedValue({
      data: mockUpdatedAttributeValue,
      code: 200,
    });

    const response = await request(app)
      .put(`${attributeValueTestUrl}/attributeValueId`)
      .send(updatedAttributeValueData);

    expect(response.statusCode).toBe(200);
    expect(response.body.code).toBe(200);
    expect(response.body.message).toBe("AttributeValue updated successfully");
    expect(response.body.data.id).toBe("attributeValueId");
    expect(response.body.data.name).toBe("Updated AttributeValue");
    expect(response.body.data.color_code).toBe("string");
    expect(response.body.data.value).toBe("string");
  });

  it("should create a new attributeValue if not found", async () => {
    // Mock the updateOrCreate method to create a new attributeValue

    attributeValueServices.updateOrCreate.mockResolvedValue({
      data: newAttributeValueData,
      code: 201,
    });

    const response = await request(app)
      .put(`${attributeValueTestUrl}/nonExistentId`)
      .send(updatedAttributeValueData);

    expect(response.statusCode).toBe(201);
    expect(response.body.code).toBe(201);
    expect(response.body.message).toBe("AttributeValue created successfully");
    expect(response.body.data.id).toBe("newAttributeValueId");
    expect(response.body.data.name).toBe("New AttributeValue");
    expect(response.body.data.color_code).toBe("string");
  });

  it("should handle errors from the service", async () => {
    // Mock the updateOrCreate method to throw an error
    attributeValueServices.updateOrCreate.mockRejectedValue(
      new Error("Service Error"),
    );

    const response = await request(app)
      .put(`${attributeValueTestUrl}/attributeValueId`)
      .send(updatedAttributeValueData);

    expect(response.statusCode).toBe(500);
  });
});
