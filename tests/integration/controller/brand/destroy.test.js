const request = require("supertest");
const { app } = require("../../../setup/app");
const brandController = require("../../../../src/api/v1/brand/controllers");
const brandServices = require("../../../../src/lib/brand");
const { brandTestUrl } = require("../../../testSeed/brand");

// Mock your service methods
jest.mock("../../../../src/lib/brand", () => ({
  destroy: jest.fn(),
}));

// Set up Express app and route
app.delete(`${brandTestUrl}/:id`, brandController.destroy);

describe("Brand Destroy Controller", () => {
  it("should delete an existing brand", async () => {
    // Mock the destroy method from your service to indicate success
    brandServices.destroy.mockResolvedValue();

    const response = await request(app).delete(`${brandTestUrl}/:brandId`);

    expect(response.statusCode).toBe(202);
    expect(response.text).toBe("ok");
  });

  it("should handle errors from the service", async () => {
    // Mock the destroy method to throw an error
    brandServices.destroy.mockRejectedValue(new Error("Service Error"));

    const response = await request(app).delete(`${brandTestUrl}/:brandId`);

    expect(response.statusCode).toBe(500);
  });
});
