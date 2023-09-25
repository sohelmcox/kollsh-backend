const request = require("supertest");
const { app } = require("../../../setup/app");
const stateController = require("../../../../src/api/v1/state/controllers");
const stateServices = require("../../../../src/lib/state");
const { stateTestUrl, mockState } = require("../../../testSeed/state");

// Mock service methods
jest.mock("../../../../src/lib/state", () => ({
  findSingle: jest.fn(),
}));

// Set up route
app.get(`${stateTestUrl}/:id`, stateController.findSingle);

describe("State FindSingle Controller", () => {
  it("should find a single state by ID", async () => {
    // Mock the findSingle method from your service to return a state

    stateServices.findSingle.mockResolvedValue(mockState);

    const response = await request(app).get(`${stateTestUrl}/stateId`);

    expect(response.statusCode).toBe(200);
    expect(response.body.id).toBe("stateId");
    expect(response.body.data.name).toBe("Test State");
    expect(response.body.data.priority).toBe(0);
  });

  it("should handle errors from the service", async () => {
    // Mock the findSingle method to throw an error
    stateServices.findSingle.mockRejectedValue(new Error("Service Error"));

    const response = await request(app).get(`${stateTestUrl}/stateId`);

    expect(response.statusCode).toBe(500);
  });
});
