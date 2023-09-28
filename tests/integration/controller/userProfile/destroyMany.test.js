const request = require("supertest");
const { app } = require("../../../setup/app");
const userProfileController = require("../../../../src/api/v1/userProfile/controllers");
const userProfileServices = require("../../../../src/lib/userProfile");
const { userProfileTestUrl } = require("../../../testSeed/userProfile");

// Mock service methods
jest.mock("../../../../src/lib/userProfile", () => ({
  destroyMany: jest.fn(),
}));

// Set up route
app.delete(userProfileTestUrl, userProfileController.destroyMany);

describe("UserProfile DestroyMany Controller", () => {
  it("should delete multiple userProfiles with valid IDs", async () => {
    // Mock the destroyMany method from your service to return the number of deleted userProfiles
    userProfileServices.destroyMany.mockResolvedValue(3);

    const response = await request(app)
      .delete(userProfileTestUrl)
      .send({ ids: ["id1", "id2", "id3"] });

    expect(response.statusCode).toBe(202);
    expect(response.body.status).toBe(202);
    expect(response.body.message).toBe("3 userProfiles deleted.");
  });

  it("should handle invalid IDs", async () => {
    // Mock the destroyMany method to throw an error when given invalid IDs
    userProfileServices.destroyMany.mockRejectedValue(new Error("Invalid IDs"));

    const response = await request(app)
      .delete(userProfileTestUrl)
      .send({ ids: "invalidId" });

    expect(response.statusCode).toBe(400);
  });

  it("should handle errors from the service", async () => {
    // Mock the destroyMany method to throw an error
    userProfileServices.destroyMany.mockRejectedValue(
      new Error("Service Error"),
    );

    const response = await request(app)
      .delete(userProfileTestUrl)
      .send({ ids: ["id1", "id2", "id3"] });

    expect(response.statusCode).toBe(500);
  });
});
