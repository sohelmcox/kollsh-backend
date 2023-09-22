const request = require("supertest");
const { app } = require("../../../setup/app");
const cityController = require("../../../../src/api/v1/city/controllers");
const cityServices = require("../../../../src/lib/city");
const {
  cityTestUrl,
  mockUpdatedCity,
  editCityData,
} = require("../../../testSeed/city");

// Mock service methods
jest.mock("../../../../src/lib/city", () => ({
  edit: jest.fn(),
}));

// Set up route
app.put(`${cityTestUrl}/:id`, cityController.edit);

describe("City Edit Controller", () => {
  it("should update an existing city", async () => {
    // Mock the edit method from your service to return an updated city
    cityServices.edit.mockResolvedValue(mockUpdatedCity);

    const response = await request(app)
      .put(`${cityTestUrl}/cityId`)
      .send(editCityData);

    expect(response.statusCode).toBe(200);
    expect(response.body.code).toBe(200);
    expect(response.body.message).toBe("City updated successfully");
    expect(response.body.data.id).toBe("cityId");
    expect(response.body.data.name).toBe("Updated City");
  });

  it("should handle errors from the service", async () => {
    // Mock the edit method to throw an error
    cityServices.edit.mockRejectedValue(new Error("Service Error"));

    const response = await request(app)
      .put(`${cityTestUrl}/cityId`)
      .send(editCityData);

    expect(response.statusCode).toBe(500);
  });
});
