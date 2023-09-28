const request = require("supertest");
const { app } = require("../../../setup/app");
const userProfileController = require("../../../../src/api/v1/userProfile/controllers");
const userProfileServices = require("../../../../src/lib/userProfile");
const {
  userProfileTestUrl,
  updatedUserProfileData,
  newUserProfileData,
  mockUpdatedUserProfile,
} = require("../../../testSeed/userProfile");

// Mock service methods
jest.mock("../../../../src/lib/userProfile", () => ({
  updateOrCreate: jest.fn(),
}));

// Set up route
app.put(`${userProfileTestUrl}/:id`, userProfileController.updateOrCreate);

describe("UserProfile Update Controller", () => {
  it("should update an existing userProfile", async () => {
    // Mock the updateOrCreate method from your service to return an updated userProfile

    userProfileServices.updateOrCreate.mockResolvedValue({
      data: mockUpdatedUserProfile,
      code: 200,
    });

    const response = await request(app)
      .put(`${userProfileTestUrl}/userProfileId`)
      .send(updatedUserProfileData);

    expect(response.statusCode).toBe(200);
    expect(response.body.code).toBe(200);
    expect(response.body.message).toBe("UserProfile updated successfully");
    expect(response.body.data.id).toBe("userProfileId");
    expect(response.body.data.firstName).toBe("Updated UserProfile");
  });

  it("should create a new userProfile if not found", async () => {
    // Mock the updateOrCreate method to create a new userProfile

    userProfileServices.updateOrCreate.mockResolvedValue({
      data: newUserProfileData,
      code: 201,
    });

    const response = await request(app)
      .put(`${userProfileTestUrl}/nonExistentId`)
      .send(updatedUserProfileData);

    expect(response.statusCode).toBe(201);
    expect(response.body.code).toBe(201);
    expect(response.body.message).toBe("UserProfile created successfully");
    expect(response.body.data.id).toBe("newUserProfileId");
    expect(response.body.data.firstName).toBe("New UserProfile");
    expect(response.body.data.lastName).toBe("Doe");
  });

  it("should handle errors from the service", async () => {
    // Mock the updateOrCreate method to throw an error
    userProfileServices.updateOrCreate.mockRejectedValue(
      new Error("Service Error"),
    );

    const response = await request(app)
      .put(`${userProfileTestUrl}/userProfileId`)
      .send(updatedUserProfileData);

    expect(response.statusCode).toBe(500);
  });
});
