const request = require("supertest");
const { app } = require("../../../setup/app");
const attributeController = require("../../../../src/api/v1/attribute/controllers");
const attributeServices = require("../../../../src/lib/attribute");
const {
  attributeTestUrl,
  mockUpdatedAttribute,
  editAttributeData,
} = require("../../../testSeed/attribute");

// Mock service methods
jest.mock("../../../../src/lib/attribute", () => ({
  edit: jest.fn(),
}));

// Set up Express app and route
app.put(`${attributeTestUrl}/:id`, attributeController.edit);

describe("Attribute Edit Controller", () => {
  it("should update an existing attribute", async () => {
    // Mock the edit method from your service to return an updated attribute

    attributeServices.edit.mockResolvedValue(mockUpdatedAttribute);

    const response = await request(app)
      .put(`${attributeTestUrl}/attributeId`)
      .send(editAttributeData);

    expect(response.statusCode).toBe(200);
    expect(response.body.code).toBe(200);
    expect(response.body.message).toBe("Attribute updated successfully");
    expect(response.body.data.id).toBe("attributeId");
    expect(response.body.data.name).toBe("Updated Attribute");
  });

  it("should handle errors from the service", async () => {
    // Mock the edit method to throw an error
    attributeServices.edit.mockRejectedValue(new Error("Service Error"));

    const response = await request(app)
      .put(`${attributeTestUrl}/attributeId`)
      .send(editAttributeData);

    expect(response.statusCode).toBe(500);
  });
});
