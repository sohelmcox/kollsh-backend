const request = require("supertest");
const { app } = require("../../../setup/app");
const userProfileController = require("../../../../src/api/v1/userProfile/controllers");
const userProfileServices = require("../../../../src/lib/userProfile");
const {
  userProfileTestUrl,
  mockUpdatedUserProfile,
  editUserProfileData,
} = require("../../../testSeed/userProfile");

// Mock service methods
jest.mock("../../../../src/lib/userProfile", () => ({
  edit: jest.fn(),
}));

// Set up route
app.put(`${userProfileTestUrl}/:id`, userProfileController.edit);

describe("UserProfile Edit Controller", () => {
  it("should update an existing userProfile", async () => {
    // Mock the edit method from your service to return an updated userProfile
    userProfileServices.edit.mockResolvedValue(mockUpdatedUserProfile);

    const response = await request(app)
      .put(`${userProfileTestUrl}/userProfileId`)
      .send(editUserProfileData);

    expect(response.statusCode).toBe(200);
    expect(response.body.code).toBe(200);
    expect(response.body.message).toBe("UserProfile updated successfully");
    expect(response.body.data.id).toBe("userProfileId");
    expect(response.body.data.firstName).toBe("Updated UserProfile");
    expect(response.body.data.lastName).toBe("Updated LastName");
  });

  it("should handle errors from the service", async () => {
    // Mock the edit method to throw an error
    userProfileServices.edit.mockRejectedValue(new Error("Service Error"));

    const response = await request(app)
      .put(`${userProfileTestUrl}/userProfileId`)
      .send(editUserProfileData);

    expect(response.statusCode).toBe(500);
  });
});
