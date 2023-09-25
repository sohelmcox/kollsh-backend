const request = require("supertest");
const { app } = require("../../../setup/app");
const stateController = require("../../../../src/api/v1/state/controllers");
const stateServices = require("../../../../src/lib/state");
const {
  stateTestUrl,
  createStateData,
  stateTestQuery,
} = require("../../../testSeed/state");

// Mock the required dependencies
jest.mock("../../../../src/lib/state", () => ({
  findAll: jest.fn(),
}));

// Set up route
app.get(stateTestUrl, stateController.find);

describe("State Find Controller", () => {
  it("should find states with query parameters", async () => {
    // Mock the findAll method from your service to return a sample list of states

    stateServices.findAll.mockResolvedValue(createStateData);

    const response = await request(app).get(stateTestUrl).query(stateTestQuery);

    expect(response.statusCode).toBe(200);
  });
});
