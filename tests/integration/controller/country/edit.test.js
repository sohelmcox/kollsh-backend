const request = require("supertest");
const { app } = require("../../../setup/app");
const countryController = require("../../../../src/api/v1/country/controllers");
const countryServices = require("../../../../src/lib/country");
const {
  countryTestUrl,
  mockUpdatedCountry,
  editCountryData,
} = require("../../../testSeed/country");

// Mock service methods
jest.mock("../../../../src/lib/country", () => ({
  edit: jest.fn(),
}));

// Set up route
app.put(`${countryTestUrl}/:id`, countryController.edit);

describe("Country Edit Controller", () => {
  it("should update an existing country", async () => {
    // Mock the edit method from your service to return an updated country
    countryServices.edit.mockResolvedValue(mockUpdatedCountry);

    const response = await request(app)
      .put(`${countryTestUrl}/countryId`)
      .send(editCountryData);

    expect(response.statusCode).toBe(200);
    expect(response.body.code).toBe(200);
    expect(response.body.message).toBe("Country updated successfully");
    expect(response.body.data.id).toBe("countryId");
    expect(response.body.data.name).toBe("Updated Country");
    expect(response.body.data.code).toBe("Updated Code");
  });

  it("should handle errors from the service", async () => {
    // Mock the edit method to throw an error
    countryServices.edit.mockRejectedValue(new Error("Service Error"));

    const response = await request(app)
      .put(`${countryTestUrl}/countryId`)
      .send(editCountryData);

    expect(response.statusCode).toBe(500);
  });
});
