const request = require("supertest");
const { app } = require("../../../setup/app");
const userProfileController = require("../../../../src/api/v1/userProfile/controllers");
const userProfileServices = require("../../../../src/lib/userProfile");
const {
  userProfileTestUrl,
  createUserProfileData,
  userProfileTestQuery,
} = require("../../../testSeed/userProfile");

// Mock the required dependencies
jest.mock("../../../../src/lib/userProfile", () => ({
  findAll: jest.fn(),
}));

// Set up route
app.get(userProfileTestUrl, userProfileController.find);

describe("UserProfile Find Controller", () => {
  it("should find userProfiles with query parameters", async () => {
    // Mock the findAll method from your service to return a sample list of userProfiles

    userProfileServices.findAll.mockResolvedValue(createUserProfileData);

    const response = await request(app)
      .get(userProfileTestUrl)
      .query(userProfileTestQuery);

    expect(response.statusCode).toBe(200);
  });
});
