const request = require("supertest");
const { app } = require("../../../setup/app");
const stateController = require("../../../../src/api/v1/state/controllers");
const stateServices = require("../../../../src/lib/state");
const { stateTestUrl, stateTestData } = require("../../../testSeed/state");
// Mock service methods
jest.mock("../../../../src/lib/state", () => ({
  create: jest.fn(),
}));

// Set up route
app.post(stateTestUrl, stateController.create);

describe("State Controller", () => {
  it("should create a new state", async () => {
    // Mock the create method from your service to return a sample state

    stateServices.create.mockResolvedValue(stateTestData);

    const response = await request(app).post(stateTestUrl).send(stateTestData);

    expect(response.statusCode).toBe(201);
    expect(response.body.code).toBe(201);
    expect(response.body.message).toBe("State Created Successfully");
    expect(response.body.data).toEqual(stateTestData);
  });
});
