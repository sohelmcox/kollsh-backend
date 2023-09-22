const request = require("supertest");
const { app } = require("../../../setup/app");
const cityController = require("../../../../src/api/v1/city/controllers");
const cityServices = require("../../../../src/lib/city");
const { cityTestUrl } = require("../../../testSeed/city");

// Mock service methods
jest.mock("../../../../src/lib/city", () => ({
  destroy: jest.fn(),
}));

// Set up route
app.delete(`${cityTestUrl}/:id`, cityController.destroy);

describe("City Destroy Controller", () => {
  it("should delete an existing city", async () => {
    // Mock the destroy method from your service to indicate success
    cityServices.destroy.mockResolvedValue();

    const response = await request(app).delete(`${cityTestUrl}/:cityId`);

    expect(response.statusCode).toBe(202);
    expect(response.text).toBe("ok");
  });

  it("should handle errors from the service", async () => {
    // Mock the destroy method to throw an error
    cityServices.destroy.mockRejectedValue(new Error("Service Error"));

    const response = await request(app).delete(`${cityTestUrl}/:cityId`);

    expect(response.statusCode).toBe(500);
  });
});
