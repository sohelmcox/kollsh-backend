const request = require("supertest");
const { app } = require("../../../setup/app");
const itemDetailsController = require("../../../../src/api/v1/itemDetails/controllers");
const itemDetailsServices = require("../../../../src/lib/itemDetails");
const {
  itemDetailsTestUrl,
  itemDetailsTestData,
} = require("../../../testSeed/itemDetails");
// Mock service methods
jest.mock("../../../../src/lib/itemDetails", () => ({
  create: jest.fn(),
}));

// Set up route
app.post(itemDetailsTestUrl, itemDetailsController.create);

describe("ItemDetails Controller", () => {
  it("should create a new itemDetails", async () => {
    // Mock the create method from your service to return a sample itemDetails

    itemDetailsServices.create.mockResolvedValue(itemDetailsTestData);

    const response = await request(app)
      .post(itemDetailsTestUrl)
      .send(itemDetailsTestData);

    expect(response.statusCode).toBe(201);
    expect(response.body.code).toBe(201);
    expect(response.body.message).toBe("ItemDetails Created Successfully");
    expect(response.body.data).toEqual(itemDetailsTestData);
  });
});
