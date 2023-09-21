const request = require("supertest");
const { app } = require("../../../setup/app");
const cityController = require("../../../../src/api/v1/city/controllers");
const cityServices = require("../../../../src/lib/city");
const {
  cityTestUrl,
  updatedCityData,
  newCityData,
  mockUpdatedCity,
} = require("../../../testSeed/city");

// Mock your service methods
jest.mock("../../../../src/lib/city", () => ({
  updateOrCreate: jest.fn(),
}));

// Set up Express app and route
app.put(`${cityTestUrl}/:id`, cityController.updateOrCreate);

describe("City Update Controller", () => {
  it("should update an existing city", async () => {
    // Mock the updateOrCreate method from your service to return an updated city

    cityServices.updateOrCreate.mockResolvedValue({
      data: mockUpdatedCity,
      code: 200,
    });

    const response = await request(app)
      .put(`${cityTestUrl}/cityId`)
      .send(updatedCityData);

    expect(response.statusCode).toBe(200);
    expect(response.body.code).toBe(200);
    expect(response.body.message).toBe("City updated successfully");
    expect(response.body.data.id).toBe("cityId");
    expect(response.body.data.name).toBe("Updated City");
  });

  it("should create a new city if not found", async () => {
    // Mock the updateOrCreate method to create a new city

    cityServices.updateOrCreate.mockResolvedValue({
      data: newCityData,
      code: 201,
    });

    const response = await request(app)
      .put(`${cityTestUrl}/nonExistentId`)
      .send(updatedCityData);

    expect(response.statusCode).toBe(201);
    expect(response.body.code).toBe(201);
    expect(response.body.message).toBe("City created successfully");
    expect(response.body.data.id).toBe("newCityId");
    expect(response.body.data.name).toBe("New City");
    expect(response.body.data.priority).toBe(0);
  });

  it("should handle errors from the service", async () => {
    // Mock the updateOrCreate method to throw an error
    cityServices.updateOrCreate.mockRejectedValue(new Error("Service Error"));

    const response = await request(app)
      .put(`${cityTestUrl}/cityId`)
      .send(updatedCityData);

    expect(response.statusCode).toBe(500);
  });
});
