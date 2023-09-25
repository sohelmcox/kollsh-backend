const request = require("supertest");
const { app } = require("../../../setup/app");
const stateController = require("../../../../src/api/v1/state/controllers");
const stateServices = require("../../../../src/lib/state");
const { stateTestUrl } = require("../../../testSeed/state");

// Mock service methods
jest.mock("../../../../src/lib/state", () => ({
  destroy: jest.fn(),
}));

// Set up route
app.delete(`${stateTestUrl}/:id`, stateController.destroy);

describe("State Destroy Controller", () => {
  it("should delete an existing state", async () => {
    // Mock the destroy method from your service to indicate success
    stateServices.destroy.mockResolvedValue();

    const response = await request(app).delete(`${stateTestUrl}/:stateId`);

    expect(response.statusCode).toBe(202);
    expect(response.text).toBe("ok");
  });

  it("should handle errors from the service", async () => {
    // Mock the destroy method to throw an error
    stateServices.destroy.mockRejectedValue(new Error("Service Error"));

    const response = await request(app).delete(`${stateTestUrl}/:stateId`);

    expect(response.statusCode).toBe(500);
  });
});
