const request = require("supertest");
const { app } = require("../../../setup/app");
const itemDetailsController = require("../../../../src/api/v1/itemDetails/controllers");
const itemDetailsServices = require("../../../../src/lib/itemDetails");
const { itemDetailsTestUrl } = require("../../../testSeed/itemDetails");

// Mock service methods
jest.mock("../../../../src/lib/itemDetails", () => ({
  destroy: jest.fn(),
}));

// Set up route
app.delete(`${itemDetailsTestUrl}/:id`, itemDetailsController.destroy);

describe("ItemDetails Destroy Controller", () => {
  it("should delete an existing itemDetails", async () => {
    // Mock the destroy method from your service to indicate success
    itemDetailsServices.destroy.mockResolvedValue();

    const response = await request(app).delete(
      `${itemDetailsTestUrl}/:itemDetailsId`,
    );

    expect(response.statusCode).toBe(202);
    expect(response.text).toBe("ok");
  });

  it("should handle errors from the service", async () => {
    // Mock the destroy method to throw an error
    itemDetailsServices.destroy.mockRejectedValue(new Error("Service Error"));

    const response = await request(app).delete(
      `${itemDetailsTestUrl}/:itemDetailsId`,
    );

    expect(response.statusCode).toBe(500);
  });
});
