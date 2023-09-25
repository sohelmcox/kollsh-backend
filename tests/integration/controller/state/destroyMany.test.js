const request = require("supertest");
const { app } = require("../../../setup/app");
const stateController = require("../../../../src/api/v1/state/controllers");
const stateServices = require("../../../../src/lib/state");
const { stateTestUrl } = require("../../../testSeed/state");

// Mock service methods
jest.mock("../../../../src/lib/state", () => ({
  destroyMany: jest.fn(),
}));

// Set up route
app.delete(stateTestUrl, stateController.destroyMany);

describe("State DestroyMany Controller", () => {
  it("should delete multiple states with valid IDs", async () => {
    // Mock the destroyMany method from your service to return the number of deleted states
    stateServices.destroyMany.mockResolvedValue(3);

    const response = await request(app)
      .delete(stateTestUrl)
      .send({ ids: ["id1", "id2", "id3"] });

    expect(response.statusCode).toBe(202);
    expect(response.body.status).toBe(202);
    expect(response.body.message).toBe("3 states deleted.");
  });

  it("should handle invalid IDs", async () => {
    // Mock the destroyMany method to throw an error when given invalid IDs
    stateServices.destroyMany.mockRejectedValue(new Error("Invalid IDs"));

    const response = await request(app)
      .delete(stateTestUrl)
      .send({ ids: "invalidId" });

    expect(response.statusCode).toBe(400);
  });

  it("should handle errors from the service", async () => {
    // Mock the destroyMany method to throw an error
    stateServices.destroyMany.mockRejectedValue(new Error("Service Error"));

    const response = await request(app)
      .delete(stateTestUrl)
      .send({ ids: ["id1", "id2", "id3"] });

    expect(response.statusCode).toBe(500);
  });
});
