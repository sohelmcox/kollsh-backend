const request = require("supertest");
const { app } = require("../../../setup/app");
const countryController = require("../../../../src/api/v1/country/controllers");
const countryServices = require("../../../../src/lib/country");
const {
  countryTestUrl,
  countryTestData,
} = require("../../../testSeed/country");
// Mock service methods
jest.mock("../../../../src/lib/country", () => ({
  create: jest.fn(),
}));

// Set up route
app.post(countryTestUrl, countryController.create);

describe("Country Controller", () => {
  it("should create a new country", async () => {
    // Mock the create method from your service to return a sample country

    countryServices.create.mockResolvedValue(countryTestData);

    const response = await request(app)
      .post(countryTestUrl)
      .send(countryTestData);

    expect(response.statusCode).toBe(201);
    expect(response.body.code).toBe(201);
    expect(response.body.message).toBe("Country Created Successfully");
    expect(response.body.data).toEqual(countryTestData);
  });
});
