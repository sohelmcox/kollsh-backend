const request = require("supertest");
const { app } = require("../../../setup/app");
const userController = require("../../../../src/api/v1/user/controllers");
const userServices = require("../../../../src/lib/user");
const { userTestUrl } = require("../../../testSeed/user");

// Mock service methods
jest.mock("../../../../src/lib/user", () => ({
  destroy: jest.fn(),
}));

// Set up route
app.delete(`${userTestUrl}/:id`, userController.destroy);

describe("User Destroy Controller", () => {
  it("should delete an existing user", async () => {
    // Mock the destroy method from your service to indicate success
    userServices.destroy.mockResolvedValue();

    const response = await request(app).delete(`${userTestUrl}/:userId`);

    expect(response.statusCode).toBe(202);
    expect(response.text).toBe("ok");
  });

  it("should handle errors from the service", async () => {
    // Mock the destroy method to throw an error
    userServices.destroy.mockRejectedValue(new Error("Service Error"));

    const response = await request(app).delete(`${userTestUrl}/:userId`);

    expect(response.statusCode).toBe(500);
  });
});
