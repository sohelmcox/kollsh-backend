const request = require("supertest");
const { app } = require("../../../setup/app");
const itemDetailsController = require("../../../../src/api/v1/itemDetails/controllers");
const itemDetailsServices = require("../../../../src/lib/itemDetails");
const {
  itemDetailsTestUrl,
  mockItemDetails,
} = require("../../../testSeed/itemDetails");

// Mock service methods
jest.mock("../../../../src/lib/itemDetails", () => ({
  findSingle: jest.fn(),
}));

// Set up route
app.get(`${itemDetailsTestUrl}/:id`, itemDetailsController.findSingle);

describe("ItemDetails FindSingle Controller", () => {
  it("should find a single itemDetails by ID", async () => {
    // Mock the findSingle method from your service to return a itemDetails

    itemDetailsServices.findSingle.mockResolvedValue(mockItemDetails);

    const response = await request(app).get(
      `${itemDetailsTestUrl}/itemDetailsId`,
    );

    expect(response.statusCode).toBe(200);
    expect(response.body.id).toBe("itemDetailsId");
    expect(response.body.data.description).toBe("Test Description");
    expect(response.body.data.email).toBe("user@example.com");
  });

  it("should handle errors from the service", async () => {
    // Mock the findSingle method to throw an error
    itemDetailsServices.findSingle.mockRejectedValue(
      new Error("Service Error"),
    );

    const response = await request(app).get(
      `${itemDetailsTestUrl}/itemDetailsId`,
    );

    expect(response.statusCode).toBe(500);
  });
});
