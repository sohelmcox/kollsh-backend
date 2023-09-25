const request = require("supertest");
const { app } = require("../../../setup/app");
const stateController = require("../../../../src/api/v1/state/controllers");
const stateServices = require("../../../../src/lib/state");
const {
  stateTestUrl,
  mockUpdatedState,
  editStateData,
} = require("../../../testSeed/state");

// Mock service methods
jest.mock("../../../../src/lib/state", () => ({
  edit: jest.fn(),
}));

// Set up route
app.put(`${stateTestUrl}/:id`, stateController.edit);

describe("State Edit Controller", () => {
  it("should update an existing state", async () => {
    // Mock the edit method from your service to return an updated state
    stateServices.edit.mockResolvedValue(mockUpdatedState);

    const response = await request(app)
      .put(`${stateTestUrl}/stateId`)
      .send(editStateData);

    expect(response.statusCode).toBe(200);
    expect(response.body.code).toBe(200);
    expect(response.body.message).toBe("State updated successfully");
    expect(response.body.data.id).toBe("stateId");
    expect(response.body.data.name).toBe("Updated State");
    expect(response.body.data.priority).toBe(0);
  });

  it("should handle errors from the service", async () => {
    // Mock the edit method to throw an error
    stateServices.edit.mockRejectedValue(new Error("Service Error"));

    const response = await request(app)
      .put(`${stateTestUrl}/stateId`)
      .send(editStateData);

    expect(response.statusCode).toBe(500);
  });
});
