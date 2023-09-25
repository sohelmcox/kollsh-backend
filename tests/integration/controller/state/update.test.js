const request = require("supertest");
const { app } = require("../../../setup/app");
const stateController = require("../../../../src/api/v1/state/controllers");
const stateServices = require("../../../../src/lib/state");
const {
  stateTestUrl,
  updatedStateData,
  newStateData,
  mockUpdatedState,
} = require("../../../testSeed/state");

// Mock service methods
jest.mock("../../../../src/lib/state", () => ({
  updateOrCreate: jest.fn(),
}));

// Set up route
app.put(`${stateTestUrl}/:id`, stateController.updateOrCreate);

describe("State Update Controller", () => {
  it("should update an existing state", async () => {
    // Mock the updateOrCreate method from your service to return an updated state

    stateServices.updateOrCreate.mockResolvedValue({
      data: mockUpdatedState,
      code: 200,
    });

    const response = await request(app)
      .put(`${stateTestUrl}/stateId`)
      .send(updatedStateData);

    expect(response.statusCode).toBe(200);
    expect(response.body.code).toBe(200);
    expect(response.body.message).toBe("State updated successfully");
    expect(response.body.data.id).toBe("stateId");
    expect(response.body.data.name).toBe("Updated State");
  });

  it("should create a new state if not found", async () => {
    // Mock the updateOrCreate method to create a new state

    stateServices.updateOrCreate.mockResolvedValue({
      data: newStateData,
      code: 201,
    });

    const response = await request(app)
      .put(`${stateTestUrl}/nonExistentId`)
      .send(updatedStateData);

    expect(response.statusCode).toBe(201);
    expect(response.body.code).toBe(201);
    expect(response.body.message).toBe("State created successfully");
    expect(response.body.data.id).toBe("newStateId");
    expect(response.body.data.name).toBe("New State");
  });

  it("should handle errors from the service", async () => {
    // Mock the updateOrCreate method to throw an error
    stateServices.updateOrCreate.mockRejectedValue(new Error("Service Error"));

    const response = await request(app)
      .put(`${stateTestUrl}/stateId`)
      .send(updatedStateData);

    expect(response.statusCode).toBe(500);
  });
});
