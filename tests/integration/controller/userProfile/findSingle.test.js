const request = require("supertest");
const { app } = require("../../../setup/app");
const userProfileController = require("../../../../src/api/v1/userProfile/controllers");
const userProfileServices = require("../../../../src/lib/userProfile");
const {
  userProfileTestUrl,
  mockUserProfile,
} = require("../../../testSeed/userProfile");

// Mock service methods
jest.mock("../../../../src/lib/userProfile", () => ({
  findSingle: jest.fn(),
}));

// Set up route
app.get(`${userProfileTestUrl}/:id`, userProfileController.findSingle);

describe("UserProfile FindSingle Controller", () => {
  it("should find a single userProfile by ID", async () => {
    // Mock the findSingle method from your service to return a userProfile

    userProfileServices.findSingle.mockResolvedValue(mockUserProfile);

    const response = await request(app).get(
      `${userProfileTestUrl}/userProfileId`,
    );

    expect(response.statusCode).toBe(200);
    expect(response.body.id).toBe("userProfileId");
    expect(response.body.data.firstName).toBe("Test UserProfile");
    expect(response.body.data.lastName).toBe("Doe");
  });

  it("should handle errors from the service", async () => {
    // Mock the findSingle method to throw an error
    userProfileServices.findSingle.mockRejectedValue(
      new Error("Service Error"),
    );

    const response = await request(app).get(
      `${userProfileTestUrl}/userProfileId`,
    );

    expect(response.statusCode).toBe(500);
  });
});
