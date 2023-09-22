const request = require("supertest");
const { app } = require("../../../setup/app");
const countryController = require("../../../../src/api/v1/country/controllers");
const countryServices = require("../../../../src/lib/country");
const {
  countryTestUrl,
  updatedCountryData,
  newCountryData,
  mockUpdatedCountry,
} = require("../../../testSeed/country");

// Mock service methods
jest.mock("../../../../src/lib/country", () => ({
  updateOrCreate: jest.fn(),
}));

// Set up route
app.put(`${countryTestUrl}/:id`, countryController.updateOrCreate);

describe("Country Update Controller", () => {
  it("should update an existing country", async () => {
    // Mock the updateOrCreate method from your service to return an updated country

    countryServices.updateOrCreate.mockResolvedValue({
      data: mockUpdatedCountry,
      code: 200,
    });

    const response = await request(app)
      .put(`${countryTestUrl}/countryId`)
      .send(updatedCountryData);

    expect(response.statusCode).toBe(200);
    expect(response.body.code).toBe(200);
    expect(response.body.message).toBe("Country updated successfully");
    expect(response.body.data.id).toBe("countryId");
    expect(response.body.data.name).toBe("Updated Country");
    expect(response.body.data.code).toBe("Updated Code");
  });

  it("should create a new country if not found", async () => {
    // Mock the updateOrCreate method to create a new country

    countryServices.updateOrCreate.mockResolvedValue({
      data: newCountryData,
      code: 201,
    });

    const response = await request(app)
      .put(`${countryTestUrl}/nonExistentId`)
      .send(updatedCountryData);

    expect(response.statusCode).toBe(201);
    expect(response.body.code).toBe(201);
    expect(response.body.message).toBe("Country created successfully");
    expect(response.body.data.id).toBe("newCountryId");
    expect(response.body.data.name).toBe("New Country");
    expect(response.body.data.code).toBe("string");
  });

  it("should handle errors from the service", async () => {
    // Mock the updateOrCreate method to throw an error
    countryServices.updateOrCreate.mockRejectedValue(
      new Error("Service Error"),
    );

    const response = await request(app)
      .put(`${countryTestUrl}/countryId`)
      .send(updatedCountryData);

    expect(response.statusCode).toBe(500);
  });
});
