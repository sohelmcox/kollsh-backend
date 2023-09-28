const request = require("supertest");
const { app } = require("../../../setup/app");
const userProfileController = require("../../../../src/api/v1/userProfile/controllers");
const userProfileServices = require("../../../../src/lib/userProfile");
const { userProfileTestUrl } = require("../../../testSeed/userProfile");

// Mock service methods
jest.mock("../../../../src/lib/userProfile", () => ({
  destroy: jest.fn(),
}));

// Set up route
app.delete(`${userProfileTestUrl}/:id`, userProfileController.destroy);

describe("UserProfile Destroy Controller", () => {
  it("should delete an existing userProfile", async () => {
    // Mock the destroy method from your service to indicate success
    userProfileServices.destroy.mockResolvedValue();

    const response = await request(app).delete(
      `${userProfileTestUrl}/:userProfileId`,
    );

    expect(response.statusCode).toBe(202);
    expect(response.text).toBe("ok");
  });

  it("should handle errors from the service", async () => {
    // Mock the destroy method to throw an error
    userProfileServices.destroy.mockRejectedValue(new Error("Service Error"));

    const response = await request(app).delete(
      `${userProfileTestUrl}/:userProfileId`,
    );

    expect(response.statusCode).toBe(500);
  });
});
