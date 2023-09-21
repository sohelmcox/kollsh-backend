const request = require("supertest");
const { app } = require("../../../setup/app");
const attributeController = require("../../../../src/api/v1/attribute/controllers");
const attributeServices = require("../../../../src/lib/attribute");
const {
  attributeTestUrl,
  attributeTestData,
} = require("../../../testSeed/attribute");
const {
  mockUpdatedAttribute,
  updatedAttributeData,
} = require("../../../testSeed/attribute");

// Mock your service methods
jest.mock("../../../../src/lib/attribute", () => ({
  updateOrCreate: jest.fn(),
}));

// Set up Express app and route
app.put(`${attributeTestUrl}/:id`, attributeController.updateOrCreate);

describe("Attribute Update Controller", () => {
  it("should update an existing attribute", async () => {
    // Mock the updateOrCreate method from your service to return an updated attribute

    attributeServices.updateOrCreate.mockResolvedValue({
      data: mockUpdatedAttribute,
      code: 200,
    });

    const response = await request(app)
      .put(`${attributeTestUrl}/attributeId`)
      .send(updatedAttributeData);

    expect(response.statusCode).toBe(200);
    expect(response.body.code).toBe(200);
    expect(response.body.message).toBe("Attribute updated successfully");
    expect(response.body.data.id).toBe("attributeId");
    expect(response.body.data.name).toBe("Updated Attribute");
  });

  it("should create a new attribute if not found", async () => {
    // Mock the updateOrCreate method to create a new attribute

    attributeServices.updateOrCreate.mockResolvedValue({
      data: attributeTestData,
      code: 201,
    });

    const response = await request(app)
      .put(`${attributeTestUrl}/nonExistentId`)
      .send(updatedAttributeData);

    expect(response.statusCode).toBe(201);
    expect(response.body.code).toBe(201);
    expect(response.body.message).toBe("Attribute created successfully");
    expect(response.body.data.id).toBe("attributeId");
    expect(response.body.data.name).toBe("Test Attribute");
  });

  it("should handle errors from the service", async () => {
    // Mock the updateOrCreate method to throw an error
    attributeServices.updateOrCreate.mockRejectedValue(
      new Error("Service Error"),
    );

    const response = await request(app)
      .put(`${attributeTestUrl}/attributeId`)
      .send(updatedAttributeData);

    expect(response.statusCode).toBe(500);
  });
});
